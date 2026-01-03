"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { isValidEmail, isValidPhone } from "@/utils/helpers";
import { AuthLayout } from "@/components/ui/auth-layout";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Fieldset, Label } from "@/components/ui/fieldset";
import { Heading } from "@/components/ui/heading";
import { Strong, Text, TextLink } from "@/components/ui/text";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { resendPin } from "./actions";

export default function Resend() {
  const { company } = useCompanyContext();
  const [disabled, setDisabled] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactError(false);
    const formData = new FormData(e.currentTarget);

    // Validate
    const contact = formData.get("contact") as string;

    if (!isValidEmail(contact) && !isValidPhone(contact)) {
      setContactError(true);
      return;
    }

    // Send
    setDisabled(true);
    formData.set("companyID", String(company?.id)); // Include company ID
    const result = await resendPin(formData);

    if (result.error) {
      toast.error(result.error);
      setDisabled(false);
      return;
    }

    // Success
    setSubmitted(true);
  };

  return (
    <AuthLayout>
      <form onSubmit={submitForm} className="grid w-full max-w-[311px] grid-cols-1 gap-8 sm:max-w-sm">
        <Logo className="h-6" />
        <Heading>{submitted ? "PIN sent" : "Resend the access PIN"}</Heading>

        {submitted ? (
          <>
            <Text>
              <Strong>If the details you entered are recognised, the access PIN will be sent by email or SMS.</Strong>
            </Text>

            <Text>
              PIN not received? Check your spam or junk folder, or contact <Strong>{company?.name}</Strong> for access
              support.
            </Text>

            <Text>
              <TextLink href={`/${company?.slug}`}>
                <Strong>Enter the access PIN</Strong>
              </TextLink>
            </Text>
          </>
        ) : (
          <Text>Enter a work email or mobile number to receive the access PIN. Check-ins remain anonymous.</Text>
        )}

        {!submitted && (
          <Fieldset className="flex flex-col gap-8" disabled={disabled}>
            <Field>
              <Label>Work email or mobile number</Label>
              <Input type="text" name="contact" invalid={contactError} />
              {contactError && <ErrorMessage>Enter a valid work email or mobile number.</ErrorMessage>}
            </Field>

            <Button type="submit" className="w-full" color="indigo">
              Resend PIN
            </Button>

            <Text>
              Already have the PIN?{" "}
              <TextLink href={`/${company?.slug}`}>
                <Strong>Enter it here</Strong>
              </TextLink>
            </Text>
          </Fieldset>
        )}
      </form>
    </AuthLayout>
  );
}
