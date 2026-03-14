import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '@/pages/NotFound';

describe('NotFound Page', () => {
  it('should render the 404 title', () => {
    render(<NotFound />);
    const title = screen.getByText(/404/i);
    expect(title).toBeInTheDocument();
  });

  it('should have the error message', () => {
    render(<NotFound />);
    const message = screen.getByText(/page not found/i);
    expect(message).toBeInTheDocument();
  });

  it('should have a back to home link', () => {
    render(<NotFound />);
    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toBeInTheDocument();
  });

  it('should have proper heading structure', () => {
    render(<NotFound />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toBe('404');
  });

  it('should be accessible', () => {
    render(<NotFound />);
    const page = screen.getByRole('main');
    expect(page).toBeInTheDocument();
  });

  it('should have a return button', () => {
    render(<NotFound />);
    const button = screen.getByRole('button', { name: /return/i });
    expect(button).toBeInTheDocument();
  });
});
