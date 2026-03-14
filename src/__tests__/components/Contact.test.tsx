import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '@/components/Contact';

describe('Contact Component', () => {
  it('should render the contact section title', () => {
    render(<Contact />);
    const title = screen.getByText(/contact/i);
    expect(title).toBeInTheDocument();
  });

  it('should have contact form elements', () => {
    render(<Contact />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const messageInput = screen.getByPlaceholderText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send/i });
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should render social contact links', () => {
    render(<Contact />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    expect(githubLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
  });

  it('should render the contact information', () => {
    render(<Contact />);
    const email = screen.getByText(/@example.com/i);
    expect(email).toBeInTheDocument();
  });

  it('should be accessible', () => {
    render(<Contact />);
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('should handle form submission', () => {
    render(<Contact />);
    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('method', 'post');
  });
});
