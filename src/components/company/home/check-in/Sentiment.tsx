"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import SentimentsData from "@/data/sentiments.json";
import { Field, Label } from "@/components/ui/fieldset";

type SentimentProps = {
  val: number;
  setVal: Dispatch<SetStateAction<number>>;
};

export default function Sentiment(props: SentimentProps) {
  return (
    <Field className="flex flex-col items-center">
      <Label>How's work?</Label>

      <div
        data-slot="control"
        role="radiogroup"
        aria-labelledby="headlessui-label-_r_4h_"
        aria-required="true"
        className="grid grid-cols-5 gap-4"
      >
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
                alt={sentiment.label}
                aria-hidden="true"
                className="size-10 sm:size-9"
              />

              <span className="text-sm leading-none font-medium text-zinc-950 sm:text-xs dark:text-white">
                {sentiment.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </Field>
  );
}
