import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HtmlBackground from "@/components/layout/HtmlBackground";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white dark:bg-zinc-900">
      {/* Use a client component to update HTML bg color */}
      <HtmlBackground />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
