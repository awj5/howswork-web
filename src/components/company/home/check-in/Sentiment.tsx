"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import SentimentsData from "@/data/sentiments.json";
import { Subheading } from "@/components/ui/heading";

type SentimentProps = {
  val: number;
  setVal: Dispatch<SetStateAction<number>>;
};

export default function Sentiment(props: SentimentProps) {
  return (
    <div className="flex flex-col items-center">
      <Subheading id="sentiment-label">How's work?</Subheading>

      <div role="radiogroup" aria-labelledby="sentiment-label" className="mt-4 grid grid-cols-5 gap-4">
        {SentimentsData.map((sentiment) => (
          <button
            key={sentiment.id}
            role="radio"
            aria-checked={props.val === sentiment.id}
            aria-label={sentiment.label}
            onClick={() => props.setVal(sentiment.id)}
            className="cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <div
              className={`flex flex-col items-center gap-3 transition-opacity ${props.val && props.val !== sentiment.id && "opacity-50"}`}
            >
              <Image
                src={`/img/emoji-${sentiment.id}.svg`}
                width={96}
                height={96}
                alt=""
                aria-hidden="true"
                className="size-10 sm:size-9"
              />

              <p className="text-sm leading-none font-medium text-zinc-950 sm:text-xs dark:text-white">
                {sentiment.label}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
