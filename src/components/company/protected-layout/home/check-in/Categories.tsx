"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import CategoriesData from "@/data/categories.json";
import { shuffleArray } from "@/utils/helpers";
import { Subheading } from "@/components/ui/heading";
import { BadgeButton } from "@/components/ui/badge";

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
    <div className={`transition-opacity ${!props.sentiment && "opacity-50"}`}>
      <div className="flex items-baseline justify-between">
        <Subheading>Work feels&hellip;</Subheading>
        <span className="text-sm text-zinc-500 sm:text-xs">Select all that apply</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3.5 sm:gap-3">
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
    </div>
  );
}
