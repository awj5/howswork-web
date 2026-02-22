"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DateTime } from "luxon";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ShieldCheckIcon } from "@heroicons/react/20/solid";
import { ArrowRightCircleIcon, HandRaisedIcon, CalendarIcon } from "@heroicons/react/16/solid";
import { CheckInType } from "@/types";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { useDialogContext } from "@/hooks/useDialogContext";
import { Subheading } from "@/components/ui/heading";
import EmptyState from "@/components/EmptyState";
import { Heading } from "@/components/ui/heading";
import { Text, Strong, TextLink } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import Doodle from "@/components/Doodle";
import { Badge } from "@/components/ui/badge";
import Stat from "@/components/company/check-ins/check-in/Stat";
import Issues from "@/components/company/check-ins/check-in/Issues";

export default function CheckIn() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { company } = useCompanyContext();
  const { feedbackDialog, setFeedbackDialog, setConcernDialog } = useDialogContext();
  const [checkIn, setCheckIn] = useState<CheckInType>();
  const [error, setError] = useState("");
  const [doodleLoaded, setDoodleLoaded] = useState(false);
  const [checkIncompleted, setCheckInCompleted] = useState(false);
  const date = checkIn ? DateTime.fromISO(checkIn.start).toUTC() : undefined;

  const getCheckInData = async (companyID: number, pin: number, id: number) => {
    try {
      const response = await fetch(`/api/check-ins/${id}`, {
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
      const result = await getCheckInData(company.id, Number(pin), Number(params.id));

      if (result.error && result.status === 401) {
        // Pin invalid
        sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
        router.push(`/${company.slug}/error`); // Redirect
        return;
      } else if (result.error) {
        setError(result.error);
        return;
      }

      setCheckIn(result.data);

      // Check if check-in was completed by user in this browser
      //localStorage.removeItem(`check-in_completed_${result.data.id}`); // Used for testing
      const completed = localStorage.getItem(`check-in_completed_${result.data.id}`);
      if (checkIncompleted && completed !== null) setDoodleLoaded(false); // Doodle will change
      setCheckInCompleted(completed !== null);
    };

    getCheckIn();
  }, [company, feedbackDialog]);

  return (
    <div className="mx-auto max-w-6xl">
      {checkIn?.status === 2 && checkIncompleted && feedbackDialog?.flagConcern ? (
        <EmptyState key="all-set-concern" className={doodleLoaded ? "fade-in" : "opacity-0"}>
          <Doodle doodles={[12, 13]} onLoad={() => setDoodleLoaded(true)} />
          <Subheading className="mt-4">You&apos;re all set</Subheading>

          <Text className="mt-1 text-center">
            Thanks for checking in. If something doesn&apos;t feel right, you can also raise a concern with{" "}
            <Strong>{company?.name.replace(/\.$/, "")}</Strong>. It&apos;s anonymous and helps ensure serious issues are
            seen and addressed.
          </Text>

          <Button onClick={() => setConcernDialog(true)} color="indigo" className="mt-6">
            <HandRaisedIcon />
            Raise a concern
          </Button>
        </EmptyState>
      ) : checkIn?.status === 2 && checkIncompleted ? (
        <EmptyState key="all-set" className={doodleLoaded ? "fade-in" : "opacity-0"}>
          <Doodle doodles={[5, 16, 3, 24]} onLoad={() => setDoodleLoaded(true)} />
          <Subheading className="mt-4">You&apos;re all set</Subheading>

          <Text className="mt-1 text-center">
            Thanks for checking in. Insights from this check-in will be available once the next check-in begins.
          </Text>
        </EmptyState>
      ) : checkIn?.status === 2 ? (
        <EmptyState key="check-in" className={doodleLoaded ? "fade-in" : "opacity-0"}>
          <Doodle doodles={[2, 4, 8, 27]} onLoad={() => setDoodleLoaded(true)} />
          <Subheading className="mt-4">Time for your check-in</Subheading>

          <Text className="mt-1 text-center">
            Share how work is going at <Strong>{company?.name}</Strong> anonymously. It takes less than a minute.
          </Text>

          <Button onClick={() => setFeedbackDialog({ open: true, flagConcern: false })} color="indigo" className="mt-6">
            Complete check-in
            <ArrowRightCircleIcon />
          </Button>
        </EmptyState>
      ) : checkIn ? (
        <div className="fade-in">
          <Breadcrumb href={`/${company?.slug}/check-ins${searchParams.size ? `?${searchParams.toString()}` : ""}`}>
            Check-ins
          </Breadcrumb>

          <div className="lg:mt-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Heading>Check-in Insights</Heading>
              <Badge color="green">Closed</Badge>
            </div>

            <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row">
              <time className="flex items-center gap-3">
                <CalendarIcon className="size-4 text-zinc-400 dark:text-zinc-500" />

                <Text className="text-zinc-950! dark:text-white!">
                  {date?.setZone(company?.timezone).toFormat("dd LLL yyyy")}
                </Text>
              </time>

              <div className="flex gap-1.5">
                <div className="shrink-0">
                  <ShieldCheckIcon aria-hidden="true" className="size-5" />
                </div>

                <Text>
                  All responses are anonymous.{" "}
                  <TextLink href="https://articles.howswork.app/how-howswork-protects-your-privacy/" target="_blank">
                    Learn more
                  </TextLink>
                </Text>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {checkIn.stats?.map((stat) => (
              <Stat key={stat.title} data={stat} />
            ))}
          </div>

          <Issues data={checkIn.issues} />
        </div>
      ) : (
        error && (
          <EmptyState>
            <ExclamationCircleIcon className="size-16 text-zinc-400 sm:size-12 dark:text-zinc-500" />
            <Subheading className="mt-2 text-center">{error}</Subheading>
          </EmptyState>
        )
      )}
    </div>
  );
}
