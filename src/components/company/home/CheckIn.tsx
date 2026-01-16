"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Divider } from "@/components/ui/divider";
import Sentiment from "./check-in/Sentiment";
import Categories from "./check-in/Categories";
import Attribution from "./check-in/Attribution";

type CheckInProps = {
  id: number;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CheckIn(props: CheckInProps) {
  const [sentiment, setSentiment] = useState(0);
  const [categories, setCategories] = useState<number[]>([]);
  const [attribution, setAttribution] = useState<number[]>([]);

  const submit = () => {
    props.setDialogOpen(false);

    // Reset
    setSentiment(0);
    setCategories([]);
    setAttribution([]);
  };

  return (
    <Dialog open={props.dialogOpen} onClose={props.setDialogOpen}>
      <DialogTitle>Check in</DialogTitle>

      <DialogDescription className="text-wrap!">
        Your responses are completely anonymous and help highlight issues that need attention.
      </DialogDescription>

      <DialogBody>
        <Sentiment val={sentiment} setVal={setSentiment} />
        <Divider className="my-8" soft />
        <Categories val={categories} setVal={setCategories} sentiment={sentiment} setAttribution={setAttribution} />
        <Divider className="my-8" soft />
        <Attribution val={attribution} setVal={setAttribution} categories={categories} />
      </DialogBody>

      <DialogActions>
        <Button plain onClick={() => props.setDialogOpen(false)}>
          Cancel
        </Button>

        <Button onClick={submit} color="indigo" disabled={!sentiment}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
