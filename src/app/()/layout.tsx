import CountryProvider from "@/components/layout/CountryProvider";
import DashboardProvider from "@/components/layout/DashboardProvider";
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
      <DashboardProvider>
        <div className="bg-white dark:bg-gray-900">
          {/* Use a component to update HTML bg color */}
          <HtmlBackground />
          <Header />
          {children}
          <Footer />
        </div>
      </DashboardProvider>
    </CountryProvider>
  );
}
