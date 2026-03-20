# Contributing to Swift Template Gallery

Thank you for your interest in contributing to Swift Template Gallery! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

This project adheres to a code of conduct that all contributors must follow:

- Be respectful and considerate of others
- Provide constructive feedback
- Engage in positive, productive discussions
- Refrain from harassment or discrimination

Please read our [full Code of Conduct](https://github.com/yourusername/swift-template-gallery/blob/main/CODE_OF_CONDUCT.md) for details.

## Getting Started

### Prerequisites

Before contributing, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/swift-template-gallery.git
   cd swift-template-gallery
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development Workflow

### 1. Create a Feature Branch

Create a new branch for your changes:

```bash
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-description
```

Branch naming convention:

- `feature/` for new features
- `fix/` for bug fixes
- `docs/` for documentation updates
- `refactor/` for code refactoring
- `test/` for test additions/updates

### 2. Make Changes

Implement your changes in the codebase. Ensure:

- Code follows the project's style guide (see below)
- Changes are well-tested
- Documentation is updated if needed

### 3. Run Quality Checks

**Before committing, always run these commands:**

```bash
# TypeScript type checking
npm run typecheck

# ESLint check
npm run lint

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

**Expected results:**

- `npm run typecheck`: 0 errors
- `npm run lint`: 0 errors
- `npm test`: All 162 tests passing

If any checks fail, fix the issues before proceeding.

### 4. Format Code

Automatically format your code with Prettier:

```bash
npm run format
```

### 5. Commit Changes

Commit your changes with a descriptive message:

```bash
git add .
git commit -m "feat: add amazing feature"
```

**Commit message format:**

```
<type>: <description>

[optional body]

[optional footer]
```

**Commit types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions/updates
- `chore`: Build process or auxiliary tool changes

**Examples:**

- `feat: add dark mode toggle`
- `fix: resolve navigation bug in mobile view`
- `docs: update contributing guide`
- `refactor: optimize image loading`

### 6. Push to Remote

Push your branch to your fork:

```bash
git push origin feature/amazing-feature
```

### 7. Create Pull Request

Create a pull request on GitHub:

1. Go to your fork's repository
2. Click "New Pull Request"
3. Select your branch and the main repository
4. Fill in the PR description with:
   - Summary of changes
   - Related issues (if any)
   - Screenshots (if UI changes)

## Coding Standards

### TypeScript

- Strict mode enabled
- No `any` types (use `unknown` when needed)
- Proper type definitions for all functions
- Use interfaces for object shapes

### React

- Functional components with hooks
- Use React Router for navigation
- Avoid inline styles when possible (use Tailwind CSS)
- Proper component separation
- Use React.lazy for code splitting

### Styling

- Use Tailwind CSS utility classes
- Follow shadcn-ui component patterns
- Mobile-first responsive design
- Proper contrast ratios and accessibility

### Code Quality

- Zero ESLint errors enforced
- Consistent formatting with Prettier
- Meaningful variable and function names
- Proper error handling
- Avoid side effects in render functions

## Testing

### Test Structure

The project has a comprehensive test suite with **162 tests** covering:

- **Components**: All UI components
- **Pages**: Page components (Index, NotFound)
- **Libraries**: Utility functions (reviews)
- **Hooks**: Custom hooks (use-mobile, use-toast)

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=Gallery.test.tsx

# Run specific test
npm test -- --testNamePattern="should render hero section"
```

### Test Coverage

Expected coverage for critical paths: **100%**

Run coverage report:

```bash
npm run test:coverage
```

### Writing Tests

- Test interactions and user behavior
- Use React Testing Library best practices
- Test edge cases
- Keep tests independent
- Use descriptive test names

**Example:**

```typescript
test('should render hero section with title', () => {
  render(<Hero />);
  expect(screen.getByText('Welcome to Template Gallery')).toBeInTheDocument();
});
```

## Submitting Changes

### Pull Request Guidelines

- Ensure all quality checks pass
- Update documentation if needed
- Add tests for new functionality
- Write a clear, descriptive PR description
- Reference related issues or commits

### Review Process

1. Your PR will be automatically checked by CI
2. Maintainers will review your code
3. Address any feedback or requests
4. Once approved, your PR will be merged

### Post-Merge

After merge:

1. Update your local main branch
2. Delete your feature branch (if no longer needed)
3. Celebrate! 🎉

## Resources

- [Project Documentation](./README.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [API Documentation](./docs/api.md)
- [GitHub Issues](https://github.com/yourusername/swift-template-gallery/issues)

## Questions?

If you have questions or need help:

1. Check existing [GitHub Issues](https://github.com/yourusername/swift-template-gallery/issues)
2. Join our [community chat](#)
3. Contact a maintainer directly

---

Thank you for contributing! 🙌
