import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import rateLimit, { redis } from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";
import { decrypt } from "@/utils/encryption";

export async function POST(req: NextRequest) {
  try {
    const { companyID, pin, tracking } = await req.json();
    if (!tracking.trim()) throw new Error("Tracking number is invalid");
    const ip = getIP(req);
    const pinIdentifier = `company:${companyID}:ip:${ip}`;
    const trackingIdentifier = `verify-tracking:company:${companyID}:ip:${ip}`;

    // Check if already blocked
    const [pinBlocked, trackingBlocked] = await Promise.all([
      redis.get(`blocked:${pinIdentifier}`),
      redis.get(`blocked:${trackingIdentifier}`),
    ]);

    if (pinBlocked) return NextResponse.json({ error: "Access denied" }, { status: 401 });
    if (trackingBlocked) return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });

    // Verify pin
    const { data: verifyData, error: verifyError } = await supabase
      .from("check_ins")
      .select("id")
      .eq("company_id", companyID)
      .eq("pin", pin)
      .eq("status", 3)
      .limit(1);

    if (verifyError) throw new Error(verifyError.message);

    // Rate limit if PIN invalid
    if (!verifyData.length) {
      const { success } = await rateLimit.limit(pinIdentifier);
      if (!success) await redis.set(`blocked:${pinIdentifier}`, 1, { ex: 300 }); // Block for 5 mins
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    // Get concern
    const { data: concernData, error: concernError } = await supabase
      .from("concerns")
      .select("id, tracking, details, created_at, issues")
      .eq("company_id", companyID)
      .eq("tracking", tracking)
      .maybeSingle();

    if (concernError) throw new Error(concernError.message);

    // Apply rate limiting if tracking invalid
    if (!concernData) {
      const { success } = await rateLimit.limit(trackingIdentifier);

      if (!success) {
        await redis.set(`blocked:${trackingIdentifier}`, 1, { ex: 300 }); // Block for 5 mins
        return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
      }

      return NextResponse.json({ error: "Concern not found" }, { status: 404 });
    }

    concernData.details = decrypt(concernData.details); // Decrypt details

    // Get status updates
    const { data: concernStatusData, error: concernStatusError } = await supabase
      .from("concern_status")
      .select("created_at, status")
      .eq("concern_id", concernData.id)
      .order("created_at", { ascending: false });

    if (concernStatusError) throw new Error(concernStatusError.message);

    // Get comments
    const { data: concernCommentsData, error: concernCommentsError } = await supabase
      .from("concern_comments")
      .select("created_at, comment, admin_name")
      .eq("concern_id", concernData.id)
      .order("created_at", { ascending: false });

    if (concernCommentsError) throw new Error(concernCommentsError.message);

    // Decrypt comments
    concernCommentsData.forEach((item) => {
      item.comment = decrypt(item.comment);
    });

    // Combine status updates and comments
    const activity = [...concernStatusData, ...concernCommentsData].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const response = {
      ...concernData,
      activity,
    };

    return NextResponse.json({ data: response }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
