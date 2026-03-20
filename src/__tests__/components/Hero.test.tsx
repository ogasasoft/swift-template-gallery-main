import Hero from "@/components/Hero";
import { render, screen } from "@testing-library/react";

describe("Hero Component", () => {
  it("should render the main heading", () => {
    render(<Hero />);
    expect(
      screen.getByText("See it. Choose it. Get it fast."),
    ).toBeInTheDocument();
  });

  it("should render the subheading paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /Pick a design from our gallery and receive your customized site with your own text and images/i,
      ),
    ).toBeInTheDocument();
  });

  it("should render the 'View Gallery' button", () => {
    render(<Hero />);
    expect(
      screen.getByRole("button", { name: /view gallery/i }),
    ).toBeInTheDocument();
  });

  it("should have the correct min-height of viewport", () => {
    render(<Hero />);
    const section = screen
      .getByText("See it. Choose it. Get it fast.")
      .closest("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("min-h-screen");
  });

  it("should have flex layout for centering content", () => {
    render(<Hero />);
    const section = screen
      .getByText("See it. Choose it. Get it fast.")
      .closest("section");
    expect(section).toHaveClass("flex");
    expect(section).toHaveClass("items-center");
    expect(section).toHaveClass("justify-center");
  });

  it("should have top padding of 4rem", () => {
    render(<Hero />);
    const section = screen
      .getByText("See it. Choose it. Get it fast.")
      .closest("section");
    expect(section).toHaveClass("pt-16"); // pt-16 is 4rem
  });

  it("should have container and text centering", () => {
    render(<Hero />);
    const container = screen
      .getByText("See it. Choose it. Get it fast.")
      .closest("div");
    expect(container).toHaveClass("container");
    expect(container).toHaveClass("mx-auto");
    expect(container).toHaveClass("text-center");
  });

  it("should have correct heading size classes", () => {
    render(<Hero />);
    const heading = screen.getByText("See it. Choose it. Get it fast.");
    expect(heading).toHaveClass("text-5xl");
    expect(heading).toHaveClass("md:text-6xl");
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("text-foreground");
  });

  it("should have correct paragraph styling", () => {
    render(<Hero />);
    const paragraph = screen.getByText(/Pick a design from our gallery/i);
    expect(paragraph).toHaveClass("text-xl");
    expect(paragraph).toHaveClass("md:text-2xl");
    expect(paragraph).toHaveClass("text-muted-foreground");
  });

  it("should have correct button size and styling", () => {
    render(<Hero />);
    const button = screen.getByRole("button", { name: /view gallery/i });
    expect(button).toHaveClass("text-lg");
    expect(button).toHaveClass("px-8");
    expect(button).toHaveClass("py-6");
  });

  it("should use the hero gradient from CSS variables", () => {
    render(<Hero />);
    const section = screen
      .getByText("See it. Choose it. Get it fast.")
      .closest("section");
    expect(section).toHaveStyle("background: var(--hero-gradient)");
  });
});
