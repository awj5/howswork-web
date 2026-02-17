import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Field } from "@/components/ui/fieldset";
import { Textarea } from "@/components/ui/textarea";
import AnonymizeWriting from "@/components/AnonymizeWriting";

type CommentProps = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  getConcern: () => Promise<void>;
};

export default function Comment(props: CommentProps) {
  const router = useRouter();
  const { company } = useCompanyContext();
  const [val, setVal] = useState("");
  const [disabled, setDisabled] = useState(false);

  const addComment = async (companyID: number, pin: number, tracking: string, comment: string) => {
    try {
      const response = await fetch("/api/concerns/comment", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ companyID, pin, tracking, comment }),
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
    const tracking = sessionStorage.getItem("concern_tracking");
    if (!tracking) return; // Silent because tracking should always exist
    const result = await addComment(company.id, Number(pin), tracking, val);

    if (result.error && result.status === 401) {
      // Pin or tracking invalid
      sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
      sessionStorage.removeItem("concern_tracking"); // Remove stored tracking
      router.push(`/${company.slug}/error`); // Redirect
      return;
    } else if (result.error) {
      toast.error(result.error);
      setDisabled(false);
      return;
    }

    // Success
    toast.success("Comment added");
    props.setDialogOpen(false); // Close
    props.getConcern();
  };

  useEffect(() => {
    if (!props.dialogOpen) return;

    // Reset on open
    setDisabled(false);
    setVal("");
  }, [props.dialogOpen]);

  return (
    <Dialog open={props.dialogOpen} onClose={props.setDialogOpen}>
      <DialogTitle>Leave a comment</DialogTitle>

      <DialogDescription className="text-wrap!">
        Add details or updates to help resolve this concern. Like your original submission, this comment is completely
        anonymous.
      </DialogDescription>

      <DialogBody>
        <Field disabled={disabled}>
          <Textarea
            rows={5}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={"Share additional details&hellip;"}
            maxLength={800}
          />

          <AnonymizeWriting val={val} setVal={setVal} disabled={disabled} setDisabled={setDisabled} />
        </Field>
      </DialogBody>

      <DialogActions>
        <Button plain onClick={() => props.setDialogOpen(false)}>
          Cancel
        </Button>

        <Button onClick={submit} color="indigo" disabled={!val.trim().length || disabled}>
          Add comment
        </Button>
      </DialogActions>
    </Dialog>
  );
}
