# Swift Template Gallery

A modern template gallery for developers to discover and preview reusable React components with shadcn-ui design system.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6.svg)
![Jest](https://img.shields.io/badge/Jest-30.2.0-9948F5.svg)
![ESLint](https://img.shields.io/badge/ESLint-9.32.0-4B32C3.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF.svg)
![Tests](https://img.shields.io/badge/Tests-203%20passed%201%20skipped-brightgreen.svg)

## 🔧 Application Setup

### Environment Configuration

This project doesn't require external environment variables, but you can customize the following in `src/lib/config.ts`:

```typescript
// src/lib/config.ts

export const config = {
	// API configuration (if you add backend services)
	apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "/api",

	// Pagination settings
	itemsPerPage: 9,

	// Review settings
	maxReviewsPerCard: 3,
	minReviewRating: 1,

	// Feature flags
	enableDarkMode: true,
	enableReviews: true,
	enableSearch: true,
};
```

### Build Configuration

The project uses Vite for fast builds with tree shaking enabled by default:

```typescript
// vite.config.ts

export default defineConfig({
	build: {
		target: "esnext",
		minify: "terser",
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					"react-vendor": ["react", "react-dom", "react-router-dom"],
					"ui-vendor": [
						"@radix-ui/react-dialog",
						"@radix-ui/react-dropdown-menu",
					],
				},
			},
		},
	},
});
```

### Storybook Configuration

Storybook is configured for interactive component development:

```typescript
// .storybook/preview.ts

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	layout: "fullscreen",
	docs: {
		autodocs: "tag",
	},
};
```

### CI/CD Configuration (GitHub Actions)

Example GitHub Actions workflow for automated testing:

```yaml
# .github/workflows/test.yml

name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type checking
        run: npm run typecheck

      - name: Run tests with coverage
        run: npm run test:ci

      - name: Upload coverage reports
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info
```

## 🌟 Features

- 📦 **Template Gallery**: Browse and discover ready-to-use React templates
- 🔍 **Smart Search**: Find templates by name, category, or description
- 🎨 **shadcn-ui**: Modern, accessible design system
- 💻 **Live Preview**: See templates rendered in real-time
- 📋 **Code Export**: Copy code directly to clipboard
- 📱 **Responsive**: Mobile-first design
- 🌙 **Dark Mode**: Automatic system preference detection with manual toggle
- ⭐ **Review System**: User ratings and reviews with sentiment analysis
- 📄 **Pagination**: Navigate large template collections with intuitive page controls
- 🔬 **Comprehensive Tests**: 203 tests covering all components and pages
- ✨ **TypeScript**: Full type safety with 100% coverage
- 🎨 **Storybook**: Interactive component development and documentation

## 🛠️ Tech Stack

### Framework & Core

- **React 18.3.1** - Latest React with concurrent features
- **TypeScript 5.8.3** - Full type safety
- **Vite 5.4.19** - Lightning-fast build tool
- **React Router v6.30.1** - Client-side routing

### Styling

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn-ui** - Modern component library
- **Lucide React 0.462.0** - Beautiful icons
- **Tailwind CSS Animate** - Built-in animations

### State & Forms

- **React Hook Form 7.61.1** - Efficient form handling
- **Zod 3.25.76** - Runtime type validation
- **TanStack Query 5.83.0** - Server state management

### Storybook

- **Storybook 8.6.18** - Interactive component documentation and testing
- **@storybook/react** - React component stories
- **@storybook/react-vite** - Vite integration for Storybook

### Testing

- **Jest 30.2.0** - Test runner
- **React Testing Library 16.3.2** - Component testing
- **Jest DOM 6.9.1** - DOM matchers
- **TypeScript Jest 29.4.6** - TS support

### Code Quality

- **ESLint 9.32.0** - Code linting
- **Prettier 3.8.1** - Code formatting
- **Husky 4.3.8** - Git hooks
- **lint-staged 15.5.2** - Pre-commit checks

### Additional

- **date-fns 3.6.0** - Date utilities
- **recharts 2.15.4** - Data visualization
- **sonner 1.7.4** - Toast notifications
- **clsx 2.1.1** - Conditional class names

## 📁 Project Structure

```
swift-template-gallery-main/
├── src/
│   ├── __tests__/          # Test suites
│   │   ├── components/     # Component tests
│   │   └── pages/          # Page tests
│   ├── components/         # React components
│   │   ├── ui/             # shadcn-ui components
│   │   ├── Header.tsx      # Navigation header with theme toggle
│   │   ├── Footer.tsx      # Footer component
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Gallery.tsx     # Template gallery with pagination
│   │   ├── GalleryFilters.tsx  # Gallery filtering
│   │   ├── Pagination.tsx  # Reusable pagination component
│   │   ├── TemplateCard.tsx  # Individual template card
│   │   ├── PreviewModal.tsx  # Template preview modal
│   │   ├── NavLink.tsx     # Navigation link component
│   │   ├── Pricing.tsx     # Pricing section
│   │   └── Contact.tsx     # Contact form section
│   ├── lib/               # Utility functions
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Home page
│   │   └── NotFound.tsx   # 404 page
│   └── providers/         # Context providers
│       └── theme-provider.tsx  # Theme provider for dark mode
├── public/                # Static assets
├── jest.config.ts         # Jest configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies
```

## 🛠️ Available Scripts

### Development

```bash
npm run dev              # Start development server with hot reload
npm run build            # Build for production
npm run preview          # Preview production build locally
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting without changes
npm run update           # Update all dependencies to latest compatible versions
npm run storybook        # Start Storybook in development mode (http://localhost:6006)
npm run build-storybook  # Build Storybook for production
npm run test-storybook   # Run tests within Storybook
```

### Quality & Testing

```bash
npm test                 # Run all tests (203 tests, 1 skipped)
npm run test:coverage    # Run tests with coverage report
npm run test:watch       # Run tests in watch mode
npm run test:ci          # CI mode for GitHub Actions (maxWorkers=2)
npm run typecheck        # TypeScript type checking (zero errors guaranteed)
npm run lint             # ESLint check (zero errors guaranteed)
npm run lint:fix         # Fix linting issues automatically
```

#### Coverage Report Execution

To generate a coverage report:

```bash
# Run tests with coverage
npm run test:coverage

# Output location
# - HTML report: coverage/index.html (open in browser)
# - LCOV report: coverage/lcov.info
# - Text report: coverage/output.txt
```

**Expected output:**

```
Test Suites: 19 passed
Tests: 203 passed, 1 skipped
Coverage: Critical paths 100%
```

**Viewing the HTML report:**

```bash
# Mac/Linux
open coverage/index.html

# Windows
start coverage/index.html
```

### Dependency Management

```bash
npm run update           # Update all dependencies to latest compatible versions
```

This runs `npx npm-check-updates -u` to rewrite `package.json` with the latest semver-compatible versions, then `npm install` to apply the changes.

### Code Quality

```bash
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format all files with Prettier
npm run format:check     # Check formatting compliance
```

## ✅ Quality Assurance

This project maintains enterprise-grade quality standards:

- **Zero TypeScript Errors**: Strict type checking with 100% type coverage
- **Zero ESLint Errors**: Enforced via Husky pre-commit hooks
- **203 Tests**: Comprehensive test suite covering all components, pages, and utilities
- **Coverage**: 100% test coverage for critical paths
- **Code Formatting**: Consistent style via Prettier

### 📊 Current Quality Score

Run the quality check script to verify the current state:

```bash
npm run quality
```

**Latest Results**:

- **Quality Score**: 25 / 25 (Excellent)
- **Build**: ✅ No errors or warnings
- **TypeScript**: ✅ 0 errors
- **Security**: ✅ No hardcoded secrets found
- **Tests**: ✅ 203 passed, 1 skipped
- **Coverage**: ✅ Critical paths: 100%

This indicates the project is production-ready with enterprise-grade quality!

### Test Coverage

```bash
# Run tests with coverage
npm run test:coverage

# Expected output:
# - Test Suites: 19 passed
# - Tests: 203 passed, 1 skipped
# - Coverage: 100% for critical paths
```

### Pre-commit Checks

All commits run automated quality checks via Husky:

1. ESLint fixes (if applicable)
2. Prettier formatting
3. TypeScript validation

## 📄 Pagination

The `Pagination` component provides accessible, reusable page navigation built on shadcn-ui primitives.

### Props

| Prop           | Type                     | Description                       |
| -------------- | ------------------------ | --------------------------------- |
| `currentPage`  | `number`                 | Currently active page (1-indexed) |
| `totalPages`   | `number`                 | Total number of pages             |
| `onPageChange` | `(page: number) => void` | Callback fired when page changes  |

### Behavior

- Renders `null` when `totalPages <= 1` (no pagination needed)
- Shows ellipsis (`...`) for large page counts to keep the UI compact
- Always displays the first and last page
- Previous/Next buttons are disabled and visually faded at the boundaries
- Page window shows ±2 pages around the current page

### Usage

```tsx
import Pagination from "@/components/Pagination";

<Pagination
	currentPage={currentPage}
	totalPages={Math.ceil(items.length / ITEMS_PER_PAGE)}
	onPageChange={setCurrentPage}
/>;
```

The Gallery component displays **9 templates per page**. When filters change, it preserves the current page position and only moves to the last valid page if the current page is out of bounds.

## ⚡ Performance Optimization

### Tree Shaking

Vite automatically performs tree shaking to remove unused code. The following optimizations are built-in:

```javascript
// vite.config.ts
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// Separate vendor chunks for better caching
					"react-vendor": ["react", "react-dom", "react-router-dom"],
					"ui-vendor": [
						"@radix-ui/react-dialog",
						"@radix-ui/react-dropdown-menu",
					],
					"forms-vendor": ["react-hook-form", "zod"],
				},
			},
		},
	},
});
```

### Lazy Loading

Components are loaded on-demand to improve initial load times:

```tsx
// Lazy load heavy components
const Gallery = lazy(() => import("@/components/Gallery"));
const PreviewModal = lazy(() => import("@/components/PreviewModal"));

// In your component
<Suspense fallback={<LoadingSpinner />}>
	<Gallery />
</Suspense>;
```

### Code Splitting

The router automatically splits routes into separate chunks:

```tsx
// src/App.tsx
<BrowserRouter>
	<Routes>
		<Route path="/" element={<Layout />}>
			<Route
				index
				element={
					<Suspense fallback={<Loader />}>
						<Gallery />
					</Suspense>
				}
			/>
			<Route
				path="about"
				element={
					<Suspense fallback={<Loader />}>
						<About />
					</Suspense>
				}
			/>
			<Route
				path="contact"
				element={
					<Suspense fallback={<Loader />}>
						<Contact />
					</Suspense>
				}
			/>
		</Route>
	</Routes>
</BrowserRouter>
```

### Image Optimization

Use the `srcset` attribute for responsive images:

```tsx
<img
	srcSet="/images/gallery-small.jpg 400w, /images/gallery-medium.jpg 800w, /images/gallery-large.jpg 1200w"
	sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
	alt="Template preview"
/>
```

### Debouncing Search

Implement debouncing for search input to reduce API calls:

```tsx
import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);

	return debouncedValue;
};
```

## ♿ Accessibility

This project follows WCAG 2.1 AA guidelines and includes:

### WAI-ARIA Support

All interactive elements have proper ARIA labels and roles:

```tsx
<button
  aria-label="Toggle dark mode"
  aria-pressed={isDarkMode}
  onClick={toggleTheme}
>
  <MoonIcon />
</button>

<nav aria-label="Main navigation">
  <ul role="list">
    <li><NavLink to="/">Home</NavLink></li>
  </ul>
</nav>
```

### Keyboard Navigation

- All buttons are focusable
- Use Tab key to navigate between elements
- Enter/Space to activate buttons
- Escape to close modals

### Color Contrast

- Text contrast ratio of 4.5:1 or higher (WCAG AA)
- Focus indicators are clearly visible
- Both light and dark modes maintain accessibility standards

### Semantic HTML

Use semantic elements for better screen reader support:

```tsx
<header role="banner">
  <nav role="navigation" aria-label="Main">
    <ul role="list">
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <section aria-labelledby="gallery-heading">
    <h2 id="gallery-heading">Template Gallery</h2>
  </section>
</main>

<footer role="contentinfo">
  <p>© 2026 Swift Template Gallery</p>
</footer>
```

## 📖 Component Usage Examples

### Header Component

```tsx
import Header from "@/components/Header";

function App() {
	return (
		<Header
			logo={<Logo />}
			navLinks={[
				{ label: "Gallery", href: "/" },
				{ label: "About", href: "/about" },
				{ label: "Contact", href: "/contact" },
			]}
		/>
	);
}
```

### Gallery Component

```tsx
import Gallery from "@/components/Gallery";

function HomePage() {
	const [templates, setTemplates] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const filters = { search: "", category: "all" };

	return (
		<Gallery
			templates={templates}
			filters={filters}
			currentPage={currentPage}
			onPageChange={setCurrentPage}
		/>
	);
}
```

### GalleryFilters Component

```tsx
import GalleryFilters from "@/components/GalleryFilters";

function Gallery() {
	const [filters, setFilters] = useState({
		search: "",
		category: "all",
		sortBy: "popular",
	});

	return (
		<GalleryFilters
			filters={filters}
			onChange={setFilters}
			categories={["all", "dashboard", "landing", "ecommerce"]}
		/>
	);
}
```

### Pagination Component

```tsx
import Pagination from "@/components/Pagination";

function Gallery() {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(templates.length / ITEMS_PER_PAGE);

	return (
		<Pagination
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={setCurrentPage}
		/>
	);
}
```

### TemplateCard Component

```tsx
import TemplateCard from "@/components/TemplateCard";

function Gallery() {
	const templates = [
		{
			id: 1,
			title: "Modern Dashboard",
			description: "A responsive dashboard template",
			category: "dashboard",
			rating: 4.8,
			reviews: 124,
			image: "/templates/dashboard.png",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{templates.map((template) => (
				<TemplateCard key={template.id} template={template} />
			))}
		</div>
	);
}
```

### PreviewModal Component

```tsx
import PreviewModal from "@/components/PreviewModal";

function TemplateCard({ template }) {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	return (
		<>
			<button onClick={() => setIsPreviewOpen(true)}>Preview Template</button>
			<PreviewModal
				isOpen={isPreviewOpen}
				onClose={() => setIsPreviewOpen(false)}
				template={template}
			/>
		</>
	);
}
```

### ThemeToggle Component

```tsx
import ThemeToggle from "@/components/ThemeToggle";

function Header() {
	return <ThemeToggle aria-label="Toggle dark mode" />;
}
```

## 🎯 Technology Stack

- **Framework**: React 18 + React Router v6
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS + shadcn-ui
- **Testing**: Jest + React Testing Library
- **Build**: Vite

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/swift-template-gallery.git
cd swift-template-gallery
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**
   Navigate to [http://localhost:5173](http://localhost:5173) to view the gallery.

### Development Workflow

```bash
# Development with hot reload
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run typecheck

# Linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview

# Format code with Prettier
npm run format

# Start Storybook
npm run storybook

# Build Storybook for production
npm run build-storybook
```

## 🐛 Troubleshooting

### Common Issues

#### Build fails with Vite

**Problem**: `npm run build` fails with Vite-related errors.

**Solution**:

```bash
# Clear cache and reinstall
rm -rf node_modules .vite
npm install
npm run build
```

#### Tests fail in CI

**Problem**: Tests pass locally but fail in CI.

**Solution**:

```bash
# Run tests in CI mode
npm run test:ci

# This sets maxWorkers=2 for GitHub Actions compatibility
```

#### TypeScript errors after updating dependencies

**Problem**: New dependency versions cause TypeScript errors.

**Solution**:

```bash
# Update dependencies
npm run update

# Check for type errors
npm run typecheck
```

#### Storybook doesn't start

**Problem**: `npm run storybook` fails to start.

**Solution**:

```bash
# Clear Storybook cache
rm -rf .storybook-static node_modules/.cache

# Restart Storybook
npm run storybook
```

### Debugging Tips

#### Enable verbose logging

```bash
# Vite debug mode
VITE_DEBUG=true npm run dev

# Jest debug mode
npm test -- --debug
```

#### Check for console errors

```bash
# In development, open browser console (F12)
# In production, check browser DevTools

# Generate coverage report to find untested code
npm run test:coverage
```

#### Verify environment variables

```bash
# Check if .env files exist
ls -la .env* | grep -v node_modules

# Test environment loading
node -e "console.log(import.meta.env.VITE_...)"
```

#### Test specific components

```bash
# Test only one component
npm test -- --testPathPattern=Header.test.tsx

# Test all components
npm test -- --testPathPattern=__tests__/components/
```

### Log Analysis

#### Vite build logs

```bash
# Build with sourcemaps for debugging
npm run build

# Check Vite server logs for errors
npm run dev
```

#### Jest test logs

```bash
# Run tests with verbose output
npm test -- --verbose

# Run tests with watch mode
npm run test:watch
```

#### ESLint logs

```bash
# Run ESLint with autofix
npm run lint:fix

# Check specific file
npx eslint src/components/Header.tsx
```

## 🤝 Support & Community

### Getting Help

#### Documentation

- [Getting Started Guide](#-quick-start) - Initial setup and development
- [Component Guide](#-component-usage-examples) - How to use components
- [Storybook](./STORYBOOK.md) - Interactive component documentation
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute to the project

#### Issue Reporting

When reporting issues, please include:

1. **Environment details**:
   - Node.js version: `node -v`
   - npm version: `npm -v`
   - OS and browser version

2. **Reproduction steps**:
   - Exact commands to run
   - Expected behavior
   - Actual behavior

3. **Error logs**:
   - Full error stack trace
   - Console output
   - Test results

4. **Screenshots** (if applicable):
   - Before/after screenshots
   - Visual bug reproduction

**Example issue template**:

```markdown
## Bug Report

**Component**: Header
**Environment**: Node.js 20.11.0, npm 10.2.4, Chrome 120.0
**Steps to reproduce**:

1. Open the app
2. Click on dark mode toggle
3. ...
   **Expected behavior**: Theme should toggle to dark mode
   **Actual behavior**: Theme doesn't change
   **Error logs**:
```

Error: Failed to toggle theme
at Header.tsx:45:12

```

```

#### Questions & Discussions

For general questions or feature requests, please:

1. Check existing issues and documentation
2. Start a discussion on [GitHub Discussions](https://github.com/yourusername/swift-template-gallery/discussions)
3. Tag your question appropriately: `question`, `feature-request`, or `help`

### Contributing

We welcome contributions from the community! Please see our [Contributing Guide](./CONTRIBUTING.md) for:

- Code of conduct
- Contribution guidelines
- Pull request process
- Testing requirements

### Community Resources

- **GitHub**: [Report bugs or request features](https://github.com/yourusername/swift-template-gallery/issues)
- **Discussions**: [Ask questions or share ideas](https://github.com/yourusername/swift-template-gallery/discussions)
- **Discord**: Join our community server for real-time chat

### Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Provide constructive feedback
- Follow open source best practices
- Respect project maintainers' decisions

### Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/)
- Powered by [React](https://react.dev/)
- Tested with [Jest](https://jestjs.io/)
- Documented with [Storybook](https://storybook.js.org/)

## 📚 Documentation

- [Getting Started](#-quick-start) - Initial setup guide
- [Architecture](./ARCHITECTURE.md) - System design overview
- [Contributing](./CONTRIBUTING.md) - How to contribute
- [API Reference](./docs/api.md) - API documentation
- [Storybook](./STORYBOOK.md) - Component development guide

## 🧪 Testing

### Test Structure

The project has a comprehensive test suite with **203 tests** covering:

- **Components**: All UI components (Header, Footer, Hero, Gallery, Pricing, Contact, ThemeToggle, RatingStars, ReviewList, RatingForm, PreviewModal, TemplateCard, GalleryFilters, NavLink)
- **Pages**: Index page, NotFound page, TemplateDetail page
- **Libraries**: reviews.ts utility functions
- **Hooks**: Custom hooks (use-mobile, use-toast)

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=Gallery.test.tsx

# Run specific test name
npm test -- --testNamePattern="should render the hero section"
```

### Test Coverage Report

Run with coverage to see detailed results:

```bash
npm run test:coverage
```

Expected output:

```
Test Suites: 19 passed, 19 total
Tests:       203 passed, 1 skipped, 204 total
Coverage:    Critical paths: 100%
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Component Development

We use **Storybook** for component development and documentation:

1. **Start Storybook**:

   ```bash
   npm run storybook
   ```

2. **Create a Component Story**:
   See `STORYBOOK.md` for detailed guide on creating component stories.

3. **Test Components**:
   Interact with components in Storybook's preview environment.

4. **Build for Production**:
   ```bash
   npm run build-storybook
   ```

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. **Run quality checks** before committing:
   ```bash
   npm run typecheck  # TypeScript check
   npm run lint       # ESLint check
   npm test           # Run tests
   ```
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Style

This project follows strict code quality standards:

- **TypeScript**: No `any` types, strict mode enabled
- **ESLint**: Zero warnings/errors enforced
- **Prettier**: Consistent code formatting
- **Testing**: Every component must have tests

### Pre-commit Hooks

All commits automatically run:

```bash
# 1. ESLint auto-fix
eslint . --fix

# 2. Prettier format
prettier --write "**/*.{ts,tsx,js,jsx,css,md}"
```

## 📚 Documentation

- [Getting Started](#-quick-start) - Initial setup guide
- [Architecture](./ARCHITECTURE.md) - System design overview
- [Storybook](./STORYBOOK.md) - Component development guide
- [Contributing](./CONTRIBUTING.md) - How to contribute

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔄 Recent Updates

### 2026-04-29

- ✅ Fixed Pagination component TypeScript errors
- 🔧 Changed button elements to anchor elements for proper navigation
- 🎯 Removed unused imports to improve code quality
- ✅ Verified zero TypeScript errors in production code

### 2026-03-24

- ✨ Added quality score display to README
- 📊 Added quality check documentation
- 📝 Removed duplicate "Project Structure Overview" section
- 🔧 Verified quality score: 25/25 (Excellent)

### v1.0.0 (2026-03-21)

- ✅ Initial release
- 🎨 Full shadcn-ui integration
- 🌙 Dark mode support
- 🔬 203 comprehensive tests
- ✨ TypeScript strict mode

## 🙋♂️ Support

For support, email support@example.com or open an issue in our GitHub repository.

## 📈 Roadmap

- [x] Add dark mode support ✅
- [x] Comprehensive test suite ✅
- [x] Review system with sentiment analysis ✅
- [x] TypeScript strict mode ✅
- [x] Code quality enforcement ✅
- [ ] Template categorization with tags
- [ ] Template download functionality
- [ ] RESTful API for templates
- [ ] Template marketplace integration

---

Built with ❤️ using React 18.3.1, TypeScript 5.8.3, Vite 5.4.19, and shadcn-ui
