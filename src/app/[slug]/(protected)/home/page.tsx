"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChartPieIcon, ArrowRightCircleIcon, HandRaisedIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { useConcernDialogContext } from "@/hooks/useConcernDialogContext";
import EmptyState from "@/components/EmptyState";
import { Subheading } from "@/components/ui/heading";
import { Strong, Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import Banner from "@/components/company/home/Banner";
import Feedback from "@/components/company/home/Feedback";

export default function Home() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const { setConcernDialog } = useConcernDialogContext();
  const [checkInOpen, setCheckInOpen] = useState<boolean>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [showRaiseConcern, setShowRaiseConcern] = useState(false);

  const getCurrentCheckInData = async (companyID: number, pin: number) => {
    try {
      const response = await fetch("/api/check-ins/current", {
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
    if (!company || dialogOpen) return;

    const getCurrentCheckIn = async () => {
      const pin = sessionStorage.getItem(`company_access_${company.slug}`);
      const result = await getCurrentCheckInData(company.id, Number(pin));

      if (result.error && result.status === 401) {
        // Pin invalid
        sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
        router.push(`/${company.slug}/error`); // Redirect
      } else if (result.error) {
        setError(result.error);
        return;
      }

      // Check if current check-in already completed by user
      //localStorage.removeItem(`check-in_completed_${result.data.id}`);
      const completed = localStorage.getItem(`check-in_completed_${result.data.id}`);
      setCheckInOpen(completed === null);
    };

    getCurrentCheckIn();
  }, [company, dialogOpen]);

  return (
    <div className="mx-auto max-w-6xl">
      {checkInOpen ? (
        <>
          <EmptyState>
            <CheckCircleIcon className="size-16 text-gray-400 sm:size-12 dark:text-gray-500" />
            <Subheading className="mt-2">You've got a check-in</Subheading>

            <Text className="mt-1 text-center">
              <Strong>{company?.name}</Strong> wants to know how things are going.
            </Text>

            <Button onClick={() => setDialogOpen(true)} color="indigo" className="mt-6">
              Complete check-in
              <ArrowRightCircleIcon />
            </Button>
          </EmptyState>

          <Feedback dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} setShowRaiseConcern={setShowRaiseConcern} />
        </>
      ) : checkInOpen !== undefined && showRaiseConcern ? (
        <EmptyState>
          <Subheading>You're all set</Subheading>

          <Text className="mt-1 text-center">
            Thanks for checking in. If something doesn't feel right, you can also raise a concern with{" "}
            <Strong>{company?.name.replace(/\.$/, "")}</Strong>. It's anonymous and helps ensure serious issues are seen
            and addressed.
          </Text>

          <Button onClick={() => setConcernDialog(true)} color="indigo" className="mt-6">
            <HandRaisedIcon />
            Raise a concern
          </Button>
        </EmptyState>
      ) : checkInOpen !== undefined ? (
        <EmptyState>
          <Subheading>You're all set</Subheading>

          <Text className="mt-1 text-center">
            Thanks for checking in. You'll be notified when the next check-in from <Strong>{company?.name}</Strong> is
            requested.
          </Text>

          <Button onClick={() => router.push(`/${company?.slug}/check-ins`)} outline className="mt-6">
            <ChartPieIcon />
            View previous check-in results
          </Button>
        </EmptyState>
      ) : (
        error && (
          <EmptyState>
            <ExclamationCircleIcon className="size-16 text-gray-400 sm:size-12 dark:text-gray-500" />
            <Subheading className="mt-2 text-center">{error}</Subheading>
          </EmptyState>
        )
      )}

      <Banner />
    </div>
  );
}
