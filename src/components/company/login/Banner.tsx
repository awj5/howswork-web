"use client";

import { useEffect, useState } from "react";
import { XMarkIcon, ShieldCheckIcon } from "@heroicons/react/20/solid";

export default function Banner() {
  const [hidden, setHidden] = useState(false);

  const hide = () => {
    sessionStorage.setItem("login_banner_hidden", "true");
    setHidden(true);
  };

  useEffect(() => {
    try {
      const alreadyHidden = sessionStorage.getItem("login_banner_hidden");
      setHidden(alreadyHidden !== null);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div
      className={`flex items-center gap-x-6 bg-indigo-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 ${(hidden === undefined || hidden) && "hidden!"}`}
    >
      <div className="flex gap-2 sm:items-center">
        <div className="shrink-0">
          <ShieldCheckIcon aria-hidden="true" className="size-5 text-white" />
        </div>

        <p className="text-sm/6 text-white">
          For maximum privacy, access from a personal device on your own network.{" "}
          <a
            href="https://articles.howswork.app/how-howswork-protects-your-privacy/"
            target="_blank"
            className="font-semibold whitespace-nowrap"
          >
            Learn more <span aria-hidden="true">&rarr;</span>
          </a>
        </p>
      </div>

      <div className="flex flex-1 justify-end">
        <button type="button" onClick={hide} className="-m-3 p-3 focus-visible:-outline-offset-4">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-white" />
        </button>
      </div>
    </div>
  );
}
