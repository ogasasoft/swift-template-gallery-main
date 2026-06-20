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
- [x] **README test statistics updated** (2026-06-20)
  - Updated Jest test count from 160 to 162 (162 passed, 1 skipped)
  - Added Cypress badge to technology stack
  - Enhanced Testing section with cypress-axe accessibility details
  - Fixed test count inconsistencies across README.md sections
  - Updated CHANGELOG.md with documentation changes

## High Priority (Next)

- [x] Remove unused dependencies (2026-06-20)
  - Removed @emnapi/wasi-threads, @napi-rs/wasm-runtime, @tybys/wasm-util
  - Verified no extraneous packages remain

- [x] Add accessibility audit (2026-06-20)
  - Installed cypress-axe and axe-core packages
  - Created a11y-cyber.cy.ts test suite (10 test cases)
  - WCAG 2.1 AA compliance checking implemented
  - Keyboard navigation and ARIA label validation added
  - Dark mode toggle accessibility verified
  - Responsive design accessibility tested
  - Test script: `npm run test:cypress:a11y`

## Medium Priority

- [ ] Improve mobile experience testing
- [ ] Add performance monitoring (Web Vitals)

## Low Priority

- [ ] Add Storybook for component documentation
- [ ] Implement analytics integration
- [ ] Add i18n preparation (internationalization)
