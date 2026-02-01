"use client";

import { useRouter } from "next/navigation";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Subheading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Doodle from "@/components/Doodle";

export default function Error() {
  const router = useRouter();
  const { company } = useCompanyContext();

  return (
    <main className="flex min-h-dvh flex-col p-2">
      <div className="flex grow flex-col items-center justify-center p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
        <div className="flex max-w-sm flex-col items-center sm:max-w-md">
          <Doodle doodles={7} />
          <Subheading className="mt-4 text-center">We couldn't verify the PIN</Subheading>
          <Text className="mt-1 text-center">The PIN may have expired or there was a temporary issue.</Text>

          <Button onClick={() => router.push(`/${company?.slug}`)} className="mt-6" outline>
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}
