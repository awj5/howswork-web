import DialogProvider from "@/components/company/protected-layout/providers/DialogProvider";
import AlertProvider from "@/components/company/protected-layout/providers/AlertProvider";
import TrackingProvider from "@/components/company/protected-layout/providers/TrackingProvider";
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
        <TrackingProvider>
          <StackedLayout navbar={<Nav />} sidebar={<Side />}>
            {children}
            <FeedbackDialog />
            <ConcernDialog />
            <ConcernAlert />
          </StackedLayout>
        </TrackingProvider>
      </DialogProvider>
    </AlertProvider>
  );
}
