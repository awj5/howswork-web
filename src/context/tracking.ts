import { createContext, type Dispatch, type SetStateAction } from "react";

export type TrackingContextValue = {
  tracking: string | null;
  setTracking: Dispatch<SetStateAction<string | null>>;
};

export const TrackingContext = createContext<TrackingContextValue | null>(null);
