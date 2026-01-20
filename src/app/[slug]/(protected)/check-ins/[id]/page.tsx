"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DateTime } from "luxon";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CheckInType } from "@/types";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Subheading } from "@/components/ui/heading";
import EmptyState from "@/components/EmptyState";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

export default function CheckIn() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { company } = useCompanyContext();
  const [checkIn, setCheckIn] = useState<CheckInType>();
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState<DateTime>();

  const getCheckInData = async (companyID: number, pin: number) => {
    try {
      const response = await fetch(`/api/check-ins/${params.id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ companyID, pin }),
      });

      const json = await response.json();
      json.status = response.status;
      return json;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
  };

  useEffect(() => {
    if (!company) return;

    const getCheckIn = async () => {
      const pin = sessionStorage.getItem(`company_access_${company.slug}`);
      const result = await getCheckInData(company.id, Number(pin));

      if (result.error && result.status === 401) {
        // Pin invalid
        sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
        router.push(`/${company.slug}/error`); // Redirect
      } else if (result.error) {
        setError(result.error);
        return;
      }

      setCheckIn(result.data);
      setStartDate(DateTime.fromISO(result.data.start).toUTC()); // Convert to date object (UTC)
    };

    getCheckIn();
  }, [company]);

  return (
    <div className="mx-auto max-w-6xl">
      {checkIn ? (
        <>
          <Heading>Check-in on {startDate?.setZone(company?.timezone).toFormat("cccc, dd LLLL yyyy")}</Heading>
          <Divider className="mt-6" />
        </>
      ) : (
        error && (
          <EmptyState>
            <ExclamationCircleIcon className="size-16 text-gray-400 sm:size-12 dark:text-gray-500" />
            <Subheading className="mt-2 text-center">{error}</Subheading>
          </EmptyState>
        )
      )}
    </div>
  );
}
