import { createContext, type Dispatch, type SetStateAction } from "react";

export type ConcernAlertType = {
  open: boolean;
  tracking: string;
};

export type AlertContextValue = {
  concernAlert: ConcernAlertType | null;
  setConcernAlert: Dispatch<SetStateAction<ConcernAlertType | null>>;
};

export const AlertContext = createContext<AlertContextValue | null>(null);
