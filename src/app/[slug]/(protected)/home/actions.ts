"use server";

import supabase from "@/utils/supabase";

export async function getTeams(companyID: number) {
  const { data: teamsData, error: teamsError } = await supabase
    .from("teams")
    .select("id, name")
    .eq("company_id", companyID);

  if (teamsError) return { error: teamsError.message };
  return { data: teamsData };
}

export async function addFeedback(
  checkInID: number,
  sentiment: number,
  issues: number[],
  attributions: number[],
  team: number
) {
  const { error: insertFeedbackError } = await supabase.from("feedback").insert({
    check_in_id: checkInID,
    sentiment,
    issues: issues.length ? issues : null,
    attributions: attributions.length ? attributions : null,
    team: team || null,
  });

  if (insertFeedbackError) return { error: insertFeedbackError.message };
  return { success: true };
}
