import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

type Payload = { companyID?: number; pin?: number };

export async function POST(req: Request) {
  let payload: Payload = {};

  try {
    payload = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { companyID, pin } = payload;

  if (!companyID || !pin) {
    return NextResponse.json({ error: "Missing details." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("check_ins")
    .select("*")
    .eq("company_id", companyID)
    .eq("pin", pin)
    .eq("status", "Open")
    .limit(1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data?.length) {
    return NextResponse.json({ error: "Pin is invalid." }, { status: 401 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
