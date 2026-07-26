import Image from "next/image";
import {
  ListBulletIcon,
  LightBulbIcon,
  FolderOpenIcon,
  BellAlertIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Automatically documented.",
    description: "Every identified hazard, control measure and follow-up is recorded as work happens.",
    icon: ListBulletIcon,
  },
  {
    name: "AI-generated summaries.",
    description: "Generate clear summaries of identified risks and employer responses in seconds.",
    icon: SparklesIcon,
  },
  {
    name: "Hazard mapping.",
    description: (
      <>
        Reported concerns are automatically mapped to{" "}
        <a
          href="https://www.safeworkaustralia.gov.au/safety-topic/managing-health-and-safety/mental-health/psychosocial-hazards"
          target="_blank"
          rel="noopener noreferrer"
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
    name: "Control measures.",
    description: "AI recommends practical control measures based on the identified psychosocial hazard.",
    icon: LightBulbIcon,
  },
  {
    name: "Evidence on demand.",
    description: "Export your complete psychosocial risk register in a single click.",
    icon: ArrowDownTrayIcon,
  },
  {
    name: "Real-time alerts.",
    description: "Receive notifications when hazards are identified or action is required.",
    icon: BellAlertIcon,
  },
];

export default async function Feature2() {
  return (
    <div className="pt-32 sm:pt-56">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="gradient-text inline text-base/7 font-semibold">Live risk register</h2>

          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl sm:text-balance dark:text-white">
            Your risk register, built automatically
          </p>

          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
            Every identified hazard, control measure and follow-up automatically becomes part of your live psychosocial
            risk register. Documentation is created through everyday risk management, not after an incident.
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
