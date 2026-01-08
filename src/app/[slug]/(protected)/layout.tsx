import { StackedLayout } from "@/components/ui/stacked-layout";
import Nav from "@/components/company/protected-layout/Nav";
import Side from "@/components/company/protected-layout/Side";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StackedLayout navbar={<Nav />} sidebar={<Side />}>
      {children}
    </StackedLayout>
  );
}
