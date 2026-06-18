import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly themeToggle: Locator;
  readonly heroSection: Locator;
  readonly gallerySection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.themeToggle = page.locator('button[data-testid="theme-toggle"]');
    this.heroSection = page.locator('section[data-testid="hero"]');
    this.gallerySection = page.locator('section[data-testid="gallery"]');
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async toggleTheme() {
    await this.themeToggle.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isDarkMode(): Promise<boolean> {
    const body = this.page.locator('body');
    const classList = await body.evaluate(el => el.className);
    return classList.includes('dark');
  }

  async getHeroSectionText(): Promise<string> {
    return (await this.heroSection.textContent()) || '';
  }

  async waitForPageLoad() {
    await this.heroSection.waitFor({ state: 'visible', timeout: 10000 });
  }
}
