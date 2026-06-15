"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("system");
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(savedTheme);
    }
    console.log(
      "[ThemeToggle] First useEffect - mountedRef:",
      mountedRef.current,
      "savedTheme:",
      savedTheme,
    );
  }, []);

  useEffect(() => {
    console.log(
      "[ThemeToggle] Second useEffect - mountedRef:",
      mountedRef.current,
      "theme:",
      theme,
    );
    if (!mountedRef.current) return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
    console.log("[ThemeToggle] Saved to localStorage:", theme);
  }, [theme]);

  // eslint-disable-next-line react-hooks/refs
  if (mountedRef.current === false) {
    return (
      <Button variant="outline" size="icon" disabled aria-label="Toggle theme">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const isDark =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        console.log("ThemeToggle onClick - isDark:", isDark, "theme:", theme);
        setTheme(isDark ? "light" : "dark");
      }}
      aria-label="Toggle theme"
    >
      {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
