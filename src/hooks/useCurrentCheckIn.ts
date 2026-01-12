"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useCompanyContext } from "@/hooks/useCompanyContext";

export function useCurrentCheckIn() {
  const supabase = createClient();
  const router = useRouter();
  const { company } = useCompanyContext();
  const [checkInID, setCheckinID] = useState(0);

  useEffect(() => {
    const getCheckIn = async () => {
      try {
        const pin = sessionStorage.getItem(`company_access_${company?.slug}`);

        // Get open check-in with matching pin
        const { data: checkInData, error: checkInError } = await supabase
          .from("check_ins")
          .select("id")
          .eq("company_id", company?.id)
          .eq("pin", pin)
          .eq("status", "Open")
          .single();

        if (checkInError) throw checkInError;
        setCheckinID(checkInData.id);
      } catch (error) {
        console.error(error);
        sessionStorage.removeItem(`company_access_${company?.slug}`); // Remove stored pin
        router.push(`/${company?.slug}/error`); // Redirect
      }
    };

    getCheckIn();
  }, []);

  return checkInID;
}
