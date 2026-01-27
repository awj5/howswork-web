import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "crypto";
import supabase from "@/utils/supabase";
import { redis } from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";
import { encrypt } from "@/utils/encryption";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin, details, issues } = await req.json();
    if (!details.trim()) throw new Error("Form is invalid");
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

    // Generate tracking no.
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const tracking = Array.from({ length: 8 }, () => chars.charAt(randomInt(0, chars.length))).join("");

    // Add concern
    const { error: insertConcernError } = await supabase.from("concerns").insert({
      details: encrypt(details.trim().slice(0, 800)),
      issues: issues.length ? issues : null,
      company_id: companyID,
      tracking,
    });

    if (insertConcernError) throw new Error(insertConcernError.message);
    return NextResponse.json({ tracking }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
