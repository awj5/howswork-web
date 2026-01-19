import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import rateLimit from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { companyID, pin } = await req.json();

    // Verify pin
    const { data: checkInsData, error: checkInsError } = await supabase
      .from("check_ins")
      .select("*")
      .eq("company_id", companyID)
      .eq("pin", pin)
      .eq("status", "Open")
      .limit(1);

    if (checkInsError) throw new Error(checkInsError.message);

    // Apply rate limiting if invalid
    if (!checkInsData.length) {
      const ip = getIP(req);
      await rateLimit.limit(`company:${companyID}:ip:${ip}`); // Limit per company + IP using Upstash and Redis
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    // Get check-in
    const { data: checkInData, error: checkInError } = await supabase
      .from("check_ins")
      .select("id, start")
      .eq("company_id", companyID)
      .eq("id", Number(id))
      .maybeSingle();

    if (checkInError) throw new Error(checkInError.message);
    if (!checkInData) return NextResponse.json({ error: "Check-in not found" }, { status: 404 });
    return NextResponse.json({ data: checkInData }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
