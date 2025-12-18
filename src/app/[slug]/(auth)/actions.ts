"use server";

import supabase from "@/utils/supabase";

export async function login(companyID: number, pin: number) {
  const { data: checkInsData, error: checkInsError } = await supabase
    .from("check_ins")
    .select("*")
    .eq("company_id", companyID)
    .eq("pin", pin)
    .eq("status", "Open");

  if (checkInsError) return { error: checkInsError.message };
  if (!checkInsData.length) return { error: "Pin is invalid." };
  return { success: true };
}
