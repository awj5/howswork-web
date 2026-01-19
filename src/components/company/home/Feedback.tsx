"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Divider } from "@/components/ui/divider";
import Sentiment from "./feedback/Sentiment";
import Issues from "./feedback/Issues";
import Attributions from "./feedback/Attributions";
import Team from "./feedback/Team";

type FeedbackProps = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setShowRaiseConcern: Dispatch<SetStateAction<boolean>>;
};

export default function Feedback(props: FeedbackProps) {
  const router = useRouter();
  const { company } = useCompanyContext();
  const [sentiment, setSentiment] = useState(0);
  const [issues, setIssues] = useState<number[]>([]);
  const [attributions, setAttributions] = useState<number[]>([]);
  const [team, setTeam] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const addFeedback = async (
    companyID: number,
    pin: number,
    sentiment: number,
    issues: number[],
    attributions: number[],
    team: number
  ) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ companyID, pin, sentiment, issues, attributions, team }),
      });

      const json = await response.json();
      json.status = response.status;
      return json;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
  };

  const submit = async () => {
    if (!company) return;
    setDisabled(true);
    const pin = sessionStorage.getItem(`company_access_${company.slug}`);
    const result = await addFeedback(company.id, Number(pin), sentiment, issues, attributions, team);
    setDisabled(false);

    if (result.error && result.status === 401) {
      // Pin invalid
      sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
      router.push(`/${company.slug}/error`); // Redirect
    } else if (result.error) {
      toast.error(result.error);
      return;
    }

    // Success
    toast.success("Check-in complete");
    localStorage.setItem(`check-in_completed_${result.data}`, "true");
    if ([8, 9, 11, 12, 13, 14, 15].some((id) => issues.includes(id))) props.setShowRaiseConcern(true); // Serious issues will show raise a concern button
    props.setDialogOpen(false); // Close
  };

  useEffect(() => {
    if (!props.dialogOpen) return;

    // Reset on open
    setSentiment(0);
    setIssues([]);
    setAttributions([]);
    setTeam(0);
  }, [props.dialogOpen]);

  return (
    <Dialog open={props.dialogOpen} onClose={props.setDialogOpen} size="xl">
      <DialogTitle>Check in</DialogTitle>

      <DialogDescription className="text-wrap!">
        Takes less than a minute. Your responses are completely anonymous and help highlight issues that need attention.
      </DialogDescription>

      <DialogBody>
        <Divider className="mb-8" />
        <Sentiment val={sentiment} setVal={setSentiment} disabled={disabled} />
        <Divider className="my-8" soft />

        <Issues
          val={issues}
          setVal={setIssues}
          sentiment={sentiment}
          setAttributions={setAttributions}
          disabled={disabled}
        />

        <Attributions val={attributions} setVal={setAttributions} issues={issues} disabled={disabled} />
        <Team val={team} setVal={setTeam} sentiment={sentiment} disabled={disabled} />
        <Divider className="mt-8" soft />
      </DialogBody>

      <DialogActions>
        <Button plain onClick={() => props.setDialogOpen(false)}>
          Cancel
        </Button>

        <Button onClick={submit} color="indigo" disabled={!sentiment || disabled}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
