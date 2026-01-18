"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CheckInType } from "@/types";
import { getCurrentCheckIn } from "@/utils/helpers";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Subheading } from "@/components/ui/heading";
import EmptyState from "@/components/EmptyState";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { getCheckIn } from "./actions";

export default function CheckIn() {
  const params = useParams<{ id: string }>();
  const { company } = useCompanyContext();
  const [checkIn, setCheckIn] = useState<CheckInType>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!company) return;

    const getCheckInData = async () => {
      const currentCheckIn = await getCurrentCheckIn(company); // Validate access
      if (!currentCheckIn) return; // Pin invalid (will redirect)
      const result = await getCheckIn(Number(params.id), company.id);

      if (result.error) {
        console.error(result.error);
        setError(true);
        return;
      }

      setCheckIn(result.data);
    };

    getCheckInData();
  }, [company]);

  return (
    <div className="mx-auto max-w-6xl">
      {checkIn ? (
        <>
          <Heading>Check-in {checkIn.id}</Heading>
          <Divider className="mt-6" />
        </>
      ) : (
        error && (
          <EmptyState>
            <ExclamationCircleIcon className="size-16 text-gray-400 sm:size-12 dark:text-gray-500" />
            <Subheading className="mt-2 text-center">Not found</Subheading>
            <Text className="mt-1 text-center">We couldn't find this check-in, or you don't have access to it.</Text>
          </EmptyState>
        )
      )}
    </div>
  );
}
