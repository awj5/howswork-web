"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoggedInContext } from "@/context/loggedIn";

export default function LoggedInProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [loggedIn, setLoggedIn] = useState(searchParams.has("upgrade"));
  return <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>{children}</LoggedInContext.Provider>;
}
