import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import rateLimit, { redis } from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin } = await req.json();
    const ip = getIP(req);
    const accessIdentifier = `access:company:${companyID}:ip:${ip}`;
    const pinIdentifier = `company:${companyID}:ip:${ip}`;

    // Check if already blocked
    const [accessBlocked, pinBlocked] = await Promise.all([
      redis.get(`blocked:${accessIdentifier}`),
      redis.get(`blocked:${pinIdentifier}`),
    ]);

    if (accessBlocked || pinBlocked)
      return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });

    const { data: checkInsData, error: checkInsError } = await supabase
      .from("check_ins")
      .select("id")
      .eq("company_id", companyID)
      .eq("pin", pin)
      .eq("status", "Open")
      .limit(1);

    if (checkInsError) throw new Error(checkInsError.message);

    // Apply rate limiting if PIN invalid
    if (!checkInsData.length) {
      const { success } = await rateLimit.limit(accessIdentifier);

      if (!success) {
        await redis.set(`blocked:${accessIdentifier}`, 1, { ex: 300 }); // Block for 5 mins
        return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
      }

      return NextResponse.json({ error: "The access PIN is invalid" }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
