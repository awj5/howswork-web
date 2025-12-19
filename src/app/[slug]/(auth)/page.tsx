"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import VerificationInput from "react-verification-input";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { AuthLayout } from "@/components/ui/auth-layout";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Fieldset, Label } from "@/components/ui/fieldset";
import { Heading } from "@/components/ui/heading";
import { Strong, Text, TextLink } from "@/components/ui/text";
import { Logo } from "@/components/Logo";

export default function Login() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const [disabled, setDisabled] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const verifyPin = async (companyID: number, pin: number) => {
    const res = await fetch("/.netlify/functions/pin-login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ companyID, pin }),
    });

    const json = await res.json().catch(() => ({}));

    // Normalise errors coming back from the function
    if (!res.ok) {
      return { error: json?.error || "That PIN doesn’t look right. Please try again." };
    }

    return json as { success?: boolean; error?: string };
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPinError(false);

    // Validate
    if (pin.length !== 6 || !/^\d+$/.test(pin)) {
      setPinError(true);
      return;
    }

    // Verify
    if (!company) return;
    setDisabled(true);

    let result: any;
    try {
      result = await verifyPin(company.id, Number(pin));
    } catch {
      setDisabled(false);
      toast.error("Couldn’t verify the PIN. Please try again.");
      return;
    }

    setDisabled(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    // Success
    sessionStorage.setItem(`company_access_${company.slug}`, pin); // Store pin for this session
    router.push(`/${company.slug}/check-in`); // Redirect
  };

  return (
    <AuthLayout>
      <form onSubmit={submitForm} className="grid w-full max-w-[311px] grid-cols-1 gap-8 sm:max-w-sm">
        <Logo className="h-6" />
        <Heading>Enter your access PIN</Heading>

        <Text>
          Check in or raise a concern with <Strong>{company?.name}</Strong>.
        </Text>

        <Fieldset className="flex flex-col gap-8" disabled={disabled}>
          <Field>
            <Label>Access PIN</Label>

            <div data-slot="control">
              <VerificationInput
                value={pin}
                onChange={(e) => setPin(e)}
                validChars="0-9"
                placeholder=""
                classNames={{
                  container: "container",
                  character: "character",
                  characterInactive: "character--inactive",
                  characterSelected: "character--selected",
                  characterFilled: "character--filled",
                }}
              />
            </div>

            {pinError && <ErrorMessage>Enter the 6-digit PIN.</ErrorMessage>}
          </Field>

          <Button type="submit" className="w-full" color="indigo">
            Continue
          </Button>

          <Text>
            <TextLink href={`/${company?.slug}/resend`}>
              <Strong>Didn&apos;t receive the PIN?</Strong>
            </TextLink>
          </Text>
        </Fieldset>
      </form>
    </AuthLayout>
  );
}
