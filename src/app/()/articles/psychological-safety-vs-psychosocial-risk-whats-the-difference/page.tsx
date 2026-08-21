import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Psychological safety vs psychosocial risk: what's the difference? | HowsWork",
  alternates: { canonical: "/articles/psychological-safety-vs-psychosocial-risk-whats-the-difference" },
};

export default function PsychologicalSafetyVsPsychosocialRiskWhatsTheDifference() {
  return (
    <main className="pt-14">
      <article className="mx-auto max-w-4xl px-6 pt-24 sm:pt-32 lg:px-8">
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          Psychological safety vs psychosocial risk: what&apos;s the difference?
        </h2>

        <figure className="mt-10">
          <Image
            src="/img/articles/charlesdeluvio-Lks7vei-eAg-unsplash.jpg"
            alt="Psychological safety vs psychosocial risk: what's the difference?"
            width={2000}
            height={1333}
            className="w-full rounded-2xl object-cover"
            priority
          />
        </figure>

        <section>
          <p className="mt-10 text-base/7 text-gray-600 dark:text-gray-400">
            These two terms are often used interchangeably, but they mean different things. Confusing them can lead to
            real gaps in how you manage and respond to workplace harm.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Psychological safety
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Psychological safety is a team dynamic. It describes the degree to which people feel safe taking
            interpersonal risks at work. Speaking up in a meeting, admitting a mistake, raising a concern with a
            manager.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Harvard Business School professor Amy Edmondson brought the concept to mainstream attention, finding that
            teams with high psychological safety performed better, learned faster, and were more innovative.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Psychological safety is not something you can mandate or measure directly. It is something you build through
            leadership, team culture, and day to day interactions.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Psychosocial risk
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Psychosocial risk refers to workplace conditions that can cause psychological harm. Think excessive
            workload, poor role clarity, bullying, lack of recognition, or low job control. Employers in many countries
            now have a legal or regulatory duty to identify and manage these risks, just as they would a physical
            hazard. If you are based in Australia, the requirements are now{" "}
            <Link
              href="/articles/psychosocial-risk-at-work-what-australian-employers-need-to-know/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              quite specific
            </Link>
            .
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Why the distinction matters
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            A workplace can have high psychological safety and still have unmanaged psychosocial risks. A close,
            trusting team can still be chronically overworked. Conversely, a workplace can tick the compliance boxes and
            still have a culture where people don&apos;t feel safe speaking up.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Both matter. But they require different responses. Psychological safety is built through culture. Managing
            psychosocial risk is built through process.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Where HowsWork fits in
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              HowsWork
            </Link>{" "}
            helps with the process side. It gives employees a trusted, anonymous channel to raise concerns about
            psychosocial hazards, runs regular check-ins to surface how your team is experiencing work, and
            automatically builds a risk register that records what was identified and what action was taken. It gives
            employers a{" "}
            <Link
              href="/articles/why-every-employer-needs-a-risk-register-and-how-howswork-builds-one-for-you/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              documented record
            </Link>{" "}
            that demonstrates they took their duty of care seriously.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            It is not a substitute for the cultural work of building trust within teams. But it gives you the
            infrastructure to act on what is actually happening in your workplace, and the evidence to show you did.
          </p>
        </section>
      </article>
    </main>
  );
}
