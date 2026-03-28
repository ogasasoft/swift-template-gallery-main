# Development Workflow

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- Basic understanding of React, TypeScript, and modern frontend development

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/swift-template-gallery.git
cd swift-template-gallery

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run typecheck    # TypeScript type checking (0 errors guaranteed)
npm run lint         # ESLint check (0 errors guaranteed)
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting without changes

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:ci      # CI mode for GitHub Actions

# Quality Check
npm run quality      # Run quality checklist and get score

# Dependency Management
npm run update       # Update all dependencies to latest compatible versions

# Documentation
npm run storybook    # Start Storybook for component exploration
npm run build-storybook # Build Storybook for static hosting
```

## Branch Naming Conventions

Use the following prefixes for branches:

- `feature/` - New features or enhancements
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `style/` - Code style changes (formatting, renaming)
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### Examples

```bash
git checkout -b feature/add-dark-mode-toggle
git checkout -b fix/pagination-edge-cases
git checkout -b docs/update-readme
git checkout -b refactor/move-utils-to-lib
```

## Code Style Guidelines

### TypeScript

- **Strict Mode**: Always use strict mode (`tsconfig.json`)
- **No `any` Types**: Avoid `any` when possible, use `unknown` or specific types instead
- **Interface vs Type**: Use `interface` for object shapes, `type` for unions/aliases
- **Type Safety**: All components should be fully typed with TypeScript
- **Null Checks**: Use optional chaining (`?.`) and nullish coalescing (`??`) appropriately

### React

- **Functional Components**: All components must be functional
- **Hooks**: Always use hooks at the top level of components
- **Props Interface**: Define `Props` interface for all components
- **No Magic Strings**: Use enums or constants for repeated values
- **Memoization**: Use `useMemo` and `useCallback` for expensive operations

### Naming Conventions

- **Components**: PascalCase (e.g., `Pagination`, `Gallery`, `TemplateCard`)
- **Functions/Variables**: camelCase (e.g., `currentPage`, `filterTemplates`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `ITEMS_PER_PAGE`, `MAX_ITEMS`)
- **Types/Interfaces**: PascalCase (e.g., `Template`, `GalleryFilter`)
- **Files**: Match component name with filename (e.g., `Pagination.tsx`)

### File Structure

```
src/
├── components/
│   ├── ui/              # shadcn-ui components (don't modify)
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Footer component
│   ├── Hero.tsx         # Hero section
│   └── ...
├── pages/
│   ├── Index.tsx        # Home page
│   └── NotFound.tsx     # 404 page
├── lib/                 # Utility functions
├── hooks/               # Custom React hooks
├── providers/           # Context providers
└── types/               # TypeScript type definitions
```

## Git Workflow

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Commit Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect code meaning (formatting, renaming)
- `refactor`: Code refactoring (no functional changes)
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Commit Examples

```bash
git commit -m "feat(gallery): add category filtering"
git commit -m "fix(pagination): handle edge case when page exceeds total"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(components): apply Prettier formatting"
git commit -m "refactor(utils): move common functions to lib"
git commit -m "test(Header): add unit tests for mobile menu"
git commit -m "chore(deps): update @types/react to 19.2.4"
```

### Pre-commit Hooks

All commits automatically run quality checks via Husky:

1. **ESLint** - Auto-fix linting issues
2. **Prettier** - Format all files
3. **TypeScript** - Validate type definitions

If any check fails, the commit will be blocked.

### Pull Request Workflow

1. **Create Branch**: From `main`, create a feature branch

   ```bash
   git checkout -b feature/add-dark-mode-toggle
   ```

2. **Make Changes**: Implement your feature or fix

3. **Commit**: Make descriptive commits following the conventional commit format

4. **Push**: Push your branch to the remote

   ```bash
   git push origin feature/add-dark-mode-toggle
   ```

5. **Open PR**: Create a pull request on GitHub

6. **Review Process**:
   - Wait for at least one reviewer
   - Address review comments
   - Ensure all CI checks pass
   - Get approval from reviewer
   - Merge to `main`

### Code Review Checklist

When reviewing code, check for:

- ✅ Follows code style guidelines
- ✅ TypeScript type safety (no `any` types)
- ✅ Proper error handling
- ✅ Component accessibility (keyboard navigation, ARIA labels)
- ✅ Responsive design (mobile-first approach)
- ✅ Test coverage (tests added or updated)
- ✅ Documentation (README, JSDoc comments)
- ✅ Performance considerations (memoization, lazy loading)
- ✅ Security (no hardcoded secrets, input validation)

## Testing Guidelines

### Test Structure

- **Component Tests**: Test UI components in isolation
- **Page Tests**: Test full pages with routing
- **Utility Tests**: Test utility functions
- **Hook Tests**: Test custom React hooks

### Running Tests

```bash
# Run all tests
npm test

