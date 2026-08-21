import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why every employer needs a risk register and how HowsWork builds one for you | HowsWork",
  alternates: {
    canonical: "/articles/why-every-employer-needs-a-risk-register-and-how-howswork-builds-one-for-you",
  },
};

export default function WhyEveryEmployerNeedsARiskRegisterAndHowHowsworkBuildsOneForYou() {
  return (
    <main className="pt-14">
      <article className="mx-auto max-w-4xl px-6 pt-24 sm:pt-32 lg:px-8">
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          Why every employer needs a risk register and how HowsWork builds one for you
        </h2>

        <figure className="mt-10">
          <Image
            src="/img/articles/wesley-tingey-snNHKZ-mGfE-unsplash.jpg"
            alt="Why every employer needs a risk register and how HowsWork builds one for you"
            width={2000}
            height={1333}
            className="w-full rounded-2xl object-cover"
            priority
          />
        </figure>

        <section>
          <p className="mt-10 text-base/7 text-gray-600 dark:text-gray-400">
            Knowing what is actually happening in your workplace is harder than it sounds. Concerns get raised
            informally, patterns go unnoticed, and by the time something becomes serious enough to document, the
            early signals have long since passed without being recorded.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              HowsWork
            </Link>{" "}
            includes a built-in risk register that populates automatically from the check-ins and concerns your
            employees submit. Here is how it works.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            What is a risk register?
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            A risk register is a record of the issues identified in a workplace and the steps taken to address them.
            It captures what concerns have been raised, what they point to, and what has been done in response.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            A well-maintained risk register serves two purposes. It helps employers understand what is actually
            happening with their people so they can act on it. And it provides a documented record that demonstrates
            the employer took their duty of care seriously, which matters if an employee ever makes a formal
            complaint or legal claim.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            The problem with manual risk registers
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Most risk registers are built manually. Someone has to compile information from various sources, write
            up descriptions of issues, sort them, and keep the register updated over time.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            In practice this rarely happens consistently. Manual processes depend on someone having the time, the
            information, and the motivation to maintain them. When workplaces are busy, which they usually are, the
            register falls behind. By the time an issue surfaces formally, the warning signs are long forgotten.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            How the HowsWork risk register works
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            When an employee submits a concern through HowsWork, it does not just sit in an inbox. It is
            automatically processed and added to your risk register.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            HowsWork uses AI to generate a clear, professional description of the concern, removing any identifying
            language in the process. It sorts the concern, assigns a risk level, and adds it to the risk register
            with a timestamp and source reference.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            The result is a risk register that builds itself as concerns come in, without anyone having to manually
            write up, sort, or file anything.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Check-ins feed the risk register too
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Regular check-ins are another source of data for your risk register. When responses flag patterns, such
            as consistently low scores around job demands, lack of support, or conflict between team members,
            HowsWork identifies those patterns and surfaces them as register entries.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            This means your risk register captures not just the concerns employees choose to raise directly, but the
            patterns that emerge across check-ins over time. Early signals that might otherwise go unnoticed become
            part of the documented record.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            You are notified the moment a risk is added
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            When a new entry is added to your risk register, HowsWork notifies you immediately. You do not need to
            log in and check. The alert comes to you, so nothing sits unacknowledged and no concern goes unnoticed.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            This matters because the speed of your response is part of the record too. A concern that was
            acknowledged and acted on promptly tells a very different story to one that sat in a system for weeks.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            AI-generated summaries
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Each entry in your risk register includes an AI-generated summary written in clear, plain language.
            These summaries are readable by anyone who needs to review the register, including leadership, legal
            counsel, HR, or external advisors, without requiring them to interpret raw data or read through
            individual submissions.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            When an issue is raised, the AI also generates next step recommendations to help you determine an
            appropriate response.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            You can edit any AI-generated summary before it becomes part of your record, or remove it entirely if it
            does not accurately reflect the concern. The register is yours to manage.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            When you take action on an issue, an AI-generated summary of your response is added to the risk
            register, creating a clear record of what was identified, what was done, and when.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Audit-ready by design
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            The HowsWork risk register is designed to be audit-ready from the moment it starts being populated.
            Every entry is timestamped, sourced, and classified. The full history of identified issues and actions
            taken is preserved and exportable.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            If an employee ever raises a formal complaint, pursues a legal claim, or a regulator asks questions, your
            risk register gives you documented evidence that you knew, you cared, and you acted.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            The register that never gets built
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Most employers want to do the right thing by their people. The barrier is usually not motivation but
            capacity. Building and maintaining a risk register manually takes time that most workplaces simply do
            not have.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            The{" "}
            <Link
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              HowsWork
            </Link>{" "}
            risk register removes that barrier. It exists, it is current, and it reflects what is actually happening
            in your workplace, because it is built from the data your employees generate in real time.
          </p>
        </section>
      </article>
    </main>
  );
}
