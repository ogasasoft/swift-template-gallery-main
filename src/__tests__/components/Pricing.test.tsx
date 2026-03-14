import React from 'react';
import { render, screen } from '@testing-library/react';
import Pricing from '@/components/Pricing';

describe('Pricing Component', () => {
  it('should render the pricing section title', () => {
    render(<Pricing />);
    const title = screen.getByText(/pricing/i);
    expect(title).toBeInTheDocument();
  });

  it('should render pricing table', () => {
    render(<Pricing />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('should display pricing items', () => {
    render(<Pricing />);
    const items = screen.getAllByText(/Base template setup|Extra images|Text replacement|Extra page/i);
    expect(items.length).toBeGreaterThan(0);
  });

  it('should display pricing prices', () => {
    render(<Pricing />);
    const prices = screen.getAllByText(/¥50,000|¥3,000|¥2,000|¥15,000/i);
    expect(prices.length).toBeGreaterThan(0);
  });

  it('should have CTA buttons for each tier', () => {
    render(<Pricing />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  it('should render correctly', () => {
    render(<Pricing />);
    const section = screen.getByRole('region', { name: /pricing/i });
    expect(section).toBeInTheDocument();
  });
});
