import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import rateLimit from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin, from, to } = await req.json();

    // Verify pin
    const { data: verifyData, error: verifyError } = await supabase
      .from("check_ins")
      .select("id")
      .eq("company_id", companyID)
      .eq("pin", pin)
      .eq("status", "Open")
      .limit(1);

    if (verifyError) throw new Error(verifyError.message);

    // Apply rate limiting if invalid
    if (!verifyData.length) {
      const ip = getIP(req);
      await rateLimit.limit(`company:${companyID}:ip:${ip}`); // Limit per company + IP using Upstash and Redis
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    // Get company check-ins
    const {
      data: checkInsData,
      error: checkInsError,
      count: checkInsCount,
    } = await supabase
      .from("check_ins")
      .select("id, start, status", {
        count: "exact",
      })
      .eq("company_id", companyID)
      .order("start", { ascending: false })
      .range(from, to);

    if (checkInsError) throw new Error(checkInsError.message);
    return NextResponse.json({ data: checkInsData, count: checkInsCount }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
