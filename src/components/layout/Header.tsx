import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <Image src="/img/logo.svg" width={728} height={128} alt="HowsWork" className="h-7 w-auto dark:hidden" />

        <Image
          src="/img/logo-dark.svg"
          width={728}
          height={128}
          alt="HowsWork"
          className="h-7 w-auto not-dark:hidden"
        />

        <a href="https://admin.howswork.app" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
          Employer log in <span aria-hidden="true">&rarr;</span>
        </a>
      </nav>
    </header>
  );
}
