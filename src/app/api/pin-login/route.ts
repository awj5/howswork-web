import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin } = await req.json();

    const { data: checkInData, error: checkInError } = await supabase
      .from("check_ins")
      .select("*")
      .eq("company_id", companyID)
      .eq("pin", pin)
      .eq("status", "Open")
      .limit(1);

    if (checkInError) throw new Error(checkInError.message);
    if (!checkInData.length) return NextResponse.json({ error: "Pin is invalid." }, { status: 401 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
