import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
    });

    // Mock matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("should render the moon icon in light mode", () => {
    render(<ThemeToggle />);
    const moonIcon = screen.getByLabelText("Toggle theme").querySelector("svg");
    expect(moonIcon).toHaveAttribute("data-lucide", "moon");
  });

  it("should render the sun icon in dark mode", () => {
    (window.matchMedia as jest.Mock).mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<ThemeToggle />);

    // Force dark mode by setting localStorage to 'dark'
    (window.localStorage.getItem as jest.Mock).mockReturnValue("dark");

    const sunIcon = screen.getByLabelText("Toggle theme").querySelector("svg");
    expect(sunIcon).toHaveAttribute("data-lucide", "sun");
  });

  it("should toggle theme when clicked", () => {
    render(<ThemeToggle />);

    const toggleButton = screen.getByLabelText("Toggle theme");

    // Initially in light mode
    expect(
      toggleButton.querySelector('svg[data-lucide="moon"]'),
    ).toBeInTheDocument();

    // Click to switch to dark mode
    fireEvent.click(toggleButton);

    // Should now have sun icon
    expect(
      toggleButton.querySelector('svg[data-lucide="sun"]'),
    ).toBeInTheDocument();
  });

  it("should toggle back to light mode when clicked again", () => {
    render(<ThemeToggle />);

    const toggleButton = screen.getByLabelText("Toggle theme");

    // Click to switch to dark mode
    fireEvent.click(toggleButton);

    // Click again to switch back to light mode
    fireEvent.click(toggleButton);

    // Should now have moon icon again
    expect(
      toggleButton.querySelector('svg[data-lucide="moon"]'),
    ).toBeInTheDocument();
  });

  it("should respect system preference when theme is set to system", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue("system");

    render(<ThemeToggle />);

    // Check if it renders based on system preference
    const button = screen.getByLabelText("Toggle theme");
    expect(button).toBeInTheDocument();
  });

  it("should save theme preference to localStorage", () => {
    render(<ThemeToggle />);

    const toggleButton = screen.getByLabelText("Toggle theme");

    // Click to switch to dark mode
    fireEvent.click(toggleButton);

    // Check if localStorage.setItem was called
    expect(window.localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  });
});
