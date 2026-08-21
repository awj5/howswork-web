import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Australia: Psychosocial risk at work, what employers need to know | HowsWork",
  alternates: { canonical: "/articles/psychosocial-risk-at-work-what-australian-employers-need-to-know" },
};

export default function PsychosocialRiskAtWorkWhatAustralianEmployersNeedToKnow() {
  return (
    <main className="pt-14">
      <article className="mx-auto max-w-4xl px-6 pt-24 sm:pt-32 lg:px-8">
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          Australia: Psychosocial risk at work, what employers need to know
        </h2>

        <figure className="mt-10">
          <Image
            src="/img/articles/joey-csunyo-2EGuIR00UTk-unsplash.jpg"
            alt="Australia: Psychosocial risk at work, what employers need to know"
            width={2000}
            height={1334}
            className="w-full rounded-2xl object-cover"
            priority
          />
        </figure>

        <section>
          <p className="mt-10 text-base/7 text-gray-600 dark:text-gray-400">
            If you&apos;re an Australian employer, managing psychosocial risk is no longer optional. Model WHS
            regulation changes introduced in 2023 now formally require employers to identify, assess, and control
            psychosocial hazards in the workplace, treating them with the same seriousness as physical hazards.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">Here is what you need to know.</p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            What is a psychosocial hazard?
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            A{" "}
            <a
              href="https://www.safeworkaustralia.gov.au/safety-topic/managing-health-and-safety/mental-health/psychosocial-hazards"
              rel="noreferrer"
              target="_blank"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              psychosocial hazard
            </a>{" "}
            is anything that could cause psychological harm at work. This includes how work is designed and managed, the
            working environment, and workplace interactions and behaviours.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Common examples include excessive workload, poor role clarity, lack of support, bullying, harassment, low
            job control, and exposure to traumatic events. These hazards can cause psychological harm such as anxiety,
            depression, and post-traumatic stress disorder, as well as physical harm including musculoskeletal injuries
            and fatigue-related illness.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            What changed in 2023?
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            The model WHS Regulation amendments for psychosocial risks commenced in April 2023 and apply across all
            model WHS jurisdictions. The exception is Victoria, which has its own occupational health and safety
            framework.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            For the first time, the Work Health and Safety Regulations explicitly prescribe how employers must identify
            and manage hazards and risks to workers&apos; psychological health and safety. Before these changes,
            psychological health was covered under the general duty of care. The 2023 regulations made these obligations
            explicit.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            In July 2025, NSW went further by introducing a positive duty on psychosocial hazards, requiring employers
            to proactively prevent harm rather than simply respond to it. This makes NSW one of the more stringent
            jurisdictions on psychosocial risk.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            What are employers required to do?
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Under the{" "}
            <a
              href="https://www.safeworkaustralia.gov.au/doc/model-code-practice-managing-psychosocial-hazards-work"
              rel="noreferrer"
              target="_blank"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              WHS framework
            </a>
            , employers, referred to as persons conducting a business or undertaking or PCBUs, must:
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Identify psychosocial hazards in consultation with workers. Assess the risks those hazards create,
            considering the duration, frequency, and severity of exposure. Implement control measures that are
            reasonably practicable. Review those measures regularly and update them as needed.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Compliance is not a one-time task. PCBUs should regularly assess the effectiveness of implemented control
            measures, seek worker feedback, and refine policies based on emerging risks or legislative updates.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            What does &quot;reasonably practicable&quot; mean?
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            This is a key legal concept in Australian WHS law. It means employers are not expected to eliminate every
            possible risk, but they are expected to do what a reasonable person in their position would do, given what
            they know about the hazard and what is technically and financially feasible to address it.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            What about Victoria?
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Victoria has its own framework.{" "}
            <a
              href="https://www.worksafe.vic.gov.au/psychological-health"
              rel="noreferrer"
              target="_blank"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              The Occupational Health and Safety (Psychological Health) Regulations 2025
            </a>{" "}
            commenced in December 2025 and established standalone obligations for psychosocial risk management,
            requiring employers to identify hazards such as work design, systems of work, and interpersonal
            interactions.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            What happens if employers do not comply?
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            In October 2023, Court Services Victoria was prosecuted, pleaded guilty and fined $379,157 for failing to
            properly identify and assess risks in relation to the psychological health of its employees. This case made
            clear that regulators are willing to prosecute, and that the cost of non-compliance can be significant.
          </p>

          <h2 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            How HowsWork helps
          </h2>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              HowsWork
            </Link>{" "}
            is a continuous psychosocial risk assessment platform for Australian employers. Anonymous check-ins and
            concern reports feed a risk register that records every hazard and the action taken.
          </p>
        </section>
      </article>
    </main>
  );
}
