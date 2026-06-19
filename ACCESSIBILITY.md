# Accessibility Testing Guide

This document outlines the accessibility testing strategy for Swift Template Gallery.

## Overview

We use Axe-core for automated accessibility testing. Axe-core is an open-source toolset from Deque Systems that integrates with Playwright to check web pages for common accessibility issues.

## Tools

- **Axe-core for React**: `@axe-core/react`
- **Playwright**: `@playwright/test`

## Running Accessibility Tests

### Run All E2E Tests

```bash
npm run test:e2e
```

### Run Only Home Page Tests

```bash
npx playwright test e2e/home.resilient.spec.ts
```

### Run in UI Mode

```bash
npm run test:e2e:ui
```

## Accessibility Testing Checklist

### 1. Semantic HTML

- [ ] Use proper HTML5 elements (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`)
- [ ] Use correct heading hierarchy (`h1` → `h2` → `h3`)
- [ ] Include `<main>` element for primary content
- [ ] Include `<nav>` element for navigation
- [ ] Include `<footer>` element for site-wide content

### 2. Keyboard Navigation

- [ ] All interactive elements can be accessed via keyboard
- [ ] Focus is clearly visible
- [ ] Tab order follows logical flow
- [ ] Escape key closes modals/dialogs
- [ ] Focus traps in modals

### 3. Screen Reader Support

- [ ] All images have `alt` attributes
- [ ] ARIA labels are used for complex elements
- [ ] Proper heading hierarchy for screen reader navigation
- [ ] Form labels are associated with inputs
- [ ] Buttons have clear, descriptive labels

### 4. Color Contrast

- [ ] Text and background colors have sufficient contrast (WCAG AA: 4.5:1, AAA: 7:1)
- [ ] Icons are distinguishable by color alone when necessary
- [ ] Focus indicators have sufficient contrast

### 5. Form Accessibility

- [ ] All inputs have associated `<label>` elements
- [ ] Required fields are clearly marked
- [ ] Error messages are associated with inputs
- [ ] Form instructions are accessible

### 6. Error Handling

- [ ] Form validation errors are clearly communicated
- [ ] Focus is automatically moved to error fields
- [ ] Error messages are visible to screen readers
- [ ] No keyboard traps in error states

### 7. Responsive Design

- [ ] Content is accessible on mobile devices
- [ ] Touch targets are at least 44x44 pixels
- [ ] Content doesn't require horizontal scrolling on mobile
- [ ] Breakpoints are accessible

### 8. Media and Embeds

- [ ] Videos have captions/transcripts
- [ ] Audio has transcripts
- [ ] Iframes have descriptive titles
- [ ] Animations have reduced motion alternatives

## Integration with CI/CD

### Pre-commit Hook

Axe-core can be integrated into lint-staged to run accessibility checks on staged files.

### GitHub Actions

Add this to your `.github/workflows/accessibility.yml`:

```yaml
name: Accessibility Testing

on: [push, pull_request]

jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run accessibility tests
        run: npm run test:e2e
```

## Common Accessibility Issues and Fixes

### Issue 1: Missing Alt Text

**Problem**: Images without descriptive alt text

**Fix**:

```tsx
// Before
<img src="/logo.png" />

// After
<img src="/logo.png" alt="Swift Template Gallery Logo" />
```

### Issue 2: Low Color Contrast

**Problem**: Text and background have insufficient contrast

**Fix**: Adjust Tailwind color values or choose different colors

```tsx
// Use higher contrast colors
<div className="text-slate-900 bg-white">  // Good contrast
<div className="text-slate-500 bg-gray-100"> // Acceptable
```

### Issue 3: Missing Labels on Inputs

**Problem**: Form inputs without associated labels

**Fix**: Use proper `<label>` element

```tsx
// Before
<input type="text" placeholder="Search" />

// After
<label htmlFor="search">Search</label>
<input id="search" type="text" placeholder="Search" />
```

### Issue 4: Missing Focus Indicators

**Problem**: No visible focus state on interactive elements

**Fix**: Ensure focus styles are defined in CSS

```css
*:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}
```

## Running Axe-core Manual Audit

For manual accessibility audits, you can use:

1. **Deque Axe DevTools**: Browser extension
2. **Lighthouse**: Built into Chrome DevTools
3. **WAVE**: Browser extension

### Using Chrome DevTools (Lighthouse)

1. Open DevTools (F12 or Cmd+Option+I)
2. Go to the Lighthouse tab
3. Select "Accessibility" category
4. Click "Analyze page load"

## Expected Results

### WCAG Level A Compliance

- ✅ All errors must be fixed
- ✅ All warnings may need attention (but not blocking)
- ✅ All notices are informational

### WCAG Level AA Compliance

- ✅ All errors must be fixed
- ✅ All warnings must be fixed
- ✅ Some notices may be acceptable depending on context

### WCAG Level AAA Compliance

- ✅ All errors must be fixed
- ✅ All warnings must be fixed
- ✅ Most notices must be fixed

## Continuous Improvement

1. Run accessibility tests regularly (before every release)
2. Fix accessibility issues as soon as they are detected
3. Train team members on accessibility best practices
4. Consider accessibility in design reviews
5. Use accessibility testing tools in code reviews

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Axe-core Documentation](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11Y Project](https://www.a11yproject.com/)

## Testing on Real Devices

For comprehensive accessibility testing, test on:

- Desktop browsers (Chrome, Firefox, Safari)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Screen readers (VoiceOver on macOS/iOS, NVDA on Windows, JAWS)
- Keyboard-only navigation

## Next Steps

1. Run the E2E tests to establish a baseline
2. Fix any critical accessibility issues
3. Implement accessibility testing in CI/CD
4. Set up regular accessibility audits
5. Continue improving accessibility score over time
