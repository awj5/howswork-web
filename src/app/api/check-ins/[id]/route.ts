import { NextRequest, NextResponse } from "next/server";
import { CheckInStatType } from "@/types";
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
      .eq("status", "Open")
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
      .in("status", ["Open", "Closed"])
      .maybeSingle();

    if (checkInError) throw new Error(checkInError.message);
    if (!checkInData) return NextResponse.json({ error: "Check-in not found" }, { status: 404 });

    // Generate stats
    const stats: CheckInStatType[] = [];

    // Get previous check-in
    const { data: prevCheckInData, error: prevCheckInError } = await supabase
      .from("check_ins")
      .select("id, contact_count")
      .eq("company_id", companyID)
      .lt("start", checkInData.start)
      .order("start", { ascending: false })
      .limit(1);

    if (prevCheckInError) throw new Error(prevCheckInError.message);

    // Generate participation stat
    const { data: feedbackData, error: feedbackError } = await supabase
      .from("feedback")
      .select("id")
      .eq("check_in_id", checkInData.id);

    if (feedbackError) throw new Error(feedbackError.message);
    const participation = Math.round((feedbackData.length / checkInData.contact_count) * 100); // Percentage
    let participationTrend = 0;

    if (prevCheckInData.length) {
      // Get previous check-in concern count
      const { data: prevFeedbackData, error: prevFeedbackError } = await supabase
        .from("feedback")
        .select("id")
        .eq("check_in_id", prevCheckInData[0].id);

      if (prevFeedbackError) throw new Error(prevFeedbackError.message);
      const prevParticipation = Math.round((prevFeedbackData.length / prevCheckInData[0].contact_count) * 100); // Percentage
      participationTrend = Math.round(((participation - prevParticipation) / prevParticipation) * 100);
    }

    stats.push({
      title: "Participation",
      primary: participation,
      secondary: participationTrend ?? undefined,
      percentage: true,
    });

    // Generate concern stat
    const { data: concernsData, error: concernsError } = await supabase
      .from("concerns")
      .select("id")
      .eq("check_in_id", checkInData.id);

    if (concernsError) throw new Error(concernsError.message);
    let concernTrend = 0;

    if (prevCheckInData.length) {
      // Get previous check-in concern count
      const { data: prevConcernsData, error: prevConcernsError } = await supabase
        .from("concerns")
        .select("id")
        .eq("check_in_id", prevCheckInData[0].id);

      if (prevConcernsError) throw new Error(prevConcernsError.message);

      if (prevConcernsData.length)
        concernTrend = Math.round(((concernsData.length - prevConcernsData.length) / prevConcernsData.length) * 100); // Percentage
    }

    stats.push({
      title: "Concerns raised",
      primary: concernsData.length,
      secondary: concernTrend ?? undefined,
    });

    // Add stats to check-in
    const data = {
      ...checkInData,
      stats,
    };

    return NextResponse.json({ data }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
