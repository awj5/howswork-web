import DialogProvider from "@/components/company/protected-layout/providers/DialogProvider";
import AlertProvider from "@/components/company/protected-layout/providers/AlertProvider";
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
    <>
      <link rel="preload" href="/img/emoji-1.svg" as="image" />
      <link rel="preload" href="/img/emoji-2.svg" as="image" />
      <link rel="preload" href="/img/emoji-3.svg" as="image" />
      <link rel="preload" href="/img/emoji-4.svg" as="image" />
      <link rel="preload" href="/img/emoji-5.svg" as="image" />

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
    </>
  );
}
