import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the hero section', async ({ page }) => {
    const hero = page.locator('h1');
    await expect(hero).toBeVisible();
    await expect(hero).toContainText(/Template Gallery|Discover.*Templates/);
  });

  test('should display navigation header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.locator('a[href="/"]')).toBeVisible();
  });

  test('should have dark mode toggle', async ({ page }) => {
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveAttribute('aria-label', /toggle.*theme/i);
  });

  test('should display gallery section', async ({ page }) => {
    const gallery = page.locator('section[id="gallery"]');
    await expect(gallery).toBeVisible();
    await expect(gallery.locator('h2')).toContainText(/Templates/);
  });

  test('should have pricing section', async ({ page }) => {
    const pricing = page.locator('section[id="pricing"]');
    await expect(pricing).toBeVisible();
    await expect(pricing.locator('h2')).toContainText(/Pricing/);
  });

  test('should have contact form section', async ({ page }) => {
    const contact = page.locator('section[id="contact"]');
    await expect(contact).toBeVisible();
    await expect(contact.locator('h2')).toContainText(/Contact/);
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('a[href="/"]')).toBeVisible();
  });

  test('should have social links in footer', async ({ page }) => {
    const footer = page.locator('footer');
    const socialLinks = footer.locator('a[href*="github"], a[href*="twitter"], a[href*="discord"]');
    await expect(socialLinks.first()).toBeVisible();
  });

  test('should have correct meta tags', async ({ page }) => {
    const title = await page.title();
    expect(title).toMatch(/Template Gallery|Swift/);
  });

  test('should have proper document structure', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});
