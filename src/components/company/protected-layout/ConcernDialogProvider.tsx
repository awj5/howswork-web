"use client";

import { useState } from "react";
import { ConcernDialogContext } from "@/context/concern-dialog";

export default function ConcernDialogProvider({ children }: { children: React.ReactNode }) {
  const [concernDialog, setConcernDialog] = useState(false);

  return (
    <ConcernDialogContext.Provider value={{ concernDialog, setConcernDialog }}>
      {children}
    </ConcernDialogContext.Provider>
  );
}
