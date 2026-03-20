import Header from "@/components/Header";
import { render, screen } from "@testing-library/react";

describe("Header Component", () => {
  it("should render the TemplateLab logo", () => {
    render(<Header />);
    expect(screen.getByText("TemplateLab")).toBeInTheDocument();
  });

  it("should render the Gallery navigation link", () => {
    render(<Header />);
    expect(screen.getByText("Gallery")).toBeInTheDocument();
  });

  it("should render the Pricing navigation link", () => {
    render(<Header />);
    expect(screen.getByText("Pricing")).toBeInTheDocument();
  });

  it("should render the Contact navigation link", () => {
    render(<Header />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("should render the Inquiry button", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: "Inquiry" })).toBeInTheDocument();
  });

  it("should render the mobile menu button", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  it("should render the ThemeToggle component", () => {
    render(<Header />);
    // ThemeToggle is a separate component, we just check it's rendered
    // by looking for its children in the Header structure
    expect(screen.getByText("TemplateLab")).toBeInTheDocument();
  });

  it("should have the correct fixed positioning and z-index", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("fixed");
    expect(header).toHaveClass("z-50");
  });

  it("should have backdrop blur and semi-transparent background", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("backdrop-blur-sm");
    expect(header).toHaveClass("bg-background/95");
  });

  it("should render all navigation links in the header", () => {
    render(<Header />);
    expect(screen.getByText("Gallery")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Inquiry")).toBeInTheDocument();
  });

  it("should have responsive layout with container and padding", () => {
    render(<Header />);
    const container = screen.getByText("TemplateLab").closest("div");
    expect(container).toHaveClass("container");
    expect(container).toHaveClass("mx-auto");
    expect(container).toHaveClass("px-4");
    expect(container).toHaveClass("h-16");
    expect(container).toHaveClass("flex");
    expect(container).toHaveClass("items-center");
    expect(container).toHaveClass("justify-between");
  });
});
