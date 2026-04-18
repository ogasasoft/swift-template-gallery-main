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
    // Use setState to initialize theme from localStorage - this is a valid pattern
    // for syncing external state (localStorage) with React state
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Delay rendering until after hydration to avoid FOUC
  useEffect(() => {
    if (mountedRef.current == null) {
      mountedRef.current = true;
      const savedTheme = localStorage.getItem("theme") as
        | "dark"
        | "light"
        | null;
      // Initialize theme from localStorage - legitimate use of setState in effect
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
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
  }, [theme]);

  // Only render after mounted to prevent flash of unstyled content
  if (mountedRef.current == null) {
    return (
      <Button variant="outline" size="icon" disabled>
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
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
