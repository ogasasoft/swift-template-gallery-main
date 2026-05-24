# Contributing to Swift Template Gallery

Thank you for your interest in contributing to Swift Template Gallery! This guide will help you get started with making contributions.

## Table of Contents

- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Requirements](#testing-requirements)
- [Commit Message Conventions](#commit-message-conventions)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)

## Development Setup

### Prerequisites

Before contributing, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** 2.30.0 or higher

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/swift-template-gallery.git
cd swift-template-gallery

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Verify Installation

Run the following commands to ensure everything is set up correctly:

```bash
# Type check
npm run typecheck

# Linting
npm run lint

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Code Style Guidelines

### TypeScript

- Use **strict mode** - enabled by default
- Avoid `any` types wherever possible
- Use explicit type annotations for better IDE support
- Follow existing code patterns in the repository

### React Components

```typescript
// ✅ Good: Functional components with TypeScript
export function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button onClick={handleClick} className={buttonVariants({ variant })}>
      {children}
    </button>
  );
}

// ❌ Bad: Class components (we use functional components)
class Button extends React.Component<ButtonProps> {
  render() {
    // ...
  }
}
```

### Hooks

- Use functional updates when dependencies are provided
- Follow React Hooks rules:
  - Only call hooks at the top level
  - Only call hooks from React function components

```typescript
// ✅ Good: Using functional updates
useEffect(() => {
  const subscription = api.subscribe(data);
  return () => subscription.unsubscribe();
}, []);

// ❌ Bad: Using imperative updates (when deps exist)
useEffect(() => {
  api.setData(newValue); // Bad practice
}, [api]);
```

### Styling

- Use Tailwind CSS for all styling
- Follow shadcn/ui component patterns
- Use CSS-in-JS sparingly for complex interactions
- Ensure all interactive elements have proper keyboard support and focus states

### File Structure

```
src/
├── components/       # Reusable React components
│   ├── ui/          # shadcn-ui components
│   └── feature/     # Feature-specific components
├── lib/             # Utility functions
├── hooks/           # Custom React hooks
├── pages/           # Page components
└── types/           # TypeScript type definitions
```

## Testing Requirements

### Testing Philosophy

Every component and utility must be tested. We maintain **100% test coverage** for critical paths.

### Running Tests

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

```typescript
// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveClass('bg-secondary');
  });
});
```

### Writing Tests

1. **Test one thing at a time** - Each test should verify a single behavior
2. **Use descriptive test names** - Describe what is being tested and expected outcome
3. **Follow AAA pattern** - Arrange, Act, Assert
4. **Test user interactions** - Use React Testing Library over Jest utilities
5. **Mock external dependencies** - Don't test third-party library behavior

### Coverage Requirements

- **Components**: Every UI component must have tests
- **Pages**: Every page must have tests covering navigation and rendering
- **Libraries**: Every utility function must have tests
- **Hooks**: Every custom hook must have tests

### Fixing Failing Tests

When tests fail:

1. **Read the error message carefully**
2. **Run tests in watch mode** to see detailed output
3. **Fix the issue incrementally**
4. **Verify the fix works** with targeted tests
5. **Run the full test suite** to ensure no regressions

```bash
# Run tests in watch mode for incremental testing
npm run test:watch
```

## Commit Message Conventions

We use **semantic commit messages** to categorize changes and make pull requests more readable.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring (no feature changes)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (build, CI configuration, etc.)
- **revert**: Revert a previous commit

### Examples

```bash
feat: add dark mode toggle

- Implement theme context provider
- Add dark mode state management
- Update all components to respect theme

Closes #123
```

```bash
fix: resolve memory leak in data fetching

The useQuery hook was not cleaning up subscriptions,
causing memory leaks in long-running sessions.
```

```bash
docs: update API documentation

Clarify the pagination parameters and add examples.
```

### Commit Best Practices

1. **Keep commits atomic** - Each commit should do one thing
2. **Write clear commit messages** - Describe what changed and why
3. **Don't use imperative mood** - Use "add" not "adds", "fix" not "fixes"
4. **Limit to one subject line** - Wrap at 72 characters
5. **Use body for explanation** - Add details in the body if needed

## Pull Request Process

### Branch Naming

```bash
# Feature branch
git checkout -b feat/add-user-authentication

# Bug fix branch
git checkout -b fix/resolve-navigation-bug

# Documentation branch
git checkout -b docs/update-api-guide
```

### Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] All tests pass (`npm test`)
- [ ] Code passes linting (`npm run lint`)
- [ ] TypeScript has no errors (`npm run typecheck`)
- [ ] Code is formatted (`npm run format`)
- [ ] New features have tests
- [ ] Bug fixes have tests demonstrating the fix
- [ ] Commit messages follow semantic format
- [ ] Documentation is updated if needed

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe the tests you've run and their results:
- Run `npm test` - All tests pass
- [Additional test details]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
```

### Code Review Process

1. **Submit your PR** - Assign reviewers if needed
2. **Address feedback** - Respond to reviewer comments promptly
3. **Update continuously** - Don't wait for multiple review cycles
4. **Keep PRs small** - Split large changes into multiple PRs if needed
5. **Request re-review** - Notify reviewers when changes are made

## Code Review Guidelines

### For Reviewers

- **Be constructive** - Focus on code quality, not personal preferences
- **Explain your reasoning** - Comment on design decisions
- **Be specific** - Point to exact lines and describe what needs to change
- **Consider the user experience** - Think about how changes affect users
- **Check tests** - Ensure tests validate the changes

### For Contributors

- **Respond promptly** - Aim to address feedback within 24-48 hours
- **Ask questions** - If anything is unclear, ask for clarification
- **Iterate quickly** - Make small, focused changes
- **Learn from feedback** - Use it to improve your code

### Common Review Topics

- **Security**: Are we handling user input correctly?
- **Performance**: Is the code efficient?
- **Maintainability**: Is the code easy to understand and modify?
- **Testing**: Are all paths covered by tests?
- **Documentation**: Is the code self-documenting?

## Getting Help

If you need help:

1. **Check existing documentation** - README, CONTRIBUTING.md, ARCHITECTURE.md
2. **Search issues** - Someone may have asked the same question
3. **Open an issue** - Ask a question or suggest an improvement
4. **Ask the team** - Reach out via GitHub Discussions or Slack

## Recognition

Contributors are recognized in:
- Project README
- CHANGELOG
- Release announcements

Thank you for your contributions! 🎉
