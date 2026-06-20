# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **README Documentation Update**: Updated test statistics to reflect current state
  - Updated Jest test count from 160 to 162 (162 passed, 1 skipped)
  - Added Cypress badge to technology stack section
  - Enhanced Testing section with Cypress accessibility audit details
  - Updated test coverage documentation
  - Fixed test count inconsistencies across multiple sections

### Added

- **Accessibility Audit**: Added Cypress accessibility tests with axe-core
  - Installed cypress-axe and axe-core packages
  - Created comprehensive a11y-cyber.cy.ts test suite
  - Tests cover page-level, template gallery, search, and responsive design
  - WCAG 2.1 AA compliance checking (wcag2a, wcag2aa, wcag21a, wcag21aa)
  - Keyboard navigation, ARIA labels, and semantic HTML validation
  - Dark mode toggle accessibility verification
  - Accessibility audit script: `npm run test:cypress:a11y`

### Changed

- **E2E Testing Migration**: Migrated from Playwright to Cypress 15.17.0
  - Added Cypress configuration and test suite (50+ test cases)
  - Removed Playwright dependencies and artifacts
  - Updated README and documentation to reflect Cypress usage
  - Enhanced mobile responsiveness testing (iPhone 12, iPad Pro)
  - Maintained 100% test pass rate

### Added

- **CI/CD Enhancement**: Added Dependabot configuration for automated dependency updates
- **Docker Support**: Added Dockerfile and .dockerignore for containerized deployment
- **Code Quality Metrics**: Added GitHub Actions workflow for code climate analysis and metrics collection
- **Docker Documentation**: Added Docker usage section to README with build, run, and compose examples

### Changed

- Updated dependency management with Dependabot integration
- Enhanced CI/CD pipeline with quality metrics and analysis

### Security

- Dependency updates now managed automatically via Dependabot

## [Unreleased]

### Added

- Initial template gallery with shadcn-ui components
- Dark mode support with system preference detection
- Template filtering and search functionality
- Live preview modal for templates
- Code export to clipboard
- Responsive design with mobile-first approach
- User rating and review system with sentiment analysis
- Comprehensive test suite (162 tests)
- GitHub Actions CI/CD pipeline
- .gitattributes for consistent line endings
- CONTRIBUTING.md with contribution guidelines
- TypeScript strict mode enabled
- ESLint 10.5.0 configuration
- Prettier 3.8.4 configuration
- Husky 9.1.7 pre-commit hooks
- React Router v7.1.3 integration
- Tailwind CSS 3.4.17 with shadcn-ui
- Jest 30.4.2 testing framework
- React 19.0.0 + TypeScript 6.0.0

### Changed

- Updated from React 18 to React 19
- Updated from TypeScript 5 to TypeScript 6
- Updated from Vite 6 to Vite 8.0.16
- Improved TypeScript strict mode compliance
- Enhanced dark mode implementation
- Updated dependencies to latest stable versions

### Fixed

- Fixed template card rendering issues in dark mode
- Fixed responsive design on mobile devices
- Fixed navigation link active state detection
- Fixed review submission validation
- Fixed form input focus management
- Fixed test coverage reporting

### Security

- No known security vulnerabilities
- Dependencies updated to latest secure versions

## [0.1.0] - 2024-06-16

### Added

- Template gallery with shadcn-ui components
- Dark mode toggle
- Template filtering by tags, industry, tone, and style
- Search functionality
- Template preview modal
- Code export to clipboard
- Responsive design
- User rating and review system
- Comprehensive test coverage
- ESLint and Prettier configuration
- Husky pre-commit hooks
- Vite build configuration
- React Router v7 integration

### Changed

- Initial release

### Security

- No known security vulnerabilities

### Documentation

- Added feature checklist to README (Accessibility, Package Management, Security)
- Enhanced README with additional quality indicators

### Updated Dependencies

- react: 19.0.0 → 19.2.7
- react-dom: 19.0.0 → 19.2.7
- typescript: 6.0.0 → 5.7.3
- @types/react: 19.2.0 → 19.2.3
- @types/react-dom: 19.2.0 → 19.2.0
- @types/node: 20.19.43 → 25.9.3
- @typescript-eslint/parser: 8.61.0 → 8.61.1
- @typescript-eslint/eslint-plugin: 8.61.0 → 8.61.1
- eslint: 10.5.0 → 10.5.0
- react-resizable-panels: 2.1.9 → 4.11.2

## [0.0.1] - 2024-06-15

### Added

- Initial project setup
- Basic component structure
