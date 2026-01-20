import { useContext } from "react";
import { DialogContext } from "@/context/dialog";

export function useDialogContext() {
  const dialogContext = useContext(DialogContext);
  if (!dialogContext) throw new Error("useDialogContext must be used within the DialogContext.Provider");
  return dialogContext;
}
