import { useContext } from "react";
import { CountryContext } from "@/context/country";

export function useCountryContext() {
  const countryContext = useContext(CountryContext);
  if (!countryContext) throw new Error("useCountryContext must be used within the CountryContext.Provider");
  return countryContext;
}
