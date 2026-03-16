import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "@/components/Hero";

describe("Hero Component", () => {
  it("should render the hero section", () => {
    render(<Hero />);
    expect(
      screen.getByText("See it. Choose it. Get it fast."),
    ).toBeInTheDocument();
  });

  it("should display the subtitle", () => {
    render(<Hero />);
    expect(
      screen.getByText(/pick a design from our gallery/i),
    ).toBeInTheDocument();
  });

  it("should have the view gallery button", () => {
    render(<Hero />);
    const button = screen.getByRole("button", { name: /view gallery/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("h-11");
    expect(button).toHaveClass("px-8");
    expect(button).toHaveClass("rounded-md");
  });

  it("should have proper heading styling", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { name: /see it/i });
    expect(heading.tagName).toBe("H1");
    expect(heading).toHaveClass("text-5xl");
    expect(heading).toHaveClass("md:text-6xl");
    expect(heading).toHaveClass("font-bold");
  });

  it("should call scrollIntoView when View Gallery button is clicked", () => {
    const mockElement = { scrollIntoView: jest.fn() };
    jest
      .spyOn(document, "getElementById")
      .mockReturnValue(mockElement as unknown as HTMLElement);

    render(<Hero />);
    fireEvent.click(screen.getByRole("button", { name: /view gallery/i }));

    expect(document.getElementById).toHaveBeenCalledWith("gallery");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    jest.restoreAllMocks();
  });

  it("should not throw when gallery element does not exist", () => {
    jest.spyOn(document, "getElementById").mockReturnValue(null);

    render(<Hero />);
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: /view gallery/i })),
    ).not.toThrow();

    jest.restoreAllMocks();
  });
});
