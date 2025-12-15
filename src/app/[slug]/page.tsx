"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PlusIcon } from "@heroicons/react/20/solid";
import { getCompany } from "./actions";

type CompanyType = {
  id: number;
  name: string;
  slug: string;
  timezone: string;
};

export default function CheckIn() {
  const params = useParams<{ slug: string }>();
  const [company, setCompany] = useState<CompanyType>();

  useEffect(() => {
    const fetchCompany = async () => {
      const result = await getCompany(params.slug);
      if (result.error) return;
      setCompany(result.data);
    };

    fetchCompany();
  }, []);

  return (
    <main className="flex h-full items-center justify-center">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mx-auto size-12 text-gray-400 dark:text-gray-500"
          >
            <path
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            This check-in was requested by {company?.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            It takes about 2 minutes and your responses are anonymous.
          </p>

          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
            >
              <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
              Start check-in
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
