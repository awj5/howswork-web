"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { useDialogContext } from "@/hooks/useDialogContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Divider } from "@/components/ui/divider";
import { TextLink } from "@/components/ui/text";
import Issues from "./concern/Issues";
import Details from "./concern/Details";

export default function Concern() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const { concernDialog, setConcernDialog } = useDialogContext();
  const [issues, setIssues] = useState<number[]>([]);
  const [details, setDetails] = useState("");
  const [disabled, setDisabled] = useState(false);

  const submit = () => {};

  useEffect(() => {
    if (!concernDialog) return;

    // Reset on open
    setDetails("");
    setIssues([]);
  }, [concernDialog]);

  return (
    <Dialog open={concernDialog} onClose={setConcernDialog} size="2xl">
      <DialogTitle>Raise a concern</DialogTitle>

      <DialogDescription className="text-wrap!">
        Your concern is anonymous. We cannot identify who submitted this.{" "}
        <TextLink href="https://articles.howswork.app/how-howswork-protects-your-privacy/" target="_blank">
          Learn more about how anonymity works
        </TextLink>
      </DialogDescription>

      <DialogBody>
        <Divider className="mb-8" />
        <Details val={details} setVal={setDetails} disabled={disabled} />
        <Divider className="my-8" soft />
        <Issues val={issues} setVal={setIssues} disabled={disabled} />
        <Divider className="mt-8" soft />
      </DialogBody>

      <DialogActions>
        <Button plain onClick={() => setConcernDialog(false)}>
          Cancel
        </Button>

        <Button onClick={submit} color="indigo" disabled={details.trim() === "" || disabled}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
