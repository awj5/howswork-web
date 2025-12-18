"use client";

import { useState } from "react";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { AuthLayout } from "@/components/ui/auth-layout";
import { Button } from "@/components/ui/button";
import { Field, Fieldset, Label } from "@/components/ui/fieldset";
import { Heading } from "@/components/ui/heading";
import { Strong, Text, TextLink } from "@/components/ui/text";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";

export default function Resend() {
  const { company } = useCompanyContext();
  const [disabled, setDisabled] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    //
  };

  return (
    <AuthLayout>
      <form onSubmit={submitForm} className="grid w-full max-w-xs grid-cols-1 gap-8">
        <Logo className="h-6" />
        <Heading>Resend the access PIN</Heading>
        <Text>Enter your work email or mobile number and we&apos;ll resend the PIN if it&apos;s on file.</Text>

        <Fieldset className="flex flex-col gap-8" disabled={disabled}>
          <Field>
            <Label>Work email or mobile number</Label>
            <Input type="email" name="email" />
          </Field>

          <Button type="submit" className="w-full" color="indigo">
            Resend PIN
          </Button>

          <Text>Still can&apos;t access the PIN? Contact {company?.name}.</Text>
        </Fieldset>
      </form>
    </AuthLayout>
  );
}
