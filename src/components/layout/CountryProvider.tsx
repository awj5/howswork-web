"use client";

import { useEffect, useState } from "react";
import { CountryContext } from "@/context/country";

export default function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountry] = useState<string | undefined>();

  useEffect(() => {
    // Get users country using ipapi.co
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setCountry(data.country_code))
      .catch(() => {});
  }, []);

  return <CountryContext.Provider value={{ country, setCountry }}>{children}</CountryContext.Provider>;
}
