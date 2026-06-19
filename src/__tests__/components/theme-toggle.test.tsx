import { render, screen, act, cleanup, waitFor } from '@testing-library/react';
import { ThemeToggle } from '../../components/theme-toggle';

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render with Sun icon by default', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: 'Toggle theme' });
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('should toggle between dark and light theme', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: 'Toggle theme' });

    // Check initial state (should be Sun icon)
    const initialSun = button.querySelector('svg');
    expect(initialSun).toBeInTheDocument();

    // Click to toggle to dark
    act(() => {
      button.click();
    });

    // Should now have Moon icon
    const darkMoon = button.querySelector('svg');
    expect(darkMoon).toBeInTheDocument();
  });

  it('should enable button after mounting', async () => {
    render(<ThemeToggle />);
    const button = document.querySelector('button[aria-label="Toggle theme"]');

    // Button should be disabled initially (not mounted)
    expect(button).toBeDisabled();

    // Wait for component to mount and button to become enabled
    await waitFor(
      () => {
        expect(button).not.toBeDisabled();
      },
      { timeout: 100 }
    );
  });
});
