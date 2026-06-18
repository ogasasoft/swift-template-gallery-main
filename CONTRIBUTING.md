# Contributing to Swift Template Gallery

Thank you for your interest in contributing to the Swift Template Gallery! We welcome contributions from everyone.

## Code of Conduct

This project and everyone participating in it is committed to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js 20.0.0 or higher
- npm, yarn, or pnpm
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/swift-template-gallery.git
   cd swift-template-gallery
   ```

## Development Workflow

### 1. Create a Branch

Create a new branch for your feature or fix:

```bash
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-description
```

Branch naming conventions:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Tests and test updates
- `chore/` - Build process or auxiliary tool changes

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run Quality Checks

Before committing, always run these commands:

```bash
# TypeScript type checking
npm run typecheck

# ESLint check
npm run lint

# Run tests
npm test

# Check formatting
npm run format:check
```

If any checks fail:

- **TypeScript errors**: Fix type issues
- **ESLint warnings/errors**: Fix linting issues
- **Tests failing**: Fix the tests or code
- **Formatting issues**: Run `npm run format`

### 4. Make Your Changes

Write clear, well-documented code. Follow these principles:

- **TypeScript**: No `any` types when possible, strict mode
- **Component Design**: Keep components small and focused
- **Tests**: Add tests for new functionality
- **Documentation**: Update README and docs as needed
- **Comments**: Add comments for complex logic

### 5. Commit Your Changes

Follow conventional commits:

```bash
git add .
git commit -m "feat: add amazing feature"

# or for fixes:
git commit -m "fix: resolve issue with X"

# or for docs:
git commit -m "docs: update README with new info"
```

### 6. Push and Create a Pull Request

```bash
git push origin feature/amazing-feature
```

Then create a pull request on GitHub.

## Code Style

### TypeScript

- Use strict mode
- Avoid `any` types
- Use interfaces and types for clarity
- Export default only when appropriate

### React Components

- Use function components with hooks
- Keep components pure where possible
- Use TypeScript for props and state
- Add PropTypes as fallback (not required)

### File Organization

- Components: `src/components/ComponentName.tsx`
- Pages: `src/pages/PageName.tsx`
- Hooks: `src/hooks/useHookName.ts`
- Utils: `src/lib/utilityName.ts`
- Tests: `src/__tests__/ComponentName.test.tsx`

### Naming Conventions

- Components: PascalCase (e.g., `TemplateCard`)
- Functions: camelCase (e.g., `getTemplateData`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Types/Interfaces: PascalCase (e.g., `TemplateProps`)
- Files: PascalCase for components (e.g., `TemplateCard.tsx`)

### Import Order

1. External libraries (React, libraries)
2. Internal library imports
3. Internal component imports
4. Relative imports (closest to current file)

### Comments

- Use JSDoc for functions with complex logic
- Comment on WHY, not WHAT
- Use clear, descriptive comments

## Testing Guidelines

### Test Structure

```typescript
describe('ComponentName', () => {
  describe('when component renders', () => {
    it('should display correctly', () => {
      // test implementation
    });
  });

  describe('when user interacts', () => {
    it('should update state correctly', () => {
      // test implementation
    });
  });
});
```

### Test Coverage

- Aim for 100% coverage on new code
- Test edge cases and error conditions
- Use meaningful test descriptions
- Test both happy paths and error paths

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=ComponentName

# Run specific test
npm test -- --testNamePattern="should render title"
```

## Documentation

### README.md

- Keep it up to date
- Document new features
- Include setup instructions
- Add usage examples

### Code Comments

- Document complex functions
- Explain non-obvious logic
- Document external API integration

### Type Definitions

- Use JSDoc for complex types
- Document public APIs
- Explain generic parameters

## Pull Request Process

### PR Template

When creating a PR, include:

1. **Title**: Clear description of changes
2. **Description**:
   - What changes were made
   - Why changes were made
   - How to test the changes
   - Any breaking changes
3. **Screenshots**: For UI changes
4. **Related Issues**: Link to related issues/PRs

### PR Review

1. Wait for at least one review
2. Address review comments
3. Run quality checks again
4. Update PR description if needed

## Questions?

- Check existing issues for similar questions
- Open a new issue for specific questions
- Ask in the project discussion

## Thank You!

Contributing to open source is a great way to improve your skills and give back to the community. We appreciate your help!

---

**Built with ❤️ by the community**
