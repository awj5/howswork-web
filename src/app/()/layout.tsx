import { Suspense } from "react";
import CountryProvider from "@/components/layout/CountryProvider";
import LoggedInProvider from "@/components/layout/LoggedInProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HtmlBackground from "@/components/layout/HtmlBackground";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CountryProvider>
      <Suspense>
        <LoggedInProvider>
          <div className="bg-white dark:bg-gray-900">
            {/* Use a component to update HTML bg color */}
            <HtmlBackground />
            <Header />
            {children}
            <Footer />
          </div>
        </LoggedInProvider>
      </Suspense>
    </CountryProvider>
  );
}
