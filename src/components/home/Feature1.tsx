import { CheckIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Identify early",
    description: "Continuous check-ins surface psychosocial hazards before they become psychological injuries.",
  },
  {
    name: "Guide action",
    description: "Receive practical control measure recommendations tailored to each identified hazard.",
  },
  {
    name: "Build trust",
    description: (
      <>
        Confidential,{" "}
        <a
          href="https://articles.howswork.app/can-your-writing-style-identify-you/"
          target="_blank"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          AI de-identified reporting
        </a>{" "}
        encourages earlier disclosure and reduces under-reporting.
      </>
    ),
  },
  {
    name: "Maintain evidence",
    description: (
      <>
        Every hazard, control measure and action automatically updates your{" "}
        <a
          href="https://articles.howswork.app/why-every-employer-needs-a-risk-register-and-how-howswork-builds-one-for-you/"
          target="_blank"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          live psychosocial risk register
        </a>
        .
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
              Stay ahead of risk
            </p>

            <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-300">
              Psychosocial risks do not wait for an annual assessment. HowsWork helps you identify hazards early, guide
              control measures, and maintain a live record of action.
            </p>
          </div>

          <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:gap-y-16 dark:text-gray-400">
            {features.map((feature, index) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold text-gray-900 dark:text-white">
                  <CheckIcon
                    aria-hidden="true"
                    className="absolute top-1 left-0 size-5 text-indigo-500 dark:text-indigo-400"
                  />
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
