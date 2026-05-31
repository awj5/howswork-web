import Link from "next/link";

export default function Post() {
  return (
    <main className="pt-14">
      <div className="bg-white px-6 pt-24 sm:pt-32 lg:px-8 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700 dark:text-gray-300">
          <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Legal</p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            Privacy Policy
          </h1>

          <p className="mt-6 text-gray-600 dark:text-gray-400">
            Effective date: March 11, 2026
            <br />
            Last updated: May 16, 2026
          </p>

          <p className="mt-6 text-xl/8">
            These terms apply to anyone who uses HowsWork, including employers (administrators) who set up and manage an
            account, and employees who access the platform through their employer.
          </p>

          <p className="mt-8 text-xl/8">
            By using HowsWork, you agree to these terms. If you are accepting on behalf of a company, you confirm you
            have the authority to do so.
          </p>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              1. What HowsWork is
            </h2>

            <p className="mt-6">
              HowsWork is a psychological health and safety platform that gives employers a practical system for
              identifying and managing psychosocial risk. It runs regular check-ins, gives employees a trusted anonymous
              channel to raise concerns, and automatically builds a risk register that records what was identified and
              what action was taken.
            </p>

            <p className="mt-8">
              We are not a crisis service, a mental health provider, or a substitute for professional advice. If you or
              someone else is in immediate danger, contact{" "}
              <Link
                href="/articles/urgent-support/"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                emergency services
              </Link>
              .
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              2. Accounts
            </h2>

            <h3 className="mt-6 text-xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              Administrators
            </h3>

            <p className="mt-6">
              You are responsible for keeping your login credentials secure and for all activity that occurs under your
              account. You must provide accurate information when setting up your account and keep it up to date.
            </p>

            <h3 className="mt-6 text-xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              Employees
            </h3>

            <p className="mt-6">
              Employees access HowsWork using a shared rotating PIN issued by the platform. You are responsible for
              keeping PINs secure. If you believe the current PIN has been compromised, contact your administrator.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              3. Acceptable use
            </h2>

            <p className="mt-6">You agree not to:</p>

            <ul
              role="list"
              className="mt-8 max-w-xl list-disc space-y-4 pl-4 text-gray-600 marker:text-indigo-600 dark:text-gray-400 dark:marker:text-indigo-400"
            >
              <li>Use HowsWork for any unlawful purpose</li>
              <li>Submit false, misleading, or malicious content</li>
              <li>Attempt to identify other employees from their anonymous submissions</li>
              <li>Interfere with or disrupt the platform or its infrastructure</li>
              <li>Reverse engineer, copy, or resell any part of the service</li>
            </ul>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              4. Employer responsibilities
            </h2>

            <p className="mt-6">Administrators are responsible for:</p>

            <ul
              role="list"
              className="mt-8 max-w-xl list-disc space-y-4 pl-4 text-gray-600 marker:text-indigo-600 dark:text-gray-400 dark:marker:text-indigo-400"
            >
              <li>Ensuring employees are informed that HowsWork is in use</li>
              <li>Using the platform and its data in accordance with applicable employment and privacy laws</li>
              <li>Not using HowsWork data to identify, target, or take adverse action against individual employees</li>
            </ul>

            <p className="mt-8">
              HowsWork provides tools to support legal compliance in some countries. It does not constitute legal
              advice, and we make no warranty that use of the platform satisfies any specific regulatory obligation.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              5. Our responsibilities
            </h2>

            <p className="mt-6">We will:</p>

            <ul
              role="list"
              className="mt-8 max-w-xl list-disc space-y-4 pl-4 text-gray-600 marker:text-indigo-600 dark:text-gray-400 dark:marker:text-indigo-400"
            >
              <li>Use reasonable efforts to keep the platform available and secure</li>

              <li>
                Notify administrators of any material changes to these terms or our{" "}
                <Link
                  href="/articles/privacy-policy/"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                Handle your data in accordance with our{" "}
                <Link
                  href="/articles/privacy-policy/"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <p className="mt-8">
              We do not guarantee uninterrupted access to the platform. Scheduled maintenance or unforeseen outages may
              occur.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              6. Subscriptions and payment
            </h2>

            <p className="mt-6">
              HowsWork is offered on a subscription basis.{" "}
              <Link
                href="/pricing"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Pricing
              </Link>{" "}
              is set out on our website. If a subscription lapses or payment fails, access to the platform may be
              suspended and the account may be closed.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              7. Intellectual property
            </h2>

            <p className="mt-6">
              HowsWork and its content, features, and functionality are owned by HowsWork Pty Ltd. You may not copy,
              modify, or distribute any part of the platform without our written permission.
            </p>

            <p className="mt-8">
              Content you submit (such as concern descriptions) remains yours. By submitting it, you grant us permission
              to process and store it as needed to operate the service.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              8. Limitation of liability
            </h2>

            <p className="mt-6">
              To the extent permitted by law, HowsWork Pty Ltd is not liable for any indirect, incidental, or
              consequential loss arising from your use of the platform.
            </p>

            <p className="mt-8">
              Our total liability to you for any claim arising out of or in connection with these terms will not exceed
              the amount you paid us in the 12 months preceding the claim.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              9. Termination
            </h2>

            <p className="mt-6">
              You may stop using HowsWork at any time. Administrators can delete their personal account from the My
              Account section, or delete the company and all associated data from Settings.
            </p>

            <p className="mt-8">
              We may suspend or terminate access if these terms are breached, or if we reasonably believe continued
              access poses a risk to the platform or other users.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              10. Governing law
            </h2>

            <p className="mt-6">
              These terms are governed by the laws of Australia. Any disputes will be subject to the non-exclusive
              jurisdiction of the Australian courts.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              11. Changes to these terms
            </h2>

            <p className="mt-6">
              We may update these terms from time to time. If we make material changes, we will notify administrators by
              email at least 14 days before they take effect. Continued use of the platform after that date constitutes
              acceptance.
            </p>
          </div>

          <div className="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              12. Contact
            </h2>

            <p className="mt-6">
              HowsWork Pty Ltd
              <br />
              ACN 682 840 884
              <br />
              legal@howswork.app
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
