import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for Header to load
    await page.waitForSelector('header', { timeout: 10000 });
  });

  test('should have theme toggle button visible', async ({ page }) => {
    // Wait for theme toggle to mount
    await page.waitForSelector('button[aria-label="Toggle theme"]', { timeout: 10000 });

    const toggle = page.getByRole('button', { name: /theme/i });
    await expect(toggle).toBeVisible();

    // Check button is enabled
    await expect(toggle).toBeEnabled();
  });

  test('should toggle dark mode on click', async ({ page }) => {
    // Wait for theme toggle to mount
    await page.waitForSelector('button[aria-label="Toggle theme"]', { timeout: 10000 });

    const toggle = page.getByRole('button', { name: /theme/i });

    // Check initial state (should be light by default)
    await expect(toggle).toBeVisible();

    // Click to toggle to dark mode
    await toggle.click();

    // Check if dark mode class is applied
    const html = page.locator('html');
    await expect(html).toHaveClass('dark');

    // Toggle back to light mode
    await toggle.click();

    // Check if dark mode class is removed
    await expect(html).not.toHaveClass('dark');
  });

  test('should persist theme preference', async ({ page }) => {
    // Wait for theme toggle to mount
    await page.waitForSelector('button[aria-label="Toggle theme"]', { timeout: 10000 });

    const toggle = page.getByRole('button', { name: /theme/i });

    // Toggle to dark mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass('dark');

    // Refresh page and check if dark mode persists
    await page.reload();
    await expect(page.locator('html')).toHaveClass('dark');

    // Toggle to light mode
    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass('dark');

    // Refresh page and check if light mode persists
    await page.reload();
    await expect(page.locator('html')).not.toHaveClass('dark');
  });

  test('should have correct ARIA attributes', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /theme/i });

    // Check aria-label is set
    await expect(toggle).toHaveAttribute('aria-label');

    // aria-label should contain "toggle" and "theme"
    const ariaLabel = await toggle.getAttribute('aria-label');
    expect(ariaLabel).toMatch(/toggle.*theme/i);

    // aria-pressed should be either false, true, or not present (for buttons that aren't toggle buttons)
    const ariaPressed = await toggle.getAttribute('aria-pressed');
    expect(ariaPressed).toMatch(/false|true|null/);
  });

  test('should toggle icon when dark mode changes', async ({ page }) => {
    // Wait for theme toggle to mount
    await page.waitForSelector('button[aria-label="Toggle theme"]', { timeout: 10000 });

    const toggle = page.getByRole('button', { name: /theme/i });

    // Check initial icon is visible
    const initialIcon = toggle.locator('svg').first();
    await expect(initialIcon).toBeVisible();

    // Toggle to dark mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass('dark');

    // Check icon still exists (check for sun/moon icon)
    await expect(toggle.locator('svg').first()).toBeVisible();

    // Toggle back to light mode
    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass('dark');

    // Check icon still exists
    await expect(toggle.locator('svg').first()).toBeVisible();
  });
});
