"use client";

import { useEffect } from "react";

export default function HtmlBackground() {
  useEffect(() => {
    const updateBackgroundColor = (isDark: boolean) => {
      document.documentElement.style.backgroundColor = isDark ? "#111827" : "white"; // bg-gray-900 for dark
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
