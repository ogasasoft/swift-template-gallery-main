import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header Component", () => {
  it("should render the navigation links", () => {
    render(<Header />);
    expect(screen.getByText("TemplateLab")).toBeInTheDocument();
  });

  it("should have the gallery link", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /gallery/i }),
    ).toBeInTheDocument();
  });

  it("should have the pricing link", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /pricing/i }),
    ).toBeInTheDocument();
  });

  it("should have a contact link", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /contact/i }),
    ).toBeInTheDocument();
  });

  it("should have an inquiry button", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /inquiry/i }),
    ).toBeInTheDocument();
  });

  it("should render the header element", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render a mobile menu button", () => {
    render(<Header />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("should scroll to gallery section when gallery button is clicked", () => {
    const mockElement = { scrollIntoView: jest.fn() };
    jest
      .spyOn(document, "getElementById")
      .mockReturnValue(mockElement as unknown as HTMLElement);

    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: /gallery/i }));

    expect(document.getElementById).toHaveBeenCalledWith("gallery");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    jest.restoreAllMocks();
  });

  it("should scroll to pricing section when pricing button is clicked", () => {
    const mockElement = { scrollIntoView: jest.fn() };
    jest
      .spyOn(document, "getElementById")
      .mockReturnValue(mockElement as unknown as HTMLElement);

    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: /pricing/i }));

    expect(document.getElementById).toHaveBeenCalledWith("pricing");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    jest.restoreAllMocks();
  });

  it("should scroll to contact section when contact button is clicked", () => {
    const mockElement = { scrollIntoView: jest.fn() };
    jest
      .spyOn(document, "getElementById")
      .mockReturnValue(mockElement as unknown as HTMLElement);

    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: /contact/i }));

    expect(document.getElementById).toHaveBeenCalledWith("contact");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    jest.restoreAllMocks();
  });

  it("should scroll to contact section when inquiry button is clicked", () => {
    const mockElement = { scrollIntoView: jest.fn() };
    jest
      .spyOn(document, "getElementById")
      .mockReturnValue(mockElement as unknown as HTMLElement);

    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: /inquiry/i }));

    expect(document.getElementById).toHaveBeenCalledWith("contact");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    jest.restoreAllMocks();
  });

  it("should not throw when scroll target element does not exist", () => {
    jest.spyOn(document, "getElementById").mockReturnValue(null);

    render(<Header />);
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: /gallery/i })),
    ).not.toThrow();

    jest.restoreAllMocks();
  });

  it("should scroll to gallery when mobile menu button is clicked", () => {
    const mockElement = { scrollIntoView: jest.fn() };
    jest
      .spyOn(document, "getElementById")
      .mockReturnValue(mockElement as unknown as HTMLElement);

    render(<Header />);
    fireEvent.click(screen.getByText("Menu"));

    expect(document.getElementById).toHaveBeenCalledWith("gallery");

    jest.restoreAllMocks();
  });
});
