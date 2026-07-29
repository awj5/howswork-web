import type { Metadata } from "next";
import Tiers from "@/components/pricing/Tiers";

export const metadata: Metadata = {
  title: "Pricing | HowsWork",
  alternates: { canonical: "/pricing" },
};

export default function Pricing() {
  return (
    <main className="pt-14">
      <form className="group/tiers pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="gradient-text inline text-base/7 font-semibold">Pricing</h2>

            <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
              Plans for every team size
            </p>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">
            Whether you're managing a team of ten or a workforce of thousands, HowsWork has a plan that fits your
            business and your budget.
          </p>

          <div className="mt-16 flex justify-center">
            <fieldset aria-label="Payment frequency">
              <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs/5 font-semibold inset-ring inset-ring-gray-200 dark:inset-ring-white/10">
                <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-indigo-600 dark:has-checked:bg-indigo-500">
                  <input
                    defaultValue="monthly"
                    defaultChecked
                    name="frequency"
                    type="radio"
                    className="absolute inset-0 appearance-none rounded-full"
                  />

                  <span className="text-gray-500 group-has-checked:text-white dark:text-gray-400">Monthly</span>
                </label>

                <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-indigo-600 dark:has-checked:bg-indigo-500">
                  <input
                    defaultValue="annually"
                    name="frequency"
                    type="radio"
                    className="absolute inset-0 appearance-none rounded-full"
                  />

                  <span className="text-gray-500 group-has-checked:text-white dark:text-gray-400">Annually</span>
                </label>
              </div>
            </fieldset>
          </div>

          <Tiers />
        </div>
      </form>
    </main>
  );
}
