"use server";

import supabase from "@/utils/supabase";

export async function getCompany(slug: string) {
  const { data: companyData, error: companyError } = await supabase
    .from("companies")
    .select("id, name, slug, timezone")
    .eq("slug", slug)
    .single();

  if (companyError) return { error: companyError.message };
  return { success: true, data: companyData };
}
