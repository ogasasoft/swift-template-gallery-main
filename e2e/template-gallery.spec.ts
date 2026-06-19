import { test, expect } from '@playwright/test';

test.describe('Template Gallery - Basic Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the template gallery', async ({ page }) => {
    await expect(page).toHaveTitle(/Template Gallery/);
    await expect(page.locator('h1')).toContainText('Template Gallery');
  });

  test('should have template grid visible', async ({ page }) => {
    await expect(page.locator('[data-testid="template-grid"]')).toBeVisible();
  });

  test('should have search functionality', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('React');
    await page.waitForTimeout(500);
  });
});

test.describe('Theme Toggle - E2E Tests', () => {
  test('should toggle dark mode on button click', async ({ page }) => {
    await page.goto('/');

    // Initial state
    await expect(page.locator('html')).toHaveClass(/light/);

    // Click theme toggle button
    await page.locator('[data-testid="theme-toggle"]').click();

    // Dark mode should be active
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Toggle back to light
    await page.locator('[data-testid="theme-toggle"]').click();

    // Light mode should be active again
    await expect(page.locator('html')).toHaveClass(/light/);
  });

  test('should persist theme preference in localStorage', async ({ page }) => {
    await page.goto('/');

    // Set dark mode
    await page.locator('[data-testid="theme-toggle"]').click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Navigate to another page
    await page.click('text=Components');

    // Theme should persist
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Reset to light
    await page.locator('[data-testid="theme-toggle"]').click();
    await page.reload();

    // Theme should be light
    await expect(page.locator('html')).toHaveClass(/light/);
  });

  test('should apply dark mode system preference', async ({ page }) => {
    // Test light mode
    await page.context().setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/light/);

    // Test dark mode
    await page.context().setExtraHTTPHeaders({
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0 Safari/537.36',
    });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});

test.describe('Component Preview - E2E Tests', () => {
  test('should navigate to template detail page', async ({ page }) => {
    await page.goto('/');

    // Click on first template
    const firstTemplate = page.locator('[data-testid="template-card"]').first();
    await firstTemplate.click();

    // Should navigate to detail page
    await expect(page).toHaveURL(/\/templates\/\w+/);
  });

  test('should display template preview', async ({ page }) => {
    await page.goto('/');

    const firstTemplate = page.locator('[data-testid="template-card"]').first();
    const previewUrl = await firstTemplate.getAttribute('href');
    expect(previewUrl).toBeTruthy();

    await firstTemplate.click();
    await expect(page.locator('[data-testid="template-preview"]')).toBeVisible();
  });

  test('should copy code to clipboard', async ({ page, clipboard }) => {
    await page.goto('/');

    const firstTemplate = page.locator('[data-testid="template-card"]').first();
    await firstTemplate.click();

    const copyButton = page.locator('[data-testid="copy-code-button"]');
    await copyButton.click();

    // Code should be copied to clipboard
    await expect(clipboard).toContain('React');
  });

  test('should have template cards with correct attributes', async ({ page }) => {
    await page.goto('/');

    const templateCards = page.locator('[data-testid="template-card"]');

    // Check we have at least one template card
    await expect(templateCards).toHaveCountGreaterThanOrEqual(5);

    // Check each card has required attributes
    for (let i = 0; i < Math.min(5, await templateCards.count()); i++) {
      const card = templateCards.nth(i);
      await expect(card).toHaveAttribute('href');
      await expect(card).toHaveAttribute('data-testid');
    }
  });
});

test.describe('Navigation - E2E Tests', () => {
  test('should navigate to templates page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Templates');
    await expect(page).toHaveURL(/\/templates/);
  });

  test('should navigate to components page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Components');
    await expect(page).toHaveURL(/\/components/);
  });

  test('should navigate to home from templates page', async ({ page }) => {
    await page.goto('/templates');
    await page.click('text=Template Gallery');
    await expect(page).toHaveURL('/');
  });
});

test.describe('Responsive Design - E2E Tests', () => {
  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    const templateGrid = page.locator('[data-testid="template-grid"]');
    await expect(templateGrid).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/');

    const templateGrid = page.locator('[data-testid="template-grid"]');
    await expect(templateGrid).toBeVisible();
  });

  test('should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto('/');

    const templateGrid = page.locator('[data-testid="template-grid"]');
    await expect(templateGrid).toBeVisible();
  });
});

test.describe('Accessibility - A11y Tests', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    await expect(themeToggle).toHaveAttribute('aria-label');

    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toHaveAttribute('aria-label');
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.locator('[data-testid="search-input"]');

    // Focus on search input
    await searchInput.focus();

    // Type with keyboard
    await page.keyboard.type('React');

    // Press enter
    await page.keyboard.press('Enter');
  });

  test('should have semantic HTML structure', async ({ page }) => {
    await page.goto('/');

    // Check for main element
    await expect(page.locator('main')).toBeVisible();

    // Check for header
    await expect(page.locator('header')).toBeVisible();

    // Check for footer
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Error Handling - E2E Tests', () => {
  test('should handle 404 page correctly', async ({ page }) => {
    await page.goto('/non-existent-page');

    await expect(page.locator('h1')).toContainText(/Not Found|404/);
  });

  test('should handle navigation to invalid routes', async ({ page }) => {
    await page.goto('/invalid-route');

    await expect(page).toHaveURL(/\/invalid-route/);
  });
});
