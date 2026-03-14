# Contributing to Swift Template Gallery

Thank you for your interest in contributing to this project!

## Development Setup

### Prerequisites
- Node.js 18+ installed via nvm
- npm or yarn package manager

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
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript type definitions
│   └── app/               # Next.js App Router pages
├── public/                # Static assets
├── dist/                  # Generated template files
├── jest.config.ts         # Jest configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## Testing

Run all tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Code Style

### TypeScript
- Use strict mode: `tsconfig.json` is already configured
- Prefer explicit typing over any
- Use interfaces for object shapes

### React
- Functional components with hooks
- Use `styled-components` or Tailwind CSS for styling
- Follow shadcn-ui design patterns

### JavaScript
- ES6+ features only
- Use const/let instead of var

## Commit Messages

Follow conventional commits format:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: code formatting changes
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

Example:
```
feat: add dark mode toggle
fix: correct shipping API response parsing
docs: update installation instructions
```

## Branch Naming

- `feature/`: New feature
- `fix/`: Bug fix
- `docs/`: Documentation changes
- `refactor/`: Code refactoring
- `test/`: Test-related changes
- `chore/`: Maintenance tasks

Example:
```
feature/add-search-filter
fix/dashboard-rendering-error
docs/api-endpoints
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes and add tests
3. Run `npm test` to ensure all tests pass
4. Commit with conventional commit message
5. Push your branch
6. Open a Pull Request

## Testing Your Changes

1. **Local Testing**: Run `npm test` to ensure no regressions
2. **Manual Testing**: Test functionality in browser
3. **Code Review**: Ensure code follows project standards

## Getting Help

- Check existing issues for open questions
- Review project documentation
- Ask questions in GitHub Discussions

## License

This project is private and licensed under internal use only.

## Code of Conduct

This project adheres to a friendly, inclusive code of conduct. Please be respectful and professional in all interactions.

---

Happy coding! 🚀
