import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HtmlBackground from "@/components/layout/HtmlBackground";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Use a client component to update HTML bg color */}
      <HtmlBackground />
      <Header />
      {children}
      <Footer />
    </>
  );
}
