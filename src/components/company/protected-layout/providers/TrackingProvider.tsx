"use client";

import { useState } from "react";
import { TrackingContext } from "@/context/tracking";

export default function TrackingProvider({ children }: { children: React.ReactNode }) {
  const [tracking, setTracking] = useState<string | null>(null);

  return <TrackingContext.Provider value={{ tracking, setTracking }}>{children}</TrackingContext.Provider>;
}
