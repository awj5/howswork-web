import { useContext } from "react";
import { TrackingContext } from "@/context/tracking";

export function useTrackingContext() {
  const trackingContext = useContext(TrackingContext);
  if (!trackingContext) throw new Error("useTrackingContext must be used within the TrackingContext.Provider");
  return trackingContext;
}
