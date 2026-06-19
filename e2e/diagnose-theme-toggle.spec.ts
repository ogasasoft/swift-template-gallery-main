import { test, expect } from '@playwright/test';

test('diagnose theme toggle element', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('header', { timeout: 10000 });

  // Print all buttons to see what's available
  const buttons = await page.locator('header button').all();
  console.log(`Found ${buttons.length} buttons in header`);

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const text = await button.textContent();
    const ariaLabel = await button.getAttribute('aria-label');
    const role = await button.getAttribute('role');
    const _className = await button.getAttribute('class'); // Diagnostic: no longer used
    console.log(`Button ${i}: text="${text}", aria-label="${ariaLabel}", role="${role}"`);

    // Check for theme toggle
    if (text?.includes('theme') || ariaLabel?.includes('theme')) {
      console.log(`  -> This might be the theme toggle!`);
      const hasTestId = await button.getAttribute('data-testid');
      console.log(`  -> data-testid: ${hasTestId}`);
    }
  }

  // Check all buttons with aria-label
  const buttonsWithAriaLabel = await page.locator('button[aria-label]').all();
  console.log(`\nFound ${buttonsWithAriaLabel.length} buttons with aria-label`);

  for (let i = 0; i < buttonsWithAriaLabel.length; i++) {
    const button = buttonsWithAriaLabel[i];
    const ariaLabel = await button.getAttribute('aria-label');
    const hasTestId = await button.getAttribute('data-testid');
    console.log(
      `Button with aria-label ${i}: aria-label="${ariaLabel}", data-testid="${hasTestId}"`
    );
  }

  // Wait and take screenshot
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'diagnosis.png' });
  console.log('Screenshot saved as diagnosis.png');

  // Try to find theme toggle using multiple strategies
  const toggle1 = page.getByRole('button', { name: /theme/i });
  const toggle2 = page.locator('[data-testid="theme-toggle"]');

  console.log(`\nBy role: ${await toggle1.count()} elements`);
  console.log(`By data-testid: ${await toggle2.count()} elements`);

  await expect(page.locator('header')).toBeVisible();
});
