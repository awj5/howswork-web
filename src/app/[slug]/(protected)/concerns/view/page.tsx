"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/16/solid";
import IssuesData from "@/data/issues.json";
import StatusData from "@/data/status.json";
import type { ConcernType } from "@/types";
import { concernStatusColor } from "@/utils/helpers";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Heading, Subheading } from "@/components/ui/heading";
import EmptyState from "@/components/EmptyState";
import Breadcrumb from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { Button } from "@/components/ui/button";
import Activity from "@/components/company/concerns/view/Activity";
import Comment from "@/components/company/concerns/view/Comment";

export default function Concern() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const [concern, setConcern] = useState<ConcernType>();
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const date = concern ? DateTime.fromISO(concern.created_at) : undefined; // Convert to date object
  const status = concern?.activity.find((i) => i.status)?.status ?? 0; // Latest status or default to "Awaiting review"

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
    if (!company || dialogOpen) return;

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
    };

    getConcern();
  }, [company, dialogOpen]);

  return (
    <div className="mx-auto max-w-6xl">
      {concern ? (
        <div className="fade-in">
          <Breadcrumb href={`/${company?.slug}/concerns`}>Concerns</Breadcrumb>

          <div className="lg:mt-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Heading>Concern HW-{concern.tracking}</Heading>
              <Badge color={concernStatusColor(status)}>{StatusData.find((i) => i.id === status)?.title}</Badge>
            </div>

            <div className="mt-4 flex flex-col justify-between gap-4 sm:mt-2.5 sm:flex-row">
              <time className="flex items-center gap-3">
                <CalendarIcon className="size-4 text-zinc-400 dark:text-zinc-500" />
                <Text className="text-zinc-950! dark:text-white!">{date?.toLocal().toFormat("dd LLL yyyy")}</Text>
              </time>

              <Button onClick={() => setDialogOpen(true)} className="w-fit">
                Leave a comment
              </Button>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-8 sm:flex-row">
            <div className="top-8 flex w-full flex-col gap-8 self-start sm:sticky">
              <div>
                <Subheading>Details</Subheading>
                <Divider className="mt-4" />
                <Text className="mt-3 whitespace-pre-line">{concern.details}</Text>
              </div>

              {concern.issues && (
                <div>
                  <Subheading>Issues</Subheading>
                  <Divider className="mt-4" />

                  <div className="mt-5 flex flex-wrap gap-4 sm:gap-3">
                    {concern.issues.map((issue) => (
                      <Badge key={issue} color="indigo">
                        {IssuesData.find((i) => i.id === issue)?.tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full">
              <Subheading>Activity</Subheading>
              <Divider className="mt-4" />
              <Activity date={concern.created_at} data={concern.activity} />
            </div>
          </div>

          <Comment dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
        </div>
      ) : (
        error && (
          <EmptyState>
            <ExclamationCircleIcon className="size-16 text-zinc-400 sm:size-12 dark:text-zinc-500" />
            <Subheading className="mt-2 text-center">{error || "Concern not found"}</Subheading>
          </EmptyState>
        )
      )}
    </div>
  );
}
