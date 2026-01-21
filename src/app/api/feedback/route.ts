import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import rateLimit from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin, sentiment, issues, attributions, team } = await req.json();
    if (!sentiment) throw new Error("Form is invalid");

    // Get current check-in
    const { data: checkInsData, error: checkInsError } = await supabase
      .from("check_ins")
      .select("id")
      .eq("company_id", companyID)
      .eq("pin", pin)
      .eq("status", "Open")
      .maybeSingle();

    if (checkInsError) throw new Error(checkInsError.message);

    // Apply rate limiting if invalid
    if (!checkInsData) {
      const ip = getIP(req);
      await rateLimit.limit(`company:${companyID}:ip:${ip}`); // Limit per company + IP using Upstash and Redis
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    // Count company staff
    const { data: peopleData, error: peopleError } = await supabase
      .from("people")
      .select("contacts")
      .eq("company_id", companyID)
      .single();

    if (peopleError) throw new Error(peopleError.message);

    // Get feedback for check-in
    const { data: feedbackData, error: feedbackError } = await supabase
      .from("feedback")
      .select("id")
      .eq("check_in_id", checkInsData.id);

    if (feedbackError) throw new Error(feedbackError.message);

    // Add feedback if submission count is less than number of company contacts
    if (feedbackData.length < peopleData.contacts.length) {
      const { error: insertFeedbackError } = await supabase.from("feedback").insert({
        check_in_id: checkInsData.id,
        sentiment,
        issues: issues.length ? issues : null,
        attributions: attributions.length ? attributions : null,
        team: team || null,
        company_id: companyID,
      });

      if (insertFeedbackError) throw new Error(insertFeedbackError.message);
    }

    return NextResponse.json({ data: checkInsData.id }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
