import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  it('should render the copyright text', () => {
    render(<Footer />);
    const copyright = screen.getByText(/copyright/i);
    expect(copyright).toBeInTheDocument();
  });

  it('should have a link to home', () => {
    render(<Footer />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('should have a link to templates', () => {
    render(<Footer />);
    const templatesLink = screen.getByRole('link', { name: /templates/i });
    expect(templatesLink).toBeInTheDocument();
  });

  it('should render social links', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
  });

  it('should render correctly', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
