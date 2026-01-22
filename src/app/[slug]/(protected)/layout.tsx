import DialogProvider from "@/components/company/protected-layout/DialogProvider";
import AlertProvider from "@/components/company/protected-layout/AlertProvider";
import { StackedLayout } from "@/components/ui/stacked-layout";
import Nav from "@/components/company/protected-layout/Nav";
import Side from "@/components/company/protected-layout/Side";
import ConcernDialog from "@/components/company/protected-layout/ConcernDialog";
import FeedbackDialog from "@/components/company/protected-layout/FeedbackDialog";
import ConcernAlert from "@/components/company/protected-layout/ConcernAlert";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AlertProvider>
      <DialogProvider>
        <StackedLayout navbar={<Nav />} sidebar={<Side />}>
          {children}
          <FeedbackDialog />
          <ConcernDialog />
          <ConcernAlert />
        </StackedLayout>
      </DialogProvider>
    </AlertProvider>
  );
}