# Run in watch mode (interactive)
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=Gallery.test.tsx

# Run specific test
npm test -- --testNamePattern="should render pagination"
```

### Test Writing Best Practices

- **Descriptive Names**: Test names should describe what they test
- **Arrange-Act-Assert**: Structure tests clearly
- **Isolation**: Each test should be independent
- **Snapshot Testing**: Use snapshots for UI consistency
- **Edge Cases**: Test boundary conditions and error scenarios

### Example Test

```typescript
describe('Pagination', () => {
  it('should render null when totalPages <= 1', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />)
    expect(container.firstChild).toBeNull()
  })

  it('should call onPageChange when page changes', () => {
    const onPageChange = jest.fn()
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    )
    fireEvent.click(getByText('2'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})
```

## Accessibility

All components must follow WCAG 2.1 AA guidelines:

- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **ARIA Labels**: Use appropriate ARIA attributes for screen readers
- **Color Contrast**: Ensure sufficient color contrast (4.5:1 for text)
- **Focus Management**: Manage focus when opening/closing modals or dropdowns
- **Semantic HTML**: Use proper HTML elements (nav, main, section, etc.)

## Performance

### Optimization Tips

- **Lazy Loading**: Use `React.lazy` and `Suspense` for code splitting
- **Memoization**: Use `useMemo` and `useCallback` to prevent unnecessary re-renders
- **Image Optimization**: Use appropriate image formats and sizes
- **Tree Shaking**: Ensure all imports are tree-shakable

### Performance Testing

```bash
# Build performance
npm run build

# Preview production build
npm run preview

# Check bundle size
npx vite-bundle-visualizer
```

## Security

### Security Checklist

- ✅ No hardcoded secrets or API keys in source code
- ✅ Use environment variables for sensitive data
- ✅ Validate all user inputs
- ✅ Escape HTML to prevent XSS attacks
- ✅ Use CSP headers in production
- ✅ Keep dependencies updated with security patches

### Environment Variables

Create a `.env.local` file for local development:

```env
# Example configuration
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Swift Template Gallery
```

**Important**: Never commit `.env.local` or `.env` files to version control.

## Debugging

### Development Tools

- **React DevTools**: Browser extension for inspecting React component hierarchy
- **Vite DevTools**: Built-in development server with performance monitoring
- **Console**: Use `console.log` for debugging (remove in production)

### Common Issues

#### TypeScript Errors

```bash
# Type checking
npm run typecheck

# Fix type errors
npm run lint:fix
```

#### Build Errors

```bash
# Build for production
npm run build

# Check for errors
npm run build 2>&1 | grep -i error
```

#### Test Failures

```bash
# Run tests
npm test

# Run with verbose output
npm test -- --verbose

# Watch mode
npm run test:watch
```

## Continuous Integration

### GitHub Actions

The project uses GitHub Actions for CI/CD:

- **Build**: Run build process
- **Type Check**: Run TypeScript validation
- **Lint**: Run ESLint
- **Test**: Run test suite
- **Security Scan**: Check for vulnerabilities

All CI checks must pass before merging to `main`.

## Questions or Issues?

If you encounter any issues or have questions:

1. Check the existing [README.md](./README.md) for documentation
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
3. Search [GitHub Issues](https://github.com/yourusername/swift-template-gallery/issues)
4. Open a new issue with detailed information

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
