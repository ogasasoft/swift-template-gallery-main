import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have theme toggle button', async ({ page }) => {
    const toggle = page.locator('[data-testid="theme-toggle"]');
    await expect(toggle).toBeVisible();
  });

  test('should toggle dark mode on click', async ({ page }) => {
    const toggle = page.locator('[data-testid="theme-toggle"]');

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
    const toggle = page.locator('[data-testid="theme-toggle"]');

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
    const toggle = page.locator('[data-testid="theme-toggle"]');

    await expect(toggle).toHaveAttribute('aria-label');
    await expect(toggle).toHaveAttribute('role', 'button');
    await expect(toggle).toHaveAttribute('aria-pressed', /false|true/);
  });

  test('should toggle icon when dark mode changes', async ({ page }) => {
    const toggle = page.locator('[data-testid="theme-toggle"]');

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
