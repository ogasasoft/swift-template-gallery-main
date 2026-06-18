import { Page, Locator } from '@playwright/test';

export class TemplateDetailPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly industryLabel: Locator;
  readonly toneLabel: Locator;
  readonly styleLabel: Locator;
  readonly tagsContainer: Locator;
  readonly previewButton: Locator;
  readonly backToGalleryLink: Locator;
  readonly templateContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h1[data-testid="template-title"]');
    this.industryLabel = page.locator('[data-testid="industry"]');
    this.toneLabel = page.locator('[data-testid="tone"]');
    this.styleLabel = page.locator('[data-testid="style"]');
    this.tagsContainer = page.locator('[data-testid="tags"]');
    this.previewButton = page.locator('button[data-testid="preview-button"]');
    this.backToGalleryLink = page.locator('a[data-testid="back-to-gallery"]');
    this.templateContent = page.locator('[data-testid="template-content"]');
  }

  async navigate(templateId: string) {
    await this.page.goto(`/templates/${templateId}`);
  }

  async getTitle(): Promise<string> {
    return (await this.pageTitle.textContent()) || '';
  }

  async getIndustry(): Promise<string> {
    return (await this.industryLabel.textContent()) || '';
  }

  async getTone(): Promise<string> {
    return (await this.toneLabel.textContent()) || '';
  }

  async getStyle(): Promise<string> {
    return (await this.styleLabel.textContent()) || '';
  }

  async getTags(): Promise<string[]> {
    const tags = this.tagsContainer.locator('[data-testid="tag"]');
    const count = await tags.count();
    const tagList: string[] = [];
    for (let i = 0; i < count; i++) {
      tagList.push((await tags.nth(i).textContent()) || '');
    }
    return tagList;
  }

  async clickPreviewButton() {
    await this.previewButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickBackToGallery() {
    await this.backToGalleryLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async waitForPageLoad() {
    await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
  }
}
