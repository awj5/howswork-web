"use client";

import { Dispatch, SetStateAction } from "react";
import AttributionsData from "@/data/attributions.json";
import { Label } from "@/components/ui/fieldset";
import { Checkbox, CheckboxField, CheckboxGroup } from "@/components/ui/checkbox";
import { Subheading } from "@/components/ui/heading";

type AttributionProps = {
  val: number[];
  setVal: Dispatch<SetStateAction<number[]>>;
  categories: number[];
};

export default function Attribution(props: AttributionProps) {
  return (
    <div className={`transition-opacity ${!props.categories.length && "pointer-events-none opacity-50"}`}>
      <Subheading>Who is contributing most to these issues?</Subheading>

      <CheckboxGroup className="mt-4 grid sm:grid-cols-2">
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
              tabIndex={!props.categories.length ? -1 : undefined}
            />

            <Label>{attribution.label}</Label>
          </CheckboxField>
        ))}
      </CheckboxGroup>
    </div>
  );
}
