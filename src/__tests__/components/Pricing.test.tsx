import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pricing from "@/components/Pricing";

describe("Pricing Component", () => {
  it("should render the pricing section title", () => {
    render(<Pricing />);
    expect(screen.getByText(/pricing/i)).toBeInTheDocument();
  });

  it("should render pricing table", () => {
    render(<Pricing />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("should display pricing items", () => {
    render(<Pricing />);
    expect(screen.getByText(/base template setup/i)).toBeInTheDocument();
    expect(screen.getByText(/extra images/i)).toBeInTheDocument();
    expect(screen.getByText(/text replacement/i)).toBeInTheDocument();
    expect(screen.getByText(/extra page/i)).toBeInTheDocument();
  });

  it("should display pricing prices", () => {
    render(<Pricing />);
    expect(screen.getByText(/¥50,000/)).toBeInTheDocument();
    expect(screen.getByText(/¥3,000/)).toBeInTheDocument();
    expect(screen.getByText(/¥2,000/)).toBeInTheDocument();
    expect(screen.getByText(/¥15,000/)).toBeInTheDocument();
  });

  it("should render the Request a Quote button", () => {
    render(<Pricing />);
    expect(
      screen.getByRole("button", { name: /request a quote/i }),
    ).toBeInTheDocument();
  });

  it("should render correctly as a landmark region", () => {
    render(<Pricing />);
    expect(
      screen.getByRole("region", { name: /pricing/i }),
    ).toBeInTheDocument();
  });

  it("should display delivery time information", () => {
    render(<Pricing />);
    expect(screen.getByText(/delivery time/i)).toBeInTheDocument();
  });

  it("should scroll to contact section when Request a Quote button is clicked", () => {
    const mockElement = { scrollIntoView: jest.fn() };
    jest
      .spyOn(document, "getElementById")
      .mockReturnValue(mockElement as unknown as HTMLElement);

    render(<Pricing />);
    fireEvent.click(screen.getByRole("button", { name: /request a quote/i }));

    expect(document.getElementById).toHaveBeenCalledWith("contact");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    jest.restoreAllMocks();
  });

  it("should not throw when contact element does not exist", () => {
    jest.spyOn(document, "getElementById").mockReturnValue(null);

    render(<Pricing />);
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: /request a quote/i })),
    ).not.toThrow();

    jest.restoreAllMocks();
  });
});
