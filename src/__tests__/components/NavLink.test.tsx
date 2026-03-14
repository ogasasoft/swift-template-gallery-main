import React from 'react';
import { render, screen } from '@testing-library/react';
import NavLink from '@/components/NavLink';

describe('NavLink Component', () => {
  it('should render the link text', () => {
    render(<NavLink href="/home">Home</NavLink>);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should have the correct href attribute', () => {
    render(<NavLink href="/templates">Templates</NavLink>);
    const link = screen.getByRole('link', { name: /templates/i });
    expect(link).toHaveAttribute('href', '/templates');
  });

  it('should be accessible', () => {
    render(<NavLink href="/about">About</NavLink>);
    const link = screen.getByRole('link', { name: /about/i });
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('should render with active state', () => {
    render(<NavLink href="/home" active={true}>Home</NavLink>);
    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toHaveClass(/active/);
  });

  it('should render without active state by default', () => {
    render(<NavLink href="/templates">Templates</NavLink>);
    const link = screen.getByRole('link', { name: /templates/i });
    expect(link).not.toHaveClass(/active/);
  });
});
