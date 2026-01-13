"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CheckInType } from "@/types";
import { useCurrentCheckIn } from "@/hooks/useCurrentCheckIn";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Heading, Subheading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import EmptyState from "@/components/EmptyState";
import { Text } from "@/components/ui/text";
import { getCheckIn } from "./actions";

export default function CheckIn() {
  const params = useParams<{ id: string }>();
  const currentCheckIn = useCurrentCheckIn();
  const { company } = useCompanyContext();
  const [checkIn, setCheckIn] = useState<CheckInType>();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!currentCheckIn || !company) return;

    const getCheckInData = async () => {
      const result = await getCheckIn(Number(params.id), company.id);

      if (result.error) {
        console.error(result.error);
        setError(true);
        return;
      }

      setCheckIn(result.data);
    };

    // Check if current check-in
    if (currentCheckIn.id === Number(params.id)) {
      try {
        // Check if already completed by user
        const completed = localStorage.getItem(`check-in_completed_${currentCheckIn.id}`);
        setIsOpen(!completed);
        setCheckIn(currentCheckIn);
        return;
      } catch (error) {
        console.error(error);
        alert("An unexpected error has occurred.");
      }
    }

    getCheckInData();
  }, [currentCheckIn, company]);

  return (
    <div className="mx-auto max-w-6xl">
      {isOpen ? (
        <>
          <Heading>How's work?</Heading>
          <Divider className="mt-6" />
        </>
      ) : checkIn ? (
        <>
          <Heading>Check-in {checkIn.id}</Heading>
          <Divider className="mt-6" />
        </>
      ) : (
        error && (
          <EmptyState>
            <ExclamationCircleIcon className="size-16 text-gray-400 sm:size-12 dark:text-gray-500" />
            <Subheading className="mt-2 text-center">Not found</Subheading>
            <Text className="mt-1 text-center">This check-in doesn't exist or isn't available to you.</Text>
          </EmptyState>
        )
      )}
    </div>
  );
}
