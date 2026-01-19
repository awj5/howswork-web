import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import rateLimit from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin, sentiment, issues, attributions, team } = await req.json();

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

    // Add feedback
    const { error: insertFeedbackError } = await supabase.from("feedback").insert({
      check_in_id: checkInsData.id,
      sentiment,
      issues: issues.length ? issues : null,
      attributions: attributions.length ? attributions : null,
      team: team || null,
    });

    if (insertFeedbackError) throw new Error(insertFeedbackError.message);
    return NextResponse.json({ data: checkInsData.id }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
