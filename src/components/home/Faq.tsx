const faqs = [
  {
    question: "Are reported concerns really anonymous?",
    answer: (
      <>
        Yes. There are{" "}
        <a
          href="https://articles.howswork.app/why-we-built-howswork-without-employee-logins/"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          target="_blank"
        >
          no accounts and no logins
        </a>
        . Your team accesses HowsWork using a shared rotating PIN, so there&apos;s no way to link a reported concern to
        an individual.
      </>
    ),
  },
  {
    question: "How long does it take to set up?",
    answer:
      "Most employers are up and running in under 15 minutes. You add your team, schedule your first check-in, and HowsWork handles the rest. No IT support required.",
  },
  {
    question: "What are check-ins and how do they work?",
    answer: (
      <>
        Check-ins go out on a schedule you set, asking how work is going and what&apos;s getting in the way. Answers are
        anonymous and take under a minute, so people actually complete them.
        <br />
        <br />
        Rather than one long survey a year, HowsWork assesses continuously. One check-in is a single data point. Across
        weeks and months they show which hazards are present, how often, and where, and every response feeds your{" "}
        <a
          href="https://articles.howswork.app/why-every-employer-needs-a-risk-register-and-how-howswork-builds-one-for-you/"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          target="_blank"
        >
          risk register
        </a>
        .
      </>
    ),
  },
  {
    question: "Can I use HowsWork for free?",
    answer:
      "Yes. Smaller teams can use HowsWork at no cost. A subscription gives you a larger team limit, additional admins, and AI features.",
  },
  {
    question: "Which laws does HowsWork help me comply with?",
    answer: (
      <>
        HowsWork is built around{" "}
        <a
          href="https://www.safeworkaustralia.gov.au/safety-topic/managing-health-and-safety/mental-health/psychosocial-hazards"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          target="_blank"
        >
          Australia&apos;s Work Health and Safety laws
        </a>{" "}
        and the psychosocial hazard regulations that came into effect across most states and territories from 2023.
      </>
    ),
  },
  {
    question: "Is this the same as psychological safety?",
    answer: (
      <>
        They&apos;re related.{" "}
        <a
          href="https://articles.howswork.app/psychological-safety-vs-psychosocial-risk-whats-the-difference/"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          target="_blank"
        >
          Psychological safety
        </a>{" "}
        is the outcome: a team that feels safe to speak up. Psychosocial hazard management is the legal obligation that
        gets you there.
      </>
    ),
  },
];

export default async function Faq() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 sm:pt-56 lg:px-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Frequently asked questions
          </h2>

          <p className="mt-4 text-base/7 text-gray-600 dark:text-gray-400">
            Can&apos;t find the answer you&apos;re looking for? Browse our{" "}
            <a
              href="https://articles.howswork.app"
              target="_blank"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              resources
            </a>
            .
          </p>
        </div>

        <div className="mt-10 lg:col-span-7 lg:mt-0">
          <dl className="space-y-10">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">{faq.question}</dt>
                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
