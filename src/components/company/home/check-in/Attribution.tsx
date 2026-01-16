"use client";

import { Dispatch, SetStateAction } from "react";
import AttributionsData from "@/data/attributions.json";
import { Field, Label } from "@/components/ui/fieldset";
import { Checkbox, CheckboxField, CheckboxGroup } from "@/components/ui/checkbox";

type AttributionProps = {
  val: number[];
  setVal: Dispatch<SetStateAction<number[]>>;
  categories: number[];
};

export default function Attribution(props: AttributionProps) {
  return (
    <Field disabled={!props.categories.length}>
      <Label>Who is contributing most to these issues?</Label>

      <CheckboxGroup className="grid sm:grid-cols-2">
        {AttributionsData.map((attribution) => (
          <CheckboxField key={attribution.id}>
            <Checkbox
              color="indigo"
              onChange={() =>
                props.setVal((prev) =>
                  prev.includes(attribution.id) ? prev.filter((i) => i !== attribution.id) : [...prev, attribution.id]
                )
              }
              checked={props.val.includes(attribution.id)}
            />

            <Label>{attribution.label}</Label>
          </CheckboxField>
        ))}
      </CheckboxGroup>
    </Field>
  );
}
