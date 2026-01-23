"use client";

import { useState } from "react";
import { DialogContext, FeedbackDialogType } from "@/context/dialog";

export default function DialogProvider({ children }: { children: React.ReactNode }) {
  const [feedbackDialog, setFeedbackDialog] = useState<FeedbackDialogType | null>(null);
  const [concernDialog, setConcernDialog] = useState(false);

  return (
    <DialogContext.Provider value={{ feedbackDialog, setFeedbackDialog, concernDialog, setConcernDialog }}>
      {children}
    </DialogContext.Provider>
  );
}
