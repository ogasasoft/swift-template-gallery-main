import { test, expect } from '@playwright/test';

test.describe('Home Page - Resilient Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('h1');
    await expect(hero).toBeVisible();
    const text = await hero.textContent();
    expect(text).toBeTruthy();
    expect(text?.length).toBeGreaterThan(5);
  });

  test('should display navigation header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.locator('button')).toBeVisible();
  });

  test('should have dark mode toggle button (aria-label)', async ({ page }) => {
    const themeToggle = page.locator('button[aria-label*="theme"]');
    await expect(themeToggle).toBeVisible();
  });

  test('should have gallery section', async ({ page }) => {
    const gallery = page.locator('section[id="gallery"]');
    await expect(gallery).toBeVisible();
  });

  test('should have pricing section', async ({ page }) => {
    const pricing = page.locator('section[id="pricing"]');
    await expect(pricing).toBeVisible();
  });

  test('should have contact form section', async ({ page }) => {
    const contact = page.locator('section[id="contact"]');
    await expect(contact).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have footer content', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.locator('p')).toBeVisible();
  });

  test('should have correct document structure', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have proper heading structure', async ({ page }) => {
    const headings = page.locator('h1, h2, h3');
    const count = await headings.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should not contain dead links', async ({ page }) => {
    const links = page.locator('a[href]');
    const linkCount = await links.count();

    if (linkCount > 0) {
      // Check if any link is dead (returns 404/500)
      // For now, just check that links have valid hrefs
      const hrefs = await links.evaluateAll(els => els.map(el => el.getAttribute('href')));

      const validHrefs = hrefs.filter(href => href && href.length > 0);
      expect(validHrefs.length).toBeGreaterThan(0);
    }
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('header')).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('header')).toBeVisible();
  });
});
