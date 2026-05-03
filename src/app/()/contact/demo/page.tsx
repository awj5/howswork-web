import Form from "@/components/contact/Form";

export default function Demo() {
  return (
    <main className="pt-14">
      <div className="isolate bg-white px-6 pt-24 sm:pt-32 lg:px-8 dark:bg-gray-900">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75 dark:opacity-20"
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
            Get a personal walkthrough
          </h2>

          <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-400">
            See how HowsWork helps you identify, document, and manage psychosocial risks in your workplace.
          </p>
        </div>

        <Form
          to="support@howswork.app"
          subject="Demo request"
          placeholder="Let us know your availability"
          buttonText="Request a demo"
          successText="Demo request sent"
        />
      </div>
    </main>
  );
}
