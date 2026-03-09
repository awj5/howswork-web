"use client";

import { useEffect } from "react";

export default function HtmlBackground() {
  useEffect(() => {
    const updateBackgroundColor = (isDark: boolean) => {
      document.documentElement.style.backgroundColor = isDark ? "var(--color-zinc-900)" : "white";
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    updateBackgroundColor(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      updateBackgroundColor(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  return null;
}
