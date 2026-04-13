"use client";

import { useState } from "react";
import { DashboardContext } from "@/context/dashboard";

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [dashboard, setDashboard] = useState(0);
  return <DashboardContext.Provider value={{ dashboard, setDashboard }}>{children}</DashboardContext.Provider>;
}
