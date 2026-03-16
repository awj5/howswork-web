const faqs = [
  {
    question: "Are submissions really anonymous?",
    answer:
      "Yes. There are no accounts and no logins. Everyone on your team accesses HowsWork using a shared rotating PIN, so there\u2019s no way to link a submission to an individual.",
  },
  {
    question: "Which laws does HowsWork help me comply with?",
    answer: (
      <>
        HowsWork is built around{" "}
        <a
          href="https://www.safeworkaustralia.gov.au/safety-topic/managing-health-and-safety/mental-health/psychosocial-hazards"
          className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          target="_blank"
        >
          Australia&apos;s Work Health and Safety laws
        </a>{" "}
        and the psychosocial hazard regulations that came into effect across most states and territories from 2023.
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
    answer:
      "Check-ins are short pulse surveys sent automatically to your team on a schedule you set. They take less than a minute to complete and feed into your risk register.",
  },
  {
    question: "Can employees be identified from their check-in responses?",
    answer:
      "No. Responses are never linked to an account or identity. Neither your organisation nor HowsWork can trace a response back to a specific person.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "No, but you can get started for free. Smaller teams can use HowsWork at no cost. As your team grows, a subscription unlocks check-in results and reported concerns.",
  },
];

export default function Faq() {
  return (
    <div id="faq" className="mx-auto max-w-7xl px-6 pt-32 sm:pt-56 lg:px-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Frequently asked questions
          </h2>

          <p className="mt-4 text-base/7 text-gray-600 dark:text-gray-400">
            Can&apos;t find the answer you&apos;re looking for? Browse our{" "}
            <a
              href="https://articles.howswork.app"
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
