"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CheckInType } from "@/types";
import { useCompanyContext } from "@/hooks/useCompanyContext";

export function useCurrentCheckIn() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const [checkIn, setCheckin] = useState<CheckInType>();

  useEffect(() => {
    if (!company) return;

    const getCheckIn = async () => {
      try {
        const pin = sessionStorage.getItem(`company_access_${company.slug}`);
        if (!pin) return;

        // Use API for rate limiting
        const response = await fetch("/api/verify", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ companyID: company.id, pin }),
        });

        const json = await response.json();
        if (!response.ok) throw new Error(json.error);
        setCheckin(json.data);
      } catch (error) {
        console.error(error);
        sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
        router.push(`/${company?.slug}/error`); // Redirect
      }
    };

    getCheckIn();
  }, [company]);

  return checkIn;
}
