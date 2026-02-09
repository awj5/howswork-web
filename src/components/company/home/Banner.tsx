"use client";

import { useEffect, useState } from "react";
import { XMarkIcon, ShieldCheckIcon } from "@heroicons/react/20/solid";

export default function Banner() {
  const [hidden, setHidden] = useState<boolean>();

  const hide = () => {
    sessionStorage.setItem("home_banner_hidden", "true");
    setHidden(true);
  };

  useEffect(() => {
    const alreadyHidden = sessionStorage.getItem("home_banner_hidden");
    setHidden(alreadyHidden !== null);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8 ${(hidden === undefined || hidden) && "hidden!"}`}
    >
      <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-white px-6 py-2.5 text-zinc-900 inset-ring inset-ring-zinc-900/10 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4 sm:shadow-lg dark:bg-zinc-800 dark:text-white dark:shadow-none dark:inset-ring-white/10">
        <div className="flex gap-2 sm:items-center">
          <div className="shrink-0">
            <ShieldCheckIcon aria-hidden="true" className="size-5" />
          </div>

          <p className="text-sm/6">
            You're completely anonymous.{" "}
            <a
              href="https://articles.howswork.app/how-howswork-protects-your-privacy/"
              target="_blank"
              className="font-semibold whitespace-nowrap"
            >
              Learn more <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        </div>

        <button type="button" onClick={hide} className="-m-1.5 flex-none p-1.5">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
