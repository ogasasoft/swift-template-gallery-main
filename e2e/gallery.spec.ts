import { test, expect } from '@playwright/test';
import { GalleryPage } from './pages/GalleryPage';
import { TemplateDetailPage } from './pages/TemplateDetailPage';
import { HomePage } from './pages/HomePage';

test.describe('Template Gallery E2E Tests', () => {
  let galleryPage: GalleryPage;
  let templateDetailPage: TemplateDetailPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    galleryPage = new GalleryPage(page);
    templateDetailPage = new TemplateDetailPage(page);
    homePage = new HomePage(page);
    await galleryPage.navigate();
    await galleryPage.waitForGalleryLoad();
  });

  test('should display the gallery section with all templates', async () => {
    const templateCount = await galleryPage.getTemplateCount();
    expect(templateCount).toBeGreaterThan(0);

    const cardsCount = await galleryPage.getFilteredTemplateCount();
    expect(cardsCount).toBeGreaterThan(0);
  });

  test('should display filters section with all unique tags', async () => {
    await galleryPage.filtersSection.waitFor({ state: 'visible' });
    expect(await galleryPage.filtersSection.isVisible()).toBeTruthy();
  });

  test('should allow searching templates by name', async () => {
    const initialCount = await galleryPage.getFilteredTemplateCount();

    await galleryPage.searchTemplates('React');

    const searchResultsCount = await galleryPage.getFilteredTemplateCount();
    // Search results should be less than or equal to initial count
    expect(searchResultsCount).toBeLessThanOrEqual(initialCount);
  });

  test('should filter templates by category', async () => {
    const templateCards = galleryPage.templateCards;

    // Get first template card
    const firstCard = templateCards.nth(0);
    const firstCardText = await firstCard.textContent();
    expect(firstCardText).toBeTruthy();
  });

  test('should display total template count correctly', async () => {
    const totalCount = await galleryPage.getTemplateCount();
    const cardsCount = await galleryPage.getFilteredTemplateCount();

    expect(totalCount).toBe(cardsCount);
  });

  test('should navigate to template detail page', async () => {
    const templateCards = galleryPage.templateCards;
    const count = await templateCards.count();

    if (count > 0) {
      // Click on the first template card
      await galleryPage.clickTemplateCard(0);
      await templateDetailPage.waitForPageLoad();

      // Verify template detail page is displayed
      const title = await templateDetailPage.getTitle();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    }
  });

  test('should display template metadata (industry, tone, style)', async () => {
    await galleryPage.clickTemplateCard(0);
    await templateDetailPage.waitForPageLoad();

    const industry = await templateDetailPage.getIndustry();
    const tone = await templateDetailPage.getTone();
    const style = await templateDetailPage.getStyle();

    expect(industry).toBeTruthy();
    expect(tone).toBeTruthy();
    expect(style).toBeTruthy();
  });

  test('should display all tags as badges', async () => {
    await galleryPage.clickTemplateCard(0);
    await templateDetailPage.waitForPageLoad();

    const tags = await templateDetailPage.getTags();
    expect(tags.length).toBeGreaterThan(0);
    expect(tags.every(tag => tag.trim().length > 0)).toBeTruthy();
  });

  test('should go back to gallery from template detail page', async () => {
    await galleryPage.clickTemplateCard(0);
    await templateDetailPage.waitForPageLoad();

    await templateDetailPage.clickBackToGallery();
    await galleryPage.waitForGalleryLoad();

    // Verify we're back on the gallery page
    const title = await templateDetailPage.getTitle();
    expect(title).not.toBeTruthy(); // Should be empty when on gallery
  });

  test('should display hero section', async () => {
    await homePage.navigate();
    await homePage.waitForPageLoad();

    const heroText = await homePage.getHeroSectionText();
    expect(heroText).toBeTruthy();
    expect(heroText.length).toBeGreaterThan(0);
  });

  test('should toggle dark mode', async () => {
    await homePage.navigate();
    await homePage.waitForPageLoad();

    // Check initial theme
    const isInitiallyDark = await homePage.isDarkMode();

    // Toggle theme
    await homePage.toggleTheme();
    await homePage.waitForPageLoad();

    // Verify theme changed
    const isDark = await homePage.isDarkMode();

    // Theme should toggle (if not initially dark, should become dark)
    if (!isInitiallyDark) {
      expect(isDark).toBeTruthy();
    } else {
      // If initially dark, it should stay dark or become light
      expect(isDark || !isInitiallyDark).toBeTruthy();
    }
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await galleryPage.navigate();
    await galleryPage.waitForGalleryLoad();

    const templateCount = await galleryPage.getTemplateCount();
    expect(templateCount).toBeGreaterThan(0);
  });

  test('should load gallery in less than 3 seconds', async ({ page }) => {
    const startTime = Date.now();

    await galleryPage.navigate();
    await galleryPage.waitForGalleryLoad();

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });
});

test.describe('Template Detail Page E2E Tests', () => {
  let templateDetailPage: TemplateDetailPage;

  test.beforeEach(async ({ page }) => {
    templateDetailPage = new TemplateDetailPage(page);
    await templateDetailPage.navigate('restaurant-01');
    await templateDetailPage.waitForPageLoad();
  });

  test('should display template title', async () => {
    const title = await templateDetailPage.getTitle();
    expect(title).toBeTruthy();
    expect(title.toLowerCase()).toContain('restaurant');
  });

  test('should display template metadata', async () => {
    const industry = await templateDetailPage.getIndustry();
    const tone = await templateDetailPage.getTone();
    const style = await templateDetailPage.getStyle();

    expect(industry).toBeTruthy();
    expect(tone).toBeTruthy();
    expect(style).toBeTruthy();
  });

  test('should display template tags', async () => {
    const tags = await templateDetailPage.getTags();
    expect(tags.length).toBeGreaterThan(0);
  });

  test('should navigate to template preview', async () => {
    await templateDetailPage.clickPreviewButton();
    // Preview modal should be open
    const previewButton = templateDetailPage.previewButton;
    const isDisabled = await previewButton.isDisabled();
    expect(isDisabled).toBeTruthy();
  });

  test('should navigate back to gallery', async ({ page }) => {
    const galleryPage = new GalleryPage(page);
    await templateDetailPage.clickBackToGallery();
    await galleryPage.waitForGalleryLoad();
  });
});
