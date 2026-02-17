"use client";

import { Dispatch, SetStateAction } from "react";
import IssuesData from "@/data/issues.json";
import { BadgeButton } from "@/components/ui/badge";
import { Description, Field, Label } from "@/components/ui/fieldset";

type IssuesProps = {
  val: number[];
  setVal: Dispatch<SetStateAction<number[]>>;
  sentiment: number;
  setAttributions: Dispatch<SetStateAction<number[]>>;
  disabled: boolean;
};

export default function Issues(props: IssuesProps) {
  const disabled = !props.sentiment || props.disabled;

  const toggle = (id: number) => {
    props.setVal((prev) => {
      const newVal = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      if (!newVal.length) props.setAttributions([]); // Clear attributions if no issues selected
      return newVal;
    });
  };

  return (
    <Field disabled={disabled}>
      <Label>Issues (optional)</Label>
      <Description>Select any workplace issues you&apos;ve experienced recently.</Description>

      <div className={`mt-4 flex flex-wrap gap-4 sm:gap-3 ${disabled && "opacity-50"}`}>
        {IssuesData.map((issue) => (
          <BadgeButton
            key={issue.id}
            color={props.val.includes(issue.id) ? "indigo" : "zinc"}
            onClick={() => toggle(issue.id)}
          >
            {issue.tag}
          </BadgeButton>
        ))}
      </div>
    </Field>
  );
}
