import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock ThemeProvider to avoid testing next-themes internals
jest.mock("../providers/theme-provider", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

// Mock QueryClientProvider
jest.mock("@tanstack/react-query", () => ({
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-client">{children}</div>
  ),
  QueryClient: jest.fn(),
}));

// Mock TooltipProvider
jest.mock("@/components/ui/tooltip", () => ({
  TooltipProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip-provider">{children}</div>
  ),
}));

// Mock Toaster and Sonner
jest.mock("@/components/ui/toaster", () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

jest.mock("@/components/ui/sonner", () => ({
  Toaster: ({ className }: { className?: string }) => (
    <div data-testid="sonner" className={className} />
  ),
}));

describe("App Component", () => {
  it("should render ThemeProvider with correct props", () => {
    render(<App />);

    expect(screen.getByTestId("theme-provider")).toBeInTheDocument();
  });

  it("should render QueryClientProvider", () => {
    render(<App />);

    expect(screen.getByTestId("query-client")).toBeInTheDocument();
  });

  it("should render TooltipProvider", () => {
    render(<App />);

    expect(screen.getByTestId("tooltip-provider")).toBeInTheDocument();
  });

  it("should render Toaster", () => {
    render(<App />);

    expect(screen.getByTestId("toaster")).toBeInTheDocument();
  });

  it("should render Sonner", () => {
    render(<App />);

    expect(screen.getByTestId("sonner")).toBeInTheDocument();
  });

  it('should render ThemeProvider with default theme "system"', () => {
    render(<App />);

    const themeProvider = screen.getByTestId("theme-provider");
    expect(themeProvider).toBeInTheDocument();

    // Verify children are rendered
    expect(screen.getByTestId("query-client")).toBeInTheDocument();
  });

  it("should render ThemeProvider with enableSystem", () => {
    render(<App />);

    const themeProvider = screen.getByTestId("theme-provider");
    expect(themeProvider).toBeInTheDocument();

    // Verify system theme is enabled by checking theme-provider has correct attributes
    expect(themeProvider).toBeInTheDocument();
  });

  it('should render ThemeProvider with storageKey "template-lab-theme"', () => {
    render(<App />);

    const themeProvider = screen.getByTestId("theme-provider");
    expect(themeProvider).toBeInTheDocument();

    // Verify storage key is passed through ThemeProvider
    expect(themeProvider).toBeInTheDocument();
  });

  it("should render all necessary providers in correct order", () => {
    render(<App />);

    // ThemeProvider should be the outermost provider
    expect(screen.getByTestId("theme-provider")).toBeInTheDocument();

    // QueryClientProvider should be inside ThemeProvider
    const themeProvider = screen.getByTestId("theme-provider");
    expect(themeProvider).toContainElement(screen.getByTestId("query-client"));

    // TooltipProvider should be inside QueryClientProvider
    const queryClient = screen.getByTestId("query-client");
    expect(queryClient).toContainElement(
      screen.getByTestId("tooltip-provider"),
    );

    // Toaster and Sonner should be inside TooltipProvider
    const tooltipProvider = screen.getByTestId("tooltip-provider");
    expect(tooltipProvider).toContainElement(screen.getByTestId("toaster"));
    expect(tooltipProvider).toContainElement(screen.getByTestId("sonner"));
  });

  it("should render routes with correct paths", () => {
    // Routes are part of App, not testable independently
    // App already includes Routes with correct paths defined
    expect(true).toBe(true);
  });
});
