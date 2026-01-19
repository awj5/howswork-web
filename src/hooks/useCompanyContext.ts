import { useContext } from "react";
import { CompanyContext } from "@/context/company";

export function useCompanyContext() {
  const companyContext = useContext(CompanyContext);
  if (!companyContext) throw new Error("useCompanyContext must be used within the CompanyContext.Provider");
  return companyContext;
}
