import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import rateLimit, { redis } from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin, sentiment, issues, attributions, team } = await req.json();
    if (!sentiment) throw new Error("Form is invalid");
    const ip = getIP(req);
    const identifier = `company:${companyID}:ip:${ip}`;

    // Check if already blocked
    const blocked = await redis.get(`blocked:${identifier}`);
    if (blocked) return NextResponse.json({ error: "Access denied" }, { status: 401 });

    // Get current check-in
    const { data: checkInsData, error: checkInsError } = await supabase
      .from("check_ins")
      .select("id, contact_count")
      .eq("company_id", companyID)
      .eq("pin", pin)
      .eq("status", 2)
      .maybeSingle();

    if (checkInsError) throw new Error(checkInsError.message);

    // Rate limit if PIN invalid
    if (!checkInsData) {
      const { success } = await rateLimit.limit(identifier);
      if (!success) await redis.set(`blocked:${identifier}`, 1, { ex: 300 }); // Block for 5 mins
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    // Get feedback for check-in
    const { data: feedbackData, error: feedbackError } = await supabase
      .from("feedback")
      .select("id")
      .eq("check_in_id", checkInsData.id);

    if (feedbackError) throw new Error(feedbackError.message);

    // Add feedback if submission count is less than number of check-in contacts
    if (feedbackData.length < checkInsData.contact_count) {
      const { error: insertFeedbackError } = await supabase.from("feedback").insert({
        check_in_id: checkInsData.id,
        sentiment,
        issues: issues.length ? issues : null,
        attributions: attributions.length ? attributions : null,
        team: team || null,
        company_id: companyID,
      });

      if (insertFeedbackError) throw new Error(insertFeedbackError.message);
    } else {
      // Record that limit was reached
      const { error: limitSignalsError } = await supabase.from("limit_signals").insert({
        check_in_id: checkInsData.id,
        type: "feedback",
      });

      if (limitSignalsError) throw new Error(limitSignalsError.message);
    }

    return NextResponse.json({ data: checkInsData.id }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
