import Image from "next/image";

export default function Mission() {
  return (
    <div className="overflow-hidden pt-24 sm:pt-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="max-w-4xl">
          <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">About us</p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            We built the tool we wished existed
          </h1>

          <p className="mt-6 text-xl/8 text-balance text-gray-700 dark:text-gray-300">
            HowsWork helps businesses identify and manage psychosocial risks before they become injuries, complaints, or
            claims.
          </p>
        </div>

        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              Our mission
            </h2>

            <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
              Most workplaces don&apos;t have a psychosocial safety problem because they don&apos;t care. They have one
              because they have no reliable way to know what&apos;s actually happening on the floor, in the field, or
              across shifts. The people who experience harm rarely tell the people who cause it. And the people
              responsible for fixing it are often the last to find out.
            </p>

            <p className="mt-8 text-base/7 text-gray-600 dark:text-gray-400">
              Formal channels don&apos;t solve this. Workers avoid them because they feel visible, unsafe, or pointless.
              Most concerns never get raised at all. HowsWork exists to fix that. We give employees a genuinely
              anonymous way to raise concerns and share how they&apos;re doing. We give employers the structured
              visibility they need to act early.
            </p>
          </div>

          <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 xl:gap-8">
              <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 dark:shadow-none dark:outline-white/10">
                <Image
                  alt=""
                  src="/img/about/construction.jpg"
                  width={560}
                  height={560}
                  className="block size-full object-cover"
                />
              </div>

              <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40 dark:shadow-none dark:outline-white/10">
                <Image
                  alt=""
                  src="/img/about/office.jpg"
                  width={560}
                  height={560}
                  className="block size-full object-cover"
                />
              </div>

              <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 dark:shadow-none dark:outline-white/10">
                <Image
                  alt=""
                  src="/img/about/hospitality.jpg"
                  width={560}
                  height={560}
                  className="block size-full object-cover"
                />
              </div>

              <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40 dark:shadow-none dark:outline-white/10">
                <Image
                  alt=""
                  src="/img/about/healthcare.jpg"
                  width={560}
                  height={560}
                  className="block size-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="max-lg:mt-16 lg:col-span-1">
            <p className="text-base/7 font-semibold text-gray-500 dark:text-gray-400">The numbers</p>
            <hr className="mt-6 border-t border-gray-200 dark:border-gray-700" />

            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4 dark:border-gray-700">
                <dt className="text-sm/6 text-gray-600 dark:text-gray-400">
                  Annual cost of psychosocial harm to Australian businesses in 2024
                </dt>

                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  $<span>6</span>B
                </dd>
              </div>

              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4 dark:border-gray-700">
                <dt className="text-sm/6 text-gray-600 dark:text-gray-400">
                  Psychosocial hazard categories under the{" "}
                  <a
                    href="https://www.comcare.gov.au/safe-healthy-work/prevent-harm/psychosocial-hazards"
                    target="_blank"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    WHS Code of Practice
                  </a>
                </dt>

                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <span>17</span>
                </dd>
              </div>

              <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4 dark:max-sm:border-gray-700">
                <dt className="text-sm/6 text-gray-600 dark:text-gray-400">
                  Takes five times longer than a physical injury claim
                </dt>

                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <span>5</span>x
                </dd>
              </div>

              <div className="flex flex-col gap-y-2">
                <dt className="text-sm/6 text-gray-600 dark:text-gray-400">
                  Increase in mental health compensation claims over 10 years
                </dt>

                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <span>161</span>%
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
}
