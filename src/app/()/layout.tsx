import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
