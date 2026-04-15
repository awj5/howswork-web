"use client";

import { useState } from "react";
import { AdminCompanyContext } from "@/context/adminCompany";

export default function AdminCompanyProvider({ children }: { children: React.ReactNode }) {
  const [adminCompany, setAdminCompany] = useState(0);

  return (
    <AdminCompanyContext.Provider value={{ adminCompany, setAdminCompany }}>{children}</AdminCompanyContext.Provider>
  );
}
