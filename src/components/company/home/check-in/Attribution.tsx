"use client";

import { Dispatch, SetStateAction } from "react";
import AttributionsData from "@/data/attributions.json";
import { Field, Label } from "@/components/ui/fieldset";
import { Checkbox, CheckboxField, CheckboxGroup } from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";

type AttributionProps = {
  val: number[];
  setVal: Dispatch<SetStateAction<number[]>>;
  categories: number[];
  disabled: boolean;
};

export default function Attribution(props: AttributionProps) {
  return (
    <Field
      disabled={!props.categories.length || props.disabled}
      className={`transition-opacity duration-300 ease-in ${!props.categories.length ? "h-0 overflow-hidden opacity-0" : "opacity-100"}`}
    >
      <Divider className="my-8" soft />
      <Label>Where are these issues coming from?</Label>

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
