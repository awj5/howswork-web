"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import IssuesData from "@/data/issues.json";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { useDialogContext } from "@/hooks/useDialogContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Divider } from "@/components/ui/divider";
import Sentiment from "./feedback-dialog/Sentiment";
import Issues from "./feedback-dialog/Issues";
import Attributions from "./feedback-dialog/Attributions";
import Team from "./feedback-dialog/Team";

export default function FeedbackDialog() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const { feedbackDialog, setFeedbackDialog } = useDialogContext();
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

    if (result.error && result.status === 401) {
      // Pin invalid
      sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
      router.push(`/${company.slug}/error`); // Redirect
      return;
    } else if (result.error) {
      toast.error(result.error);
      setDisabled(false);
      return;
    }

    // Success
    toast.success("Survey complete");
    localStorage.setItem(`check-in_completed_${result.data}`, "true");
    const seriousIDs = IssuesData.filter((i) => i.serious).map((i) => i.id);
    const flag = seriousIDs.some((id) => issues.includes(id)); // Serious issues will show raise a concern button
    setFeedbackDialog({ open: false, flagConcern: flag }); // Close
  };

  useEffect(() => {
    if (!feedbackDialog?.open) return;

    // Reset on open
    setDisabled(false);
    setSentiment(0);
    setIssues([]);
    setAttributions([]);
    setTeam(0);
  }, [feedbackDialog]);

  return (
    <Dialog open={feedbackDialog?.open ?? false} onClose={() => setFeedbackDialog(null)} size="xl">
      <DialogTitle>{company?.name} survey</DialogTitle>

      <DialogDescription className="text-wrap!">
        Only takes a few minutes. Your responses are completely anonymous and help highlight issues that need attention.
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
        <Button plain onClick={() => setFeedbackDialog(null)}>
          Cancel
        </Button>

        <Button onClick={submit} color="indigo" disabled={!sentiment || disabled}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
