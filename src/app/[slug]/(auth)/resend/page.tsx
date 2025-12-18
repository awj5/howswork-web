"use client";

import { useState } from "react";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { AuthLayout } from "@/components/ui/auth-layout";
import { Button } from "@/components/ui/button";
import { Field, Fieldset, Label } from "@/components/ui/fieldset";
import { Heading } from "@/components/ui/heading";
import { Strong, Text } from "@/components/ui/text";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";

export default function Resend() {
  const { company } = useCompanyContext();
  const [disabled, setDisabled] = useState(false);
  const [contactError, setContactError] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <AuthLayout>
      <form onSubmit={submitForm} className="grid w-full max-w-[311px] grid-cols-1 gap-8 sm:max-w-sm">
        <Logo className="h-6" />
        <Heading>Resend the access PIN</Heading>
        <Text>Enter your work email or mobile number and we&apos;ll resend the PIN if it&apos;s on file.</Text>

        <Fieldset className="flex flex-col gap-8" disabled={disabled}>
          <Field>
            <Label>Work email or mobile number</Label>
            <Input type="text" name="contact" />
          </Field>

          <Button type="submit" className="w-full" color="indigo">
            Resend PIN
          </Button>

          <Text>
            Still can&apos;t access the PIN? Contact <Strong>{company?.name}</Strong>.
          </Text>
        </Fieldset>
      </form>
    </AuthLayout>
  );
}
