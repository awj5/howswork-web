import { createContext, type Dispatch, type SetStateAction } from "react";

export type CountryContextValue = {
  country: string | undefined;
  setCountry: Dispatch<SetStateAction<string | undefined>>;
};

export const CountryContext = createContext<CountryContextValue | null>(null);
