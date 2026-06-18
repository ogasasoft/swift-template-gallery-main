import { test, expect } from '@playwright/test';

test.describe('Template Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display template cards', async ({ page }) => {
    const cards = page.locator('[data-testid="template-card"]');
    await expect(cards.first()).toBeVisible();

    // Should have at least one template card
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('should have filter controls', async ({ page }) => {
    const filters = page.locator('[data-testid="gallery-filters"]');
    await expect(filters).toBeVisible();
  });

  test('should allow filtering by category', async ({ page }) => {
    const categoryFilter = page.locator('[data-testid="category-filter"]');
    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();
      // Check if dropdown appears
      const dropdown = page.locator('[role="listbox"]');
      await expect(dropdown).toBeVisible();
    }
  });

  test('should allow searching templates', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();
  });

  test('should display template cards with correct structure', async ({ page }) => {
    const card = page.locator('[data-testid="template-card"]').first();

    // Check card has image
    const image = card.locator('img');
    await expect(image).toBeVisible();

    // Check card has title
    const title = card.locator('h3');
    await expect(title).toBeVisible();

    // Check card has description
    const description = card.locator('p');
    await expect(description).toBeVisible();

    // Check card has "View" button
    const viewButton = card.locator('button:has-text("View")');
    await expect(viewButton).toBeVisible();

    // Check card has "Copy Code" button
    const copyButton = card.locator('button:has-text("Copy Code")');
    await expect(copyButton).toBeVisible();
  });

  test('should render card images properly', async ({ page }) => {
    const card = page.locator('[data-testid="template-card"]').first();
    const image = card.locator('img');

    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('loading', 'lazy');
  });

  test('should have responsive card layout', async ({ page }) => {
    // Check if grid layout is responsive
    const gallery = page.locator('[id="gallery"]');
    await expect(gallery).toBeVisible();

    // Test responsive breakpoints (adjust viewport as needed)
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await expect(gallery).toBeVisible();

    await page.setViewportSize({ width: 768, height: 1024 }); // Tablet
    await expect(gallery).toBeVisible();

    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
    await expect(gallery).toBeVisible();
  });
});
