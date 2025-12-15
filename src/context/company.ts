import { createContext, type Dispatch, type SetStateAction } from "react";
import { type CompanyType } from "../types";

export type CompanyContextValue = {
  company: CompanyType | null;
  setCompany: Dispatch<SetStateAction<CompanyType | null>>;
};

export const CompanyContext = createContext<CompanyContextValue | null>(null);
