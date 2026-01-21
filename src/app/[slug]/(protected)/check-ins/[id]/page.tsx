"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DateTime } from "luxon";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ChartPieIcon, ArrowRightCircleIcon, HandRaisedIcon } from "@heroicons/react/16/solid";
import { CheckInType } from "@/types";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { useDialogContext } from "@/hooks/useDialogContext";
import { Subheading } from "@/components/ui/heading";
import EmptyState from "@/components/EmptyState";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Text, Strong } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function CheckIn() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { company } = useCompanyContext();
  const { feedbackDialog, setFeedbackDialog, setConcernDialog } = useDialogContext();
  const [checkIn, setCheckIn] = useState<CheckInType>();
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState<DateTime>();
  const [completed, setCompleted] = useState(false);

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
    if (!company || feedbackDialog?.open) return;

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

      // Check if check-in was completed by user in this browser
      //localStorage.removeItem(`check-in_completed_${result.data.id}`); // Used for testing
      const completed = localStorage.getItem(`check-in_completed_${result.data.id}`);
      setCompleted(completed !== null);
    };

    getCheckIn();
  }, [company, feedbackDialog]);

  return (
    <div className="mx-auto max-w-6xl">
      {checkIn?.status === "Open" && completed && feedbackDialog?.flagConcern ? (
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
      ) : checkIn?.status === "Open" && completed ? (
        <EmptyState>
          <Subheading>You're all set</Subheading>

          <Text className="mt-1 text-center">
            Thanks for checking in. Insights from this check-in will be available once the next check-in opens.
          </Text>
        </EmptyState>
      ) : checkIn?.status === "Open" ? (
        <EmptyState>
          <CheckCircleIcon className="size-16 text-gray-400 sm:size-12 dark:text-gray-500" />
          <Subheading className="mt-2">Time for your check-in</Subheading>

          <Text className="mt-1 text-center">
            Share how work is going at <Strong>{company?.name}</Strong> anonymously. It takes less than a minute.
          </Text>

          <Button onClick={() => setFeedbackDialog({ open: true, flagConcern: false })} color="indigo" className="mt-6">
            Complete check-in
            <ArrowRightCircleIcon />
          </Button>
        </EmptyState>
      ) : checkIn ? (
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
