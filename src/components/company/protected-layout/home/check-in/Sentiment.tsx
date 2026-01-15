"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Subheading } from "@/components/ui/heading";

type SentimentProps = {
  val: number;
  setVal: Dispatch<SetStateAction<number>>;
};

export default function Sentiment(props: SentimentProps) {
  const sentiments = ["Terrible", "Difficult", "Fine", "Good", "Amazing"];

  return (
    <div className="flex flex-col items-center">
      <Subheading id="sentiment-label">How's work?</Subheading>

      <div role="radiogroup" aria-labelledby="sentiment-label" className="mt-4 grid grid-cols-5 gap-6">
        {sentiments.map((sentiment, index) => {
          const num = index + 1;

          return (
            <button
              key={index}
              role="radio"
              aria-checked={props.val === num}
              aria-label={sentiment}
              onClick={() => props.setVal(num)}
              className={`flex cursor-pointer flex-col items-center gap-3 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${props.val && props.val !== num && "opacity-50"}`}
            >
              <Image
                src={`/img/emoji-${num}.svg`}
                width={96}
                height={96}
                alt=""
                aria-hidden="true"
                className="size-10 sm:size-8"
              />

              <p className="text-sm leading-none font-semibold text-zinc-950 sm:text-xs dark:text-white">{sentiment}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
