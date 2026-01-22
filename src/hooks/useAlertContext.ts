import { useContext } from "react";
import { AlertContext } from "@/context/alert";

export function useAlertContext() {
  const alertContext = useContext(AlertContext);
  if (!alertContext) throw new Error("useAlertContext must be used within the AlertContext.Provider");
  return alertContext;
}
