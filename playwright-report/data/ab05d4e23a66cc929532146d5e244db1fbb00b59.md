# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gallery.spec.ts >> Template Gallery E2E Tests >> should display template metadata (industry, tone, style)
- Location: e2e/gallery.spec.ts:74:3

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('section[data-testid="gallery"]') to be visible

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
                - navigation [ref=e7]:
                    - button "Gallery" [ref=e8] [cursor=pointer]
                    - button "Pricing" [ref=e9] [cursor=pointer]
                    - button "Contact" [ref=e10] [cursor=pointer]
                    - button "Toggle theme" [disabled]:
                        - img
                    - button "Inquiry" [ref=e11] [cursor=pointer]
        - generic [ref=e13]:
            - heading "See it. Choose it. Get it fast." [level=1] [ref=e14]
            - paragraph [ref=e15]: Pick a design from our gallery and receive your customized site with your own text and images.
            - button "View Gallery" [ref=e16] [cursor=pointer]
        - generic [ref=e17]:
            - generic [ref=e18]:
                - heading "Template Gallery" [level=1] [ref=e19]
                - paragraph [ref=e20]: Browse our collection of templates
            - generic [ref=e21]:
                - generic [ref=e22]:
                    - generic [ref=e23]:
                        - img
                        - textbox "テンプレートを検索..." [ref=e24]
                    - button "フィルター" [ref=e25] [cursor=pointer]:
                        - img
                        - text: フィルター
                - paragraph [ref=e26]: 10 件のテンプレート
            - generic [ref=e27]:
                - generic [ref=e28] [cursor=pointer]:
                    - img "Cafe-01" [ref=e30]
                    - generic [ref=e31]:
                        - heading "Cafe-01" [level=3] [ref=e32]
                        - generic [ref=e35]:
                            - button "1 out of 5 stars" [disabled] [ref=e36]:
                                - img [ref=e37]
                            - button "2 out of 5 stars" [disabled] [ref=e39]:
                                - img [ref=e40]
                            - button "3 out of 5 stars" [disabled] [ref=e42]:
                                - img [ref=e43]
                            - button "4 out of 5 stars" [disabled] [ref=e45]:
                                - img [ref=e46]
                            - button "5 out of 5 stars" [disabled] [ref=e48]:
                                - img [ref=e49]
                        - generic [ref=e51]:
                            - generic "クリックしてフィルター" [ref=e52]: Cafe
                            - generic "クリックしてフィルター" [ref=e53]: Simple
                            - generic "クリックしてフィルター" [ref=e54]: Minimal
                            - generic "クリックしてフィルター" [ref=e55]: Light
                        - generic [ref=e56]:
                            - button "プレビュー" [ref=e57]:
                                - img [ref=e58]
                                - text: プレビュー
                            - link "詳細" [ref=e61]:
                                - /url: /templates/cafe-01
                                - img [ref=e62]
                                - text: 詳細
                            - button "ダウンロード" [ref=e64]:
                                - img [ref=e65]
                - generic [ref=e68] [cursor=pointer]:
                    - img "Cafe-02" [ref=e70]
                    - generic [ref=e71]:
                        - heading "Cafe-02" [level=3] [ref=e72]
                        - generic [ref=e75]:
                            - button "1 out of 5 stars" [disabled] [ref=e76]:
                                - img [ref=e77]
                            - button "2 out of 5 stars" [disabled] [ref=e79]:
                                - img [ref=e80]
                            - button "3 out of 5 stars" [disabled] [ref=e82]:
                                - img [ref=e83]
                            - button "4 out of 5 stars" [disabled] [ref=e85]:
                                - img [ref=e86]
                            - button "5 out of 5 stars" [disabled] [ref=e88]:
                                - img [ref=e89]
                        - generic [ref=e91]:
                            - generic "クリックしてフィルター" [ref=e92]: Cafe
                            - generic "クリックしてフィルター" [ref=e93]: Luxury
                            - generic "クリックしてフィルター" [ref=e94]: Elegant
                            - generic "クリックしてフィルター" [ref=e95]: Premium
                        - generic [ref=e96]:
                            - button "プレビュー" [ref=e97]:
                                - img [ref=e98]
                                - text: プレビュー
                            - link "詳細" [ref=e101]:
                                - /url: /templates/cafe-02
                                - img [ref=e102]
                                - text: 詳細
                            - button "ダウンロード" [ref=e104]:
                                - img [ref=e105]
                - generic [ref=e108] [cursor=pointer]:
                    - img "Cafe-03" [ref=e110]
                    - generic [ref=e111]:
                        - heading "Cafe-03" [level=3] [ref=e112]
                        - generic [ref=e115]:
                            - button "1 out of 5 stars" [disabled] [ref=e116]:
                                - img [ref=e117]
                            - button "2 out of 5 stars" [disabled] [ref=e119]:
                                - img [ref=e120]
                            - button "3 out of 5 stars" [disabled] [ref=e122]:
                                - img [ref=e123]
                            - button "4 out of 5 stars" [disabled] [ref=e125]:
                                - img [ref=e126]
                            - button "5 out of 5 stars" [disabled] [ref=e128]:
                                - img [ref=e129]
                        - generic [ref=e131]:
                            - generic "クリックしてフィルター" [ref=e132]: Cafe
                            - generic "クリックしてフィルター" [ref=e133]: Pop
                            - generic "クリックしてフィルター" [ref=e134]: Colorful
                            - generic "クリックしてフィルター" [ref=e135]: Fun
                        - generic [ref=e136]:
                            - button "プレビュー" [ref=e137]:
                                - img [ref=e138]
                                - text: プレビュー
                            - link "詳細" [ref=e141]:
                                - /url: /templates/cafe-03
                                - img [ref=e142]
                                - text: 詳細
                            - button "ダウンロード" [ref=e144]:
                                - img [ref=e145]
                - generic [ref=e148] [cursor=pointer]:
                    - img "Cafe-04" [ref=e150]
                    - generic [ref=e151]:
                        - heading "Cafe-04" [level=3] [ref=e152]
                        - generic [ref=e155]:
                            - button "1 out of 5 stars" [disabled] [ref=e156]:
                                - img [ref=e157]
                            - button "2 out of 5 stars" [disabled] [ref=e159]:
                                - img [ref=e160]
                            - button "3 out of 5 stars" [disabled] [ref=e162]:
                                - img [ref=e163]
                            - button "4 out of 5 stars" [disabled] [ref=e165]:
                                - img [ref=e166]
                            - button "5 out of 5 stars" [disabled] [ref=e168]:
                                - img [ref=e169]
                        - generic [ref=e171]:
                            - generic "クリックしてフィルター" [ref=e172]: Cafe
                            - generic "クリックしてフィルター" [ref=e173]: Natural
                            - generic "クリックしてフィルター" [ref=e174]: Organic
                            - generic "クリックしてフィルター" [ref=e175]: Earthy
                        - generic [ref=e176]:
                            - button "プレビュー" [ref=e177]:
                                - img [ref=e178]
                                - text: プレビュー
                            - link "詳細" [ref=e181]:
                                - /url: /templates/cafe-04
                                - img [ref=e182]
                                - text: 詳細
                            - button "ダウンロード" [ref=e184]:
                                - img [ref=e185]
                - generic [ref=e188] [cursor=pointer]:
                    - img "Cafe-05" [ref=e190]
                    - generic [ref=e191]:
                        - heading "Cafe-05" [level=3] [ref=e192]
                        - generic [ref=e195]:
                            - button "1 out of 5 stars" [disabled] [ref=e196]:
                                - img [ref=e197]
                            - button "2 out of 5 stars" [disabled] [ref=e199]:
                                - img [ref=e200]
                            - button "3 out of 5 stars" [disabled] [ref=e202]:
                                - img [ref=e203]
                            - button "4 out of 5 stars" [disabled] [ref=e205]:
                                - img [ref=e206]
                            - button "5 out of 5 stars" [disabled] [ref=e208]:
                                - img [ref=e209]
                        - generic [ref=e211]:
                            - generic "クリックしてフィルター" [ref=e212]: Cafe
                            - generic "クリックしてフィルター" [ref=e213]: Modern
                            - generic "クリックしてフィルター" [ref=e214]: Clean
                            - generic "クリックしてフィルター" [ref=e215]: Professional
                        - generic [ref=e216]:
                            - button "プレビュー" [ref=e217]:
                                - img [ref=e218]
                                - text: プレビュー
                            - link "詳細" [ref=e221]:
                                - /url: /templates/cafe-05
                                - img [ref=e222]
                                - text: 詳細
                            - button "ダウンロード" [ref=e224]:
                                - img [ref=e225]
                - generic [ref=e228] [cursor=pointer]:
                    - img "Restaurant-01" [ref=e230]
                    - generic [ref=e231]:
                        - heading "Restaurant-01" [level=3] [ref=e232]
                        - generic [ref=e235]:
                            - button "1 out of 5 stars" [disabled] [ref=e236]:
                                - img [ref=e237]
                            - button "2 out of 5 stars" [disabled] [ref=e239]:
                                - img [ref=e240]
                            - button "3 out of 5 stars" [disabled] [ref=e242]:
                                - img [ref=e243]
                            - button "4 out of 5 stars" [disabled] [ref=e245]:
                                - img [ref=e246]
                            - button "5 out of 5 stars" [disabled] [ref=e248]:
                                - img [ref=e249]
                        - generic [ref=e251]:
                            - generic "クリックしてフィルター" [ref=e252]: Restaurant
                            - generic "クリックしてフィルター" [ref=e253]: Elegant
                            - generic "クリックしてフィルター" [ref=e254]: Sophisticated
                            - generic "クリックしてフィルター" [ref=e255]: Classic
                        - generic [ref=e256]:
                            - button "プレビュー" [ref=e257]:
                                - img [ref=e258]
                                - text: プレビュー
                            - link "詳細" [ref=e261]:
                                - /url: /templates/restaurant-01
                                - img [ref=e262]
                                - text: 詳細
                            - button "ダウンロード" [ref=e264]:
                                - img [ref=e265]
                - generic [ref=e268] [cursor=pointer]:
                    - img "Restaurant-02" [ref=e270]
                    - generic [ref=e271]:
                        - heading "Restaurant-02" [level=3] [ref=e272]
                        - generic [ref=e275]:
                            - button "1 out of 5 stars" [disabled] [ref=e276]:
                                - img [ref=e277]
                            - button "2 out of 5 stars" [disabled] [ref=e279]:
                                - img [ref=e280]
                            - button "3 out of 5 stars" [disabled] [ref=e282]:
                                - img [ref=e283]
                            - button "4 out of 5 stars" [disabled] [ref=e285]:
                                - img [ref=e286]
                            - button "5 out of 5 stars" [disabled] [ref=e288]:
                                - img [ref=e289]
                        - generic [ref=e291]:
                            - generic "クリックしてフィルター" [ref=e292]: Restaurant
                            - generic "クリックしてフィルター" [ref=e293]: Casual
                            - generic "クリックしてフィルター" [ref=e294]: Warm
                            - generic "クリックしてフィルター" [ref=e295]: Friendly
                        - generic [ref=e296]:
                            - button "プレビュー" [ref=e297]:
                                - img [ref=e298]
                                - text: プレビュー
                            - link "詳細" [ref=e301]:
                                - /url: /templates/restaurant-02
                                - img [ref=e302]
                                - text: 詳細
                            - button "ダウンロード" [ref=e304]:
                                - img [ref=e305]
                - generic [ref=e308] [cursor=pointer]:
                    - img "Fashion-01" [ref=e310]
                    - generic [ref=e311]:
                        - heading "Fashion-01" [level=3] [ref=e312]
                        - generic [ref=e315]:
                            - button "1 out of 5 stars" [disabled] [ref=e316]:
                                - img [ref=e317]
                            - button "2 out of 5 stars" [disabled] [ref=e319]:
                                - img [ref=e320]
                            - button "3 out of 5 stars" [disabled] [ref=e322]:
                                - img [ref=e323]
                            - button "4 out of 5 stars" [disabled] [ref=e325]:
                                - img [ref=e326]
                            - button "5 out of 5 stars" [disabled] [ref=e328]:
                                - img [ref=e329]
                        - generic [ref=e331]:
                            - generic "クリックしてフィルター" [ref=e332]: Fashion
                            - generic "クリックしてフィルター" [ref=e333]: Minimal
                            - generic "クリックしてフィルター" [ref=e334]: Chic
                            - generic "クリックしてフィルター" [ref=e335]: Premium
                        - generic [ref=e336]:
                            - button "プレビュー" [ref=e337]:
                                - img [ref=e338]
                                - text: プレビュー
                            - link "詳細" [ref=e341]:
                                - /url: /templates/fashion-01
                                - img [ref=e342]
                                - text: 詳細
                            - button "ダウンロード" [ref=e344]:
                                - img [ref=e345]
                - generic [ref=e348] [cursor=pointer]:
                    - img "Fashion-02" [ref=e350]
                    - generic [ref=e351]:
                        - heading "Fashion-02" [level=3] [ref=e352]
                        - generic [ref=e355]:
                            - button "1 out of 5 stars" [disabled] [ref=e356]:
                                - img [ref=e357]
                            - button "2 out of 5 stars" [disabled] [ref=e359]:
                                - img [ref=e360]
                            - button "3 out of 5 stars" [disabled] [ref=e362]:
                                - img [ref=e363]
                            - button "4 out of 5 stars" [disabled] [ref=e365]:
                                - img [ref=e366]
                            - button "5 out of 5 stars" [disabled] [ref=e368]:
                                - img [ref=e369]
                        - generic [ref=e371]:
                            - generic "クリックしてフィルター" [ref=e372]: Fashion
                            - generic "クリックしてフィルター" [ref=e373]: Pop
                            - generic "クリックしてフィルター" [ref=e374]: Colorful
                            - generic "クリックしてフィルター" [ref=e375]: Bold
                        - generic [ref=e376]:
                            - button "プレビュー" [ref=e377]:
                                - img [ref=e378]
                                - text: プレビュー
                            - link "詳細" [ref=e381]:
                                - /url: /templates/fashion-02
                                - img [ref=e382]
                                - text: 詳細
                            - button "ダウンロード" [ref=e384]:
                                - img [ref=e385]
                - generic [ref=e388] [cursor=pointer]:
                    - img "Tech-01" [ref=e390]
                    - generic [ref=e391]:
                        - heading "Tech-01" [level=3] [ref=e392]
                        - generic [ref=e395]:
                            - button "1 out of 5 stars" [disabled] [ref=e396]:
                                - img [ref=e397]
                            - button "2 out of 5 stars" [disabled] [ref=e399]:
                                - img [ref=e400]
                            - button "3 out of 5 stars" [disabled] [ref=e402]:
                                - img [ref=e403]
                            - button "4 out of 5 stars" [disabled] [ref=e405]:
                                - img [ref=e406]
                            - button "5 out of 5 stars" [disabled] [ref=e408]:
                                - img [ref=e409]
                        - generic [ref=e411]:
                            - generic "クリックしてフィルター" [ref=e412]: Tech
                            - generic "クリックしてフィルター" [ref=e413]: Modern
                            - generic "クリックしてフィルター" [ref=e414]: Clean
                            - generic "クリックしてフィルター" [ref=e415]: Professional
                        - generic [ref=e416]:
                            - button "プレビュー" [ref=e417]:
                                - img [ref=e418]
                                - text: プレビュー
                            - link "詳細" [ref=e421]:
                                - /url: /templates/tech-01
                                - img [ref=e422]
                                - text: 詳細
                            - button "ダウンロード" [ref=e424]:
                                - img [ref=e425]
        - region "Pricing" [ref=e428]:
            - generic [ref=e429]:
                - heading "Pricing" [level=2] [ref=e430]
                - paragraph [ref=e431]: Basic plan includes template usage and content replacement. Additional options available upon request.
                - generic [ref=e432]:
                    - table [ref=e434]:
                        - rowgroup [ref=e435]:
                            - row "Item Price (JPY)" [ref=e436]:
                                - columnheader "Item" [ref=e437]
                                - columnheader "Price (JPY)" [ref=e438]
                        - rowgroup [ref=e439]:
                            - row "Base template setup ¥50,000〜" [ref=e440]:
                                - cell "Base template setup" [ref=e441]
                                - cell "¥50,000〜" [ref=e442]
                            - row "Extra images (per item) ¥3,000" [ref=e443]:
                                - cell "Extra images (per item)" [ref=e444]
                                - cell "¥3,000" [ref=e445]
                            - row "Text replacement (per 200 chars) ¥2,000" [ref=e446]:
                                - cell "Text replacement (per 200 chars)" [ref=e447]
                                - cell "¥2,000" [ref=e448]
                            - row "Extra page ¥15,000" [ref=e449]:
                                - cell "Extra page" [ref=e450]
                                - cell "¥15,000" [ref=e451]
                    - generic [ref=e452]:
                        - paragraph [ref=e453]: 'Delivery time: Usually within 5–7 business days after receiving materials.'
                        - button "Request a Quote" [ref=e454] [cursor=pointer]
        - generic [ref=e456]:
            - heading "Contact" [level=2] [ref=e457]
            - paragraph [ref=e458]: Send us your inquiry or request a quote
            - generic [ref=e459]:
                - generic [ref=e461]:
                    - generic [ref=e462]:
                        - text: Name *
                        - textbox "Name *" [ref=e463]
                    - generic [ref=e464]:
                        - text: Email *
                        - textbox "Email *" [ref=e465]
                    - generic [ref=e466]:
                        - text: Phone
                        - textbox "Phone" [ref=e467]
                    - generic [ref=e468]:
                        - text: Template ID
                        - textbox "Template ID" [ref=e469]:
                            - /placeholder: e.g., cafe-01
                    - generic [ref=e470]:
                        - text: Message
                        - textbox "Message" [ref=e471]:
                            - /placeholder: Note about image/text replacement or any questions...
                    - button "Send Inquiry" [ref=e472] [cursor=pointer]
                - generic [ref=e473]:
                    - paragraph [ref=e474]: 'Or contact us directly:'
                    - generic [ref=e475]:
                        - link "Email" [ref=e476] [cursor=pointer]:
                            - /url: mailto:info@templatelab.com
                            - img
                            - text: Email
                        - link "Phone" [ref=e477] [cursor=pointer]:
                            - /url: tel:+81-3-1234-5678
                            - img
                            - text: Phone
                        - link "LINE" [ref=e478] [cursor=pointer]:
                            - /url: https://line.me
                            - img
                            - text: LINE
                    - paragraph [ref=e479]: info@templatelab.com
        - contentinfo [ref=e480]:
            - generic [ref=e482]:
                - paragraph [ref=e483]: © 2024 TemplateLab. All templates are commercial-use ready.
                - generic [ref=e484]:
                    - link "Terms of Service" [ref=e485] [cursor=pointer]:
                        - /url: '#'
                    - link "Privacy Policy" [ref=e486] [cursor=pointer]:
                        - /url: '#'
