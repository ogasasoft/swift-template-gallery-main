# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: template-preview.spec.ts >> Template Preview >> should have "Close" button in modal
- Location: e2e/template-preview.spec.ts:33:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid="template-card"]').first()

```

# Page snapshot

```yaml
- generic [ref=e2]:
    - region "Notifications (F8)":
        - list
    - region "Notifications alt+T"
    - generic [ref=e3]:
        - banner [ref=e4]:
            - generic [ref=e5]:
                - generic [ref=e6]: TemplateLab
                - button "Menu" [ref=e7] [cursor=pointer]
        - generic [ref=e9]:
            - heading "See it. Choose it. Get it fast." [level=1] [ref=e10]
            - paragraph [ref=e11]: Pick a design from our gallery and receive your customized site with your own text and images.
            - button "View Gallery" [ref=e12] [cursor=pointer]
        - generic [ref=e13]:
            - generic [ref=e14]:
                - heading "Template Gallery" [level=1] [ref=e15]
                - paragraph [ref=e16]: Browse our collection of templates
            - generic [ref=e17]:
                - generic [ref=e18]:
                    - generic [ref=e19]:
                        - img
                        - textbox "テンプレートを検索..." [ref=e20]
                    - button "フィルター" [ref=e21] [cursor=pointer]:
                        - img
                        - text: フィルター
                - paragraph [ref=e22]: 10 件のテンプレート
            - generic [ref=e23]:
                - generic [ref=e24] [cursor=pointer]:
                    - img "Cafe-01" [ref=e26]
                    - generic [ref=e27]:
                        - heading "Cafe-01" [level=3] [ref=e28]
                        - generic [ref=e31]:
                            - button "1 out of 5 stars" [disabled] [ref=e32]:
                                - img [ref=e33]
                            - button "2 out of 5 stars" [disabled] [ref=e35]:
                                - img [ref=e36]
                            - button "3 out of 5 stars" [disabled] [ref=e38]:
                                - img [ref=e39]
                            - button "4 out of 5 stars" [disabled] [ref=e41]:
                                - img [ref=e42]
                            - button "5 out of 5 stars" [disabled] [ref=e44]:
                                - img [ref=e45]
                        - generic [ref=e47]:
                            - generic "クリックしてフィルター" [ref=e48]: Cafe
                            - generic "クリックしてフィルター" [ref=e49]: Simple
                            - generic "クリックしてフィルター" [ref=e50]: Minimal
                            - generic "クリックしてフィルター" [ref=e51]: Light
                        - generic [ref=e52]:
                            - button "プレビュー" [ref=e53]:
                                - img [ref=e54]
                                - text: プレビュー
                            - link "詳細" [ref=e57]:
                                - /url: /templates/cafe-01
                                - img [ref=e58]
                                - text: 詳細
                            - button "ダウンロード" [ref=e60]:
                                - img [ref=e61]
                - generic [ref=e64] [cursor=pointer]:
                    - img "Cafe-02" [ref=e66]
                    - generic [ref=e67]:
                        - heading "Cafe-02" [level=3] [ref=e68]
                        - generic [ref=e71]:
                            - button "1 out of 5 stars" [disabled] [ref=e72]:
                                - img [ref=e73]
                            - button "2 out of 5 stars" [disabled] [ref=e75]:
                                - img [ref=e76]
                            - button "3 out of 5 stars" [disabled] [ref=e78]:
                                - img [ref=e79]
                            - button "4 out of 5 stars" [disabled] [ref=e81]:
                                - img [ref=e82]
                            - button "5 out of 5 stars" [disabled] [ref=e84]:
                                - img [ref=e85]
                        - generic [ref=e87]:
                            - generic "クリックしてフィルター" [ref=e88]: Cafe
                            - generic "クリックしてフィルター" [ref=e89]: Luxury
                            - generic "クリックしてフィルター" [ref=e90]: Elegant
                            - generic "クリックしてフィルター" [ref=e91]: Premium
                        - generic [ref=e92]:
                            - button "プレビュー" [ref=e93]:
                                - img [ref=e94]
                                - text: プレビュー
                            - link "詳細" [ref=e97]:
                                - /url: /templates/cafe-02
                                - img [ref=e98]
                                - text: 詳細
                            - button "ダウンロード" [ref=e100]:
                                - img [ref=e101]
                - generic [ref=e104] [cursor=pointer]:
                    - img "Cafe-03" [ref=e106]
                    - generic [ref=e107]:
                        - heading "Cafe-03" [level=3] [ref=e108]
                        - generic [ref=e111]:
                            - button "1 out of 5 stars" [disabled] [ref=e112]:
                                - img [ref=e113]
                            - button "2 out of 5 stars" [disabled] [ref=e115]:
                                - img [ref=e116]
                            - button "3 out of 5 stars" [disabled] [ref=e118]:
                                - img [ref=e119]
                            - button "4 out of 5 stars" [disabled] [ref=e121]:
                                - img [ref=e122]
                            - button "5 out of 5 stars" [disabled] [ref=e124]:
                                - img [ref=e125]
                        - generic [ref=e127]:
                            - generic "クリックしてフィルター" [ref=e128]: Cafe
                            - generic "クリックしてフィルター" [ref=e129]: Pop
                            - generic "クリックしてフィルター" [ref=e130]: Colorful
                            - generic "クリックしてフィルター" [ref=e131]: Fun
                        - generic [ref=e132]:
                            - button "プレビュー" [ref=e133]:
                                - img [ref=e134]
                                - text: プレビュー
                            - link "詳細" [ref=e137]:
                                - /url: /templates/cafe-03
                                - img [ref=e138]
                                - text: 詳細
                            - button "ダウンロード" [ref=e140]:
                                - img [ref=e141]
                - generic [ref=e144] [cursor=pointer]:
                    - img "Cafe-04" [ref=e146]
                    - generic [ref=e147]:
                        - heading "Cafe-04" [level=3] [ref=e148]
                        - generic [ref=e151]:
                            - button "1 out of 5 stars" [disabled] [ref=e152]:
                                - img [ref=e153]
                            - button "2 out of 5 stars" [disabled] [ref=e155]:
                                - img [ref=e156]
                            - button "3 out of 5 stars" [disabled] [ref=e158]:
                                - img [ref=e159]
                            - button "4 out of 5 stars" [disabled] [ref=e161]:
                                - img [ref=e162]
                            - button "5 out of 5 stars" [disabled] [ref=e164]:
                                - img [ref=e165]
                        - generic [ref=e167]:
                            - generic "クリックしてフィルター" [ref=e168]: Cafe
                            - generic "クリックしてフィルター" [ref=e169]: Natural
                            - generic "クリックしてフィルター" [ref=e170]: Organic
                            - generic "クリックしてフィルター" [ref=e171]: Earthy
                        - generic [ref=e172]:
                            - button "プレビュー" [ref=e173]:
                                - img [ref=e174]
                                - text: プレビュー
                            - link "詳細" [ref=e177]:
                                - /url: /templates/cafe-04
                                - img [ref=e178]
                                - text: 詳細
                            - button "ダウンロード" [ref=e180]:
                                - img [ref=e181]
                - generic [ref=e184] [cursor=pointer]:
                    - img "Cafe-05" [ref=e186]
                    - generic [ref=e187]:
                        - heading "Cafe-05" [level=3] [ref=e188]
                        - generic [ref=e191]:
                            - button "1 out of 5 stars" [disabled] [ref=e192]:
                                - img [ref=e193]
                            - button "2 out of 5 stars" [disabled] [ref=e195]:
                                - img [ref=e196]
                            - button "3 out of 5 stars" [disabled] [ref=e198]:
                                - img [ref=e199]
                            - button "4 out of 5 stars" [disabled] [ref=e201]:
                                - img [ref=e202]
                            - button "5 out of 5 stars" [disabled] [ref=e204]:
                                - img [ref=e205]
                        - generic [ref=e207]:
                            - generic "クリックしてフィルター" [ref=e208]: Cafe
                            - generic "クリックしてフィルター" [ref=e209]: Modern
                            - generic "クリックしてフィルター" [ref=e210]: Clean
                            - generic "クリックしてフィルター" [ref=e211]: Professional
                        - generic [ref=e212]:
                            - button "プレビュー" [ref=e213]:
                                - img [ref=e214]
                                - text: プレビュー
                            - link "詳細" [ref=e217]:
                                - /url: /templates/cafe-05
                                - img [ref=e218]
                                - text: 詳細
                            - button "ダウンロード" [ref=e220]:
                                - img [ref=e221]
                - generic [ref=e224] [cursor=pointer]:
                    - img "Restaurant-01" [ref=e226]
                    - generic [ref=e227]:
                        - heading "Restaurant-01" [level=3] [ref=e228]
                        - generic [ref=e231]:
                            - button "1 out of 5 stars" [disabled] [ref=e232]:
                                - img [ref=e233]
                            - button "2 out of 5 stars" [disabled] [ref=e235]:
                                - img [ref=e236]
                            - button "3 out of 5 stars" [disabled] [ref=e238]:
                                - img [ref=e239]
                            - button "4 out of 5 stars" [disabled] [ref=e241]:
                                - img [ref=e242]
                            - button "5 out of 5 stars" [disabled] [ref=e244]:
                                - img [ref=e245]
                        - generic [ref=e247]:
                            - generic "クリックしてフィルター" [ref=e248]: Restaurant
                            - generic "クリックしてフィルター" [ref=e249]: Elegant
                            - generic "クリックしてフィルター" [ref=e250]: Sophisticated
                            - generic "クリックしてフィルター" [ref=e251]: Classic
                        - generic [ref=e252]:
                            - button "プレビュー" [ref=e253]:
                                - img [ref=e254]
                                - text: プレビュー
                            - link "詳細" [ref=e257]:
                                - /url: /templates/restaurant-01
                                - img [ref=e258]
                                - text: 詳細
                            - button "ダウンロード" [ref=e260]:
                                - img [ref=e261]
                - generic [ref=e264] [cursor=pointer]:
                    - img "Restaurant-02" [ref=e266]
                    - generic [ref=e267]:
                        - heading "Restaurant-02" [level=3] [ref=e268]
                        - generic [ref=e271]:
                            - button "1 out of 5 stars" [disabled] [ref=e272]:
                                - img [ref=e273]
                            - button "2 out of 5 stars" [disabled] [ref=e275]:
                                - img [ref=e276]
                            - button "3 out of 5 stars" [disabled] [ref=e278]:
                                - img [ref=e279]
                            - button "4 out of 5 stars" [disabled] [ref=e281]:
                                - img [ref=e282]
                            - button "5 out of 5 stars" [disabled] [ref=e284]:
                                - img [ref=e285]
                        - generic [ref=e287]:
                            - generic "クリックしてフィルター" [ref=e288]: Restaurant
                            - generic "クリックしてフィルター" [ref=e289]: Casual
                            - generic "クリックしてフィルター" [ref=e290]: Warm
                            - generic "クリックしてフィルター" [ref=e291]: Friendly
                        - generic [ref=e292]:
                            - button "プレビュー" [ref=e293]:
                                - img [ref=e294]
                                - text: プレビュー
                            - link "詳細" [ref=e297]:
                                - /url: /templates/restaurant-02
                                - img [ref=e298]
                                - text: 詳細
                            - button "ダウンロード" [ref=e300]:
                                - img [ref=e301]
                - generic [ref=e304] [cursor=pointer]:
                    - img "Fashion-01" [ref=e306]
                    - generic [ref=e307]:
                        - heading "Fashion-01" [level=3] [ref=e308]
                        - generic [ref=e311]:
                            - button "1 out of 5 stars" [disabled] [ref=e312]:
                                - img [ref=e313]
                            - button "2 out of 5 stars" [disabled] [ref=e315]:
                                - img [ref=e316]
                            - button "3 out of 5 stars" [disabled] [ref=e318]:
                                - img [ref=e319]
                            - button "4 out of 5 stars" [disabled] [ref=e321]:
                                - img [ref=e322]
                            - button "5 out of 5 stars" [disabled] [ref=e324]:
                                - img [ref=e325]
                        - generic [ref=e327]:
                            - generic "クリックしてフィルター" [ref=e328]: Fashion
                            - generic "クリックしてフィルター" [ref=e329]: Minimal
                            - generic "クリックしてフィルター" [ref=e330]: Chic
                            - generic "クリックしてフィルター" [ref=e331]: Premium
                        - generic [ref=e332]:
                            - button "プレビュー" [ref=e333]:
                                - img [ref=e334]
                                - text: プレビュー
                            - link "詳細" [ref=e337]:
                                - /url: /templates/fashion-01
                                - img [ref=e338]
                                - text: 詳細
                            - button "ダウンロード" [ref=e340]:
                                - img [ref=e341]
                - generic [ref=e344] [cursor=pointer]:
                    - img "Fashion-02" [ref=e346]
                    - generic [ref=e347]:
                        - heading "Fashion-02" [level=3] [ref=e348]
                        - generic [ref=e351]:
                            - button "1 out of 5 stars" [disabled] [ref=e352]:
                                - img [ref=e353]
                            - button "2 out of 5 stars" [disabled] [ref=e355]:
                                - img [ref=e356]
                            - button "3 out of 5 stars" [disabled] [ref=e358]:
                                - img [ref=e359]
                            - button "4 out of 5 stars" [disabled] [ref=e361]:
                                - img [ref=e362]
                            - button "5 out of 5 stars" [disabled] [ref=e364]:
                                - img [ref=e365]
                        - generic [ref=e367]:
                            - generic "クリックしてフィルター" [ref=e368]: Fashion
                            - generic "クリックしてフィルター" [ref=e369]: Pop
                            - generic "クリックしてフィルター" [ref=e370]: Colorful
                            - generic "クリックしてフィルター" [ref=e371]: Bold
                        - generic [ref=e372]:
                            - button "プレビュー" [ref=e373]:
                                - img [ref=e374]
                                - text: プレビュー
                            - link "詳細" [ref=e377]:
                                - /url: /templates/fashion-02
                                - img [ref=e378]
                                - text: 詳細
                            - button "ダウンロード" [ref=e380]:
                                - img [ref=e381]
                - generic [ref=e384] [cursor=pointer]:
                    - img "Tech-01" [ref=e386]
                    - generic [ref=e387]:
                        - heading "Tech-01" [level=3] [ref=e388]
                        - generic [ref=e391]:
                            - button "1 out of 5 stars" [disabled] [ref=e392]:
                                - img [ref=e393]
                            - button "2 out of 5 stars" [disabled] [ref=e395]:
                                - img [ref=e396]
                            - button "3 out of 5 stars" [disabled] [ref=e398]:
                                - img [ref=e399]
                            - button "4 out of 5 stars" [disabled] [ref=e401]:
                                - img [ref=e402]
                            - button "5 out of 5 stars" [disabled] [ref=e404]:
                                - img [ref=e405]
                        - generic [ref=e407]:
                            - generic "クリックしてフィルター" [ref=e408]: Tech
                            - generic "クリックしてフィルター" [ref=e409]: Modern
                            - generic "クリックしてフィルター" [ref=e410]: Clean
                            - generic "クリックしてフィルター" [ref=e411]: Professional
                        - generic [ref=e412]:
                            - button "プレビュー" [ref=e413]:
                                - img [ref=e414]
                                - text: プレビュー
                            - link "詳細" [ref=e417]:
                                - /url: /templates/tech-01
                                - img [ref=e418]
                                - text: 詳細
                            - button "ダウンロード" [ref=e420]:
                                - img [ref=e421]
        - region "Pricing" [ref=e424]:
            - generic [ref=e425]:
                - heading "Pricing" [level=2] [ref=e426]
                - paragraph [ref=e427]: Basic plan includes template usage and content replacement. Additional options available upon request.
                - generic [ref=e428]:
                    - table [ref=e430]:
                        - rowgroup [ref=e431]:
                            - row "Item Price (JPY)" [ref=e432]:
                                - columnheader "Item" [ref=e433]
                                - columnheader "Price (JPY)" [ref=e434]
                        - rowgroup [ref=e435]:
                            - row "Base template setup ¥50,000〜" [ref=e436]:
                                - cell "Base template setup" [ref=e437]
                                - cell "¥50,000〜" [ref=e438]
                            - row "Extra images (per item) ¥3,000" [ref=e439]:
                                - cell "Extra images (per item)" [ref=e440]
                                - cell "¥3,000" [ref=e441]
                            - row "Text replacement (per 200 chars) ¥2,000" [ref=e442]:
                                - cell "Text replacement (per 200 chars)" [ref=e443]
                                - cell "¥2,000" [ref=e444]
                            - row "Extra page ¥15,000" [ref=e445]:
                                - cell "Extra page" [ref=e446]
                                - cell "¥15,000" [ref=e447]
                    - generic [ref=e448]:
                        - paragraph [ref=e449]: 'Delivery time: Usually within 5–7 business days after receiving materials.'
                        - button "Request a Quote" [ref=e450] [cursor=pointer]
        - generic [ref=e452]:
            - heading "Contact" [level=2] [ref=e453]
            - paragraph [ref=e454]: Send us your inquiry or request a quote
            - generic [ref=e455]:
                - generic [ref=e457]:
                    - generic [ref=e458]:
                        - text: Name *
                        - textbox "Name *" [ref=e459]
                    - generic [ref=e460]:
                        - text: Email *
                        - textbox "Email *" [ref=e461]
                    - generic [ref=e462]:
                        - text: Phone
                        - textbox "Phone" [ref=e463]
                    - generic [ref=e464]:
                        - text: Template ID
                        - textbox "Template ID" [ref=e465]:
                            - /placeholder: e.g., cafe-01
                    - generic [ref=e466]:
                        - text: Message
                        - textbox "Message" [ref=e467]:
                            - /placeholder: Note about image/text replacement or any questions...
                    - button "Send Inquiry" [ref=e468] [cursor=pointer]
                - generic [ref=e469]:
                    - paragraph [ref=e470]: 'Or contact us directly:'
                    - generic [ref=e471]:
                        - link "Email" [ref=e472] [cursor=pointer]:
                            - /url: mailto:info@templatelab.com
                            - img
                            - text: Email
                        - link "Phone" [ref=e473] [cursor=pointer]:
                            - /url: tel:+81-3-1234-5678
                            - img
                            - text: Phone
                        - link "LINE" [ref=e474] [cursor=pointer]:
                            - /url: https://line.me
                            - img
                            - text: LINE
                    - paragraph [ref=e475]: info@templatelab.com
        - contentinfo [ref=e476]:
            - generic [ref=e478]:
                - paragraph [ref=e479]: © 2024 TemplateLab. All templates are commercial-use ready.
                - generic [ref=e480]:
                    - link "Terms of Service" [ref=e481] [cursor=pointer]:
                        - /url: '#'
                    - link "Privacy Policy" [ref=e482] [cursor=pointer]:
                        - /url: '#'
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test.describe('Template Preview', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/');
  6  |     const firstCard = page.locator('[data-testid="template-card"]').first();
> 7  |     await firstCard.click();
     |                     ^ Error: locator.click: Test timeout of 30000ms exceeded.
  8  |   });
  9  |
  10 |   test('should open preview modal', async ({ page }) => {
  11 |     const modal = page.locator('[data-testid="preview-modal"]');
  12 |     await expect(modal).toBeVisible();
  13 |   });
  14 |
  15 |   test('should display template title in modal', async ({ page }) => {
  16 |     const modal = page.locator('[data-testid="preview-modal"]');
  17 |     const title = modal.locator('h2');
  18 |     await expect(title).toBeVisible();
  19 |   });
  20 |
  21 |   test('should display template image in modal', async ({ page }) => {
  22 |     const modal = page.locator('[data-testid="preview-modal"]');
  23 |     const image = modal.locator('img');
  24 |     await expect(image).toBeVisible();
  25 |   });
  26 |
  27 |   test('should display template description', async ({ page }) => {
  28 |     const modal = page.locator('[data-testid="preview-modal"]');
  29 |     const description = modal.locator('p');
  30 |     await expect(description).toBeVisible();
  31 |   });
  32 |
  33 |   test('should have "Close" button in modal', async ({ page }) => {
  34 |     const modal = page.locator('[data-testid="preview-modal"]');
  35 |     const closeButton = modal.locator('button:has-text("Close"), button[aria-label="Close"]');
  36 |     await expect(closeButton).toBeVisible();
  37 |   });
  38 |
  39 |   test('should have "Copy Code" button', async ({ page }) => {
  40 |     const modal = page.locator('[data-testid="preview-modal"]');
  41 |     const copyButton = modal.locator('button:has-text("Copy Code")');
  42 |     await expect(copyButton).toBeVisible();
  43 |   });
  44 |
  45 |   test('should copy code to clipboard', async ({ page }) => {
  46 |     const modal = page.locator('[data-testid="preview-modal"]');
  47 |     const copyButton = modal.locator('button:has-text("Copy Code")');
  48 |
  49 |     await copyButton.click();
  50 |
  51 |     // Check if clipboard API was used
  52 |     const clipboardText = await page.evaluate(async () => {
  53 |       return await navigator.clipboard.readText();
  54 |     });
  55 |
  56 |     expect(clipboardText).toBeTruthy();
  57 |     expect(clipboardText.length).toBeGreaterThan(0);
  58 |   });
  59 |
  60 |   test('should close modal when clicking Close button', async ({ page }) => {
  61 |     const modal = page.locator('[data-testid="preview-modal"]');
  62 |     const closeButton = modal.locator('button:has-text("Close"), button[aria-label="Close"]');
  63 |
  64 |     await closeButton.click();
  65 |     await expect(modal).not.toBeVisible();
  66 |   });
  67 |
  68 |   test('should close modal when clicking outside content', async ({ page }) => {
  69 |     const modal = page.locator('[data-testid="preview-modal"]');
  70 |     const backdrop = modal.locator('div[data-testid="modal-backdrop"]');
  71 |
  72 |     await backdrop.click();
  73 |     await expect(modal).not.toBeVisible();
  74 |   });
  75 |
  76 |   test('should close modal on Escape key', async ({ page }) => {
  77 |     const modal = page.locator('[data-testid="preview-modal"]');
  78 |
  79 |     await page.keyboard.press('Escape');
  80 |     await expect(modal).not.toBeVisible();
  81 |   });
  82 | });
  83 |
```
