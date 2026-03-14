import React from 'react';
import { render, screen } from '@testing-library/react';
import Pricing from '@/components/Pricing';

describe('Pricing Component', () => {
  it('should render the pricing section title', () => {
    render(<Pricing />);
    const title = screen.getByText(/pricing/i);
    expect(title).toBeInTheDocument();
  });

  it('should render pricing cards', () => {
    render(<Pricing />);
    const cardElements = screen.getAllByRole('article');
    expect(cardElements.length).toBeGreaterThan(0);
  });

  it('should display pricing tiers', () => {
    render(<Pricing />);
    const tiers = ['Free', 'Pro', 'Enterprise'];
    tiers.forEach((tier) => {
      const tierElement = screen.getByText(tier);
      expect(tierElement).toBeInTheDocument();
    });
  });

  it('should have pricing features list', () => {
    render(<Pricing />);
    const featureList = screen.getAllByRole('listitem');
    expect(featureList.length).toBeGreaterThan(0);
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
