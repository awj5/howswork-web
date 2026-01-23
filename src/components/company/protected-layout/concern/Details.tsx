"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { SparklesIcon, ArrowTurnUpLeftIcon } from "@heroicons/react/16/solid";
import { anonymizeDetails } from "@/app/[slug]/(protected)/actions";
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
  const [disabled, setDisabled] = useState(false);
  const [backupVal, setBackupVal] = useState("");

  const undoClick = () => {
    props.setVal(backupVal);
    setBackupVal("");
  };

  const anonymizeClick = async () => {
    setDisabled(true);
    const loadingToast = toast.loading("Thinking...");
    const result = await anonymizeDetails(props.val, navigator.language);
    setDisabled(false);
    toast.dismiss(loadingToast);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    setBackupVal(props.val);
    props.setVal(result);
  };

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
        disabled={disabled || props.disabled}
        maxLength={800}
      />

      {!backupVal ? (
        <div className="mt-4 flex items-center gap-3">
          <Button onClick={anonymizeClick} outline disabled={!props.val.trim()}>
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
      ) : (
        <div className="mt-4 flex justify-end">
          <Button onClick={undoClick} outline>
            <ArrowTurnUpLeftIcon />
            Undo
          </Button>
        </div>
      )}
    </Field>
  );
}
