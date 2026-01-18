"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChartPieIcon, ArrowRightCircleIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { getCurrentCheckIn } from "@/utils/helpers";
import EmptyState from "@/components/EmptyState";
import { Subheading } from "@/components/ui/heading";
import { Strong, Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import Banner from "@/components/company/home/Banner";
import Feedback from "@/components/company/home/Feedback";

export default function Home() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const [checkInOpen, setCheckInOpen] = useState<boolean>();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!company || dialogOpen) return;

    const getCheckIn = async () => {
      const currentCheckIn = await getCurrentCheckIn(company);
      if (!currentCheckIn) return; // Pin invalid (will redirect)

      // Check if current check-in already completed by user
      //localStorage.removeItem(`check-in_completed_${currentCheckIn.id}`);
      const completed = localStorage.getItem(`check-in_completed_${currentCheckIn.id}`);
      setCheckInOpen(completed === null);
    };

    getCheckIn();
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

          <Feedback dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
        </>
      ) : (
        checkInOpen !== undefined && (
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
        )
      )}

      <Banner />
    </div>
  );
}
