import { CheckIcon, SparklesIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Continuous assessment",
    description: "Short check-ins go out on your schedule and take under a minute, so participation stays high.",
  },
  {
    name: "Anonymous reporting",
    description: (
      <>
        Employees raise concerns{" "}
        <a
          href="https://howswork.ghost.io/why-we-built-howswork-without-employee-logins/"
          target="_blank"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          without an account or login
        </a>
        , so there&apos;s no way to link a submission back to an individual.
      </>
    ),
  },
  {
    name: "Risk register",
    description: (
      <>
        Risks are automatically identified and logged, giving you an{" "}
        <a
          href="https://howswork.ghost.io/why-every-employer-needs-a-risk-register-and-how-howswork-builds-one-for-you/"
          target="_blank"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          audit-ready record
        </a>{" "}
        without the manual work.
      </>
    ),
  },
  {
    name: "AI anonymisation",
    description: (
      <>
        Employee responses are rewritten by AI to{" "}
        <a
          href="https://howswork.ghost.io/can-your-writing-style-identify-you/"
          target="_blank"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          remove identifying language
        </a>
        , so people feel genuinely safe speaking up.
      </>
    ),
  },
];

export default function Feature1() {
  return (
    <div className="pt-32 sm:pt-56">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2">
            <h2 className="gradient-text inline text-base/7 font-semibold">For employers</h2>

            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Know the risks
            </p>

            <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-300">
              Psychosocial risk assessment isn&apos;t a survey you run once a year. It&apos;s an ongoing duty to
              identify hazards, act on them, and be able to show both.
            </p>
          </div>

          <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:gap-y-16 dark:text-gray-400">
            {features.map((feature, index) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold text-gray-900 dark:text-white">
                  {index === 3 ? (
                    <SparklesIcon
                      aria-hidden="true"
                      className="absolute top-1 left-0 size-5 text-indigo-500 dark:text-indigo-400"
                    />
                  ) : (
                    <CheckIcon
                      aria-hidden="true"
                      className="absolute top-1 left-0 size-5 text-indigo-500 dark:text-indigo-400"
                    />
                  )}
                  {feature.name}
                </dt>

                <dd className="mt-2">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
