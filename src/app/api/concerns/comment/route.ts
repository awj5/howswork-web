import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import { redis } from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";
import { encrypt } from "@/utils/encryption";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin, tracking, comment } = await req.json();
    if (!tracking.trim() || !comment.trim()) throw new Error("Form is invalid");
    const ip = getIP(req);
    const pinIdentifier = `company:${companyID}:ip:${ip}`;
    const trackingIdentifier = `verify-tracking:company:${companyID}:ip:${ip}`;

    // Check if already blocked
    const [pinBlocked, trackingBlocked] = await Promise.all([
      redis.get(`blocked:${pinIdentifier}`),
      redis.get(`blocked:${trackingIdentifier}`),
    ]);

    if (pinBlocked || trackingBlocked) return NextResponse.json({ error: "Access denied" }, { status: 401 });

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
      await redis.set(`blocked:${pinIdentifier}`, 1, { ex: 300 }); // Block for 5 mins
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    // Get concern
    const { data: concernData, error: concernError } = await supabase
      .from("concerns")
      .select("id")
      .eq("company_id", companyID)
      .eq("tracking", tracking)
      .maybeSingle();

    if (concernError) throw new Error(concernError.message);

    // Block immediately if tracking invalid
    if (!concernData) {
      await redis.set(`blocked:${trackingIdentifier}`, 1, { ex: 300 }); // Block for 5 mins
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    // Add comment
    const { error: insertConcernCommentError } = await supabase.from("concern_comments").insert({
      comment: encrypt(comment.trim().slice(0, 800)),
      concern_id: concernData.id,
      company_id: companyID,
    });

    if (insertConcernCommentError) throw new Error(insertConcernCommentError.message);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
