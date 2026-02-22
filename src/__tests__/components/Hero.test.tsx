import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import Hero from '@/components/Hero';

describe('Hero Component', () => {
  it('should render the hero section', () => {
    render(<Hero />);
    expect(screen.getByText('See it. Choose it. Get it fast.')).toBeInTheDocument();
  });

  it('should display the subtitle', () => {
    render(<Hero />);
    expect(screen.getByText(/pick a design from our gallery/i)).toBeInTheDocument();
  });

  it('should have the view gallery button', () => {
    render(<Hero />);
    const button = screen.getByRole('button', { name: /view gallery/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-lg');
    expect(button).toHaveClass('px-8');
    expect(button).toHaveClass('py-6');
  });

  it('should have proper heading styling', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { name: /see it/i });
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveClass('text-5xl');
    expect(heading).toHaveClass('md:text-6xl');
    expect(heading).toHaveClass('font-bold');
  });
});
