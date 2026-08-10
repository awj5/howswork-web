import Image from "next/image";
import { EyeIcon, ChartBarIcon, DocumentTextIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Hazards, categorised.",
    description: "Concerns map to recognised hazard categories, revealing patterns across teams and over time.",
    icon: EyeIcon,
  },
  {
    name: "Action tracking.",
    description: "Follow every concern from submission to resolution, with a clear record of what was done.",
    icon: ChartBarIcon,
  },
  {
    name: "Evidence of due diligence.",
    description: (
      <>
        Every concern, action, and outcome is logged to your{" "}
        <a
          href="https://howswork.ghost.io/why-every-employer-needs-a-risk-register-and-how-howswork-builds-one-for-you/"
          target="_blank"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          risk register
        </a>
        .
      </>
    ),
    icon: DocumentTextIcon,
  },
];

export default function Dashboard() {
  return (
    <div className="overflow-hidden pt-32 sm:pt-56">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="gradient-text inline text-base/7 font-semibold">For employers</h2>

              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                The dashboard
              </p>

              <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
                Employers get a clear view of psychosocial health across their workforce, with check-in trends, open
                concerns, and flagged workplace hazards all in one place.
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
            </div>
          </div>

          <Image
            alt="Product screenshot"
            src="/img/dashboard-dark.png"
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 not-dark:hidden sm:w-228 md:-ml-4 lg:-ml-0 dark:ring-white/10"
          />

          <Image
            alt="Product screenshot"
            src="/img/dashboard.png"
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0 dark:hidden dark:ring-white/10"
          />
        </div>
      </div>
    </div>
  );
}
