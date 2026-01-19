import ConcernDialogProvider from "@/components/company/protected-layout/ConcernDialogProvider";
import { StackedLayout } from "@/components/ui/stacked-layout";
import Nav from "@/components/company/protected-layout/Nav";
import Side from "@/components/company/protected-layout/Side";
import Concern from "@/components/company/protected-layout/Concern";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConcernDialogProvider>
      <StackedLayout navbar={<Nav />} sidebar={<Side />}>
        {children}
        <Concern />
      </StackedLayout>
    </ConcernDialogProvider>
  );
}
