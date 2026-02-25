import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "crypto";
import supabase from "@/utils/supabase";
import rateLimit, { redis } from "@/utils/rate-limit";
import { getIP } from "@/utils/helpers";
import { encrypt } from "@/utils/encryption";
import resend from "@/utils/resend";
import { generateDescription } from "@/utils/ai";

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
      .eq("status", 2)
      .limit(1);

    if (verifyError) throw new Error(verifyError.message);

    // Rate limit if PIN invalid
    if (!verifyData.length) {
      const { success } = await rateLimit.limit(identifier);
      if (!success) await redis.set(`blocked:${identifier}`, 1, { ex: 300 }); // Block for 5 mins
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    // Generate tracking no.
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const tracking = Array.from({ length: 8 }, () => chars.charAt(randomInt(0, chars.length))).join("");

    // Add concern
    const { data: insertConcernData, error: insertConcernError } = await supabase
      .from("concerns")
      .insert({
        details: encrypt(details.trim().slice(0, 800)),
        issues: issues.length ? issues : null,
        company_id: companyID,
        tracking,
        check_in_id: verifyData[0].id,
      })
      .select("id, tracking")
      .single();

    if (insertConcernError) throw new Error(insertConcernError.message);
    const generated = await generateDescription(details, "concern"); // AI response

    // Add risk
    const { error: insertRiskError } = await supabase.from("risks").insert({
      company_id: companyID,
      concern_id: insertConcernData.id,
      issues: issues.length ? issues : null,
      description: encrypt(generated.description ?? "Unable to generate a description. See concern for details."),
      level: generated.riskLevel ?? 2,
      concern_tracking: insertConcernData.tracking,
      ai_description: true,
    });

    if (insertRiskError) throw new Error(insertRiskError.message);

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
        companyUsersData.map((i) => i.user_id)
      );

    if (profilesError) throw new Error(profilesError.message);

    // Email
    try {
      await resend.emails.send({
        from: "HowsWork <no-reply@updates.howswork.app>",
        to: profilesData.map((i) => i.email),
        subject: `New workplace concern at ${companyData.name}`,
        html: `<table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
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
                  An employee at <strong>${companyData.name}</strong> has raised a concern and it has been added to the risk register.
                </p>
                <a
                  href="https://admin.howswork.app/concerns/${insertConcernData.id}"
                  style="
                    line-height: 100%;
                    text-decoration: none;
                    display: inline-block;
                    max-width: 100%;
                    mso-padding-alt: 0px;
                    border-radius: 6px;
                    background-color: rgb(79, 57, 246);
                    padding-right: 16px;
                    padding-left: 16px;
                    padding-bottom: 12px;
                    padding-top: 12px;
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
                    >View concern</span
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
</table>`,
      });
    } catch (error) {
      console.error(error);
    }

    return NextResponse.json({ tracking }, { status: 200 }); // Success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
