"use server";

import supabase from "@/utils/supabase/admin";

export async function getCheckIn(id: number, companyID: number) {
  const { data: checkInData, error: checkInError } = await supabase
    .from("check_ins")
    .select("id, start")
    .eq("id", id)
    .eq("company_id", companyID)
    .single();

  if (checkInError) return { error: checkInError.message };
  return { data: checkInData };
}
