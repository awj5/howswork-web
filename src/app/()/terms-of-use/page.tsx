import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | HowsWork",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUse() {
  return (
    <main className="pt-14">
      <article className="mx-auto max-w-4xl px-6 pt-24 sm:pt-32 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          Terms of Use
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
            These terms apply to anyone who uses <strong>HowsWork</strong>, including employers (administrators) who set
            up and manage an account, and employees who access the platform through their employer.
          </p>

          <p className="mt-6 text-xl/8 text-gray-700 dark:text-gray-300">
            By using <strong>HowsWork</strong>, you agree to these terms. If you are accepting on behalf of a company,
            you confirm you have the authority to do so.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            1. What HowsWork is
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <strong>HowsWork</strong> is a continuous psychosocial risk assessment platform for Australian employers.
            Anonymous check-ins and concern reports feed a risk register that records every hazard and the action taken.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            We are not a crisis service, a mental health provider, or a substitute for professional advice. If you or
            someone else is in immediate danger, contact emergency services.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            2. Accounts
          </h3>

          <h3 className="mt-6 text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Administrators
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            You are responsible for keeping your login credentials secure and for all activity that occurs under your
            account. You must provide accurate information when setting up your account and keep it up to date.
          </p>

          <h3 className="mt-6 text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Employees
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Employees access <strong>HowsWork</strong> using a shared rotating PIN issued by the platform. You are
            responsible for keeping PINs secure. If you believe the current PIN has been compromised, contact your
            administrator.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            3. Acceptable use
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">You agree not to:</p>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-base/7 text-gray-600 dark:text-gray-400">
            <li>Use HowsWork for any unlawful purpose</li>
            <li>Submit false, misleading, or malicious content</li>
            <li>Attempt to identify other employees from their anonymous submissions</li>
            <li>Interfere with or disrupt the platform or its infrastructure</li>
            <li>Reverse engineer, copy, or resell any part of the service</li>
          </ul>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            4. Employer responsibilities
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">Administrators are responsible for:</p>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-base/7 text-gray-600 dark:text-gray-400">
            <li>
              Ensuring employees are informed that <strong>HowsWork</strong> is in use
            </li>
            <li>Using the platform and its data in accordance with applicable employment and privacy laws</li>
            <li>
              Not using <strong>HowsWork</strong> data to identify, target, or take adverse action against individual
              employees
            </li>
          </ul>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <strong>HowsWork</strong> provides tools to support legal compliance in some countries. It does not
            constitute legal advice, and we make no warranty that use of the platform satisfies any specific regulatory
            obligation.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            5. Our responsibilities
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">We will:</p>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-base/7 text-gray-600 dark:text-gray-400">
            <li>Use reasonable efforts to keep the platform available and secure</li>

            <li>
              Notify administrators of any material changes to these terms or our{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              Handle your data in accordance with our{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            We do not guarantee uninterrupted access to the platform. Scheduled maintenance or unforeseen outages may
            occur.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            6. Subscriptions and payment
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <strong>HowsWork</strong> is offered on a subscription basis.{" "}
            <Link
              href="/pricing"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Pricing
            </Link>{" "}
            is set out on our website. If a subscription lapses or payment fails, access to the platform may be
            suspended and the account may be closed.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            7. Intellectual property
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            <strong>HowsWork</strong> and its content, features, and functionality are owned by HowsWork Pty Ltd. You
            may not copy, modify, or distribute any part of the platform without our written permission.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Content you submit (such as concern descriptions) remains yours. By submitting it, you grant us permission
            to process and store it as needed to operate the service.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            8. Limitation of liability
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            To the extent permitted by law, HowsWork Pty Ltd is not liable for any indirect, incidental, or
            consequential loss arising from your use of the platform.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            Our total liability to you for any claim arising out of or in connection with these terms will not exceed
            the amount you paid us in the 12 months preceding the claim.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            9. Termination
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            You may stop using <strong>HowsWork</strong> at any time. Administrators can delete their personal account
            from the My Account section, or delete the company and all associated data from Settings.
          </p>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            We may suspend or terminate access if these terms are breached, or if we reasonably believe continued access
            poses a risk to the platform or other users.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            10. Governing law
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            These terms are governed by the laws of Australia. Any disputes will be subject to the non-exclusive
            jurisdiction of the Australian courts.
          </p>

          <h3 className="mt-12 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            11. Changes to these terms
          </h3>

          <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
            We may update these terms from time to time. If we make material changes, we will notify administrators by
            email at least 14 days before they take effect. Continued use of the platform after that date constitutes
            acceptance.
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
