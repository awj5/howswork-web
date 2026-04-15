import CountryProvider from "@/components/layout/CountryProvider";
import AdminCompanyProvider from "@/components/layout/AdminCompanyProvider";
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
      <AdminCompanyProvider>
        <div className="bg-white dark:bg-gray-900">
          {/* Use a component to update HTML bg color */}
          <HtmlBackground />
          <Header />
          {children}
          <Footer />
        </div>
      </AdminCompanyProvider>
    </CountryProvider>
  );
}
