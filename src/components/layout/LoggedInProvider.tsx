"use client";

import { useState } from "react";
import { LoggedInContext } from "@/context/loggedIn";

export default function LoggedInProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  return <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>{children}</LoggedInContext.Provider>;
}
