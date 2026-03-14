import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('NotFound Page', () => {
  it('should render the 404 title', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByText(/404/i);
    expect(title).toBeInTheDocument();
  });

  it('should have the error message', () => {
    renderWithRouter(<NotFound />);
    const message = screen.getByText(/page not found/i);
    expect(message).toBeInTheDocument();
  });

  it('should have a back to home link', () => {
    renderWithRouter(<NotFound />);
    const link = screen.getByRole('link', { name: /return to home/i });
    expect(link).toBeInTheDocument();
  });

  it('should have proper heading structure', () => {
    renderWithRouter(<NotFound />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toBe('404');
  });

  it('should be accessible', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('should have a return link', () => {
    renderWithRouter(<NotFound />);
    const link = screen.getByRole('link', { name: /return to home/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
