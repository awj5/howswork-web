"use server";

import supabase from "@/utils/supabase";

export async function verifyPin(companyID: number, pin: number) {
  const { data: checkInsData, error: checkInsError } = await supabase
    .from("check_ins")
    .select("*")
    .eq("company_id", companyID)
    .eq("pin", pin)
    .eq("status", "Open");

  if (checkInsError || !checkInsData.length) return { error: true };
  return { success: true };
}
