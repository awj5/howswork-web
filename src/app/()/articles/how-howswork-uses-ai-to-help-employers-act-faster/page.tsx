import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How HowsWork uses AI to help employers act faster | HowsWork",
  alternates: { canonical: "/articles/how-howswork-uses-ai-to-help-employers-act-faster" },
};

export default function HowHowsworkUsesAiToHelpEmployersActFaster() {
  return (
    <main className="pt-14">
      <article className="mx-auto max-w-4xl px-6 pt-24 sm:pt-32 lg:px-8">
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          How HowsWork uses AI to help employers act faster
        </h2>

        <figure className="mt-10">
          <Image
            src="/img/articles/nahrizul-kadri-OAsF0QMRWlA-unsplash.jpg"
            alt="How HowsWork uses AI to help employers act faster"
            width={2000}
            height={1128}
            className="w-full rounded-2xl object-cover"
            priority
          />
        </figure>

        <section>
          <p className="mt-10 text-base/7 text-gray-600 dark:text-gray-400">
            When a concern is raised at work, the hardest part is often knowing what to do next. You need to understand
            what&apos;s been reported, assess how serious it is, and decide on a response, all while keeping a clear
            record of what happened and when.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              HowsWork
            </Link>{" "}
            uses AI to help employers do this more consistently and with less effort.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Concern summaries in plain language
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            When an employee submits a concern through HowsWork, the AI generates a summary of what was reported. This
            summary is written in plain language and is readable by anyone who needs to review it, including leadership,
            HR, legal counsel, or external advisors, without requiring them to parse raw submissions.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            You can edit any AI-generated summary before it becomes part of your record, or remove it entirely if it
            does not accurately reflect the concern. The register is yours to manage.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Surfacing patterns in check-ins
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            HowsWork runs regular, anonymous check-ins that give employees a consistent way to flag workplace hazards.
            When check-in responses reveal patterns, the AI generates a summary of what has been raised, helping
            employers identify trends across teams or time periods rather than reviewing individual responses in
            isolation.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            This makes it easier to spot a developing issue before it becomes a formal complaint or claim.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Recommending next steps
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            When a concern is raised or a check-in flags an issue, the AI generates a set of recommended next steps to
            help you determine an appropriate response. These recommendations appear separately from the risk register
            and are intended as a starting point, not a substitute for professional advice.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Documenting employer responses
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            When you take action on an issue, the AI generates a summary of your response and adds it to the risk
            register. This creates a clear, timestamped record of what was identified, what was done, and when.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            That record matters. In the event of a psychological injury claim or a compliance review, a documented
            history of how concerns were identified and handled is a significant asset.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            The register is always yours
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              HowsWork
            </Link>{" "}
            uses AI to reduce the administrative burden of managing psychological health and safety at work. But every
            summary, recommendation, and response entry can be edited or removed. The AI assists. It does not decide.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            What it produces is a clearer, more consistent record of how your workplace identifies and responds to
            workplace risks, and one that holds up under scrutiny.
          </p>
        </section>
      </article>
    </main>
  );
}
