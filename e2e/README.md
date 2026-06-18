# E2E Tests - Swift Template Gallery

## Overview

This directory contains end-to-end tests for the Swift Template Gallery using Playwright.

## Setup

### Install Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

### Run Tests

```bash
# Run all tests
npm run test:e2e

# Run in headed mode
npx playwright test --headed

# Run with UI mode
npx playwright test --ui

# Run specific test
npx playwright test tests/template-gallery.spec.ts

# Debug mode
npx playwright test --debug
```

## Test Structure

```
e2e/
├── home.spec.ts          # Home page tests
├── template-gallery.spec.ts  # Gallery and filters
├── template-preview.spec.ts  # Template preview and code copy
├── dark-mode.spec.ts     # Dark mode toggle
├── navigation.spec.ts    # Navigation tests
└── README.md             # This file
```

## CI/CD Integration

Tests are integrated into the GitHub Actions pipeline.

## Future Improvements

- [ ] Add performance tests
- [ ] Add accessibility tests
- [ ] Add visual regression tests
- [ ] Add mobile device testing
