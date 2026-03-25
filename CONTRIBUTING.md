# Contributing to Swift Template Gallery

Thank you for your interest in contributing to this project!

## Development Setup

### Prerequisites

- Node.js 18+ installed via nvm
- npm or yarn package manager
- Basic understanding of React and TypeScript

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd swift-template-gallery-main

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173
```

## Project Structure

```
swift-template-gallery-main/
├── src/
│   ├── __tests__/          # Test files
│   ├── components/         # React components
│   │   ├── ui/             # shadcn-ui components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Footer.tsx      # Footer component
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Gallery.tsx     # Template gallery
│   │   ├── GalleryFilters.tsx  # Filtering controls
│   │   ├── Pagination.tsx  # Page navigation
│   │   ├── TemplateCard.tsx  # Individual template cards
│   │   ├── PreviewModal.tsx  # Template preview modal
│   │   ├── NavLink.tsx     # Navigation links
│   │   ├── Pricing.tsx     # Pricing section
│   │   └── Contact.tsx     # Contact form
│   ├── lib/               # Utility functions
│   ├── pages/             # Next.js App Router pages
│   └── providers/         # Context providers (theme-provider)
├── public/                # Static assets
├── .storybook/            # Storybook configuration
├── dist/                  # Generated build files
├── coverage/              # Test coverage reports
├── jest.config.ts         # Jest configuration
├── jest.setup.ts          # Jest setup (TypeScript)
├── tsconfig.json          # TypeScript configuration
├── tsconfig.jest.json     # TypeScript for Jest
├── tailwind.config.ts     # Tailwind CSS v4 configuration
├── vite.config.ts         # Vite build configuration
└── package.json           # Dependencies and scripts
```

## Tech Stack

- **Framework**: React 19.2.4 with App Router
- **Language**: TypeScript 6.0.2 (strict mode)
- **Build Tool**: Vite 8.0.2
- **Styling**: Tailwind CSS 3.4.17 + shadcn-ui
- **Testing**: Jest 30.3.0 + React Testing Library
- **Routing**: React Router v7.13.2
- **State Management**: TanStack Query 5.83.0
- **Forms**: React Hook Form 7.61.1 + Zod 3.25.76
- **Charts**: Recharts 3.8.1
- **Icons**: Lucide React 0.462.0
- **Notifications**: Sonner 1.7.4

## Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

### Test Structure

Tests are organized by functionality:

- `__tests__/components/` - Component tests
- `__tests__/pages/` - Page tests
- `__tests__/lib/` - Utility tests

Each component should have corresponding tests that verify:

- Correct rendering with various props
- User interactions (clicks, hovers, form submissions)
- Edge cases and boundary conditions
- Accessibility (ARIA labels, keyboard navigation)

## Code Style

### TypeScript

- Use strict mode (enabled by default)
- Prefer explicit types over `any`
- Use interfaces for object shapes
- Prefer `const` and `let` over `var`
- Type import aliases for path aliases (`@/`)

### React

- Functional components with hooks only
- No class components
- Use shadcn-ui component patterns
- Prefer Tailwind CSS utility classes over custom CSS
- Implement `useEffect` with cleanup functions

### JavaScript

- ES6+ features only
- No deprecated features (e.g., `document.all`)
- Prefer `const`/`let` over `var`

### File Naming

- Components: PascalCase (`TemplateCard.tsx`, `GalleryFilters.tsx`)
- Utilities: camelCase (`reviews.ts`, `utils.ts`)
- Tests: match component name with `.test.tsx` suffix (`TemplateCard.test.tsx`)

### Formatting

- Run Prettier before committing: `npm run format`
- Check formatting: `npm run format:check`
- Auto-fix formatting issues: `npm run lint:fix`

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting changes (Prettier)
- `refactor`: Code refactoring without feature change
- `test`: Add or update tests
- `chore`: Maintenance tasks (build, dependencies, CI)

### Examples

```
feat(gallery): add tag filtering
fix(pagination): correct page calculation
docs(readme): update installation instructions
refactor(utils): improve type safety
test(component): add tests for PreviewModal
chore(deps): update lucide-react to v0.462.0
```

## Branch Naming

- `feature/<description>`: New feature
- `fix/<description>`: Bug fix
- `docs/<description>`: Documentation changes
- `refactor/<description>`: Code refactoring
- `test/<description>`: Test-related changes
- `chore/<description>`: Maintenance tasks

Examples:

- `feature/add-dark-mode`
- `fix/dashboard-pagination-bug`
- `docs/update-api-reference`
- `refactor/optimize-image-loading`

## Pull Request Process

1. Create a feature branch from `main`

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and add tests

3. Run quality checks before committing:

   ```bash
   npm run typecheck    # TypeScript check (must pass)
   npm run lint         # ESLint check (must pass)
   npm test             # Run tests (must pass)
   ```

4. Format your code:

   ```bash
   npm run format       # Format with Prettier
   ```

5. Commit with conventional commit message:

   ```bash
   git add .
   git commit -m "feat(gallery): add new template category"
   ```

6. Push your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

7. Open a Pull Request

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Tests pass locally (`npm test`)
- [ ] New tests added for new features
- [ ] Existing tests modified to support changes
- [ ] No console.log statements (use console.error for errors)
- [ ] No TODO/FIXME comments (fix them instead of leaving them)
- [ ] Documentation updated (README, CONTRIBUTING, etc.)
- [ ] Branch name follows convention
- [ ] Commit message follows conventional commits

## Pre-commit Hooks

All commits automatically run:

1. ESLint auto-fix (if applicable)
2. Prettier formatting
3. TypeScript validation

This is configured via Husky and lint-staged.

## Development Workflow

1. **Start Development Server**:

   ```bash
   npm run dev
   ```

2. **Run Quality Checks**:

   ```bash
   npm run typecheck
   npm run lint
   npm test
   ```

3. **Make Changes**: Edit files in `src/` directory

4. **Test Locally**:
   - Run tests: `npm test`
   - View coverage: `npm run test:coverage`
   - Manual testing in browser

5. **Commit Changes**: Follow conventional commit format

6. **Push to Branch**: `git push origin <branch>`

7. **Create PR**: Open pull request on GitHub

8. **Code Review**: Address reviewer feedback

9. **Merge**: Once approved and CI passes

## Storybook

This project includes Storybook for component development:

```bash
# Start Storybook
npm run storybook

# Build Storybook static files
npm run build-storybook
```

Component stories are located in `src/stories/` and should demonstrate:

- Component with various props
- Default state
- Edge cases
- Accessibility (keyboard navigation, screen reader support)

## Documentation

### Architecture

For a detailed overview of the project architecture, see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

### Getting Started

Quick start instructions are in [`README.md`](./README.md).

## Getting Help

- Check existing [issues](https://github.com/yourusername/swift-template-gallery/issues) for open questions
- Review project documentation (README, ARCHITECTURE, CONTRIBUTING)
- Ask questions in [GitHub Discussions](https://github.com/yourusername/swift-template-gallery/discussions)

## License

This project is licensed under the MIT License. See [`LICENSE`](./LICENSE) for details.

## Code of Conduct

This project adheres to a friendly, inclusive code of conduct. Please be respectful and professional in all interactions.

## Quality Standards

This project maintains high code quality standards:

- **Zero TypeScript Errors**: Strict mode enforced
- **Zero ESLint Errors**: All linting rules applied
- **High Test Coverage**: 100% for critical paths
- **Code Formatting**: Consistent style via Prettier
- **Modern Stack**: Latest stable versions (React 19, TypeScript 6, Vite 8)

Contributors are expected to maintain these standards.

---

Happy coding! 🚀
