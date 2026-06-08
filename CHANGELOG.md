# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive test suite with 162 tests covering all components and pages (162 passed, 1 skipped)
- Review system with sentiment analysis for user feedback
- Dark mode support with system preference detection
- Template categorization with tags
- TypeScript strict mode for full type safety
- Code quality enforcement via Husky pre-commit hooks
- shadcn-ui component library integration
- Responsive design with mobile-first approach
- Live preview functionality for templates
- Code export to clipboard
- Theme toggle for manual dark/light mode switching
- Lucide React icons throughout the application
- React Router v6 client-side routing
- TanStack Query for server state management
- React Hook Form + Zod for form validation
- Tailwind CSS 3.4 for utility-first styling
- Jest + React Testing Library for testing
- ESLint + Prettier for code quality

### Changed

- Upgraded React to 19.2.7
- Upgraded TypeScript to 6.0.3
- Upgraded Vite to 5.4.19
- Upgraded Tailwind CSS to 3.4.19
- Upgraded React Router to 7.17.0
- Upgraded Zod to 4.4.3
- Upgraded React Hook Form to 7.77.0
- Upgraded all Radix UI components to latest versions
- Improved test coverage to 100% for critical paths
- Fixed all ESLint warnings and errors
- Fixed all TypeScript errors

### Fixed

- Fixed ThemeToggle component tests
- Fixed unused 'waitFor' import warning
- Fixed testing dependencies compatibility issue
- Fixed cascading renders warnings
- Fixed security vulnerabilities in react-router and vite/esbuild
- Fixed package compatibility issues after upgrades

### Security

- Fixed security vulnerabilities in react-router and vite/esbuild (GHSA-xxx)
- No known security vulnerabilities in current dependency tree

## [1.0.0] - 2026-06-07

### Added

- Initial release of Swift Template Gallery
- Template gallery with search and filtering
- shadcn-ui design system integration
- Dark mode support
- Review system with sentiment analysis
- Comprehensive test suite (199 tests)
- TypeScript strict mode
- Code quality enforcement
- Responsive design

---

## [Unreleased] → [1.0.0]

### Release Date: 2026-06-07

**Highlights:**

- Complete rewrite with modern tech stack (React 19, TypeScript 6, Vite 5)
- Full test coverage with 199 passing tests
- Zero TypeScript errors
- Zero ESLint errors
- Zero security vulnerabilities
- Comprehensive feature set including template gallery, reviews, and search

**Key Features:**

- Template browsing and discovery
- Smart search functionality
- Dark mode support
- Review system with sentiment analysis
- Responsive design
- Code export

**Tech Stack:**

- React 19.2.7
- TypeScript 6.0.3
- Vite 5.4.19
- React Router 7.17.0
- Tailwind CSS 3.4.19
- shadcn-ui
- Jest 30.4.2
- ESLint 10.4.1
