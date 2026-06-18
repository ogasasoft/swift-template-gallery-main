# Test Performance Optimization Guide

This guide explains how to optimize test performance for Swift Template Gallery.

## Table of Contents

- [Overview](#overview)
- [Current Performance](#current-performance)
- [Optimization Techniques](#optimization-techniques)
- [Testing in CI/CD](#testing-in-cicd)
- [Common Performance Issues](#common-performance-issues)
- [Best Practices](#best-practices)

## Overview

This project uses Jest 30.4.2 with React Testing Library for comprehensive test coverage.

### Test Statistics

- **Total Tests**: 162 tests
- **Test Suites**: 17 suites
- **Pass Rate**: 100% (162 passed, 1 skipped)
- **Coverage**: Critical paths 100%

## Current Performance

### Development Mode Performance

```bash
npm run test:watch
```

- Initial load: ~5-8 seconds
- Re-run on change: ~2-3 seconds
- Memory usage: ~250MB

### CI/CD Performance

```bash
npm run test:ci
```

- Total time: ~2-3 minutes
- Max workers: 2
- Coverage report generation: ~30 seconds

## Optimization Techniques

### 1. Parallel Test Execution

Jest automatically runs tests in parallel by default when running `npm test`:

```bash
# Uses all available CPU cores
npm test

# Limited to 2 workers (CI mode)
npm run test:ci
```

**Benefit**: Reduces total execution time by ~40-60%

### 2. Test Splitting

For very large test suites, split tests into multiple files:

```typescript
// test/unit/integration.spec.ts
describe('Order Processing', () => {
  // Integration tests for orders
});
```

```typescript
// test/unit/checkout.spec.ts
describe('Checkout Flow', () => {
  // Checkout specific tests
});
```

Run specific suites in parallel:

```bash
npm test -- --testPathPattern='integration'
npm test -- --testPathPattern='checkout'
```

### 3. Mocking External Dependencies

Minimize real API calls and heavy computations:

```typescript
// ✅ Good: Mocked data
const mockOrders = [...]; // Mock data
render(<OrderList orders={mockOrders} />);

// ❌ Bad: Real API call
fetch('/api/orders').then(orders => {
  render(<OrderList orders={orders} />);
});
```

### 4. Use `vi.hoisted` for Helper Functions

Hoist helper functions to avoid re-creating them in each test:

```typescript
import { vi } from 'vitest'; // or 'jest'

const mockFetch = vi.fn();
vi.hoisted(() => ({ mockFetch })); // Hoist outside describe

describe('Data Fetching', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should fetch data', () => {
    mockFetch.mockResolvedValue({ data: 'test' });
    // test implementation
  });
});
```

### 5. Avoid Test Pollution

Reset state between tests:

```typescript
beforeEach(() => {
  // Clear local storage
  localStorage.clear();
  // Reset mocks
  jest.clearAllMocks();
  // Reset timers
  jest.useRealTimers();
});

afterEach(() => {
  // Cleanup
  cleanup();
});
```

### 6. Use `async/await` Correctly

Avoid unnecessary awaits in tests:

```typescript
// ✅ Good: Simple await
it('should load data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});

// ❌ Bad: Nested async/await
it('should load data', async () => {
  await loadData(async () => {
    const result = await fetchData();
    expect(result).toBeDefined();
  });
});
```

## Testing in CI/CD

### GitHub Actions Configuration

The project uses `npm run test:ci` in CI:

```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    - run: npm ci
    - run: npm run test:ci
```

### Performance Monitoring

Monitor CI performance in GitHub Actions:

1. Go to Actions tab
2. Select a workflow run
3. Check the "Performance" tab

### Cache Dependencies

Jest cache speeds up test re-run:

```bash
# Clears cache (for debugging)
jest --clearCache

# Uses cache (faster)
npm test
```

### Increase Worker Count (for very large suites)

```typescript
// jest.config.ts
export default {
  maxWorkers: '50%',
  // ...
};
```

## Common Performance Issues

### Issue: Tests Running Slowly

**Symptoms**:

- `npm test` takes > 10 seconds to start
- Individual tests take > 5 seconds to complete

**Solutions**:

1. Check for unnecessary `sleep()` in tests
2. Remove unused test files
3. Reduce test count by splitting into smaller suites
4. Enable Jest cache: `jest --cache`

### Issue: Test Flakiness

**Symptoms**:

- Tests pass locally but fail in CI

**Solutions**:

1. Avoid using real timers: `jest.useFakeTimers()`
2. Use `waitFor()` instead of `setTimeout()`
3. Ensure all async operations complete
4. Mock external services reliably

### Issue: Memory Leaks

**Symptoms**:

- Tests consume increasing memory
- CI runs fail with OOM errors

**Solutions**:

1. Call `cleanup()` after each test
2. Clear `localStorage` and `sessionStorage`
3. Unmount components: `unmount()`
4. Check for missing `destroy()` calls

## Best Practices

### 1. Write Fast Tests

- **Rule**: Test execution time should be < 1 second per test file
- **Rule**: Total test suite should run in < 5 minutes

### 2. Focus on Integration Tests

- Use unit tests for pure functions
- Use integration tests for component interactions
- Keep unit tests fast, meaningful, and focused

### 3. Use Descriptive Test Names

```typescript
// ✅ Good
it('should display error message when API fails', () => { ... });

// ❌ Bad
it('should render component', () => { ... });
```

### 4. Keep Tests Independent

- Each test should run independently
- Avoid shared state between tests
- Reset state in `beforeEach()`

### 5. Test Edge Cases

```typescript
it('should handle empty array', () => {
  expect(render([])).toBeNull();
});

it('should handle null input', () => {
  expect(render(null)).toBeNull();
});

it('should handle undefined input', () => {
  expect(render(undefined)).toBeNull();
});
```

### 6. Use Test Helpers

Create reusable test utilities:

```typescript
// test/test-utils.tsx
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: RenderOptions
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider>{children}</ThemeProvider>
    ),
    ...options,
  });
};
```

## Performance Benchmarks

### Target Metrics

| Metric             | Target  | Current  |
| ------------------ | ------- | -------- |
| Test Suite Time    | < 2 min | ~2-3 min |
| Test Re-run Time   | < 5 sec | ~2-3 sec |
| Memory per Test    | < 50MB  | ~25MB    |
| Coverage Threshold | > 90%   | 100%     |

### Optimization Checklist

- [ ] Use `npm run test:watch` for development
- [ ] Use `npm run test:ci` for CI/CD
- [ ] Mock external dependencies
- [ ] Clear state between tests
- [ ] Use `waitFor()` instead of timers
- [ ] Keep test files small (< 200 lines)
- [ ] Use Jest cache
- [ ] Monitor CI performance
- [ ] Report slow tests in issue tracker

## Additional Resources

- [Jest Performance Best Practices](https://jestjs.io/docs/tutorial-performance)
- [Testing Library Performance](https://testing-library.com/docs/guiding-principles/)
- [React Testing Library Performance](https://reactjs.org/docs/testing-recipes.html#react-testing-library)

---

**Last Updated**: 2026-06-18
**Maintained By**: Development Team
