import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
