# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dark-mode.spec.ts >> Dark Mode >> should have correct ARIA attributes
- Location: e2e/dark-mode.spec.ts:70:3

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByRole('button', { name: /theme/i })
Expected pattern: /false|true/
Received string:  ""
Timeout: 5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for getByRole('button', { name: /theme/i })
    14 × locator resolved to <button aria-label="Toggle theme" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">…</button>
       - unexpected value "null"

```

```yaml
- button "Toggle theme":
    - img
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   |
  3   | test.describe('Dark Mode', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('/');
  6   |     // Wait for Header to load
  7   |     await page.waitForSelector('header', { timeout: 10000 });
  8   |
  9   |     // Wait for theme toggle button to be visible
  10  |     const toggle = page.getByRole('button', { name: /theme/i });
  11  |     await toggle.waitFor({ state: 'visible', timeout: 10000 });
  12  |   });
  13  |
  14  |   test('should have theme toggle button', async ({ page }) => {
  15  |     const toggle = page.getByRole('button', { name: /theme/i });
  16  |     await expect(toggle).toBeVisible();
  17  |     await expect(toggle).not.toBeDisabled();
  18  |   });
  19  |
  20  |   test('should toggle dark mode on click', async ({ page }) => {
  21  |     // Use aria-label selector since data-testid is not available
  22  |     const toggle = page.getByRole('button', { name: /theme/i });
  23  |
  24  |     // Check initial state (should be light by default)
  25  |     await expect(toggle).toHaveAttribute('aria-label', /toggle.*theme/i);
  26  |
  27  |     // Click to toggle to dark mode
  28  |     await toggle.click();
  29  |
  30  |     // Check if dark mode class is applied
  31  |     const html = page.locator('html');
  32  |     await expect(html).toHaveClass(/dark/);
  33  |
  34  |     // Toggle back to light mode
  35  |     await toggle.click();
  36  |
  37  |     // Check if dark mode class is removed
  38  |     await expect(html).not.toHaveClass(/dark/);
  39  |   });
  40  |
  41  |   test('should respect system preference by default', async ({ page }) => {
  42  |     // Check if system preference is respected
  43  |     const html = page.locator('html');
  44  |
  45  |     // Dark mode should be applied based on system preference
  46  |     await expect(html).toBeVisible();
  47  |   });
  48  |
  49  |   test('should persist theme preference', async ({ page }) => {
  50  |     // Use aria-label selector since data-testid is not available
  51  |     const toggle = page.getByRole('button', { name: /theme/i });
  52  |
  53  |     // Toggle to dark mode
  54  |     await toggle.click();
  55  |     await expect(page.locator('html')).toHaveClass(/dark/);
  56  |
  57  |     // Refresh page and check if dark mode persists
  58  |     await page.reload();
  59  |     await expect(page.locator('html')).toHaveClass(/dark/);
  60  |
  61  |     // Toggle to light mode
  62  |     await toggle.click();
  63  |     await expect(page.locator('html')).not.toHaveClass(/dark/);
  64  |
  65  |     // Refresh page and check if light mode persists
  66  |     await page.reload();
  67  |     await expect(page.locator('html')).not.toHaveClass(/dark/);
  68  |   });
  69  |
  70  |   test('should have correct ARIA attributes', async ({ page }) => {
  71  |     // Use aria-label selector since data-testid is not available
  72  |     const toggle = page.getByRole('button', { name: /theme/i });
  73  |
  74  |     await expect(toggle).toHaveAttribute('aria-label');
> 75  |     await expect(toggle).toHaveAttribute('aria-pressed', /false|true/);
      |                          ^ Error: expect(locator).toHaveAttribute(expected) failed
  76  |   });
  77  |
  78  |   test('should toggle icon when dark mode changes', async ({ page }) => {
  79  |     // Use aria-label selector since data-testid is not available
  80  |     const toggle = page.getByRole('button', { name: /theme/i });
  81  |
  82  |     // Check initial state
  83  |     const initialIcon = toggle.locator('svg');
  84  |     await expect(initialIcon).toBeVisible();
  85  |
  86  |     // Toggle to dark mode
  87  |     await toggle.click();
  88  |     await expect(page.locator('html')).toHaveClass(/dark/);
  89  |
  90  |     // Check icon changed (check for sun/moon icon)
  91  |     await expect(initialIcon).toBeVisible();
  92  |
  93  |     // Toggle back to light mode
  94  |     await toggle.click();
  95  |     await expect(page.locator('html')).not.toHaveClass(/dark/);
  96  |
  97  |     await expect(initialIcon).toBeVisible();
  98  |   });
  99  | });
  100 |
```
