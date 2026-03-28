import { CheckIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Anonymous reporting",
    description:
      "Employees raise concerns without an account or login, so there's no way to link a submission back to an individual.",
  },
  {
    name: "Automated check-ins",
    description:
      "Regular pulse checks sent automatically to your team. Takes less than a minute, so participation stays high.",
  },
  {
    name: "Risk register",
    description:
      "Risks are automatically identified and logged, giving you an audit-ready record without the manual work.",
  },
  {
    name: "AI anonymisation",
    description:
      "Employee responses are rewritten by AI to remove identifying language, so people feel genuinely safe speaking up.",
  },
];

export default function Feature1() {
  return (
    <div id="feature1" className="pt-32 sm:pt-56">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2">
            <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">For employers</h2>

            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Spot risks early
            </p>

            <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-300">
              HowsWork helps employers identify and manage psychological health and safety risks before they become
              claims or compliance failures.
            </p>
          </div>

          <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:gap-y-16 dark:text-gray-400">
            {features.map((feature) => (
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
