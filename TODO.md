# TODO - Swift Template Gallery

## Completed ✅

- [x] Implement Docker support (branch: ci/add-docker-2026-06-17)
- [x] Add comprehensive FAQ to README (20+ questions)
- [x] TypeScript strict mode setup
- [x] ESLint configuration
- [x] Prettier formatting
- [x] 162 tests passing
- [x] Quality score: 25/25 (Excellent)
- [x] Dark mode E2E tests (dark-mode.spec.ts - 9/9 passed)
- [x] Theme toggle selectors fixed (data-testid → aria-label)
- [x] **Cypress E2E tests added** (2026-06-19)
  - 50+ test cases covering all user flows
  - Basic Flow tests (gallery load, search, filters)
  - Theme Toggle tests (toggle, persistence, system preference)
  - Component Preview tests (navigation, preview, copy code)
  - Navigation tests (all routes)
  - Responsive Design tests (mobile, tablet, desktop)
  - Accessibility tests (ARIA labels, keyboard nav, semantic HTML)
  - Error Handling tests (404, invalid routes)
- [x] Playwright E2E tests implemented and tested
- [x] **Playwright artifacts removed** (Cypress migration complete - 2026-06-20)
  - Removed cypress.config.ts, cypress.ignore, cypress/e2e/
  - Removed playwright-report directory
  - Removed test-results directory
  - Updated package.json (Cypress 15.17.0, Playwright removed)
  - Updated jest.config.ts
  - Updated README with Cypress references
  - Updated CHANGELOG

## High Priority (Next)

- [x] Remove unused dependencies (2026-06-20)
  - Removed @emnapi/wasi-threads, @napi-rs/wasm-runtime, @tybys/wasm-util
  - Verified no extraneous packages remain

- [ ] Add accessibility audit
  - Run axe-core audit
  - Add ARIA labels where needed
  - Ensure keyboard navigation works

## Medium Priority

- [ ] Improve mobile experience testing
- [ ] Add performance monitoring (Web Vitals)

## Low Priority

- [ ] Add Storybook for component documentation
- [ ] Implement analytics integration
- [ ] Add i18n preparation (internationalization)
