import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '@/components/Contact';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

import { toast } from 'sonner';

describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the contact section title', () => {
    render(<Contact />);
    const title = screen.getByRole('heading', { name: /contact/i });
    expect(title).toBeInTheDocument();
  });

  it('should render the contact email', () => {
    render(<Contact />);
    const email = screen.getByText(/info@templatelab\.com/i);
    expect(email).toBeInTheDocument();
  });

  it('should have contact form elements', () => {
    render(<Contact />);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByPlaceholderText(/note about/i);
    const submitButton = screen.getByRole('button', { name: /send inquiry/i });
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should render contact method links', () => {
    render(<Contact />);
    const emailLink = screen.getByRole('link', { name: /email/i });
    const phoneLink = screen.getByRole('link', { name: /phone/i });
    expect(emailLink).toBeInTheDocument();
    expect(phoneLink).toBeInTheDocument();
  });

  it('should render the name and email fields', () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();
  });

  it('should render a form', () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText(/name \*/i);
    expect(nameInput).toBeInTheDocument();
  });

  it('should have a submit button', () => {
    render(<Contact />);
    const submitButton = screen.getByRole('button', { name: /send inquiry/i });
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('should show error toast when submitting without required fields', () => {
    render(<Contact />);
    const submitButton = screen.getByRole('button', { name: /send inquiry/i });
    const form = submitButton.closest('form');
    if (!form) {
      throw new Error('Form not found');
    }
    fireEvent.submit(form);
    expect(toast.error).toHaveBeenCalledWith('Please fill in required fields');
  });

  it('should show success toast and reset form when submitting with valid data', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name \*/i);
    const emailInput = screen.getByLabelText(/email \*/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    const submitButton = screen.getByRole('button', { name: /send inquiry/i });
    fireEvent.click(submitButton);

    expect(toast.success).toHaveBeenCalledWith('Inquiry sent successfully!');
    await waitFor(() => {
      expect((nameInput as HTMLInputElement).value).toBe('');
      expect((emailInput as HTMLInputElement).value).toBe('');
    });
  });

  it('should update form fields when user types', () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name \*/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const messageInput = screen.getByPlaceholderText(/note about/i);

    fireEvent.change(nameInput, { target: { value: 'Jane' } });
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
    fireEvent.change(messageInput, { target: { value: 'Hello' } });

    expect((nameInput as HTMLInputElement).value).toBe('Jane');
    expect((phoneInput as HTMLInputElement).value).toBe('123-456-7890');
    expect((messageInput as HTMLTextAreaElement).value).toBe('Hello');
  });

  it('should set templateId from custom template-selected event', async () => {
    render(<Contact />);

    const templateIdInput = screen.getByLabelText(/template id/i);
    expect((templateIdInput as HTMLInputElement).value).toBe('');

    const event = new CustomEvent('template-selected', { detail: 'cafe-01' });
    window.dispatchEvent(event);

    await waitFor(() => {
      expect((templateIdInput as HTMLInputElement).value).toBe('cafe-01');
    });
  });

  it('should update templateId input when user types', () => {
    render(<Contact />);
    const templateIdInput = screen.getByLabelText(/template id/i);
    fireEvent.change(templateIdInput, { target: { value: 'shop-02' } });
    expect((templateIdInput as HTMLInputElement).value).toBe('shop-02');
  });
});
