"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Sentiment from "./check-in/Sentiment";
import Categories from "./check-in/Categories";

type CheckInProps = {
  id: number;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CheckIn(props: CheckInProps) {
  const [sentiment, setSentiment] = useState(0);
  const [categories, setCategories] = useState<boolean[]>([]);

  return (
    <Dialog open={props.dialogOpen} onClose={props.setDialogOpen}>
      <div className="flex justify-between">
        <DialogTitle>Check in</DialogTitle>
        <Badge color="indigo">Takes 1-2 minutes</Badge>
      </div>

      <DialogDescription className="text-wrap!">
        Your responses are completely anonymous and help highlight issues that need attention.
      </DialogDescription>

      <DialogBody className="flex flex-col gap-8">
        <Sentiment val={sentiment} setVal={setSentiment} />
        <Categories val={categories} setVal={setCategories} />
      </DialogBody>

      <DialogActions>
        <Button plain onClick={() => props.setDialogOpen(false)}>
          Cancel
        </Button>

        <Button onClick={() => props.setDialogOpen(false)} color="indigo" disabled>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
