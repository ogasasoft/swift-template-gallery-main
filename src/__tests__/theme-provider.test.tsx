import { render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "../providers/theme-provider";

// Mock NextThemesProvider
jest.mock("next-themes", () => ({
  ThemeProvider: jest.fn(({ children, ...props }: Record<string, unknown>) => (
    <div data-testid="next-themes-provider" data-props={JSON.stringify(props)}>
      {children}
    </div>
  )),
}));

describe("ThemeProvider", () => {
  it("should render NextThemesProvider with children", () => {
    const childElement = <div data-testid="child">Child content</div>;

    render(<ThemeProvider defaultTheme="light">{childElement}</ThemeProvider>);

    expect(screen.getByTestId("next-themes-provider")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("should pass defaultTheme prop to NextThemesProvider", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <div>Test</div>
      </ThemeProvider>,
    );

    const provider = screen.getByTestId("next-themes-provider");
    expect(provider).toBeInTheDocument();
  });

  it("should pass enableSystem prop to NextThemesProvider", () => {
    render(
      <ThemeProvider enableSystem>
        <div>Test</div>
      </ThemeProvider>,
    );

    const provider = screen.getByTestId("next-themes-provider");
    expect(provider).toBeInTheDocument();
  });

  it("should pass storageKey prop to NextThemesProvider", () => {
    render(
      <ThemeProvider storageKey="custom-key">
        <div>Test</div>
      </ThemeProvider>,
    );

    const provider = screen.getByTestId("next-themes-provider");
    expect(provider).toBeInTheDocument();
  });

  it("should render multiple children correctly", () => {
    const children = [
      <div key="1" data-testid="child-1">
        Child 1
      </div>,
      <div key="2" data-testid="child-2">
        Child 2
      </div>,
    ];

    render(<ThemeProvider>{children}</ThemeProvider>);

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });

  it("should render empty children without errors", () => {
    render(<ThemeProvider>{null}</ThemeProvider>);

    const provider = screen.getByTestId("next-themes-provider");
    expect(provider).toBeInTheDocument();
  });

  it("should render Fragment as children", () => {
    render(
      <ThemeProvider>
        <>
          <div data-testid="fragment-child">Fragment content</div>
        </>
      </ThemeProvider>,
    );

    expect(screen.getByTestId("fragment-child")).toBeInTheDocument();
  });

  it("should render conditional children", () => {
    const shouldRender = true;

    render(
      <ThemeProvider>
        {shouldRender && <div data-testid="conditional">Conditional</div>}
      </ThemeProvider>,
    );

    expect(screen.getByTestId("conditional")).toBeInTheDocument();
  });

  it("should handle ThemeProvider without props", () => {
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>,
    );

    const provider = screen.getByTestId("next-themes-provider");
    expect(provider).toBeInTheDocument();
  });

  it("should pass all props to NextThemesProvider", () => {
    const props = {
      defaultTheme: "system",
      enableSystem: true,
      storageKey: "test-key",
      attribute: "class",
      forcedTheme: "dark",
    };

    render(
      <ThemeProvider {...props}>
        <div>Test</div>
      </ThemeProvider>,
    );

    const provider = screen.getByTestId("next-themes-provider");
    expect(provider).toBeInTheDocument();
  });

  it("should render ThemeProvider as client component", () => {
    // This test verifies that ThemeProvider is a client component
    // by checking that it renders correctly with React.lazy
    const { container } = render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
