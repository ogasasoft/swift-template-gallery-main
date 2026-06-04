import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header Component", () => {
  it("should render the navigation links", () => {
    render(<Header />);
    const logo = screen.getByText("TemplateLab");
    expect(logo).toBeInTheDocument();
  });

  it("should have the gallery link", () => {
    render(<Header />);
    const galleryLink = screen.getByRole("button", { name: /gallery/i });
    expect(galleryLink).toBeInTheDocument();
  });

  it("should have the pricing link", () => {
    render(<Header />);
    const pricingLink = screen.getByRole("button", { name: /pricing/i });
    expect(pricingLink).toBeInTheDocument();
  });

  it("should have a contact link", () => {
    render(<Header />);
    const contactLink = screen.getByRole("button", { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
  });

  it("should have an inquiry button", () => {
    render(<Header />);
    const inquiryButton = screen.getByRole("button", { name: /inquiry/i });
    expect(inquiryButton).toBeInTheDocument();
  });

  it("should render correctly on mobile", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });
});
