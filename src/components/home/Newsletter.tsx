"use client";

import { useState } from "react";
import { toast } from "sonner";
import { subscribeToMailingList } from "@/app/()/actions";

export default function Newsletter() {
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSubmitted(false);
    setDisabled(true);
    const result = await subscribeToMailingList(formData);
    setDisabled(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    // Success
    form.reset();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 sm:pt-56">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl lg:col-span-7 dark:text-white">
          Want product news and updates? Sign up for our newsletter.
        </h2>

        <form onSubmit={submitForm} className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
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
              className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-gray-700 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              disabled={disabled}
            />

            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
              disabled={disabled}
            >
              Subscribe
            </button>
          </div>

          {submitted ? (
            <p className="mt-4 text-sm/6 text-gray-900 dark:text-gray-300">Thanks for subscribing.</p>
          ) : (
            <p className="mt-4 text-sm/6 text-gray-900 dark:text-gray-300">
              We care about your data. Read our{" "}
              <a
                href="https://articles.howswork.app/privacy-policy/"
                className="font-semibold whitespace-nowrap text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                privacy policy
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
