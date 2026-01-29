import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import { redis } from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";
import { encrypt } from "@/utils/encryption";
import resend from "@/utils/resend";

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

    // Add status (awaiting review)
    const { error: insertConcernStatusError } = await supabase.from("concern_status").insert({
      status: 1,
      concern_id: concernData.id,
      company_id: companyID,
    });

    if (insertConcernStatusError) throw new Error(insertConcernStatusError.message);

    // Get company
    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .select("name")
      .eq("id", companyID)
      .single();

    if (companyError) throw new Error(companyError.message);

    // Get all company admins
    const { data: companyUsersData, error: companyUsersError } = await supabase
      .from("company_users")
      .select("user_id")
      .eq("company_id", companyID);

    if (companyUsersError) throw new Error(companyUsersError.message);

    // Get admin profiles
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("email")
      .in(
        "user_id",
        companyUsersData.map((u) => u.user_id)
      );

    if (profilesError) throw new Error(profilesError.message);

    // Email
    try {
      await resend.emails.send({
        from: "HowsWork <no-reply@updates.howswork.app>",
        to: profilesData.map((p) => p.email),
        subject: `Comment added to concern at ${companyData.name}`,
        html: `
<table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
  <tbody>
    <tr>
      <td
        style="
          font-family:
            ui-sans-serif, system-ui, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;,
            &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;
        "
      >
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="max-width: 37.5em; padding-bottom: 24px; padding-top: 24px"
        >
          <tbody>
            <tr style="width: 100%">
              <td>
                <img
                  alt="HowsWork"
                  height="32"
                  src="https://www.howswork.app/img/email-icon.png"
                  style="display: block; outline: none; border: none; text-decoration: none"
                  width="32"
                />
                <p style="font-size: 16px; line-height: 24px; margin-top: 16px; margin-bottom: 16px">
                  An employee at <strong>Acme, Inc.</strong> has added a follow-up comment to their concern.
                </p>
                <a
                  href="https://admin.howswork.app/concerns/${concernData.id}"
                  style="
                    line-height: 100%;
                    text-decoration: none;
                    display: inline-block;
                    max-width: 100%;
                    mso-padding-alt: 0px;
                    border-radius: 6px;
                    background-color: rgb(79, 57, 246);
                    padding-right: 14px;
                    padding-left: 14px;
                    padding-bottom: 10px;
                    padding-top: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    color: rgb(255, 255, 255);
                  "
                  target="_blank"
                  ><span
                    ><!--[if mso
                      ]><i style="mso-font-width: 350%; mso-text-raise: 15" hidden>&#8202;&#8202;</i><!
                    [endif]--></span
                  ><span
                    style="
                      max-width: 100%;
                      display: inline-block;
                      line-height: 120%;
                      mso-padding-alt: 0px;
                      mso-text-raise: 7.5px;
                    "
                    >View comment</span
                  ><span
                    ><!--[if mso]><i style="mso-font-width: 350%" hidden>&#8202;&#8202;&#8203;</i><![endif]--></span
                  ></a
                >
                <p
                  style="
                    font-size: 14px;
                    line-height: 24px;
                    color: rgb(74, 85, 101);
                    margin-top: 16px;
                    margin-bottom: 16px;
                  "
                >
                  Response recommended within 48 hours.
                </p>
                <hr
                  style="width: 100%; border: none; border-top: 1px solid #eaeaea; border-color: rgb(16, 24, 40, 10%)"
                />
                <p
                  style="
                    font-size: 12px;
                    line-height: 24px;
                    color: rgb(74, 85, 101);
                    margin-top: 16px;
                    margin-bottom: 16px;
                  "
                >
                  HowsWork<br />Questions? Contact us at support@howswork.app
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
              `,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error sending email");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
