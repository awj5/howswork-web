"use client";

import { ClipboardIcon } from "@heroicons/react/16/solid";
import { useAlertContext } from "@/hooks/useAlertContext";
import { Alert, AlertActions, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/text";

export default function ConcernAlert() {
  const { concernAlert, setConcernAlert } = useAlertContext();

  const copyClick = () => {
    const text = `Tracking: HW-${concernAlert?.tracking}\nAccess code: ${concernAlert?.code}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <Alert open={concernAlert?.open ?? false} onClose={() => null}>
      <AlertTitle>Keep these details safe</AlertTitle>

      <AlertDescription>
        Tracking: <Code>HW-{concernAlert?.tracking}</Code>
      </AlertDescription>

      <AlertDescription>
        Access code: <Code>{concernAlert?.code}</Code>
      </AlertDescription>

      <AlertDescription>
        Copy these now. You'll need them to check back for updates. These can't be recovered if lost.
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
