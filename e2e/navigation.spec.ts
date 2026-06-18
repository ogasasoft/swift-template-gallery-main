import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display navigation header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should have logo/link in header', async ({ page }) => {
    const logo = page.locator('header a[href="/"]');
    await expect(logo).toBeVisible();
  });

  test('should navigate to home when logo is clicked', async ({ page }) => {
    const logo = page.locator('header a[href="/"]');
    await logo.click();
    await expect(page).toHaveURL('/');
  });

  test('should have working navigation links', async ({ page }) => {
    const navLinks = page.locator('header nav a');
    const links = await navLinks.all();

    for (const link of links) {
      const href = await link.getAttribute('href');

      if (href) {
        await link.click();
        await expect(page).toHaveURL(href, { timeout: 3000 });
      }
    }
  });

  test('should have hero section', async ({ page }) => {
    const hero = page.locator('section[id="hero"]');
    await expect(hero).toBeVisible();
  });

  test('should have gallery section', async ({ page }) => {
    const gallery = page.locator('section[id="gallery"]');
    await expect(gallery).toBeVisible();
  });

  test('should have pricing section', async ({ page }) => {
    const pricing = page.locator('section[id="pricing"]');
    await expect(pricing).toBeVisible();
  });

  test('should have contact section', async ({ page }) => {
    const contact = page.locator('section[id="contact"]');
    await expect(contact).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have social links in footer', async ({ page }) => {
    const footer = page.locator('footer');
    const socialLinks = footer.locator('a[href*="github"], a[href*="twitter"], a[href*="discord"]');

    const count = await socialLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have copyright in footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toContainText(/copyright|©/);
  });

  test('should have no dead links', async ({ page }) => {
    const allLinks = page.locator('a[href]');
    const count = await allLinks.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const link = allLinks.nth(i);
      const href = await link.getAttribute('href');

      if (href && !href.startsWith('http')) {
        await link.click({ timeout: 3000 });
        await expect(page).toHaveURL(href, { timeout: 3000 });
      }
    }
  });
});
