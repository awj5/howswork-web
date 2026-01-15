"use client";

import { Dispatch, SetStateAction } from "react";
import AttributionsData from "@/data/attributions.json";
import { Field, Label } from "@/components/ui/fieldset";
import { Select } from "@/components/ui/select";

type AttributionProps = {
  val: number;
  setVal: Dispatch<SetStateAction<number>>;
  categories: number[];
};

export default function Attribution(props: AttributionProps) {
  return (
    <Field className={`transition-opacity ${!props.categories.length && "pointer-events-none opacity-50"}`}>
      <Label>Who is contributing most to these issues?</Label>

      <Select value={props.val} onChange={(e) => props.setVal(Number(e.target.value))}>
        {AttributionsData.map((attribution) => (
          <option key={attribution.id} value={attribution.id}>
            {attribution.label}
          </option>
        ))}
      </Select>
    </Field>
  );
}
