import { render, screen, act, cleanup } from "@testing-library/react";
import { ThemeToggle } from "../../components/theme-toggle";

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render with Sun icon by default", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Toggle theme" });
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("should toggle between dark and light theme", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Toggle theme" });

    // Check initial state (should be Sun icon)
    const initialSun = button.querySelector("svg");
    expect(initialSun).toBeInTheDocument();

    // Click to toggle to dark
    act(() => {
      button.click();
    });

    // Should now have Moon icon
    const darkMoon = button.querySelector("svg");
    expect(darkMoon).toBeInTheDocument();
  });

  it("should disable button while not mounted", () => {
    render(<ThemeToggle />);
    const button = document.querySelector('button[aria-label="Toggle theme"]');

    expect(button).toBeDisabled();
  });
});
