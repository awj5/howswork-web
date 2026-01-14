"use client";

import { Dispatch, SetStateAction } from "react";
import { Subheading } from "@/components/ui/heading";

type CategoriesProps = {
  val: boolean[];
  setVal: Dispatch<SetStateAction<boolean[]>>;
};

export default function Categories(props: CategoriesProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Subheading>Work feels...</Subheading>
    </div>
  );
}
