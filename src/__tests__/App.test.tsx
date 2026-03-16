import React from "react";
import { render, screen } from "@testing-library/react";

// Mock heavy page components
jest.mock("@/pages/Index", () => () => (
  <div data-testid="index-page">Index Page</div>
));
jest.mock("@/pages/NotFound", () => () => (
  <div data-testid="not-found-page">Not Found</div>
));
jest.mock("@/pages/TemplateDetail", () => () => (
  <div data-testid="template-detail-page">Template Detail</div>
));

// Mock UI components that require complex setup
jest.mock("@/components/ui/toaster", () => ({ Toaster: () => null }));
jest.mock("@/components/ui/sonner", () => ({ Toaster: () => null }));
jest.mock("@/components/ui/tooltip", () => ({
  TooltipProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock next-themes
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useTheme: () => ({
    theme: "system",
    setTheme: jest.fn(),
    resolvedTheme: "light",
  }),
}));

import App from "@/App";

describe("App", () => {
  it("renders without crashing", () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it("renders the index page at the root route", () => {
    render(<App />);
    expect(screen.getByTestId("index-page")).toBeInTheDocument();
  });
});
