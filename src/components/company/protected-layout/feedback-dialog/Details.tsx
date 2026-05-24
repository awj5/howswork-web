import { Dispatch, SetStateAction } from "react";
import { Field, Label } from "@/components/ui/fieldset";
import { Textarea } from "@/components/ui/textarea";
import AnonymizeWriting from "@/components/AnonymizeWriting";

type DetailsProps = {
  val: string;
  setVal: Dispatch<SetStateAction<string>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  sentiment: number;
};

export default function Details(props: DetailsProps) {
  const disabled = !props.sentiment || props.disabled;

  return (
    <Field disabled={disabled}>
      <Label>Feedback (optional)</Label>

      <Textarea
        rows={6}
        value={props.val}
        onChange={(e) => props.setVal(e.target.value)}
        placeholder={"Anything you'd like to share?"}
        maxLength={800}
      />

      <AnonymizeWriting val={props.val} setVal={props.setVal} disabled={disabled} setDisabled={props.setDisabled} />
    </Field>
  );
}
