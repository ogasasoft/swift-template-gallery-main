import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from '@/pages/Index';

describe('Index Page', () => {
  it('should render the homepage content', () => {
    render(<Index />);
    const title = screen.getByText(/swift template gallery/i);
    expect(title).toBeInTheDocument();
  });

  it('should have a hero section', () => {
    render(<Index />);
    const hero = screen.getByRole('heading', { name: /discover/i });
    expect(hero).toBeInTheDocument();
  });

  it('should have a view gallery button', () => {
    render(<Index />);
    const button = screen.getByRole('button', { name: /view gallery/i });
    expect(button).toBeInTheDocument();
  });

  it('should render features section', () => {
    render(<Index />);
    const features = screen.getByText(/features/i);
    expect(features).toBeInTheDocument();
  });

  it('should have proper metadata', () => {
    render(<Index />);
    const meta = screen.getByRole('heading', { level: 1 });
    expect(meta.tagName).toBe('H1');
  });

  it('should be accessible', () => {
    render(<Index />);
    const page = screen.getByRole('main');
    expect(page).toBeInTheDocument();
  });
});
