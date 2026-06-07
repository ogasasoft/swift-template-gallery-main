"use client";

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from "react";
import {
  templatesContextDefaultValues,
  type TemplatesContextValue,
} from "./templates";

const TemplatesContext = createContext<TemplatesContextValue>(
  templatesContextDefaultValues,
);

export function TemplatesProvider({ children }: { children: ReactNode }) {
  return (
    <TemplatesContext.Provider value={templatesContextDefaultValues}>
      {children}
    </TemplatesContext.Provider>
  );
}

export function useTemplates() {
  const context = useContext(TemplatesContext);
  if (!context) {
    throw new Error("useTemplates must be used within a TemplatesProvider");
  }
  return context;
}
