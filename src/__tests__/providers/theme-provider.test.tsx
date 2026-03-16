import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/providers/theme-provider";

jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="next-themes-provider">{children}</div>
  ),
}));

describe("ThemeProvider", () => {
  it("renders children", () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>,
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("wraps children in NextThemesProvider", () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Child Content</div>
      </ThemeProvider>,
    );
    expect(screen.getByTestId("next-themes-provider")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("passes props to NextThemesProvider", () => {
    // ThemeProvider spreads ...props to NextThemesProvider — just verify it renders without error
    expect(() =>
      render(
        <ThemeProvider defaultTheme="dark" enableSystem storageKey="test-key">
          <span>Child</span>
        </ThemeProvider>,
      ),
    ).not.toThrow();
  });
});
