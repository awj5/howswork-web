"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { CountryContext } from "@/context/country";

export default function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountry] = useState<string | undefined>();

  useEffect(() => {
    setCountry(Cookies.get("x-country"));
  }, []);

  return <CountryContext.Provider value={{ country, setCountry }}>{children}</CountryContext.Provider>;
}
