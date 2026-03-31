"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Stats() {
  const [country, setCountry] = useState<string>();

  useEffect(() => {
    setCountry(Cookies.get("x-country"));
  }, []);

  if (country !== "AU") return null;

  return (
    <div className="pt-32 sm:pt-56">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            Managing psychosocial risk is no longer optional
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-300">
            Australian employers now have a legal compliance obligation to identify, assess, and control psychosocial
            hazards.{" "}
            <a
              href="https://articles.howswork.app/psychosocial-risk-at-work-what-australian-employers-need-to-know/"
              target="_blank"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              What this means for your business
            </a>
            .
          </p>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start dark:bg-white/5 dark:inset-ring dark:inset-ring-white/10">
            <p className="flex-none text-3xl font-bold tracking-tight text-gray-900 dark:text-white">5x</p>

            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Longer to resolve</p>

              <p className="mt-2 text-base/7 text-gray-600 dark:text-gray-300">
                Than almost any other serious WHS injury claim.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-900 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44 dark:bg-gray-700 dark:inset-ring dark:inset-ring-white/10">
            <p className="flex-none text-3xl font-bold tracking-tight text-white">161%</p>

            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-white">Rise in claims</p>

              <p className="mt-2 text-base/7 text-gray-400 dark:text-gray-300">
                Over the past ten years, the largest growth of any injury category.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-indigo-600 p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28 dark:inset-ring dark:inset-ring-white/10">
            <p className="flex-none text-3xl font-bold tracking-tight text-white">$1B+</p>

            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-white">Paid out in 2024-25</p>

              <p className="mt-2 text-base/7 text-indigo-200 dark:text-indigo-100">
                In psychological injury compensation claims, five years ahead of projections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
