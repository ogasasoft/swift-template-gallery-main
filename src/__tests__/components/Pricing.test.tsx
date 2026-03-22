import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pricing from '@/components/Pricing';

describe('Pricing Component', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

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

  it('should scroll to contact section when Request a Quote button is clicked', () => {
    const mockElement = document.createElement('div');
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    render(<Pricing />);
    const button = screen.getByRole('button', { name: /request a quote/i });
    fireEvent.click(button);

    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should handle scrollToContact when contact element does not exist', () => {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);

    render(<Pricing />);
    const button = screen.getByRole('button', { name: /request a quote/i });
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
