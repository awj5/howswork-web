"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckInType } from "@/types";
import { useCurrentCheckIn } from "@/hooks/useCurrentCheckIn";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

export default function CheckIn() {
  const params = useParams<{ id: string }>();
  const currentCheckIn = useCurrentCheckIn();
  const { company } = useCompanyContext();
  const [checkIn, setCheckin] = useState<CheckInType>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!currentCheckIn || !company) return;

    const getCheckIn = async () => {
      //
    };

    // Check if current check-in
    if (currentCheckIn.id === Number(params.id)) {
      try {
        // Check if already completed by user
        const completed = localStorage.getItem(`check-in_completed_${currentCheckIn.id}`);
        setIsOpen(!completed);
      } catch (error) {
        console.error(error);
        alert("An unexpected error has occurred.");
      }
    }

    getCheckIn();
  }, [currentCheckIn, company]);

  return (
    <div className="mx-auto max-w-6xl">
      {isOpen ? (
        <>
          <Heading>How's work?</Heading>
          <Divider className="mt-6" />
        </>
      ) : (
        checkIn && (
          <>
            <Heading>Check-in {checkIn?.id}</Heading>
            <Divider className="mt-6" />
          </>
        )
      )}
    </div>
  );
}
