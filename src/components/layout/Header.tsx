import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <Image src="/img/logo.svg" width={728} height={128} alt="HowsWork" className="h-8 w-auto dark:hidden" />

        <Image
          src="/img/logo-dark.svg"
          width={728}
          height={128}
          alt="HowsWork"
          className="h-7 w-auto not-dark:hidden"
        />

        <div className="flex flex-1 justify-end">
          <a href="https://admin.howswork.app" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
            Employer log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
