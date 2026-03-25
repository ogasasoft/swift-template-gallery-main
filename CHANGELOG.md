# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-03-26

### Changed

- **Storybook v10 migration**: Removed v8-only packages (`@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/blocks`, `@storybook/test`) — their functionality is now built into Storybook v10 core
- **Storybook v10 migration**: Replaced `@storybook/blocks` with `@storybook/addon-docs` (v10) for MDX stories; `Configure.mdx` now imports from `@storybook/addon-docs/blocks`
- **Storybook v10 migration**: Story files (`*.stories.ts/tsx`) import test utilities from `storybook/test` instead of `@storybook/test`
- **Tailwind CSS v4**: Updated `src/index.css` to use `@import "tailwindcss"` syntax (v4) with `@config` directive
- **Tailwind CSS v4**: Added `@tailwindcss/vite` plugin to `vite.config.ts`; `postcss.config.js` now only uses `autoprefixer`
- **Tailwind CSS v4**: Fixed `tailwind.config.ts` to use static import for `tailwindcss-animate` plugin instead of dynamic `import()`
- All Storybook package versions are now consistently at `^10.3.3`; added `@tailwindcss/postcss` and `@testing-library/dom` as explicit dev dependencies

### Breaking Changes

- `.storybook/main.ts`: `@storybook/addon-essentials` and `@storybook/addon-interactions` removed from addons array (now built into Storybook v10)
- `src/index.css`: Tailwind directives changed from v3 (`@tailwind base/components/utilities`) to v4 (`@import "tailwindcss"`)
- `vite.config.ts`: Added `@tailwindcss/vite` plugin required for Tailwind v4 to function

## [1.0.0] - 2026-03-24

### Added

- **Template Gallery**: Browse and discover ready-to-use React templates with search, filtering, and pagination
- **Smart Search**: Find templates by name, category, or description with real-time filtering
- **Live Preview**: Render templates in real-time directly within the gallery
- **Code Export**: Copy component code to clipboard with a single click
- **Dark Mode**: Automatic system preference detection with manual toggle via `ThemeProvider`
- **Review System**: User ratings and reviews with sentiment analysis using `RatingStars` component
- **Template Detail Page**: Dedicated page for each template with full documentation and code view
- **Tag Filtering**: Multi-tag filtering system for narrowing template discovery
- **Pagination**: Intuitive page controls for navigating large template collections
- **Responsive Design**: Mobile-first layout that adapts from 320px to wide-screen displays
- **shadcn-ui Component Library**: Integrated full suite of accessible, unstyled components
- **React Router v6**: Client-side routing with nested layouts and dynamic segments
- **TanStack Query**: Server state management with caching and background refetching
- **React Hook Form + Zod**: Type-safe form handling with runtime schema validation
- **Recharts**: Data visualization for review analytics and rating distributions
- **Comprehensive Test Suite**: 203 tests across 19 test suites covering all components and pages
- **CI/CD Workflow**: GitHub Actions pipeline with build, typecheck, lint, and security scan steps
- **Quality Check Script**: `npm run quality` reports build, TypeScript, security, and test status (25/25 score)
- **Docker Support**: `Dockerfile` and `docker-compose.yml` for containerized development and deployment
- **Storybook**: Component stories for isolated UI development and visual testing
- **MIT License**
- **Contributing Guide**: `CONTRIBUTING.md` with code style, branch naming, and PR conventions
- **Architecture Documentation**: `ARCHITECTURE.md` describing project structure and key design decisions

### Changed

- Upgraded to React 18.3.1 with concurrent rendering features enabled
- Upgraded TypeScript to 5.8.3 with strict mode and path aliases (`@/`)
- Upgraded Vite to 5.4.19 for faster HMR and optimized production builds
- Upgraded ESLint to 9.32.0 with flat config format (`eslint.config.js`)
- Upgraded Jest to 30.2.0 with improved async support
- Upgraded Lucide React to 0.462.0 replacing removed icon names with current equivalents
- Upgraded Tailwind CSS to 3.4.17 with JIT mode enabled by default
- Migrated `buttonVariants` to `src/lib/utils.ts` to resolve React Fast Refresh warnings
- Improved Gallery pagination UX: page resets to 1 when search or filter changes
- Refactored `ThemeToggle` to use `next-themes` for reliable SSR-safe theme persistence

### Fixed

- Resolved TypeScript React import issues by removing obsolete `import React from 'react'` in JSX transform contexts
- Fixed React Fast Refresh linting warnings caused by non-component exports in component files
- Corrected `RatingStars` test matchers to match actual `aria-label` values
- Fixed `ThemeToggle` test assertions that were checking stale DOM snapshots
- Resolved Jest `moduleNameMapper` path alias mismatches causing false import failures
- Fixed `sonner` toast library mock to prevent `document.body` attachment errors in jsdom
- Fixed `matchMedia` not defined errors in Jest by adding `window.matchMedia` mock in setup
- Corrected duplicate section structure in README introduced during documentation updates

### Security

- Security scan integrated into CI pipeline; runs on every push and pull request
- Quality check script excludes test files from secret/credential pattern matching to eliminate false positives
- False-positive filtering added for common non-sensitive patterns: `password_hash`, `session_secret`, `refresh_token`, `access_token`, `verification_token`
- `.gitignore` updated to exclude coverage reports, build artifacts, and `.env*` files
- Dependency audit step added to CI workflow to surface known CVEs in transitive dependencies
- `vercel.json` configured with security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`

---

## [0.1.0] - 2025-12-01

### Added

- Initial commit: Template Gallery with 5 cafe-themed starter templates
- Basic Vite + React + TypeScript scaffold
- Jest configuration and initial test utilities
- shadcn-ui integration with Tailwind CSS

[1.0.1]: https://github.com/ogasasoft/swift-template-gallery-main/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/user/swift-template-gallery/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/user/swift-template-gallery/releases/tag/v0.1.0
