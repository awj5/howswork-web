import Nav from "@/components/company/layout/Nav";
import AccessGuard from "@/components/company/layout/AccessGuard";

export default async function ProtectedLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  return (
    <div className="flex h-full flex-col">
      <Nav />

      <div className="flex-1 py-10">
        <AccessGuard slug={slug}>{children}</AccessGuard>
      </div>
    </div>
  );
}
