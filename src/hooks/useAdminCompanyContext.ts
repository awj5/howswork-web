import { useContext } from "react";
import { AdminCompanyContext } from "@/context/adminCompany";

export function useAdminCompanyContext() {
  const adminCompanyContext = useContext(AdminCompanyContext);

  if (!adminCompanyContext)
    throw new Error("useAdminCompanyContext must be used within the AdminCompanyContext.Provider");

  return adminCompanyContext;
}
