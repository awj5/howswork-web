import { createContext, type Dispatch, type SetStateAction } from "react";

export type AdminCompanyContextValue = {
  adminCompany: number;
  setAdminCompany: Dispatch<SetStateAction<number>>;
};

export const AdminCompanyContext = createContext<AdminCompanyContextValue | null>(null);
