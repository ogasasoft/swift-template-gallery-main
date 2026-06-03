import { render, screen } from "@testing-library/react";
import Contact from "@/components/Contact";

describe("Contact Component", () => {
  it("should render the contact section title", () => {
    render(<Contact />);
    const title = screen.getByRole("heading", { name: /contact/i });
    expect(title).toBeInTheDocument();
  });

  it("should render the contact email", () => {
    render(<Contact />);
    const email = screen.getByText(/info@templatelab\.com/i);
    expect(email).toBeInTheDocument();
  });

  it("should have contact form elements", () => {
    render(<Contact />);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByPlaceholderText(/note about/i);
    const submitButton = screen.getByRole("button", { name: /send inquiry/i });
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should render contact method links", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", { name: /email/i });
    const phoneLink = screen.getByRole("link", { name: /phone/i });
    expect(emailLink).toBeInTheDocument();
    expect(phoneLink).toBeInTheDocument();
  });

  it("should render the name and email fields", () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();
  });

  it("should render a form", () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText(/name \*/i);
    expect(nameInput).toBeInTheDocument();
  });

  it("should have a submit button", () => {
    render(<Contact />);
    const submitButton = screen.getByRole("button", { name: /send inquiry/i });
    expect(submitButton).toHaveAttribute("type", "submit");
  });
});
