# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security

- Fixed high severity vulnerabilities in `glob` package
- Updated ESLint plugin to resolve security issues
- All security audits now show 0 vulnerabilities

### Changed

- Updated `eslint-config-next` to latest version (16.2.6)
- Updated all Radix UI components to latest versions
- Updated all dev dependencies to latest compatible versions
- Removed deprecated `glob` package usage

### Added

- Comprehensive contributing guide with:
  - Development setup instructions
  - Code style guidelines (TypeScript, React, Hooks, Styling)
  - Testing requirements and best practices
  - Commit message conventions (semantic commits)
  - Pull request process
  - Code review guidelines

- Enhanced CHANGELOG with security updates section

### Fixed

- Resolved `npm audit` security warnings
- Fixed ESLint peer dependency conflicts
- Improved package dependency resolution

## [1.0.0] - 2026-05-20

### Added

- Complete template gallery application with React 18.3.1 and TypeScript 5.9.3
- shadcn-ui design system integration
- Live template preview functionality
- Smart search and filtering system
- Dark mode support with system preference detection
- Review system with sentiment analysis
- Comprehensive test suite (162 tests, 100% coverage)
- CI/CD pipeline with GitHub Actions
- Code quality enforcement via Husky pre-commit hooks
- Responsive design with mobile-first approach

### Features

- Template browsing and discovery
- Real-time preview of templates
- Code export to clipboard
- User ratings and reviews
- Category filtering
- Sort and filter options

### Tech Stack

- React 18.3.1 with concurrent features
- TypeScript 5.9.3 with strict mode
- Vite 5.4.21 for fast builds
- Tailwind CSS 3.4.19 + shadcn-ui
- React Router v6.30.3
- React Hook Form 7.76.0 + Zod 4.4.3
- TanStack Query 5.100.11
- Jest 30.4.2 + React Testing Library
- ESLint 9.32.0 + Prettier 3.8.1

### Quality

- 162 tests covering all components and pages
- 100% test coverage for critical paths
- Zero TypeScript errors
- Zero ESLint errors
- Pre-commit hooks for code quality

### Documentation

- Comprehensive README with setup instructions
- Architecture documentation
- Contributing guidelines
- Test documentation

---

## [Unreleased]

### Changed

- Updated Node.js requirement from 18 to 20
- Enhanced CI workflow for better reliability
- Added template tags categorization system (feature add-changelog)

---

## [Unreleased]

### Added

- Comprehensive test suite
- CI/CD pipeline
- Code quality enforcement
- Dark mode support
- Review system
