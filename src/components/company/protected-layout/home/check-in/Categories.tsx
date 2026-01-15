"use client";

import { Dispatch, SetStateAction } from "react";
import CategoriesData from "@/data/categories.json";
import { Subheading } from "@/components/ui/heading";
import { BadgeButton } from "@/components/ui/badge";

type CategoriesProps = {
  val: number[];
  setVal: Dispatch<SetStateAction<number[]>>;
  sentiment: number;
};

export default function Categories(props: CategoriesProps) {
  return (
    <div
      className={`flex flex-col items-center transition-opacity ${!props.sentiment && "pointer-events-none opacity-50"}`}
    >
      <Subheading>Work feels...</Subheading>
      <span className="text-sm/6 text-zinc-500 sm:text-xs/6">Select all that apply</span>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {CategoriesData.map((category) => (
          <BadgeButton
            key={category.id}
            color={props.val.includes(category.id) ? "indigo" : "zinc"}
            onClick={() =>
              props.setVal((prev) =>
                prev.includes(category.id) ? prev.filter((id) => id !== category.id) : [...prev, category.id]
              )
            }
          >
            {category.tag}
          </BadgeButton>
        ))}
      </div>
    </div>
  );
}
