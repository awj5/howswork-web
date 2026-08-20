import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | HowsWork",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <main className="pt-14">
      <article className="mx-auto max-w-4xl px-6 pt-24 sm:pt-32 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          Privacy Policy
        </h2>

        <section>
          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <em>
              Effective date: March 11, 2026
              <br />
              Last updated: May 16, 2026
            </em>
          </p>

          <p className="mt-6 text-xl/8 text-gray-700 dark:text-gray-300">
            <strong>HowsWork</strong> is a continuous psychosocial risk assessment platform for Australian employers.
            Anonymous check-ins and concern reports feed a risk register that records every hazard and the action taken.
          </p>

          <p className="mt-6 text-xl/8 text-gray-700 dark:text-gray-300">
            This policy covers both employees using <strong>HowsWork</strong> through their employer, and employers
            (administrators) managing the platform.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            1. Who we are
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            HowsWork Pty Ltd (ACN 682 840 884) is the data controller for this service.
            <br />
            Questions? Contact us at: legal@howswork.app
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            2. What we collect
          </h3>

          <h3 className="mt-6 text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            From employees
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            When you complete a check-in or submit a concern, we may collect:
          </p>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-base/7 text-gray-600 dark:text-gray-400">
            <li>Your sentiment rating and any issue tags you select</li>
            <li>A written description of your concern, if you choose to provide one</li>
            <li>Whether you've attributed a check-in to a team (optional)</li>
          </ul>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <strong>About your identity:</strong> Your employer provides us with your work email address or phone number
            solely to deliver a rotating access PIN. Once the PIN is issued, your contact details are not linked to your
            check-ins. We never connect your name or contact information to what you submit.
          </p>

          <h3 className="mt-6 text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            From administrators
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            When you set up and manage a <strong>HowsWork</strong> account, we collect:
          </p>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-base/7 text-gray-600 dark:text-gray-400">
            <li>Your name and work email address</li>
            <li>Company details (name, size, timezone)</li>

            <li>
              Billing information (handled securely via our payment provider{" "}
              <a
                href="https://stripe.com/"
                rel="noreferrer"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                target="_blank"
              >
                Stripe
              </a>
              )
            </li>

            <li>Usage data such as which features you access and when</li>
          </ul>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            3. How we use your data
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">We use employee data to:</p>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-base/7 text-gray-600 dark:text-gray-400">
            <li>Aggregate anonymous check-in results for employer reporting</li>
            <li>Flag patterns or threshold breaches that may require an employer's attention</li>
            <li>Improve the accuracy and relevance of the platform</li>
          </ul>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">We use administrator data to:</p>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-base/7 text-gray-600 dark:text-gray-400">
            <li>
              Operate and deliver the <strong>HowsWork</strong> service
            </li>

            <li>Send you account notifications and product updates</li>
            <li>Provide customer support</li>
            <li>Meet our legal and regulatory obligations</li>
          </ul>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            4. Anonymity
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Employee check-ins and concerns are anonymous by design. The PIN-based identifier is a shared rotating code,
            it cannot be reverse-engineered to identify you. Employers see only aggregated data unless you explicitly
            choose to submit a named concern.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            We take this seriously. Anonymity is the foundation of honest reporting.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            5. Who we share data with
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            We do not sell your data. We may share data with:
          </p>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-base/7 text-gray-600 dark:text-gray-400">
            <li>
              Infrastructure providers (e.g.{" "}
              <a
                href="https://supabase.com/"
                rel="noreferrer"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                target="_blank"
              >
                Supabase
              </a>{" "}
              for database hosting,{" "}
              <a
                href="https://resend.com/"
                rel="noreferrer"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                target="_blank"
              >
                Resend
              </a>{" "}
              for email,{" "}
              <a
                href="https://www.twilio.com/"
                rel="noreferrer"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                target="_blank"
              >
                Twilio
              </a>{" "}
              for SMS), only to the extent needed to operate the service
            </li>

            <li>Your employer, aggregated and anonymous employee data only, unless you submit a named concern</li>

            <li>
              Law enforcement or regulators, if required by law. As concerns and check-ins are submitted anonymously
              with no account or login, we are unable to identify which individual submitted any particular response,
              even if compelled to do so.
            </li>

            <li>
              AI processing providers (e.g.{" "}
              <a
                href="https://openai.com/"
                rel="noreferrer"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                target="_blank"
              >
                OpenAI
              </a>
              ), used to generate privacy-preserving summaries of concern text
            </li>
          </ul>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            All third-party providers are bound by data processing agreements and are required to protect your data.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            6. Where your data is stored
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <strong>HowsWork</strong> stores data in Australia (Asia Pacific – Sydney region). If you are accessing the
            platform from outside Australia, please be aware that your data will be transferred to and stored in
            Australia.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            7. How long we keep your data
          </h3>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-base/7 text-gray-600 dark:text-gray-400">
            <li>
              Employee check-in data: retained for the duration of your employer's active subscription, then deleted
              within 90 days of account closure
            </li>

            <li>Administrator account data: retained for the duration of the subscription</li>
            <li>You can request deletion of your data at any time (see Section 9)</li>
          </ul>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            8. Security
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            We use industry-standard security measures including:
          </p>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-base/7 text-gray-600 dark:text-gray-400">
            <li>Encryption in transit (HTTPS/TLS) and at rest</li>
            <li>Row-level security on our database</li>

            <li>
              Access controls limiting who within <strong>HowsWork</strong> can view data
            </li>
          </ul>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            No system is perfectly secure. If we become aware of a breach affecting your data, we will notify you in
            accordance with Australian Privacy Act requirements.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            9. Your rights
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Under the Australian Privacy Act 1988, you have the right to:
          </p>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-base/7 text-gray-600 dark:text-gray-400">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Complain about how we've handled your data</li>
          </ul>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            To exercise any of these rights, email legal@howswork.app. We will respond within 30 days.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            If you're not satisfied with our response, you can lodge a complaint with the Office of the Australian
            Information Commissioner (OAIC) at{" "}
            <a
              href="https://www.oaic.gov.au/"
              rel="noreferrer"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              target="_blank"
            >
              oaic.gov.au
            </a>
            .
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            10. Cookies
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <strong>HowsWork</strong> uses cookies and similar technologies to keep you logged in, remember your
            preferences, and understand how the platform is being used. We do not use cookies for advertising.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            11. Changes to this policy
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            If we make material changes to this policy, we'll notify administrators by email at least 14 days before the
            changes take effect. The current version will always be available here at
            https://articles.howswork.app/privacy.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            12. Contact
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            HowsWork Pty Ltd
            <br />
            ACN 682 840 884
            <br />
            legal@howswork.app
            <br />
            <Link href="/">howswork.app</Link>
          </p>
        </section>
      </article>
    </main>
  );
}
