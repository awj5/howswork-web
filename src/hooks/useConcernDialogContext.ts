import { useContext } from "react";
import { ConcernDialogContext } from "@/context/concern-dialog";

export function useConcernDialogContext() {
  const concernDialogContext = useContext(ConcernDialogContext);

  if (!concernDialogContext)
    throw new Error("useConcernDialogContext must be used within the ConcernDialogContext.Provider");

  return concernDialogContext;
}
