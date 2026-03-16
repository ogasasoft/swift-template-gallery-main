import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Contact from "@/components/Contact";
import { toast } from "sonner";

jest.mock("sonner", () => ({
  toast: Object.assign(jest.fn(), {
    error: jest.fn(),
    success: jest.fn(),
  }),
}));

// Helper: submit the contact form directly (bypasses HTML5 required validation)
const submitForm = () => {
  const button = screen.getByRole("button", { name: /send inquiry/i });
  const form = button.closest("form") as HTMLFormElement;
  fireEvent.submit(form);
};

describe("Contact Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the contact section title", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { name: /contact/i }),
    ).toBeInTheDocument();
  });

  it("should render the contact email", () => {
    render(<Contact />);
    expect(screen.getByText(/info@templatelab\.com/i)).toBeInTheDocument();
  });

  it("should have contact form elements", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/note about/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send inquiry/i }),
    ).toBeInTheDocument();
  });

  it("should render contact method links", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /phone/i })).toBeInTheDocument();
  });

  it("should render the name field", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/name \*/i)).toBeInTheDocument();
  });

  it("should have a submit button with type submit", () => {
    render(<Contact />);
    expect(
      screen.getByRole("button", { name: /send inquiry/i }),
    ).toHaveAttribute("type", "submit");
  });

  it("should update name field when typed into", () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText(/name \*/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput).toHaveValue("John Doe");
  });

  it("should update email field when typed into", () => {
    render(<Contact />);
    const emailInput = screen.getByLabelText(/email \*/i);
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    expect(emailInput).toHaveValue("john@example.com");
  });

  it("should update phone field when typed into", () => {
    render(<Contact />);
    const phoneInput = screen.getByLabelText(/phone/i);
    fireEvent.change(phoneInput, { target: { value: "090-1234-5678" } });
    expect(phoneInput).toHaveValue("090-1234-5678");
  });

  it("should update template ID field when typed into", () => {
    render(<Contact />);
    const templateIdInput = screen.getByPlaceholderText(/e\.g\., cafe-01/i);
    fireEvent.change(templateIdInput, { target: { value: "cafe-01" } });
    expect(templateIdInput).toHaveValue("cafe-01");
  });

  it("should update message field when typed into", () => {
    render(<Contact />);
    const messageInput = screen.getByPlaceholderText(/note about/i);
    fireEvent.change(messageInput, {
      target: { value: "Hello, I need help." },
    });
    expect(messageInput).toHaveValue("Hello, I need help.");
  });

  it("should show error toast when form submitted without required fields", () => {
    render(<Contact />);
    submitForm();
    expect(toast.error).toHaveBeenCalledWith("Please fill in required fields");
  });

  it("should show error toast when only name is provided (no email)", () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/name \*/i), {
      target: { value: "John" },
    });
    submitForm();
    expect(toast.error).toHaveBeenCalledWith("Please fill in required fields");
  });

  it("should show success toast when form submitted with name and email", () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/name \*/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email \*/i), {
      target: { value: "john@example.com" },
    });
    submitForm();
    expect(toast.success).toHaveBeenCalledWith("Inquiry sent successfully!");
  });

  it("should reset form fields after successful submission", () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText(/name \*/i);
    const emailInput = screen.getByLabelText(/email \*/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    submitForm();
    expect(toast.success).toHaveBeenCalled();
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });

  it("should listen to template-selected custom event and update templateId", async () => {
    render(<Contact />);
    const templateIdInput = screen.getByPlaceholderText(/e\.g\., cafe-01/i);

    await act(async () => {
      window.dispatchEvent(
        new CustomEvent("template-selected", { detail: "cafe-01" }),
      );
    });

    expect(templateIdInput).toHaveValue("cafe-01");
  });

  it("should remove template-selected event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<Contact />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "template-selected",
      expect.any(Function),
    );
    removeEventListenerSpy.mockRestore();
  });

  it("should render LINE contact link", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /line/i })).toBeInTheDocument();
  });
});
