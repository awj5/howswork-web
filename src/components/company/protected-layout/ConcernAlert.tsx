"use client";

import { toast } from "sonner";
import { ClipboardIcon } from "@heroicons/react/16/solid";
import { useAlertContext } from "@/hooks/useAlertContext";
import { Alert, AlertActions, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/text";

export default function ConcernAlert() {
  const { concernAlert, setConcernAlert } = useAlertContext();

  const copyClick = () => {
    const text = `HW-${concernAlert?.tracking}`;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Alert open={concernAlert?.open ?? false} onClose={() => null}>
      <AlertTitle>Save your tracking number</AlertTitle>

      <AlertDescription>
        Tracking: <Code>HW-{concernAlert?.tracking}</Code>
      </AlertDescription>

      <AlertDescription>
        You&apos;ll need this to check back for updates on your concern. We can&apos;t recover it if you lose it, so save it
        somewhere private and secure.
      </AlertDescription>

      <AlertActions>
        <Button plain onClick={() => setConcernAlert(null)}>
          Close
        </Button>

        <Button onClick={copyClick} color="indigo">
          <ClipboardIcon />
          Copy
        </Button>
      </AlertActions>
    </Alert>
  );
}
