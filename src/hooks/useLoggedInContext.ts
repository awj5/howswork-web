import { useContext } from "react";
import { LoggedInContext } from "@/context/loggedIn";

export function useLoggedInContext() {
  const loggedInContext = useContext(LoggedInContext);
  if (!loggedInContext) throw new Error("useLoggedInContext must be used within the LoggedInContext.Provider");
  return loggedInContext;
}
