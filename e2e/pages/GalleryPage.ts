import { Page, Locator } from '@playwright/test';

export class GalleryPage {
  readonly page: Page;
  readonly gallerySection: Locator;
  readonly filtersSection: Locator;
  readonly templateCards: Locator;
  readonly searchInput: Locator;
  readonly totalTemplateCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gallerySection = page.locator('section[data-testid="gallery"]');
    this.filtersSection = page.locator('section[data-testid="filters"]');
    this.templateCards = page.locator('[data-testid="template-card"]');
    this.searchInput = page.locator('input[data-testid="search-input"]');
    this.totalTemplateCount = page.locator('[data-testid="template-count"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async searchTemplates(text: string) {
    await this.searchInput.fill(text);
    await this.page.waitForLoadState('networkidle');
  }

  async filterByCategory(category: string) {
    const filterButton = this.page.locator(`button[data-testid="filter-${category}"]`);
    await filterButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getTemplateCount(): Promise<number> {
    const text = await this.totalTemplateCount.textContent();
    return parseInt(text?.replace(/[^0-9]/g, '') || '0');
  }

  async getFilteredTemplateCount(): Promise<number> {
    const cards = await this.templateCards.count();
    return cards;
  }

  async clickTemplateCard(index: number) {
    const card = this.templateCards.nth(index);
    await card.click();
    await this.page.waitForLoadState('networkidle');
  }

  async waitForGalleryLoad() {
    await this.gallerySection.waitFor({ state: 'visible', timeout: 10000 });
  }
}
