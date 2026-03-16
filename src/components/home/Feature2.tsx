import Image from "next/image";
import {
  ListBulletIcon,
  ShieldExclamationIcon,
  FolderOpenIcon,
  BellAlertIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Auto-generated entries.",
    description: "Concerns and flagged check-ins are automatically added to your risk register.",
    icon: ListBulletIcon,
  },
  {
    name: "AI-generated summaries.",
    description:
      "Raw responses are automatically turned into clear, professional summaries ready for leadership or auditors.",
    icon: SparklesIcon,
  },
  {
    name: "Hazard categorisation.",
    description: (
      <>
        Issues are automatically mapped to{" "}
        <a
          href="https://www.safeworkaustralia.gov.au/safety-topic/managing-health-and-safety/mental-health/psychosocial-hazards"
          target="_blank"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Safe Work Australia&apos;s 14 psychosocial hazards
        </a>
        .
      </>
    ),
    icon: FolderOpenIcon,
  },
  {
    name: "Action recommendations.",
    description: "HowsWork suggests next steps for each risk, so you\u2019re never unsure how to respond.",
    icon: ShieldExclamationIcon,
  },
  {
    name: "Audit-ready export.",
    description: "Download a complete record of identified risks, summaries, and actions taken.",
    icon: ArrowDownTrayIcon,
  },
  {
    name: "Real-time alerts.",
    description: "Receive a notification when a new risk is logged so it never goes unacknowledged in your register.",
    icon: BellAlertIcon,
  },
];

export default function Feature2() {
  return (
    <div className="pt-32 sm:pt-56">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Audit-ready</h2>

          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl sm:text-balance dark:text-white">
            Your risk register, built automatically
          </p>

          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
            Concerns are automatically logged, categorised, and summarised, so you always know what needs attention and
            can prove you&apos;ve acted.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Image
            alt="App screenshot"
            src="/img/risk-register.png"
            width={2432}
            height={1442}
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 dark:hidden dark:ring-white/10"
          />

          <Image
            alt="App screenshot"
            src="/img/risk-register-dark.png"
            width={2432}
            height={1442}
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 not-dark:hidden dark:ring-white/10"
          />

          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[7%] dark:from-gray-900" />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 dark:text-gray-400">
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
      </div>
    </div>
  );
}
