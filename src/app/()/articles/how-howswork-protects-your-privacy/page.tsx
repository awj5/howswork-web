import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How HowsWork protects your privacy | HowsWork",
  alternates: { canonical: "/articles/how-howswork-protects-your-privacy" },
};

export default function HowHowsworkProtectsYourPrivacy() {
  return (
    <main className="pt-14">
      <article className="mx-auto max-w-4xl px-6 pt-24 sm:pt-32 lg:px-8">
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          How HowsWork protects your privacy
        </h2>

        <figure className="mt-10">
          <Image
            src="/img/articles/sergey-zolkin-_UeY8aTI6d0-unsplash-1.jpg"
            alt="How HowsWork protects your privacy"
            width={2000}
            height={1333}
            className="w-full rounded-2xl object-cover"
            priority
          />
        </figure>

        <section>
          <p className="mt-10 text-base/7 text-gray-600 dark:text-gray-400">
            When you raise a workplace concern, you&apos;re putting yourself on the line. Even if a tool promises
            anonymity, it can be hard to know what that actually means in practice. This post explains exactly how{" "}
            <Link
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              HowsWork
            </Link>{" "}
            protects your privacy.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <strong className="font-semibold text-gray-900 dark:text-white">
              No login. No tracking. Fully encrypted.
            </strong>
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Most digital tools tie your actions to your identity. You log in, and everything you do is linked to your
            account. HowsWork works differently.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            There are{" "}
            <Link
              href="/articles/why-we-built-howswork-without-employee-logins/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              no employee accounts
            </Link>
            . No usernames. No passwords. Your whole team accesses HowsWork using a shared rotating PIN. Because
            everyone uses the same PIN, there is no way to link a submission to a specific person. Not for your
            employer, and not for HowsWork.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Your concern is rewritten before your employer sees it
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Even without an account,{" "}
            <Link
              href="/articles/can-your-writing-style-identify-you/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              the words you use can give you away
            </Link>
            . If you&apos;re the only person on your team who uses certain phrases or writes in a particular style, a
            perceptive manager might be able to figure out who submitted a concern.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            That&apos;s why HowsWork gives you the option to have your concern rewritten by AI before it reaches your
            employer. The substance stays the same. What happened, when it happened, and why it matters. But the
            language is stripped of identifying patterns and rewritten in a consistent, neutral voice.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Your employer receives the concern. They just can&apos;t tell it was you.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Use a personal device and network if you can
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            If you access HowsWork on a device or network provided by your employer, there is a possibility that your
            employer could see that you visited the site, even if they cannot see what you submitted. Most employers
            don&apos;t monitor this kind of activity, but if you have any concern about it, we recommend using your
            personal phone or computer and your own internet connection or mobile data. The content of what you
            submit is always protected. This is about making sure even the fact that you visited is private.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            What HowsWork can and cannot see
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            All data submitted through HowsWork is encrypted in transit and at rest. Submissions are not linked to
            any account or personal information. There is no way to trace a response back to a specific person,
            because that information was never collected in the first place.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            This means that even if HowsWork were legally required to hand over data, there would be nothing that
            could identify who submitted any particular concern or check-in response. The anonymity is not a policy.
            It is a structural reality of how the product is built.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Why this matters
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Anonymous reporting only works if employees genuinely believe it. If there&apos;s any doubt, people stay
            silent. And when people stay silent, real workplace issues go unaddressed.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            HowsWork is built around the idea that protection has to be real, not just promised. The design
            decisions, including no accounts, shared PINs, and optional AI rewriting, exist to make that protection
            genuine.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            When people feel safe, they speak up. And that&apos;s better for everyone.
          </p>
        </section>
      </article>
    </main>
  );
}
