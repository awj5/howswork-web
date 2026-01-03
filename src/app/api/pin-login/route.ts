import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import rateLimit from "@/utils/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin } = await req.json();
    const ip = getIP(req);

    // Limit per company + IP using Upstash and Redis
    const id = `company:${companyID}:ip:${ip}`;
    const { success, reset, remaining } = await rateLimit.limit(id);

    if (!success)
      return NextResponse.json(
        {
          error: "Too many attempts. Try again shortly.",
          reset, // unix ms timestamp
          remaining, // tokens left
        },
        { status: 429 }
      );

    const { data: checkInData, error: checkInError } = await supabase
      .from("check_ins")
      .select("*")
      .eq("company_id", companyID)
      .eq("pin", pin)
      .eq("status", "Open")
      .limit(1);

    if (checkInError) throw new Error(checkInError.message);
    if (!checkInData.length) return NextResponse.json({ error: "The access PIN is invalid." }, { status: 401 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function getIP(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "unknown";
}
