"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { SparklesIcon, ArrowTurnUpLeftIcon } from "@heroicons/react/16/solid";
import { anonymizeDetails } from "@/utils/ai";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text";

type AnonymizeWritingProps = {
  val: string;
  setVal: Dispatch<SetStateAction<string>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

export default function AnonymizeWriting(props: AnonymizeWritingProps) {
  const [buttonText, setButtonText] = useState("");
  const [backupVal, setBackupVal] = useState("");

  const undoClick = () => {
    props.setVal(backupVal);
    setBackupVal("");
  };

  const anonymizeClick = async () => {
    props.setDisabled(true);
    const loadingToast = toast.loading("Thinking...");
    const result = await anonymizeDetails(props.val, navigator.language);
    props.setDisabled(false);
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
    <>
      {!backupVal ? (
        <div className="mt-4 flex items-center gap-3">
          <Button
            onClick={anonymizeClick}
            disabled={!props.val.trim() || props.disabled}
            className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent! hover:from-indigo-400 hover:to-fuchsia-400 hover:[&>svg]:fill-indigo-400"
            outline
          >
            <SparklesIcon className="fill-indigo-500" />
            {buttonText}
          </Button>

          <TextLink
            href="https://articles.howswork.app/can-your-writing-style-identify-you/"
            target="_blank"
            className={`text-sm sm:text-xs ${props.disabled && "pointer-events-none opacity-50"}`}
            tabIndex={props.disabled ? -1 : undefined}
          >
            What&apos;s this?
          </TextLink>
        </div>
      ) : (
        <div className="mt-4 flex justify-end">
          <Button onClick={undoClick}>
            <ArrowTurnUpLeftIcon />
            Undo
          </Button>
        </div>
      )}
    </>
  );
}
