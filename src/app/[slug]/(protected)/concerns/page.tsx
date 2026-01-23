"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Subheading } from "@/components/ui/heading";
import EmptyState from "@/components/EmptyState";
import { Input, InputGroup } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function Concerns() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const [tracking, setTracking] = useState("");
  const [disabled, setDisabled] = useState(false);

  const getConcernData = async (companyID: number, pin: number, tracking: string) => {
    try {
      const response = await fetch("/api/concerns/search", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ companyID, pin, tracking }),
      });

      const json = await response.json();
      json.status = response.status;
      return json;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
  };

  const search = async () => {
    if (!company || !tracking.trim()) return;
    setDisabled(true);
    const pin = sessionStorage.getItem(`company_access_${company.slug}`);
    const result = await getConcernData(company.id, Number(pin), tracking.trim());

    if (result.error && result.status === 401) {
      // Pin invalid
      sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
      router.push(`/${company.slug}/error`); // Redirect
      return;
    } else if (result.error) {
      toast.error(result.error);
      setDisabled(false);
      return;
    }

    // Success
    // Update context
    router.push(`/${company.slug}/concerns/view`); // Redirect
  };

  return (
    <div className="mx-auto max-w-6xl">
      <EmptyState>
        <Subheading>Look up your concern</Subheading>
        <Text className="mt-1 text-center">Enter your tracking number to view updates.</Text>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <InputGroup>
            <MagnifyingGlassIcon />

            <Input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") search();
              }}
              placeholder="HW-XXXXXXXX"
              aria-label="Search"
              disabled={disabled}
            />
          </InputGroup>

          <Button color="indigo" onClick={search} disabled={disabled || !tracking.trim()}>
            Search
          </Button>
        </div>
      </EmptyState>
    </div>
  );
}
