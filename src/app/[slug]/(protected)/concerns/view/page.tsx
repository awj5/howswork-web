"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Heading, Subheading } from "@/components/ui/heading";
import EmptyState from "@/components/EmptyState";
import Breadcrumb from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";

type ConcernType = {
  tracking: string;
  details: string;
  created_at: string;
};

export default function Concern() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const [concern, setConcern] = useState<ConcernType>();
  const [error, setError] = useState("");
  const [date, setDate] = useState<DateTime>();

  const getConcernData = async (companyID: number, pin: number, tracking: string) => {
    try {
      const response = await fetch("/api/concerns/search", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ companyID, pin, tracking }),
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

    const getConcern = async () => {
      const pin = sessionStorage.getItem(`company_access_${company.slug}`);
      const tracking = sessionStorage.getItem("concern_tracking");

      if (!tracking) {
        setError("Concern not found");
        return;
      }

      const result = await getConcernData(company.id, Number(pin), tracking);

      if (result.error && result.status === 401) {
        // Pin invalid
        sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
        router.push(`/${company.slug}/error`); // Redirect
        return;
      } else if (result.error) {
        setError(result.error);
        return;
      }

      setConcern(result.data);
      setDate(DateTime.fromISO(result.data.created_at).toUTC()); // Convert to date object (UTC)
    };

    getConcern();
  }, [company]);

  return (
    <div className="mx-auto max-w-6xl">
      {concern ? (
        <>
          <Breadcrumb href={`/${company?.slug}/concerns`}>Concerns</Breadcrumb>

          <div className="lg:mt-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Heading>Concern HW-{concern.tracking}</Heading>
              <Badge color="amber">Acknowledged</Badge>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <CalendarIcon className="size-4 text-gray-400 dark:text-gray-500" />

              <Text className="text-zinc-950! dark:text-white!">
                {date?.setZone(company?.timezone).toFormat("dd LLL yyyy")}
              </Text>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-8 sm:flex-row">
            <div className="flex flex-col gap-8">
              <div>
                <Subheading>Details</Subheading>
                <Divider className="mt-4" />
                <Text className="mt-3">{concern.details}</Text>
              </div>

              <div>
                <Subheading>Issues</Subheading>
                <Divider className="mt-4" />
                <Text className="mt-3">{concern.details}</Text>
              </div>
            </div>

            <div>
              <Subheading>Activity</Subheading>
              <Divider className="mt-4" />
              <Text className="mt-3">{concern.details}</Text>
            </div>
          </div>
        </>
      ) : (
        error && (
          <EmptyState>
            <ExclamationCircleIcon className="size-16 text-gray-400 sm:size-12 dark:text-gray-500" />
            <Subheading className="mt-2 text-center">{error || "Concern not found"}</Subheading>
          </EmptyState>
        )
      )}
    </div>
  );
}
