import { test, expect } from '@playwright/test';

test.describe('Template Preview', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const firstCard = page.locator('[data-testid="template-card"]').first();
    await firstCard.click();
  });

  test('should open preview modal', async ({ page }) => {
    const modal = page.locator('[data-testid="preview-modal"]');
    await expect(modal).toBeVisible();
  });

  test('should display template title in modal', async ({ page }) => {
    const modal = page.locator('[data-testid="preview-modal"]');
    const title = modal.locator('h2');
    await expect(title).toBeVisible();
  });

  test('should display template image in modal', async ({ page }) => {
    const modal = page.locator('[data-testid="preview-modal"]');
    const image = modal.locator('img');
    await expect(image).toBeVisible();
  });

  test('should display template description', async ({ page }) => {
    const modal = page.locator('[data-testid="preview-modal"]');
    const description = modal.locator('p');
    await expect(description).toBeVisible();
  });

  test('should have "Close" button in modal', async ({ page }) => {
    const modal = page.locator('[data-testid="preview-modal"]');
    const closeButton = modal.locator('button:has-text("Close"), button[aria-label="Close"]');
    await expect(closeButton).toBeVisible();
  });

  test('should have "Copy Code" button', async ({ page }) => {
    const modal = page.locator('[data-testid="preview-modal"]');
    const copyButton = modal.locator('button:has-text("Copy Code")');
    await expect(copyButton).toBeVisible();
  });

  test('should copy code to clipboard', async ({ page }) => {
    const modal = page.locator('[data-testid="preview-modal"]');
    const copyButton = modal.locator('button:has-text("Copy Code")');

    await copyButton.click();

    // Check if clipboard API was used
    const clipboardText = await page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });

    expect(clipboardText).toBeTruthy();
    expect(clipboardText.length).toBeGreaterThan(0);
  });

  test('should close modal when clicking Close button', async ({ page }) => {
    const modal = page.locator('[data-testid="preview-modal"]');
    const closeButton = modal.locator('button:has-text("Close"), button[aria-label="Close"]');

    await closeButton.click();
    await expect(modal).not.toBeVisible();
  });

  test('should close modal when clicking outside content', async ({ page }) => {
    const modal = page.locator('[data-testid="preview-modal"]');
    const backdrop = modal.locator('div[data-testid="modal-backdrop"]');

    await backdrop.click();
    await expect(modal).not.toBeVisible();
  });

  test('should close modal on Escape key', async ({ page }) => {
    const modal = page.locator('[data-testid="preview-modal"]');

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });
});
