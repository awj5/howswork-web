import Image from "next/image";
import Link from "next/link";

export default function Post() {
  return (
    <main className="pt-14">
      <div className="bg-white px-6 pt-24 sm:pt-32 lg:px-8 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700 dark:text-gray-300">
          <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Compliance</p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            Australia: Psychosocial risk at work, what employers need to know
          </h1>

          <Image
            alt=""
            src="/img/articles/joey-csunyo-2EGuIR00UTk-unsplash.jpg"
            width={2000}
            height={1334}
            className="mt-8 aspect-video rounded-xl bg-gray-50 object-cover dark:bg-gray-800"
          />

          <p className="mt-10 text-xl/8">
            If you&apos;re an Australian employer, managing psychosocial risk is no longer optional. Model WHS
            regulation changes introduced in 2023 now formally require employers to identify, assess, and control
            psychosocial hazards in the workplace, treating them with the same seriousness as physical hazards.
          </p>

          <p className="mt-8 text-xl/8">Here is what you need to know.</p>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              What is a psychosocial hazard?
            </h2>

            <p className="mt-6">
              A{" "}
              <a
                href="https://www.safeworkaustralia.gov.au/safety-topic/managing-health-and-safety/mental-health/psychosocial-hazards"
                target="_blank"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                psychosocial hazard
              </a>{" "}
              is anything that could cause psychological harm at work. This includes how work is designed and managed,
              the working environment, and workplace interactions and behaviours.
            </p>

            <p className="mt-8">
              Common examples include excessive workload, poor role clarity, lack of support, bullying, harassment, low
              job control, and exposure to traumatic events. These hazards can cause psychological harm such as anxiety,
              depression, and post-traumatic stress disorder, as well as physical harm including musculoskeletal
              injuries and fatigue-related illness.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              What changed in 2023?
            </h2>

            <p className="mt-6">
              The model WHS Regulation amendments for psychosocial risks commenced in April 2023 and apply across all
              model WHS jurisdictions. The exception is Victoria, which has its{" "}
              <Link
                href="/articles/victorias-new-psychosocial-health-laws-what-employers-need-to-know/"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                own occupational health and safety framework
              </Link>
              .
            </p>

            <p className="mt-8">
              For the first time, the Work Health and Safety Regulations explicitly prescribe how employers must
              identify and manage hazards and risks to workers&apos; psychological health and safety. Before these
              changes, psychological health was covered under the general duty of care. The 2023 regulations made these
              obligations explicit.
            </p>

            <p className="mt-8">
              In July 2025, NSW went further by introducing a positive duty on psychosocial hazards, requiring employers
              to proactively prevent harm rather than simply respond to it. This makes NSW one of the{" "}
              <Link
                href="articles/psychosocial-risk-in-nsw-what-employers-need-to-know/"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                more stringent jurisdictions on psychosocial risk
              </Link>
              .
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              What are employers required to do?
            </h2>

            <p className="mt-6">
              Under the{" "}
              <a
                href="https://www.safeworkaustralia.gov.au/doc/model-code-practice-managing-psychosocial-hazards-work?ref=articles.howswork.app"
                target="_blank"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                WHS framework
              </a>
              , employers, referred to as persons conducting a business or undertaking or PCBUs, must:
            </p>

            <p className="mt-8">
              Identify psychosocial hazards in consultation with workers. Assess the risks those hazards create,
              considering the duration, frequency, and severity of exposure. Implement control measures that are
              reasonably practicable. Review those measures regularly and update them as needed.
            </p>

            <p className="mt-8">
              Compliance is not a one-time task. PCBUs should regularly assess the effectiveness of implemented control
              measures, seek worker feedback, and refine policies based on emerging risks or legislative updates.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              What does "reasonably practicable" mean?
            </h2>

            <p className="mt-6">
              This is a key legal concept in Australian WHS law. It means employers are not expected to eliminate every
              possible risk, but they are expected to do what a reasonable person in their position would do, given what
              they know about the hazard and what is technically and financially feasible to address it.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              What about Victoria?
            </h2>

            <p className="mt-6">
              Victoria has its own framework.{" "}
              <a
                href="https://www.worksafe.vic.gov.au/psychological-health?ref=articles.howswork.app"
                target="_blank"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                The Occupational Health and Safety (Psychological Health) Regulations 2025
              </a>{" "}
              commenced in December 2025 and established standalone obligations for psychosocial risk management,
              requiring employers to identify hazards such as work design, systems of work, and interpersonal
              interactions.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              What happens if employers do not comply?
            </h2>

            <p className="mt-6">
              In October 2023, Court Services Victoria was prosecuted, pleaded guilty and fined $379,157 for failing to
              properly identify and assess risks in relation to the psychological health of its employees. This case
              made clear that regulators are willing to prosecute, and that the cost of non-compliance can be
              significant.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              How HowsWork helps
            </h2>

            <p className="mt-6">
              HowsWork makes it simple for Australian businesses to manage psychosocial risk on an ongoing basis. It
              gives employees a trusted, anonymous channel to raise concerns, runs regular check-ins to surface how your
              team is experiencing work, and builds an automated risk register so you can demonstrate you are actively
              identifying and managing psychosocial hazards.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
