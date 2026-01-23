"use client";

import { useRouter } from "next/navigation";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { useTrackingContext } from "@/hooks/useTrackingContext";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";

export default function Concern() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const { tracking } = useTrackingContext();

  return (
    <div className="mx-auto max-w-6xl">
      <Heading>Concern {tracking}</Heading>
      <Divider className="mt-6" />
    </div>
  );
}
