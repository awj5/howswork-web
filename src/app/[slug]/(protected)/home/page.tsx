"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChartPieIcon, ArrowRightCircleIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import EmptyState from "@/components/EmptyState";
import { Subheading } from "@/components/ui/heading";
import { Strong, Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();
  const { company } = useCompanyContext();
  const [checkInID, setCheckinID] = useState(0);
  const [checkInOpen, setCheckInOpen] = useState(false);

  useEffect(() => {
    const getCheckIn = async () => {
      const pin = sessionStorage.getItem(`company_access_${company?.slug}`);

      // Get current open check-in that matches pin
      const { data: checkInData, error: checkInError } = await supabase
        .from("check_ins")
        .select("id")
        .eq("company_id", company?.id)
        .eq("pin", pin)
        .eq("status", "Open")
        .single();

      if (checkInError) {
        console.error(checkInError);
        sessionStorage.removeItem(`company_access_${company?.slug}`); // Remove stored pin
        router.push(`/${company?.slug}/error`); // Redirect
        return;
      }

      setCheckinID(checkInData.id);

      // Check if user has already completed the check-in
      const completed = localStorage.getItem(`check-in_completed_${checkInData.id}`);
      setCheckInOpen(!completed);
    };

    getCheckIn();
  }, []);

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
            onClick={() => router.push(`/${company?.slug}/check-ins/${checkInID}`)}
            color="indigo"
            className="mt-6"
          >
            Complete check-in
            <ArrowRightCircleIcon />
          </Button>
        </EmptyState>
      ) : checkInID ? (
        <EmptyState>
          <Subheading className="mt-2">You're all set</Subheading>

          <Text className="mt-1 text-center">
            Thanks for checking in. You'll be notified when the next check-in is requested.
          </Text>

          <Button onClick={() => router.push(`/${company?.slug}/check-ins/${checkInID}`)} outline className="mt-6">
            <ChartPieIcon />
            See the results
          </Button>
        </EmptyState>
      ) : null}
    </div>
  );
}
