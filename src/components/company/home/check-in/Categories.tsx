"use client";

import { Dispatch, SetStateAction } from "react";
import CategoriesData from "@/data/categories.json";
import { BadgeButton } from "@/components/ui/badge";
import { Description, Field, Label } from "@/components/ui/fieldset";

type CategoriesProps = {
  val: number[];
  setVal: Dispatch<SetStateAction<number[]>>;
  sentiment: number;
  setAttribution: Dispatch<SetStateAction<number[]>>;
  disabled: boolean;
};

export default function Categories(props: CategoriesProps) {
  const disabled = !props.sentiment || props.disabled;

  const toggle = (id: number) => {
    props.setVal((prev) => {
      const newVal = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      if (!newVal.length) props.setAttribution([]); // Clear attribution if no categories selected
      return newVal;
    });
  };

  return (
    <Field disabled={disabled}>
      <Label>Issues (optional)</Label>
      <Description>Select any workplace issues you've experienced recently.</Description>

      <div className={`mt-4 flex flex-wrap gap-4 sm:gap-3 ${disabled && "opacity-50"}`}>
        {CategoriesData.map((category) => (
          <BadgeButton
            key={category.id}
            color={props.val.includes(category.id) ? "indigo" : "zinc"}
            onClick={() => toggle(category.id)}
          >
            {category.tag}
          </BadgeButton>
        ))}
      </div>
    </Field>
  );
}
