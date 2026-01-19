"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { useConcernDialogContext } from "@/hooks/useConcernDialogContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export default function Concern() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const { concernDialog, setConcernDialog } = useConcernDialogContext();
  const [disabled, setDisabled] = useState(false);

  const submit = () => {};

  return (
    <Dialog open={concernDialog} onClose={setConcernDialog} size="xl">
      <DialogTitle>Raise concern</DialogTitle>

      <DialogDescription className="text-wrap!"></DialogDescription>

      <DialogBody></DialogBody>

      <DialogActions>
        <Button plain onClick={() => setConcernDialog(false)}>
          Cancel
        </Button>

        <Button onClick={submit} color="indigo" disabled={disabled}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
