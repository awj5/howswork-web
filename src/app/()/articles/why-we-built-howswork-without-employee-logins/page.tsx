import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why we built HowsWork without employee logins | HowsWork",
  alternates: { canonical: "/articles/why-we-built-howswork-without-employee-logins" },
};

export default function WhyWeBuiltHowsworkWithoutEmployeeLogins() {
  return (
    <main className="pt-14">
      <article className="mx-auto max-w-4xl px-6 pt-24 sm:pt-32 lg:px-8">
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          Why we built HowsWork without employee logins
        </h2>

        <figure className="mt-10">
          <Image
            src="/img/articles/zulfugar-karimov-2_rlRMukZO4-unsplash.jpg"
            alt="Why we built HowsWork without employee logins"
            width={2000}
            height={1333}
            className="w-full rounded-2xl object-cover"
            priority
          />
        </figure>

        <section>
          <p className="mt-10 text-base/7 text-gray-600 dark:text-gray-400">
            When we started building{" "}
            <Link
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              HowsWork
            </Link>
            , one of the first decisions we made was to remove employee accounts entirely. No usernames. No passwords.
            No individual logins of any kind.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            It was a deliberate choice, and it shapes everything about how the product works.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            The problem with accounts
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Most workplace tools are built around identity. You log in, and everything you do is tied to your account.
            That makes sense for most software. But for a tool designed to help employees raise sensitive workplace
            concerns, it creates a fundamental problem.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            If an employee submits a concern through a tool that knows who they are, the promise of anonymity is always
            conditional. It depends on the platform never being breached, the employer never being given access to
            identifying data, and no one ever being able to connect a submission to a specific person. That is a lot to
            ask someone to trust, especially when they are already in a vulnerable position.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            We wanted to build something where the anonymity was structural, not just promised.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            How HowsWork works instead
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Rather than individual accounts, everyone on a team accesses HowsWork using a shared rotating PIN. The PIN
            changes regularly, and because everyone uses the same one, there is no way to link a submission to a
            specific person. Not for the employer, and not for us.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            This means when an employee submits a concern, there is no account record, no login timestamp, no user ID.
            There is simply a concern, stripped of the information that would make it traceable.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            The trust problem in anonymous reporting
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Anonymous reporting only works if employees genuinely believe it is anonymous. If there is any doubt, people
            stay silent. And when people stay silent, real workplace issues go unaddressed.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            We have seen this play out in research and in practice. Tools that require individual logins, even when they
            promise anonymity, see lower participation rates because employees do not fully trust them. The mechanism
            matters as much as the promise.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            By removing accounts entirely, we removed the doubt. There is no login to trace, because there was never a
            login to begin with.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            The tradeoff
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            We are aware this approach has a tradeoff. Without individual accounts, employers cannot see response rates
            at an individual level or send tailored reminders. Some analytics that would be possible with accounts are
            not available.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            We made that tradeoff deliberately. The value of a reporting tool depends entirely on whether employees use
            it honestly. Protecting that trust is more important than the data we give up by not having accounts.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            What this means for employers
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            For employers, the no-login model means you can genuinely tell your team that submissions cannot be traced
            back to them. Not because of a privacy policy. Because of how the system is built.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            That is a meaningful thing to be able to say.
          </p>
        </section>
      </article>
    </main>
  );
}
