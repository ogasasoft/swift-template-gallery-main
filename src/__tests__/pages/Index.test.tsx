import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from '@/pages/Index';

jest.mock('@/components/Gallery', () => () => <div data-testid="gallery-mock">Gallery</div>);

describe('Index Page', () => {
  it('should render the site brand', () => {
    render(<Index />);
    const titles = screen.getAllByText(/templatelab/i);
    expect(titles.length).toBeGreaterThan(0);
  });

  it('should have a hero section', () => {
    render(<Index />);
    const hero = screen.getByRole('heading', { name: /see it/i });
    expect(hero).toBeInTheDocument();
  });

  it('should have a view gallery button', () => {
    render(<Index />);
    const button = screen.getByRole('button', { name: /view gallery/i });
    expect(button).toBeInTheDocument();
  });

  it('should render pricing section', () => {
    render(<Index />);
    const pricing = screen.getAllByText(/pricing/i);
    expect(pricing.length).toBeGreaterThan(0);
  });

  it('should have proper heading structure', () => {
    render(<Index />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.tagName).toBe('H1');
  });

  it('should be accessible', () => {
    render(<Index />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});
