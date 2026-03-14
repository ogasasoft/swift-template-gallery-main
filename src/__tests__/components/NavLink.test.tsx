import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';

describe('NavLink Component', () => {
  it('should render the link text', () => {
    render(
      <MemoryRouter>
        <NavLink to="/home">Home</NavLink>
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should have the correct href attribute', () => {
    render(
      <MemoryRouter>
        <NavLink to="/templates">Templates</NavLink>
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /templates/i });
    expect(link).toHaveAttribute('href', '/templates');
  });

  it('should have aria-current when active', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <NavLink to="/about">About</NavLink>
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /about/i });
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('should apply activeClassName when active', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <NavLink to="/home" activeClassName="active">Home</NavLink>
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toHaveClass('active');
  });

  it('should not apply activeClassName when not active', () => {
    render(
      <MemoryRouter initialEntries={['/other']}>
        <NavLink to="/templates" activeClassName="active">Templates</NavLink>
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /templates/i });
    expect(link).not.toHaveClass('active');
  });
});
