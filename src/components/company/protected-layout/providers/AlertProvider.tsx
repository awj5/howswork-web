"use client";

import { useState } from "react";
import { AlertContext, ConcernAlertType } from "@/context/alert";

export default function AlertProvider({ children }: { children: React.ReactNode }) {
  const [concernAlert, setConcernAlert] = useState<ConcernAlertType | null>(null);
  return <AlertContext.Provider value={{ concernAlert, setConcernAlert }}>{children}</AlertContext.Provider>;
}
