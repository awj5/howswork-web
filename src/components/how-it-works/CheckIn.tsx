import Image from "next/image";
import { ClockIcon, EyeIcon, ShieldCheckIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "No login required.",
    description: (
      <>
        Employees receive a rotating PIN to access HowsWork.{" "}
        <a
          href="https://articles.howswork.app/why-we-built-howswork-without-employee-logins/"
          target="_blank"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          No account, no profile
        </a>
        , nothing traceable.
      </>
    ),
    icon: ShieldCheckIcon,
  },
  {
    name: "Scheduled automatically.",
    description:
      "Check-ins arrive on a set cadence, so raising something small doesn't mean making a formal complaint.",
    icon: ClockIcon,
  },
  {
    name: "Transparent results.",
    description:
      "Individual answers are never exposed. Employees see high-level results, employers see trends across teams.",
    icon: EyeIcon,
  },
];

export default function CheckIn() {
  return (
    <div className="overflow-hidden pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col-reverse lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4">
            <h2 className="gradient-text inline text-base/7 font-semibold">For employees</h2>

            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              Check in
            </p>

            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              Employees get a short check-in on a regular schedule. Responses are anonymous and aggregated, so patterns
              show up without anyone being identified.
            </p>

            <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none dark:text-gray-400">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900 dark:text-white">
                    <feature.icon
                      aria-hidden="true"
                      className="absolute top-1 left-1 size-5 text-indigo-600 dark:text-indigo-400"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 text-lg/8 font-semibold text-gray-900 dark:text-white">
              Check-in notifications also available via Slack and Microsoft Teams
            </p>

            <div className="mt-10 inline-flex gap-8 sm:gap-10">
              <Image
                alt="Slack"
                src="/img/how-it-works/slack.svg"
                width={127}
                height={127}
                className="max-h-12 w-full object-contain"
              />

              <Image
                alt="Teams"
                src="/img/how-it-works/teams.svg"
                width={36}
                height={38}
                className="max-h-12 w-full object-contain"
              />
            </div>
          </div>

          <div className="mb-16 sm:mb-24 lg:mb-0 lg:shrink-0 lg:grow">
            <svg role="img" viewBox="0 0 366 729" className="mx-auto w-91.5 max-w-full drop-shadow-xl">
              <title>App screenshot</title>

              <defs>
                <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                  <rect rx={36} width={316} height={684} />
                </clipPath>
              </defs>

              <path
                d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
                fill="#4B5563"
              />

              <path
                d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
                fill="#343E4E"
              />

              <foreignObject
                width={316}
                height={684}
                clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
                transform="translate(24 24)"
              >
                <img alt="" src="/img/how-it-works/check-in.png" className="dark:hidden" />
                <img alt="" src="/img/how-it-works/check-in-dark.png" className="not-dark:hidden" />
              </foreignObject>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
