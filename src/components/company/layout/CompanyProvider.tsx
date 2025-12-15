"use client";

import { useState } from "react";
import type { CompanyType } from "@/types";
import { CompanyContext } from "@/context/company";

export default function CompanyProvider({
  companyData,
  children,
}: {
  companyData: CompanyType;
  children: React.ReactNode;
}) {
  const [company, setCompany] = useState<CompanyType | null>(companyData);

  return <CompanyContext.Provider value={{ company, setCompany }}>{children}</CompanyContext.Provider>;
}
