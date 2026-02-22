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

  const submitForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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
        <Heading>{submitted ? "PIN requested" : "Resend the access PIN"}</Heading>

        {submitted ? (
          <>
            <Text>
              <Strong>If your details are recognised, the PIN will be sent by email or SMS.</Strong>
            </Text>

            <Text>
              PIN not received? Check your spam folder. Still no luck? Ask your manager or HR about accessing{" "}
              <Strong>HowsWork</Strong>.
            </Text>

            <Text>
              <TextLink href={`/${company?.slug}`}>
                <Strong>Enter the access PIN</Strong>
              </TextLink>
            </Text>
          </>
        ) : (
          <Text>
            Enter your work email or mobile number. <Strong>We only use this to send the PIN</Strong>.
          </Text>
        )}

        {!submitted && (
          <Fieldset className="flex flex-col gap-8" disabled={disabled}>
            <Field>
              <Label>Email or mobile number</Label>
              <Input type="text" name="contact" invalid={contactError} />
              {contactError && <ErrorMessage>Enter a valid email address or mobile number.</ErrorMessage>}
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
