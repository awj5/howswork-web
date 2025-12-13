import Nav from "@/components/company-layout/Nav";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full">
      <Nav />
      {children}
    </div>
  );
}