```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  |
  3  | export class GalleryPage {
  4  |   readonly page: Page;
  5  |   readonly gallerySection: Locator;
  6  |   readonly filtersSection: Locator;
  7  |   readonly templateCards: Locator;
  8  |   readonly searchInput: Locator;
  9  |   readonly totalTemplateCount: Locator;
  10 |
  11 |   constructor(page: Page) {
  12 |     this.page = page;
  13 |     this.gallerySection = page.locator('section[data-testid="gallery"]');
  14 |     this.filtersSection = page.locator('section[data-testid="filters"]');
  15 |     this.templateCards = page.locator('[data-testid="template-card"]');
  16 |     this.searchInput = page.locator('input[data-testid="search-input"]');
  17 |     this.totalTemplateCount = page.locator('[data-testid="template-count"]');
  18 |   }
  19 |
  20 |   async navigate() {
  21 |     await this.page.goto('/');
  22 |   }
  23 |
  24 |   async searchTemplates(text: string) {
  25 |     await this.searchInput.fill(text);
  26 |     await this.page.waitForLoadState('networkidle');
  27 |   }
  28 |
  29 |   async filterByCategory(category: string) {
  30 |     const filterButton = this.page.locator(`button[data-testid="filter-${category}"]`);
  31 |     await filterButton.click();
  32 |     await this.page.waitForLoadState('networkidle');
  33 |   }
  34 |
  35 |   async getTemplateCount(): Promise<number> {
  36 |     const text = await this.totalTemplateCount.textContent();
  37 |     return parseInt(text?.replace(/[^0-9]/g, '') || '0');
  38 |   }
  39 |
  40 |   async getFilteredTemplateCount(): Promise<number> {
  41 |     const cards = await this.templateCards.count();
  42 |     return cards;
  43 |   }
  44 |
  45 |   async clickTemplateCard(index: number) {
  46 |     const card = this.templateCards.nth(index);
  47 |     await card.click();
  48 |     await this.page.waitForLoadState('networkidle');
  49 |   }
  50 |
  51 |   async waitForGalleryLoad() {
> 52 |     await this.gallerySection.waitFor({ state: 'visible', timeout: 10000 });
     |                               ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  53 |   }
  54 | }
  55 |
```
