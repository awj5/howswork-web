"use client";

import { useState } from "react";
import { toast } from "sonner";
import { contact } from "@/app/()/contact/actions";

type FormProps = {
  to: string;
  subject: string;
  placeholder: string;
  buttonText: string;
  successText: string;
};

export default function Form(props: FormProps) {
  const [disabled, setDisabled] = useState(false);

  const submitForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const policies = formData.get("agree-to-policies") as string;

    // Validate
    if (!policies) {
      toast.error("Please agree to our privacy policy");
      return;
    }

    setDisabled(true);
    const result = await contact(formData, props.to, props.subject);
    setDisabled(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    // Success
    form.reset();
    toast.success(props.successText);
  };

  return (
    <form onSubmit={submitForm} className="mx-auto mt-16 max-w-xl sm:mt-20">
      <fieldset className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2" disabled={disabled}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute top-0 left-full" />

        <div>
          <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            First name
          </label>

          <div className="mt-2.5">
            <input
              id="first-name"
              name="first-name"
              type="text"
              autoComplete="given-name"
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Last name
          </label>

          <div className="mt-2.5">
            <input
              id="last-name"
              name="last-name"
              type="text"
              autoComplete="family-name"
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="company" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Company
          </label>

          <div className="mt-2.5">
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Email
          </label>

          <div className="mt-2.5">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              required
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
            Message
          </label>

          <div className="mt-2.5">
            <textarea
              id="message"
              name="message"
              placeholder={props.placeholder}
              rows={4}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              defaultValue={""}
            />
          </div>
        </div>

        <div className="flex gap-x-4 sm:col-span-2">
          <div className="flex h-6 items-center">
            <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2 dark:bg-white/5 dark:inset-ring-white/10 dark:outline-indigo-500 dark:has-checked:bg-indigo-500">
              <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
              <input
                id="agree-to-policies"
                name="agree-to-policies"
                type="checkbox"
                aria-label="Agree to policies"
                className="absolute inset-0 size-full appearance-none focus:outline-hidden"
              />
            </div>
          </div>

          <label htmlFor="agree-to-policies" className="text-sm/6 text-gray-600 dark:text-gray-400">
            By selecting this, you agree to our{" "}
            <a
              href="https://articles.howswork.app/privacy-policy/"
              target="_blank"
              className="font-semibold whitespace-nowrap text-indigo-600 dark:text-indigo-400"
            >
              privacy policy
            </a>
            .
          </label>
        </div>
      </fieldset>

      <div className="mt-10">
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
          disabled={disabled}
        >
          {props.buttonText}
        </button>
      </div>
    </form>
  );
}
