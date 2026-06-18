# Testing Guide - Swift Template Gallery

## Testing Strategy

This project uses a comprehensive testing approach with:

- **Unit Tests** (Jest + React Testing Library): 162 tests covering all components
- **E2E Tests** (Playwright): Full user flow testing
- **Type Checking** (TypeScript): Zero type errors
- **Linting** (ESLint): Zero errors enforced
- **Code Formatting** (Prettier): Consistent style

## Running Tests

### Unit Tests (Jest)

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=Gallery.test.tsx

# Run specific test
npm test -- --testNamePattern="should render the gallery"
```

### E2E Tests (Playwright)

```bash
# Install Playwright
npm install -D @playwright/test
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run in headed mode (see what's happening)
npx playwright test --headed

# Run with UI mode (visual test runner)
npx playwright test --ui

# Run specific E2E test
npx playwright test e2e/template-gallery.spec.ts

# Debug mode
npx playwright test --debug

# Generate HTML report
npx playwright show-report
```

## Test Coverage

### Unit Test Coverage

**Current Status**: 162 tests passing

```bash
# Generate coverage report
npm run test:coverage
```

**Expected Coverage**: 100% for critical paths

### E2E Test Coverage

**Implemented Tests**:

- Home page tests
- Template gallery and filtering
- Template preview modal
- Dark mode toggle
- Navigation

**Test Files**:

- `e2e/home.spec.ts` - Home page functionality
- `e2e/template-gallery.spec.ts` - Gallery and filters
- `e2e/template-preview.spec.ts` - Preview and code copy
- `e2e/dark-mode.spec.ts` - Dark mode functionality
- `e2e/navigation.spec.ts` - Navigation and links

## Continuous Integration

### GitHub Actions

Tests are integrated into the CI/CD pipeline:

```yaml
# .github/workflows/ci.yml
- name: Run E2E tests
  run: npm run test:e2e

- name: Upload E2E report
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Test Best Practices

### Unit Tests

1. **Test individual components**: Each component should have tests
2. **Test user interactions**: Simulate real user actions
3. **Test edge cases**: Empty states, errors, loading states
4. **Keep tests isolated**: Don't rely on shared state
5. **Test user perspective**: Test what users see and do, not implementation details

### E2E Tests

1. **Test critical user flows**: Core functionality should have E2E tests
2. **Use realistic data**: Use realistic template data
3. **Test responsiveness**: Test on different screen sizes
4. **Test accessibility**: Ensure all interactive elements are testable
5. **Keep tests fast**: Parallel execution for faster feedback

## Adding New Tests

### Adding Unit Tests

1. Create test file in `src/__tests__/components/` or `src/__tests__/pages/`
2. Use React Testing Library's render, screen, and userEvent
3. Follow the pattern in existing tests

Example:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Adding E2E Tests

1. Create test file in `e2e/`
2. Use Playwright's test and expect
3. Follow the pattern in existing tests

Example:

```typescript
import { test, expect } from '@playwright/test';

test('should render button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('button')).toBeVisible();
});
```

## Debugging Tests

### Unit Tests

```bash
# Run specific test with detailed output
npm test -- --verbose

# Run tests with full stack trace
npm test -- --no-coverage
```

### E2E Tests

```bash
# Run in headed mode
npx playwright test --headed

# Run in UI mode
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Run specific test with trace
npx playwright test e2e/template-preview.spec.ts --trace on
```

## Troubleshooting

### Tests Fail on CI

1. Check if web server is starting before tests
2. Ensure database migrations are complete
3. Check for flaky tests and increase retries

### E2E Tests Fail Locally

1. Ensure dev server is running: `npm run dev`
2. Check if Playwright browsers are installed: `npx playwright install`
3. Clear browser cache: `npx playwright test --clear-cache`

### Timeout Issues

1. Increase timeout for slow operations
2. Use `await page.waitForSelector()` for async content
3. Check network conditions

## Performance Optimization

### Unit Tests

- Use `test.each` for data-driven tests
- Mock expensive operations
- Use `vi.useFakeTimers()` for timing-dependent tests

### E2E Tests

- Use `reusable servers` in Playwright config
- Parallelize tests where possible
- Use `test.describe.only` for debugging

## Future Enhancements

- [ ] Add accessibility tests (axe-core)
- [ ] Add visual regression tests
- [ ] Add performance tests (Web Vitals)
- [ ] Add mobile device testing
- [ ] Add Storybook for visual testing
