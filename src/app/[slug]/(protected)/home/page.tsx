"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChartPieIcon, ArrowRightCircleIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { useCurrentCheckIn } from "@/hooks/useCurrentCheckIn";
import EmptyState from "@/components/EmptyState";
import { Subheading } from "@/components/ui/heading";
import { Strong, Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const currentCheckInID = useCurrentCheckIn();
  const [checkInOpen, setCheckInOpen] = useState<boolean>();

  useEffect(() => {
    if (!currentCheckInID) return;

    try {
      // Check if open check-in already completed by user
      const completed = localStorage.getItem(`check-in_completed_${currentCheckInID}`);
      setCheckInOpen(!completed);
    } catch (error) {
      console.error(error);
      alert("An unexpected error has occurred.");
    }
  }, [currentCheckInID]);

  return (
    <div className="mx-auto max-w-6xl">
      {checkInOpen ? (
        <EmptyState>
          <CheckCircleIcon className="size-16 text-gray-400 sm:size-12 dark:text-gray-500" />
          <Subheading className="mt-2">You've got a check-in</Subheading>

          <Text className="mt-1 text-center">
            <Strong>{company?.name}</Strong> wants to know how things are going.
          </Text>

          <Button
            onClick={() => router.push(`/${company?.slug}/check-ins/${currentCheckInID}`)}
            color="indigo"
            className="mt-6"
          >
            Complete check-in
            <ArrowRightCircleIcon />
          </Button>
        </EmptyState>
      ) : (
        checkInOpen !== undefined && (
          <EmptyState>
            <Subheading className="mt-2">You're all set</Subheading>

            <Text className="mt-1 text-center">
              Thanks for checking in. You'll be notified when the next check-in is requested.
            </Text>

            <Button
              onClick={() => router.push(`/${company?.slug}/check-ins/${currentCheckInID}`)}
              outline
              className="mt-6"
            >
              <ChartPieIcon />
              See the results
            </Button>
          </EmptyState>
        )
      )}
    </div>
  );
}
