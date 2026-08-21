import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Can your writing style identify you? | HowsWork",
  alternates: { canonical: "/articles/can-your-writing-style-identify-you" },
};

export default function CanYourWritingStyleIdentifyYou() {
  return (
    <main className="pt-14">
      <article className="mx-auto max-w-4xl px-6 pt-24 sm:pt-32 lg:px-8">
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          Can your writing style identify you?
        </h2>

        <figure className="mt-10">
          <Image
            src="/img/articles/kaitlyn-baker-vZJdYl5JVXY-unsplash.jpg"
            alt="Can your writing style identify you?"
            width={2000}
            height={1333}
            className="w-full rounded-2xl object-cover"
            priority
          />
        </figure>

        <section>
          <p className="mt-10 text-base/7 text-gray-600 dark:text-gray-400">
            When an employee submits a workplace concern, they&apos;re taking a risk. Even when a reporting tool
            promises anonymity, the words themselves can give them away.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            This isn&apos;t paranoia. It&apos;s linguistics.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Writing style is a fingerprint
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Every person writes differently. The words you choose, the length of your sentences, whether you use
            contractions, how you punctuate. These patterns are consistent and surprisingly unique. Researchers have
            been able to identify authors from writing samples for decades, and the same principles apply to workplace
            reporting.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            If you&apos;re the only person within your team who writes &quot;to be honest&quot; or tends to open
            sentences with &quot;Look,&quot;, a perceptive manager may not need your name to know it was you.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Why this matters for anonymous reporting
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Most anonymous reporting tools stop at removing your name. They don&apos;t touch the content. So while your
            identity isn&apos;t technically attached to the submission, your voice still is. In small teams, this is a
            real concern. The fewer people in the room, the easier it is to narrow down who said what.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            How HowsWork handles this
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              HowsWork
            </Link>{" "}
            gives employees the option to have their concern rewritten by AI before it reaches an employer. The original
            content is preserved. The incident details, the context, the substance. But the language is stripped of
            identifying patterns, including unusual word choices, stylistic quirks, and familiar phrases, and rewritten
            into a consistent, neutral voice.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            This includes more than just writing style. The AI also removes personal identifiers that could narrow down
            who submitted a concern. References to how long someone has been at the company, details about physical
            appearance, mentions of an accent or the way someone speaks, anything that could be used to identify a
            specific person is removed or rewritten before the concern reaches your employer.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Before the rewritten version is submitted, you can preview it and make sure it still captures what you want
            to say. Nothing is sent until you&apos;re satisfied with it.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            The result is that what an employer receives reflects what happened, not who wrote it.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            When people feel safe, they speak up
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            This isn&apos;t about hiding the truth or protecting misconduct. It&apos;s about making it genuinely safe
            for employees to speak up, so the concerns that need to surface actually do.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            When people feel protected, they report more accurately and more honestly. That&apos;s more honest feedback,
            better outcomes, and ultimately better workplaces.
          </p>
        </section>
      </article>
    </main>
  );
}
