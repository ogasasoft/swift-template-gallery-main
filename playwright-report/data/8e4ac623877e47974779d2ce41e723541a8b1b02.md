# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: template-gallery.spec.ts >> Template Gallery >> should have responsive card layout
- Location: e2e/template-gallery.spec.ts:69:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[id="gallery"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[id="gallery"]')

```

```yaml
- region "Notifications (F8)":
    - list
- region "Notifications alt+T"
- banner:
    - text: TemplateLab
    - navigation:
        - button "Gallery"
        - button "Pricing"
        - button "Contact"
        - button "Toggle theme" [disabled]:
            - img
        - button "Inquiry"
- heading "See it. Choose it. Get it fast." [level=1]
- paragraph: Pick a design from our gallery and receive your customized site with your own text and images.
- button "View Gallery"
- heading "Template Gallery" [level=1]
- paragraph: Browse our collection of templates
- img
- textbox "テンプレートを検索..."
- button "フィルター":
    - img
    - text: フィルター
- paragraph: 10 件のテンプレート
- img "Cafe-01"
- heading "Cafe-01" [level=3]
- button "1 out of 5 stars" [disabled]:
    - img
- button "2 out of 5 stars" [disabled]:
    - img
- button "3 out of 5 stars" [disabled]:
    - img
- button "4 out of 5 stars" [disabled]:
    - img
- button "5 out of 5 stars" [disabled]:
    - img
- text: Cafe Simple Minimal Light
- button "プレビュー":
    - img
    - text: プレビュー
- link "詳細":
    - /url: /templates/cafe-01
    - img
    - text: 詳細
- button "ダウンロード":
    - img
- img "Cafe-02"
- heading "Cafe-02" [level=3]
- button "1 out of 5 stars" [disabled]:
    - img
- button "2 out of 5 stars" [disabled]:
    - img
- button "3 out of 5 stars" [disabled]:
    - img
- button "4 out of 5 stars" [disabled]:
    - img
- button "5 out of 5 stars" [disabled]:
    - img
- text: Cafe Luxury Elegant Premium
- button "プレビュー":
    - img
    - text: プレビュー
- link "詳細":
    - /url: /templates/cafe-02
    - img
    - text: 詳細
- button "ダウンロード":
    - img
- img "Cafe-03"
- heading "Cafe-03" [level=3]
- button "1 out of 5 stars" [disabled]:
    - img
- button "2 out of 5 stars" [disabled]:
    - img
- button "3 out of 5 stars" [disabled]:
    - img
- button "4 out of 5 stars" [disabled]:
    - img
- button "5 out of 5 stars" [disabled]:
    - img
- text: Cafe Pop Colorful Fun
- button "プレビュー":
    - img
    - text: プレビュー
- link "詳細":
    - /url: /templates/cafe-03
    - img
    - text: 詳細
- button "ダウンロード":
    - img
- img "Cafe-04"
- heading "Cafe-04" [level=3]
- button "1 out of 5 stars" [disabled]:
    - img
- button "2 out of 5 stars" [disabled]:
    - img
- button "3 out of 5 stars" [disabled]:
    - img
- button "4 out of 5 stars" [disabled]:
    - img
- button "5 out of 5 stars" [disabled]:
    - img
- text: Cafe Natural Organic Earthy
- button "プレビュー":
    - img
    - text: プレビュー
- link "詳細":
    - /url: /templates/cafe-04
    - img
    - text: 詳細
- button "ダウンロード":
    - img
- img "Cafe-05"
- heading "Cafe-05" [level=3]
- button "1 out of 5 stars" [disabled]:
    - img
- button "2 out of 5 stars" [disabled]:
    - img
- button "3 out of 5 stars" [disabled]:
    - img
- button "4 out of 5 stars" [disabled]:
    - img
- button "5 out of 5 stars" [disabled]:
    - img
- text: Cafe Modern Clean Professional
- button "プレビュー":
    - img
    - text: プレビュー
- link "詳細":
    - /url: /templates/cafe-05
    - img
    - text: 詳細
- button "ダウンロード":
    - img
- img "Restaurant-01"
- heading "Restaurant-01" [level=3]
- button "1 out of 5 stars" [disabled]:
    - img
- button "2 out of 5 stars" [disabled]:
    - img
- button "3 out of 5 stars" [disabled]:
    - img
- button "4 out of 5 stars" [disabled]:
    - img
- button "5 out of 5 stars" [disabled]:
    - img
- text: Restaurant Elegant Sophisticated Classic
- button "プレビュー":
    - img
    - text: プレビュー
- link "詳細":
    - /url: /templates/restaurant-01
    - img
    - text: 詳細
- button "ダウンロード":
    - img
- img "Restaurant-02"
- heading "Restaurant-02" [level=3]
- button "1 out of 5 stars" [disabled]:
    - img
- button "2 out of 5 stars" [disabled]:
    - img
- button "3 out of 5 stars" [disabled]:
    - img
- button "4 out of 5 stars" [disabled]:
    - img
- button "5 out of 5 stars" [disabled]:
    - img
- text: Restaurant Casual Warm Friendly
- button "プレビュー":
    - img
    - text: プレビュー
- link "詳細":
    - /url: /templates/restaurant-02
    - img
    - text: 詳細
- button "ダウンロード":
    - img
- img "Fashion-01"
- heading "Fashion-01" [level=3]
- button "1 out of 5 stars" [disabled]:
    - img
- button "2 out of 5 stars" [disabled]:
    - img
- button "3 out of 5 stars" [disabled]:
    - img
- button "4 out of 5 stars" [disabled]:
    - img
- button "5 out of 5 stars" [disabled]:
    - img
- text: Fashion Minimal Chic Premium
- button "プレビュー":
    - img
    - text: プレビュー
- link "詳細":
    - /url: /templates/fashion-01
    - img
    - text: 詳細
- button "ダウンロード":
    - img
- img "Fashion-02"
- heading "Fashion-02" [level=3]
- button "1 out of 5 stars" [disabled]:
    - img
- button "2 out of 5 stars" [disabled]:
    - img
- button "3 out of 5 stars" [disabled]:
    - img
- button "4 out of 5 stars" [disabled]:
    - img
- button "5 out of 5 stars" [disabled]:
    - img
- text: Fashion Pop Colorful Bold
- button "プレビュー":
    - img
    - text: プレビュー
- link "詳細":
    - /url: /templates/fashion-02
    - img
    - text: 詳細
- button "ダウンロード":
    - img
- img "Tech-01"
- heading "Tech-01" [level=3]
- button "1 out of 5 stars" [disabled]:
    - img
- button "2 out of 5 stars" [disabled]:
    - img
- button "3 out of 5 stars" [disabled]:
    - img
- button "4 out of 5 stars" [disabled]:
    - img
- button "5 out of 5 stars" [disabled]:
    - img
- text: Tech Modern Clean Professional
- button "プレビュー":
    - img
    - text: プレビュー
- link "詳細":
    - /url: /templates/tech-01
    - img
    - text: 詳細
- button "ダウンロード":
    - img
- region "Pricing":
    - heading "Pricing" [level=2]
    - paragraph: Basic plan includes template usage and content replacement. Additional options available upon request.
    - table:
        - rowgroup:
            - row "Item Price (JPY)":
                - columnheader "Item"
                - columnheader "Price (JPY)"
        - rowgroup:
            - row "Base template setup ¥50,000〜":
                - cell "Base template setup"
                - cell "¥50,000〜"
            - row "Extra images (per item) ¥3,000":
                - cell "Extra images (per item)"
                - cell "¥3,000"
            - row "Text replacement (per 200 chars) ¥2,000":
                - cell "Text replacement (per 200 chars)"
                - cell "¥2,000"
            - row "Extra page ¥15,000":
                - cell "Extra page"
                - cell "¥15,000"
    - paragraph: 'Delivery time: Usually within 5–7 business days after receiving materials.'
    - button "Request a Quote"
- heading "Contact" [level=2]
- paragraph: Send us your inquiry or request a quote
- text: Name *
- textbox "Name *"
- text: Email *
- textbox "Email *"
- text: Phone
- textbox "Phone"
- text: Template ID
- textbox "Template ID":
    - /placeholder: e.g., cafe-01
- text: Message
- textbox "Message":
    - /placeholder: Note about image/text replacement or any questions...
- button "Send Inquiry"
- paragraph: 'Or contact us directly:'
- link "Email":
    - /url: mailto:info@templatelab.com
    - img
    - text: Email
- link "Phone":
    - /url: tel:+81-3-1234-5678
    - img
    - text: Phone
- link "LINE":
    - /url: https://line.me
    - img
    - text: LINE
- paragraph: info@templatelab.com
- contentinfo:
    - paragraph: © 2024 TemplateLab. All templates are commercial-use ready.
    - link "Terms of Service":
        - /url: '#'
    - link "Privacy Policy":
        - /url: '#'
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test.describe('Template Gallery', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/');
  6  |   });
  7  |
  8  |   test('should display template cards', async ({ page }) => {
  9  |     const cards = page.locator('[data-testid="template-card"]');
  10 |     await expect(cards.first()).toBeVisible();
  11 |
  12 |     // Should have at least one template card
  13 |     const cardCount = await cards.count();
  14 |     expect(cardCount).toBeGreaterThan(0);
  15 |   });
  16 |
  17 |   test('should have filter controls', async ({ page }) => {
  18 |     const filters = page.locator('[data-testid="gallery-filters"]');
  19 |     await expect(filters).toBeVisible();
  20 |   });
  21 |
  22 |   test('should allow filtering by category', async ({ page }) => {
  23 |     const categoryFilter = page.locator('[data-testid="category-filter"]');
  24 |     if (await categoryFilter.isVisible()) {
  25 |       await categoryFilter.click();
  26 |       // Check if dropdown appears
  27 |       const dropdown = page.locator('[role="listbox"]');
  28 |       await expect(dropdown).toBeVisible();
  29 |     }
  30 |   });
  31 |
  32 |   test('should allow searching templates', async ({ page }) => {
  33 |     const searchInput = page.locator('[data-testid="search-input"]');
  34 |     await expect(searchInput).toBeVisible();
  35 |   });
  36 |
  37 |   test('should display template cards with correct structure', async ({ page }) => {
  38 |     const card = page.locator('[data-testid="template-card"]').first();
  39 |
  40 |     // Check card has image
  41 |     const image = card.locator('img');
  42 |     await expect(image).toBeVisible();
  43 |
  44 |     // Check card has title
  45 |     const title = card.locator('h3');
  46 |     await expect(title).toBeVisible();
  47 |
  48 |     // Check card has description
  49 |     const description = card.locator('p');
  50 |     await expect(description).toBeVisible();
  51 |
  52 |     // Check card has "View" button
  53 |     const viewButton = card.locator('button:has-text("View")');
  54 |     await expect(viewButton).toBeVisible();
  55 |
  56 |     // Check card has "Copy Code" button
  57 |     const copyButton = card.locator('button:has-text("Copy Code")');
  58 |     await expect(copyButton).toBeVisible();
  59 |   });
  60 |
  61 |   test('should render card images properly', async ({ page }) => {
  62 |     const card = page.locator('[data-testid="template-card"]').first();
  63 |     const image = card.locator('img');
  64 |
  65 |     await expect(image).toBeVisible();
  66 |     await expect(image).toHaveAttribute('loading', 'lazy');
  67 |   });
  68 |
  69 |   test('should have responsive card layout', async ({ page }) => {
  70 |     // Check if grid layout is responsive
  71 |     const gallery = page.locator('[id="gallery"]');
> 72 |     await expect(gallery).toBeVisible();
     |                           ^ Error: expect(locator).toBeVisible() failed
  73 |
  74 |     // Test responsive breakpoints (adjust viewport as needed)
  75 |     await page.setViewportSize({ width: 375, height: 667 }); // Mobile
  76 |     await expect(gallery).toBeVisible();
  77 |
  78 |     await page.setViewportSize({ width: 768, height: 1024 }); // Tablet
  79 |     await expect(gallery).toBeVisible();
  80 |
  81 |     await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
  82 |     await expect(gallery).toBeVisible();
  83 |   });
  84 | });
  85 |
```
