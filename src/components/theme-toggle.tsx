'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('system');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage immediately
  useState<'dark' | 'light' | null>(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    return savedTheme || 'light';
  });

  // Set mounted after first render
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Skip in test environment
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const isDark =
    theme === 'system'
      ? typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false
      : theme === 'dark';

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      disabled={!mounted}
    >
      {mounted ? (
        isDark ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
