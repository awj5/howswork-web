import { Dispatch, SetStateAction } from "react";
import { Field, Label } from "@/components/ui/fieldset";
import { Textarea } from "@/components/ui/textarea";
import AnonymizeWriting from "@/components/AnonymizeWriting";

type DetailsProps = {
  val: string;
  setVal: Dispatch<SetStateAction<string>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

export default function Details(props: DetailsProps) {
  return (
    <Field disabled={props.disabled}>
      <Label>Details</Label>

      <Textarea
        rows={5}
        value={props.val}
        onChange={(e) => props.setVal(e.target.value)}
        placeholder={"Describe what's happening&hellip;"}
        disabled={props.disabled}
        maxLength={800}
      />

      <AnonymizeWriting
        val={props.val}
        setVal={props.setVal}
        disabled={props.disabled}
        setDisabled={props.setDisabled}
      />
    </Field>
  );
}
