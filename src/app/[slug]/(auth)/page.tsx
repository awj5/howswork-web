"use client";

import { useState } from "react";
import VerificationInput from "react-verification-input";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { AuthLayout } from "@/components/ui/auth-layout";
import { Button } from "@/components/ui/button";
import { Field, Fieldset, Label } from "@/components/ui/fieldset";
import { Heading } from "@/components/ui/heading";
import { Strong, Text, TextLink } from "@/components/ui/text";
import { Logo } from "@/components/Logo";

export default function Login() {
  const { company } = useCompanyContext();
  const [disabled, setDisabled] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    //
  };

  return (
    <AuthLayout>
      <form onSubmit={submitForm} className="grid w-full max-w-xs grid-cols-1 gap-8">
        <Logo className="h-6" />

        <div className="flex flex-col gap-1">
          <Heading>Enter your access PIN</Heading>

          <Text>
            Check in or raise a concern with <Strong>{company?.name}</Strong>.
          </Text>
        </div>

        <Fieldset className="flex flex-col gap-8" disabled={disabled}>
          <Field>
            <Label>Access PIN</Label>

            <div data-slot="control">
              <VerificationInput
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
          </Field>

          <Button type="submit" className="w-full" color="indigo">
            Continue
          </Button>

          <Text>
            <TextLink href="#">
              <Strong>Didn't receive the PIN?</Strong>
            </TextLink>
          </Text>
        </Fieldset>
      </form>
    </AuthLayout>
  );
}
