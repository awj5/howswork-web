import { createContext, type Dispatch, type SetStateAction } from "react";

export type ConcernDialogContextValue = {
  concernDialog: boolean;
  setConcernDialog: Dispatch<SetStateAction<boolean>>;
};

export const ConcernDialogContext = createContext<ConcernDialogContextValue | null>(null);
