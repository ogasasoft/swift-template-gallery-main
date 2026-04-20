import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock providers
jest.mock("../providers/theme-provider", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock query client
jest.mock("@tanstack/react-query", () => ({
  QueryClient: jest.fn().mockImplementation(() => ({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);

    expect(document.body).toBeTruthy();
  });

  it("renders structure", () => {
    const { container } = render(<App />);

    expect(container.querySelector("div")).toBeTruthy();
  });
});
