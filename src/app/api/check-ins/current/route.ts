import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import rateLimit, { redis } from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin } = await req.json();
    const ip = getIP(req);
    const identifier = `company:${companyID}:ip:${ip}`;

    // Check if already blocked
    const blocked = await redis.get(`blocked:${identifier}`);
    if (blocked) return NextResponse.json({ error: "Access denied" }, { status: 401 });

    // Get current check-in
    const { data: checkInData, error: checkInError } = await supabase
      .from("check_ins")
      .select("id, start, status")
      .eq("company_id", companyID)
      .eq("pin", pin)
      .eq("status", 2)
      .maybeSingle();

    if (checkInError) throw new Error(checkInError.message);

    // Rate limit if PIN invalid
    if (!checkInData) {
      const { success } = await rateLimit.limit(identifier);
      if (!success) await redis.set(`blocked:${identifier}`, 1, { ex: 300 }); // Block for 5 mins
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    return NextResponse.json({ data: checkInData }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
