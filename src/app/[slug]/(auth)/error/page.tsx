"use client";

import { useRouter } from "next/navigation";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Subheading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function Error() {
  const router = useRouter();
  const { company } = useCompanyContext();

  return (
    <main className="flex min-h-dvh flex-col p-2">
      <div className="flex grow flex-col items-center justify-center p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
        <ExclamationCircleIcon className="size-16 text-gray-400 sm:size-12 dark:text-gray-500" />
        <Subheading className="mt-2 text-center">Pin not valid</Subheading>

        <Text className="mt-1 text-center">This pin has expired. Check your email or SMS for a new one.</Text>

        <Button onClick={() => router.push(`/${company?.slug}`)} className="mt-6" outline>
          Try again
        </Button>
      </div>
    </main>
  );
}
