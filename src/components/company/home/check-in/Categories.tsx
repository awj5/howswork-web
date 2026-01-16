"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import CategoriesData from "@/data/categories.json";
import { shuffleArray } from "@/utils/helpers";
import { BadgeButton } from "@/components/ui/badge";
import { Description, Field, Label } from "@/components/ui/fieldset";

type CategoriesProps = {
  val: number[];
  setVal: Dispatch<SetStateAction<number[]>>;
  sentiment: number;
  setAttribution: Dispatch<SetStateAction<number[]>>;
};

export default function Categories(props: CategoriesProps) {
  const shuffled = useMemo(() => shuffleArray(CategoriesData), []); // useMemo to prevent re-shuffle on update

  const toggle = (id: number) => {
    props.setVal((prev) => {
      const newVal = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      if (!newVal.length) props.setAttribution([]); // Clear
      return newVal;
    });
  };

  return (
    <Field disabled={!props.sentiment}>
      <Label>Work feels&hellip;</Label>
      <Description>Select all that apply</Description>

      <div data-slot="control" className={`flex flex-wrap gap-4 sm:gap-3 ${!props.sentiment && "opacity-50"}`}>
        {shuffled.map((category) => (
          <BadgeButton
            key={category.id}
            color={props.val.includes(category.id) ? "indigo" : "zinc"}
            disabled={!props.sentiment}
            onClick={() => toggle(category.id)}
          >
            {category.tag}
          </BadgeButton>
        ))}
      </div>
    </Field>
  );
}
