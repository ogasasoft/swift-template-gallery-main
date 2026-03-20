# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-03-21

### Added

- Initial stable release
- Template gallery with smart search functionality
- shadcn-ui design system integration
- Live preview for templates
- Code export to clipboard
- Responsive design with mobile-first approach
- Dark mode support with automatic system detection
- User review system with sentiment analysis
- Comprehensive test suite (162 tests)
- TypeScript strict mode with 100% type coverage
- CI/CD pipeline with GitHub Actions
- AWS ECR + ECS deployment support
- ESLint + Prettier code quality enforcement
- Husky pre-commit hooks with lint-staged

### Features

- Filter templates by category and search
- Theme toggle (light/dark/auto)
- Review submission and display
- Rating system with sentiment analysis
- Template category management

### Technical

- React 18.3.1 with concurrent features
- TypeScript 5.8.3
- Vite 5.4.19 for fast development
- Tailwind CSS 3.4.17 + shadcn-ui components
- React Router v6.30.1
- React Hook Form 7.61.1 + Zod validation
- TanStack Query 5.83.0 for server state
- Jest 30.2.0 + React Testing Library 16.3.2
- ESLint 9.32.0 + Prettier 3.8.1
- Husky 4.3.8 + lint-staged 15.5.2

### Testing

- 162 tests covering all components and pages
- 100% test coverage for critical paths
- Test suite includes:
  - All UI components (Header, Footer, Hero, Gallery, etc.)
  - Pages (Index, NotFound)
  - Libraries (reviews utility)
  - Custom hooks (use-mobile, use-toast)

### Deployment

- Docker build support
- GitHub Actions CI/CD pipeline
- AWS ECR + ECS deployment
- Local preview with Vite preview

[1.0.0]: https://github.com/yourusername/swift-template-gallery/releases/tag/v1.0.0
