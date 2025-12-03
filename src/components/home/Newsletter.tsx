"use client";

import { useState } from "react";
import { toast } from "sonner";
import { subscribeToMailingList } from "@/app/()/actions";
import { isValidEmail } from "@/utils/helpers";

export default function Newsletter() {
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Validate
    const email = formData.get("email") as string;

    if (!isValidEmail(email)) {
      toast.error("Email is invalid.");
      return;
    }

    // Subscribe
    setDisabled(true);
    const result = await subscribeToMailingList(formData);

    if (result.error) {
      toast.error(result.error);
      setDisabled(false);
      return;
    }

    // Success
    setSubmitted(true);
  };

  return (
    <div className="pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32 dark:bg-gray-800 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-0 dark:after:inset-ring dark:after:inset-ring-white/15 dark:after:sm:rounded-3xl">
          <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Early access list
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-center text-lg text-gray-300">
            {submitted
              ? "Thanks for subscribing — we'll only email you with important updates."
              : "Get early access and stay ahead of the new WHS psychosocial safety requirements."}
          </p>

          {!submitted && (
            <form onSubmit={submitForm} className="mx-auto mt-10 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>

              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 dark:outline-white/20"
              />

              <button
                type="submit"
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:shadow-none"
                disabled={disabled}
              >
                Notify me
              </button>
            </form>
          )}

          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-x-1/2"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient
                r={1}
                cx={0}
                cy={0}
                id="759c1415-0410-454c-8f7c-9a820de03641"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
