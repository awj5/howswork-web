"use client";

import { Dispatch, SetStateAction } from "react";
import { Subheading } from "@/components/ui/heading";
import { BadgeButton } from "@/components/ui/badge";

type CategoriesProps = {
  val: boolean[];
  setVal: Dispatch<SetStateAction<boolean[]>>;
  sentiment: number;
};

export default function Categories(props: CategoriesProps) {
  const words = [
    "overwhelming",
    "restrictive",
    "unsupported",
    "confusing",
    "unstable",
    "thankless",
    "unfair",
    "traumatic",
    "isolating",
    "uncomfortable",
    "dangerous",
    "hostile",
    "inappropriate",
    "toxic",
  ];

  return (
    <div
      className={`flex flex-col items-center transition-opacity ${!props.sentiment && "pointer-events-none opacity-50"}`}
    >
      <Subheading>Work feels...</Subheading>
      <span className="text-sm/6 text-zinc-500 sm:text-xs/6">Select all that apply</span>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {words.map((word, index) => (
          <BadgeButton
            key={index}
            color={props.val[index] ? "indigo" : "zinc"}
            onClick={() => props.setVal((prev) => prev.map((v, i) => (i === index ? !v : v)))}
          >
            {word}
          </BadgeButton>
        ))}
      </div>
    </div>
  );
}
