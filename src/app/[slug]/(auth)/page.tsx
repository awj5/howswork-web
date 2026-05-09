"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import VerificationInput from "react-verification-input";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { AuthLayout } from "@/components/ui/auth-layout";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Fieldset } from "@/components/ui/fieldset";
import { Heading } from "@/components/ui/heading";
import { Strong, Text, TextLink } from "@/components/ui/text";
import { Logo } from "@/components/Logo";
import Banner from "@/components/company/login/Banner";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { company } = useCompanyContext();
  const [disabled, setDisabled] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const verifyPin = async (companyID: number, pin: number) => {
    try {
      const response = await fetch("/api/verify-pin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ companyID, pin }),
      });

      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
  };

  const submitForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!company) return;
    setPinError(false);

    // Validate
    if (pin.length !== 6 || !/^\d+$/.test(pin)) {
      setPinError(true);
      return;
    }

    // Verify
    setDisabled(true);
    const result = await verifyPin(company.id, Number(pin));

    if (result.error) {
      toast.error(result.error);
      setDisabled(false);
      return;
    }

    // Success
    sessionStorage.setItem(`company_access_${company.slug}`, pin); // Store pin for this session
    const returnTo = validateReturnTo(searchParams.get("return_to")); // Validate redirect
    router.push(returnTo ?? `/${company.slug}/home`); // Redirect
  };

  return (
    <>
      <Banner />

      <AuthLayout>
        <form onSubmit={submitForm} className="grid w-full max-w-[311px] grid-cols-1 gap-8 sm:max-w-sm">
          <Logo className="h-6" />
          <Heading>Enter the access PIN</Heading>

          <Text>
            Complete check-ins and raise concerns with <Strong>{company?.name}</Strong> with complete anonymity.{" "}
            <Strong>No login or account required</Strong>.
          </Text>

          <Fieldset className="flex flex-col gap-8" disabled={disabled}>
            <Field>
              <div data-slot="control">
                <VerificationInput
                  value={pin}
                  onChange={(e) => setPin(e)}
                  validChars="0-9"
                  placeholder=""
                  inputProps={{
                    autoComplete: "one-time-code",
                  }}
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
                <Strong>Didn&apos;t receive or lost the PIN?</Strong>
              </TextLink>
            </Text>
          </Fieldset>
        </form>
      </AuthLayout>
    </>
  );
}

function validateReturnTo(path: string | null) {
  if (!path) return null;
  if (path.startsWith("/") && !path.startsWith("//")) return path; // Only allow paths starting with / but not //
  return null;
}
