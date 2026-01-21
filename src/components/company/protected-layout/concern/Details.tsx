"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SparklesIcon } from "@heroicons/react/16/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { Field, Label } from "@/components/ui/fieldset";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text";

type DetailsProps = {
  val: string;
  setVal: Dispatch<SetStateAction<string>>;
  disabled: boolean;
};

export default function Details(props: DetailsProps) {
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    setButtonText(navigator.language === "en-US" ? "Anonymize writing" : "Anonymise writing");
  }, []);

  return (
    <Field disabled={props.disabled}>
      <Label>Details</Label>

      <Textarea
        rows={5}
        value={props.val}
        onChange={(e) => props.setVal(e.target.value)}
        placeholder={"Describe what's happening&hellip;"}
      />

      <div className="mt-4 flex items-center gap-3">
        <Button onClick={() => null} outline>
          <SparklesIcon />
          {buttonText}
        </Button>

        <TextLink
          href="https://articles.howswork.app/can-your-writing-style-identify-you/"
          target="_blank"
          className={`text-sm sm:text-xs ${props.disabled && "pointer-events-none opacity-50"}`}
          tabIndex={props.disabled ? -1 : undefined}
        >
          What's this?
        </TextLink>
      </div>
    </Field>
  );
}
