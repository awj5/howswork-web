import { useContext } from "react";
import { DashboardContext } from "@/context/dashboard";

export function useDashboardContext() {
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) throw new Error("useDashboardContext must be used within the DashboardContext.Provider");
  return dashboardContext;
}
