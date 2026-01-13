"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CheckInType } from "@/types";
import { useCurrentCheckIn } from "@/hooks/useCurrentCheckIn";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Subheading } from "@/components/ui/heading";
import EmptyState from "@/components/EmptyState";
import { Text } from "@/components/ui/text";
import Results from "@/components/company/protected-layout/check-ins/check-in/Results";
import Form from "@/components/company/protected-layout/check-ins/check-in/Form";
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
        <Form id={Number(params.id)} />
      ) : checkIn ? (
        <Results id={checkIn.id} />
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
