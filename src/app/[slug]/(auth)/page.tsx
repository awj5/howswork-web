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
    // Use API instead of server action for rate limiting
    try {
      const response = await fetch("/api/pin-login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ companyID, pin }),
      });

      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      return { error: "Unable to verify PIN." };
    }
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
    const result = await verifyPin(company.id, Number(pin));
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
        <Heading>Enter the access PIN</Heading>

        <Text>
          Check in or raise a concern anonymously with <Strong>{company?.name.replace(/\.$/, "")}</Strong>.
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
              <Strong>Didn't receive the PIN or lost it?</Strong>
            </TextLink>
          </Text>
        </Fieldset>
      </form>
    </AuthLayout>
  );
}
