import Link from "next/link";

export default function Cta() {
  return (
    <div className="mx-auto max-w-7xl pt-24 sm:px-6 sm:pt-32 lg:px-8">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16 dark:bg-gray-800 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-0 dark:after:inset-ring dark:after:inset-ring-white/10 dark:after:sm:rounded-3xl">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Ready to get started?
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
          Book a demo and we'll walk you through how HowsWork works for your team and your industry.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/contact/demo"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring dark:inset-ring-white/5 dark:hover:bg-white/15 dark:focus-visible:outline-white"
          >
            Book a demo
          </Link>

          <Link href="/" className="text-sm/6 font-semibold text-white">
            Learn more
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
        >
          <circle r={512} cx={512} cy={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />

          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
