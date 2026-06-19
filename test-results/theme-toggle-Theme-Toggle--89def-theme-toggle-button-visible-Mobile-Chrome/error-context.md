# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-toggle.spec.ts >> Theme Toggle >> should have theme toggle button visible
- Location: e2e/theme-toggle.spec.ts:10:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /theme/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /theme/i })

```

```yaml
- region "Notifications (F8)":
    - list
- region "Notifications alt+T"
- banner:
    - text: TemplateLab
    - button "Menu"
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
  1   | import { test, expect } from '@playwright/test';
  2   |
  3   | test.describe('Theme Toggle', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('/');
  6   |     // Wait for Header to load
  7   |     await page.waitForSelector('header', { timeout: 10000 });
  8   |   });
  9   |
  10  |   test('should have theme toggle button visible', async ({ page }) => {
  11  |     const toggle = page.getByRole('button', { name: /theme/i });
> 12  |     await expect(toggle).toBeVisible();
      |                          ^ Error: expect(locator).toBeVisible() failed
  13  |
  14  |     // Wait for button to become enabled (after initial render)
  15  |     await toggle.waitFor({ state: 'enabled', timeout: 10000 });
  16  |   });
  17  |
  18  |   test('should toggle dark mode on click', async ({ page }) => {
  19  |     const toggle = page.getByRole('button', { name: /theme/i });
  20  |
  21  |     // Wait for button to become enabled
  22  |     await toggle.waitFor({ state: 'enabled', timeout: 10000 });
  23  |
  24  |     // Check initial state (should be light by default)
  25  |     await expect(toggle).toBeVisible();
  26  |
  27  |     // Click to toggle to dark mode
  28  |     await toggle.click();
  29  |
  30  |     // Check if dark mode class is applied
  31  |     const html = page.locator('html');
  32  |     await expect(html).toHaveClass('dark');
  33  |
  34  |     // Toggle back to light mode
  35  |     await toggle.click();
  36  |
  37  |     // Check if dark mode class is removed
  38  |     await expect(html).not.toHaveClass('dark');
  39  |   });
  40  |
  41  |   test('should persist theme preference', async ({ page }) => {
  42  |     const toggle = page.getByRole('button', { name: /theme/i });
  43  |
  44  |     // Wait for button to become enabled
  45  |     await toggle.waitFor({ state: 'enabled', timeout: 10000 });
  46  |
  47  |     // Toggle to dark mode
  48  |     await toggle.click();
  49  |     await expect(page.locator('html')).toHaveClass('dark');
  50  |
  51  |     // Refresh page and check if dark mode persists
  52  |     await page.reload();
  53  |     await expect(page.locator('html')).toHaveClass('dark');
  54  |
  55  |     // Toggle to light mode
  56  |     await toggle.click();
  57  |     await expect(page.locator('html')).not.toHaveClass('dark');
  58  |
  59  |     // Refresh page and check if light mode persists
  60  |     await page.reload();
  61  |     await expect(page.locator('html')).not.toHaveClass('dark');
  62  |   });
  63  |
  64  |   test('should have correct ARIA attributes', async ({ page }) => {
  65  |     const toggle = page.getByRole('button', { name: /theme/i });
  66  |
  67  |     // Check aria-label is set
  68  |     await expect(toggle).toHaveAttribute('aria-label');
  69  |
  70  |     // aria-label should contain "toggle" and "theme"
  71  |     const ariaLabel = await toggle.getAttribute('aria-label');
  72  |     expect(ariaLabel).toMatch(/toggle.*theme/i);
  73  |
  74  |     // aria-pressed should be either false, true, or not present (for buttons that aren't toggle buttons)
  75  |     const ariaPressed = await toggle.getAttribute('aria-pressed');
  76  |     expect(ariaPressed).toMatch(/false|true|null/);
  77  |   });
  78  |
  79  |   test('should toggle icon when dark mode changes', async ({ page }) => {
  80  |     const toggle = page.getByRole('button', { name: /theme/i });
  81  |
  82  |     // Wait for button to become enabled
  83  |     await toggle.waitFor({ state: 'enabled', timeout: 10000 });
  84  |
  85  |     // Check initial icon is visible
  86  |     const initialIcon = toggle.locator('svg').first();
  87  |     await expect(initialIcon).toBeVisible();
  88  |
  89  |     // Toggle to dark mode
  90  |     await toggle.click();
  91  |     await expect(page.locator('html')).toHaveClass('dark');
  92  |
  93  |     // Check icon still exists (check for sun/moon icon)
  94  |     await expect(toggle.locator('svg').first()).toBeVisible();
  95  |
  96  |     // Toggle back to light mode
  97  |     await toggle.click();
  98  |     await expect(page.locator('html')).not.toHaveClass('dark');
  99  |
  100 |     // Check icon still exists
  101 |     await expect(toggle.locator('svg').first()).toBeVisible();
  102 |   });
  103 | });
  104 |
```
