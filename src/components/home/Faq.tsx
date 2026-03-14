const faqs = [
  {
    question: "How do you make holy water?",
    answer:
      "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What do you call someone with no body and no nose?",
    answer: "Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "Why do you never see elephants hiding in trees?",
    answer:
      "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
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
            Can't find the answer you're looking for? Browse our{" "}
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
