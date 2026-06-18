# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gallery.spec.ts >> Template Detail Page E2E Tests >> should navigate to template preview
- Location: e2e/gallery.spec.ts:192:3

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('h1[data-testid="template-title"]') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
    - region "Notifications (F8)":
        - list
    - region "Notifications alt+T"
    - generic [ref=e3]:
        - link "ギャラリーに戻る" [ref=e4] [cursor=pointer]:
            - /url: /
            - img [ref=e5]
            - text: ギャラリーに戻る
        - generic [ref=e7]:
            - img "Restaurant-01" [ref=e9]
            - generic [ref=e10]:
                - heading "Restaurant-01" [level=1] [ref=e12]
                - generic [ref=e13]:
                    - generic [ref=e14]:
                        - generic [ref=e15]: 業種
                        - generic [ref=e16]: Restaurant
                    - generic [ref=e17]:
                        - generic [ref=e18]: トーン
                        - generic [ref=e19]: Sophisticated
                    - generic [ref=e20]:
                        - generic [ref=e21]: スタイル
                        - generic [ref=e22]: Elegant
                - generic [ref=e23]:
                    - paragraph [ref=e24]: タグ
                    - generic [ref=e25]:
                        - generic [ref=e26]: Restaurant
                        - generic [ref=e27]: Elegant
                        - generic [ref=e28]: Sophisticated
                        - generic [ref=e29]: Classic
                - button "プレビューを見る" [ref=e30] [cursor=pointer]:
                    - img
                    - text: プレビューを見る
```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  |
  3  | export class TemplateDetailPage {
  4  |   readonly page: Page;
  5  |   readonly pageTitle: Locator;
  6  |   readonly industryLabel: Locator;
  7  |   readonly toneLabel: Locator;
  8  |   readonly styleLabel: Locator;
  9  |   readonly tagsContainer: Locator;
  10 |   readonly previewButton: Locator;
  11 |   readonly backToGalleryLink: Locator;
  12 |   readonly templateContent: Locator;
  13 |
  14 |   constructor(page: Page) {
  15 |     this.page = page;
  16 |     this.pageTitle = page.locator('h1[data-testid="template-title"]');
  17 |     this.industryLabel = page.locator('[data-testid="industry"]');
  18 |     this.toneLabel = page.locator('[data-testid="tone"]');
  19 |     this.styleLabel = page.locator('[data-testid="style"]');
  20 |     this.tagsContainer = page.locator('[data-testid="tags"]');
  21 |     this.previewButton = page.locator('button[data-testid="preview-button"]');
  22 |     this.backToGalleryLink = page.locator('a[data-testid="back-to-gallery"]');
  23 |     this.templateContent = page.locator('[data-testid="template-content"]');
  24 |   }
  25 |
  26 |   async navigate(templateId: string) {
  27 |     await this.page.goto(`/templates/${templateId}`);
  28 |   }
  29 |
  30 |   async getTitle(): Promise<string> {
  31 |     return await this.pageTitle.textContent() || '';
  32 |   }
  33 |
  34 |   async getIndustry(): Promise<string> {
  35 |     return await this.industryLabel.textContent() || '';
  36 |   }
  37 |
  38 |   async getTone(): Promise<string> {
  39 |     return await this.toneLabel.textContent() || '';
  40 |   }
  41 |
  42 |   async getStyle(): Promise<string> {
  43 |     return await this.styleLabel.textContent() || '';
  44 |   }
  45 |
  46 |   async getTags(): Promise<string[]> {
  47 |     const tags = this.tagsContainer.locator('[data-testid="tag"]');
  48 |     const count = await tags.count();
  49 |     const tagList: string[] = [];
  50 |     for (let i = 0; i < count; i++) {
  51 |       tagList.push(await tags.nth(i).textContent() || '');
  52 |     }
  53 |     return tagList;
  54 |   }
  55 |
  56 |   async clickPreviewButton() {
  57 |     await this.previewButton.click();
  58 |     await this.page.waitForLoadState('networkidle');
  59 |   }
  60 |
  61 |   async clickBackToGallery() {
  62 |     await this.backToGalleryLink.click();
  63 |     await this.page.waitForLoadState('networkidle');
  64 |   }
  65 |
  66 |   async waitForPageLoad() {
> 67 |     await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
     |                          ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  68 |   }
  69 | }
  70 |
```
