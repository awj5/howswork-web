import Nav from "@/components/company-layout/Nav";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full flex-col">
      <Nav />
      <div className="flex-1 py-10">{children}</div>
    </div>
  );
}
