import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import rateLimit from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";
import { encrypt } from "@/utils/encryption";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin, details, issues } = await req.json();
    if (!details.trim()) throw new Error("Form is invalid");

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

    // Generate tracking no.
    const tracking = Array.from({ length: 8 }, () =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.floor(Math.random() * 36))
    ).join("");

    // Add concern
    const { error: insertConcernError } = await supabase.from("concerns").insert({
      details: encrypt(details.trim().slice(0, 800)),
      issues: issues.length ? issues : null,
      company_id: companyID,
      tracking,
    });

    if (insertConcernError) throw new Error(insertConcernError.message);
    return NextResponse.json({ data: checkInsData.id, tracking }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
