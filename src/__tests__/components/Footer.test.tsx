import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer Component", () => {
  it("should render the copyright text", () => {
    render(<Footer />);
    const copyright = screen.getByText(/© 2024 TemplateLab/i);
    expect(copyright).toBeInTheDocument();
  });

  it("should have a link to Terms of Service", () => {
    render(<Footer />);
    const tosLink = screen.getByRole("link", { name: /terms of service/i });
    expect(tosLink).toBeInTheDocument();
  });

  it("should have a link to Privacy Policy", () => {
    render(<Footer />);
    const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
    expect(privacyLink).toBeInTheDocument();
  });

  it("should render correctly", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });
});
