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
