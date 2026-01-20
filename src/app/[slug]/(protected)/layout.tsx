import DialogProvider from "@/components/company/protected-layout/DialogProvider";
import { StackedLayout } from "@/components/ui/stacked-layout";
import Nav from "@/components/company/protected-layout/Nav";
import Side from "@/components/company/protected-layout/Side";
import Concern from "@/components/company/protected-layout/Concern";
import Feedback from "@/components/company/protected-layout/Feedback";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DialogProvider>
      <StackedLayout navbar={<Nav />} sidebar={<Side />}>
        {children}
        <Feedback />
        <Concern />
      </StackedLayout>
    </DialogProvider>
  );
}
