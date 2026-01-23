import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import { redis } from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";

export async function POST(req: NextRequest) {
  try {
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

    // Block immediately if PIN invalid
    if (!verifyData.length) {
      await redis.set(`blocked:${identifier}`, 1, { ex: 300 }); // Block for 5 mins
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    // Get company teams
    const { data: teamsData, error: teamsError } = await supabase
      .from("teams")
      .select("id, name")
      .eq("company_id", companyID);

    if (teamsError) throw new Error(teamsError.message);
    return NextResponse.json({ data: teamsData }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
