import { createContext, type Dispatch, type SetStateAction } from "react";

export type DashboardContextValue = {
  dashboard: number;
  setDashboard: Dispatch<SetStateAction<number>>;
};

export const DashboardContext = createContext<DashboardContextValue | null>(null);
