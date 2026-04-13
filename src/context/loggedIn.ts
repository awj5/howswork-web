import { createContext, type Dispatch, type SetStateAction } from "react";

export type LoggedInContextValue = {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const LoggedInContext = createContext<LoggedInContextValue | null>(null);
