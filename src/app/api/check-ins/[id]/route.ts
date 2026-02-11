import { NextRequest, NextResponse } from "next/server";
import { CheckInStatType } from "@/types";
import SentimentsData from "@/data/sentiments.json";
import supabase from "@/utils/supabase";
import rateLimit, { redis } from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { companyID, pin } = await req.json();
    const ip = getIP(req);
    const identifier = `company:${companyID}:ip:${ip}`;

    // Check if already blocked
    const blocked = await redis.get(`blocked:${identifier}`);
    if (blocked) return NextResponse.json({ error: "Access denied" }, { status: 401 });

    // Verify pin
    const { data: verifyData, error: verifyError } = await supabase
      .from("check_ins")
      .select("id")
      .eq("company_id", companyID)
      .eq("pin", pin)
      .eq("status", 2)
      .limit(1);

    if (verifyError) throw new Error(verifyError.message);

    // Rate limit if PIN invalid
    if (!verifyData.length) {
      const { success } = await rateLimit.limit(identifier);
      if (!success) await redis.set(`blocked:${identifier}`, 1, { ex: 300 }); // Block for 5 mins
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    // Get check-in
    const { data: checkInData, error: checkInError } = await supabase
      .from("check_ins")
      .select("id, start, status, contact_count")
      .eq("company_id", companyID)
      .eq("id", Number(id))
      .in("status", [2, 3])
      .maybeSingle();

    if (checkInError) throw new Error(checkInError.message);
    if (!checkInData) return NextResponse.json({ error: "Check-in not found" }, { status: 404 });

    // Get feedback
    const { data: feedbackData, error: feedbackError } = await supabase
      .from("feedback")
      .select("id, sentiment, issues")
      .eq("check_in_id", checkInData.id);

    if (feedbackError) throw new Error(feedbackError.message);

    // Get concerns
    const { data: concernsData, error: concernsError } = await supabase
      .from("concerns")
      .select("id")
      .eq("check_in_id", checkInData.id);

    if (concernsError) throw new Error(concernsError.message);

    // Get issues
    const issueCounts = new Map<number, number>();

    feedbackData.forEach((feedback) => {
      feedback.issues?.forEach((id: number) => {
        issueCounts.set(id, (issueCounts.get(id) || 0) + 1);
      });
    });

    // Order by most common
    const issues = Array.from(issueCounts, ([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count)
      .map(({ id }) => id);

    // Generate stats
    const stats: CheckInStatType[] = [];
    let participationTrend = 0;
    let sentimentTrend = 0;

    const participation = checkInData.contact_count
      ? Math.round((feedbackData.length / checkInData.contact_count) * 100)
      : 0; // Percentage

    const participationText =
      participation >= 80
        ? "Very high"
        : participation >= 60
          ? "High"
          : participation >= 40
            ? "Moderate"
            : participation >= 30
              ? "Low"
              : "Very low";

    // Average and convert to percentage
    const sentiment = feedbackData.length
      ? Math.round(
          (feedbackData.reduce((sum, feedback) => sum + feedback.sentiment, 0) / feedbackData.length) *
            (100 / SentimentsData.length)
        )
      : 0;

    const sentimentText =
      sentiment >= 80
        ? "Amazing"
        : sentiment >= 60
          ? "Good"
          : sentiment >= 40
            ? "Fine"
            : sentiment >= 30
              ? "Difficult"
              : "Terrible";

    // Get previous check-in
    const { data: prevCheckInData, error: prevCheckInError } = await supabase
      .from("check_ins")
      .select("id, contact_count")
      .eq("company_id", companyID)
      .lt("start", checkInData.start)
      .order("start", { ascending: false })
      .limit(1);

    if (prevCheckInError) throw new Error(prevCheckInError.message);

    if (prevCheckInData.length) {
      // Get previous check-in feedback
      const { data: prevFeedbackData, error: prevFeedbackError } = await supabase
        .from("feedback")
        .select("id, sentiment")
        .eq("check_in_id", prevCheckInData[0].id);

      if (prevFeedbackError) throw new Error(prevFeedbackError.message);

      const prevParticipation = prevCheckInData[0].contact_count
        ? Math.round((prevFeedbackData.length / prevCheckInData[0].contact_count) * 100)
        : 0; // Percentage

      // Average and convert to percentage
      const prevSentiment = prevFeedbackData.length
        ? Math.round(
            (prevFeedbackData.reduce((sum, feedback) => sum + feedback.sentiment, 0) / prevFeedbackData.length) *
              (100 / SentimentsData.length)
          )
        : 0;

      // Calculate trends
      if (prevParticipation)
        participationTrend = Math.round(((participation - prevParticipation) / prevParticipation) * 100); // Percentage

      if (prevSentiment) sentimentTrend = Math.round(((sentiment - prevSentiment) / prevSentiment) * 100); // Percentage
    }

    stats.push({
      title: "Invited",
      primary: checkInData.contact_count,
      primaryText: checkInData.contact_count,
    });

    stats.push({
      title: "Participation",
      primary: participation,
      secondary: participationTrend,
      primaryText: participation ? `${participationText}` : undefined,
    });

    stats.push({
      title: "Sentiment",
      primary: sentiment,
      secondary: sentimentTrend,
      primaryText: sentiment ? `${sentimentText}` : undefined,
    });

    stats.push({
      title: "Concerns raised",
      primary: concernsData.length,
      primaryText: String(concernsData.length),
    });

    // Add stats to check-in
    const data = {
      ...checkInData,
      stats,
      issues,
    };

    return NextResponse.json({ data }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
