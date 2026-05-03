import { NextRequest, NextResponse } from "next/server";
import IssuesData from "@/data/issues.json";
import AttributionsData from "@/data/attributions.json";
import supabase from "@/utils/supabase";
import { encrypt } from "@/utils/encryption";
import { generateDescription } from "@/utils/ai";
import resend from "@/utils/resend";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    // Get check-in
    const { data: checkInData, error: checkInError } = await supabase
      .from("check_ins")
      .select("contact_count, company_id, start")
      .eq("id", id)
      .single();

    if (checkInError) throw new Error(checkInError.message);

    // Get feedback
    const { data: feedbackData, error: feedbackError } = await supabase
      .from("feedback")
      .select("issues, attributions, team")
      .eq("check_in_id", id);

    if (feedbackError) throw new Error(feedbackError.message);

    // Get issues
    const issueCounts = new Map<number, number>();
    const issueAttributions = new Map<number, Map<number, number>>();
    const issueTeams = new Map<number, Map<number, number>>();

    feedbackData.forEach((feedback) => {
      feedback.issues?.forEach((issueID: number) => {
        issueCounts.set(issueID, (issueCounts.get(issueID) || 0) + 1);

        // Attributions
        if (!issueAttributions.has(issueID)) issueAttributions.set(issueID, new Map());
        const attributions = issueAttributions.get(issueID)!;

        feedback.attributions?.forEach((attrID: number) => {
          attributions.set(attrID, (attributions.get(attrID) || 0) + 1);
        });

        // Team
        if (!issueTeams.has(issueID)) issueTeams.set(issueID, new Map());
        const teams = issueTeams.get(issueID)!;
        if (feedback.team) teams.set(feedback.team, (teams.get(feedback.team) || 0) + 1);
      });
    });

    const threshold = checkInData.contact_count * 0.2; // 20%
    const seriousIDs = IssuesData.filter((i) => i.serious).map((i) => i.id);

    const { data: teamsData, error: teamsError } = await supabase
      .from("teams")
      .select("id, name")
      .eq("company_id", checkInData.company_id);

    if (teamsError) throw new Error(teamsError.message);

    // Get serious issues and/or issues selected by 20% or more users (must be selected more than once)
    const riskIssues = Array.from(issueCounts.entries())
      .filter(([issueID, count]) => (seriousIDs.includes(issueID) ? count >= 1 : count >= 2 && count >= threshold))
      .map(([issueID, count]) => {
        const name = IssuesData.find((i) => i.id === issueID)?.name;
        const percentage = Math.round((count / checkInData.contact_count) * 100);

        // Attributions
        const attrMap = issueAttributions.get(issueID)!;

        const attributions = Array.from(attrMap.entries()).map(([attrID, count]) => {
          const label = AttributionsData.find((i) => i.id === attrID)?.label;
          return { label, count };
        });

        // Teams
        const teamMap = issueTeams.get(issueID)!;

        // Team needs at least 3 users to be included
        const teams = Array.from(teamMap.entries())
          .filter(([, count]) => count >= 3)
          .map(([teamID, count]) => {
            const name = teamsData.find((i) => i.id === teamID)?.name;
            return { name, count };
          });

        return {
          id: issueID,
          name,
          count,
          percentage,
          attributions: attributions.length ? attributions : undefined,
          teams: teams.length ? teams : undefined,
        };
      });

    // Add risk
    if (riskIssues.length) {
      const generated = await generateDescription(JSON.stringify(riskIssues), "check-in"); // AI response

      const { error: insertRiskError } = await supabase.from("risks").insert({
        company_id: checkInData.company_id,
        check_in_id: id,
        issues: riskIssues.map((i) => i.id),
        description: encrypt(generated.description ?? "Unable to generate a description. See assessment for details."),
        level: generated.riskLevel ?? 2,
        ai_description: true,
        check_in_date: checkInData.start,
      });

      if (insertRiskError) throw new Error(insertRiskError.message);

      // Get company
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .select("name")
        .eq("id", checkInData.company_id)
        .single();

      if (companyError) throw new Error(companyError.message);

      // Get all company admins
      const { data: companyUsersData, error: companyUsersError } = await supabase
        .from("company_users")
        .select("user_id")
        .eq("company_id", checkInData.company_id)
        .not("user_id", "is", null);

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
          subject: `${companyData.name} assessment results require attention`,
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
                  src="https://howswork.app/img/email-icon.png"
                  style="display: block; outline: none; border: none; text-decoration: none"
                  width="32"
                />
                <p style="font-size: 16px; line-height: 24px; margin-top: 16px; margin-bottom: 16px">
                  A recent assessment at <strong>${companyData.name}</strong> has identified workplace issues and has been added to
                  the risk register.
                </p>
                <a
                  href="https://admin.howswork.app/assessments/${id}"
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
                      ]><i style="mso-font-width: 400%; mso-text-raise: 18" hidden>&#8202;&#8202;</i><!
                    [endif]--></span
                  ><span
                    style="
                      max-width: 100%;
                      display: inline-block;
                      line-height: 120%;
                      mso-padding-alt: 0px;
                      mso-text-raise: 9px;
                    "
                    >View assessment</span
                  ><span
                    ><!--[if mso]><i style="mso-font-width: 400%" hidden>&#8202;&#8202;&#8203;</i><![endif]--></span
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
                  Review recommended within 7 days.
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
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
