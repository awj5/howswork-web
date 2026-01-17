"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Divider } from "@/components/ui/divider";
import Sentiment from "./check-in/Sentiment";
import Categories from "./check-in/Categories";
import Attribution from "./check-in/Attribution";
import Team from "./check-in/Team";

type CheckInProps = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CheckIn(props: CheckInProps) {
  const [sentiment, setSentiment] = useState(0);
  const [categories, setCategories] = useState<number[]>([]);
  const [attribution, setAttribution] = useState<number[]>([]);
  const [team, setTeam] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const submit = () => {
    props.setDialogOpen(false);
  };

  useEffect(() => {
    if (!props.dialogOpen) return;

    // Reset
    setSentiment(0);
    setCategories([]);
    setAttribution([]);
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

        <Categories
          val={categories}
          setVal={setCategories}
          sentiment={sentiment}
          setAttribution={setAttribution}
          disabled={disabled}
        />

        <Attribution val={attribution} setVal={setAttribution} categories={categories} disabled={disabled} />
        <Divider className="my-8" soft />
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
