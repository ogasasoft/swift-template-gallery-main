# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/user/swift-template-gallery/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/user/swift-template-gallery/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/user/swift-template-gallery/releases/tag/v0.1.0
