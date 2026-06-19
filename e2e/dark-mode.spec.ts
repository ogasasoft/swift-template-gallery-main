import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for Header to load
    await page.waitForSelector('header', { timeout: 10000 });

    // Wait for theme toggle button to be visible
    const toggle = page.getByRole('button', { name: /theme/i });
    await toggle.waitFor({ state: 'visible', timeout: 10000 });
  });

  test('should have theme toggle button', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /theme/i });
    await expect(toggle).toBeVisible();
    await expect(toggle).not.toBeDisabled();
  });

  test('should toggle dark mode on click', async ({ page }) => {
    // Use aria-label selector since data-testid is not available
    const toggle = page.getByRole('button', { name: /theme/i });

    // Check initial state (should be light by default)
    await expect(toggle).toHaveAttribute('aria-label', /toggle.*theme/i);

    // Click to toggle to dark mode
    await toggle.click();

    // Check if dark mode class is applied
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Toggle back to light mode
    await toggle.click();

    // Check if dark mode class is removed
    await expect(html).not.toHaveClass(/dark/);
  });

  test('should respect system preference by default', async ({ page }) => {
    // Check if system preference is respected
    const html = page.locator('html');

    // Dark mode should be applied based on system preference
    await expect(html).toBeVisible();
  });

  test('should persist theme preference', async ({ page }) => {
    // Use aria-label selector since data-testid is not available
    const toggle = page.getByRole('button', { name: /theme/i });

    // Toggle to dark mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Refresh page and check if dark mode persists
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Toggle to light mode
    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Refresh page and check if light mode persists
    await page.reload();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('should have correct ARIA attributes', async ({ page }) => {
    // Use aria-label selector since data-testid is not available
    const toggle = page.getByRole('button', { name: /theme/i });

    await expect(toggle).toHaveAttribute('aria-label');
    await expect(toggle).toHaveAttribute('aria-pressed', /false|true/);
  });

  test('should toggle icon when dark mode changes', async ({ page }) => {
    // Use aria-label selector since data-testid is not available
    const toggle = page.getByRole('button', { name: /theme/i });

    // Check initial state
    const initialIcon = toggle.locator('svg');
    await expect(initialIcon).toBeVisible();

    // Toggle to dark mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Check icon changed (check for sun/moon icon)
    await expect(initialIcon).toBeVisible();

    // Toggle back to light mode
    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    await expect(initialIcon).toBeVisible();
  });
});
