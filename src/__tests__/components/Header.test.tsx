import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header Component', () => {
  it('should render the navigation links', () => {
    render(<Header />);
    const logo = screen.getByText('Swift Gallery');
    expect(logo).toBeInTheDocument();
  });

  it('should have the home link', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('should have the templates link', () => {
    render(<Header />);
    const templatesLink = screen.getByRole('link', { name: /templates/i });
    expect(templatesLink).toBeInTheDocument();
  });

  it('should have a call-to-action button', () => {
    render(<Header />);
    const ctaButton = screen.getByRole('button', { name: /explore/i });
    expect(ctaButton).toBeInTheDocument();
  });

  it('should render correctly on mobile', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});
