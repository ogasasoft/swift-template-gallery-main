# Swift Template Gallery

A modern template gallery for developers to discover and preview reusable React components with shadcn-ui design system.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.3.28-brightgreen.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6.svg)
![Jest](https://img.shields.io/badge/Jest-30.4.2-9948F5.svg)
![ESLint](https://img.shields.io/badge/ESLint-10.4.0-4B32C3.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF.svg)

## 🌟 Features

- 📦 **Template Gallery**: Browse and discover ready-to-use React templates
- 🔍 **Smart Search**: Find templates by name, category, or description
- 🎨 **shadcn-ui**: Modern, accessible design system
- 💻 **Live Preview**: See templates rendered in real-time
- 📋 **Code Export**: Copy code directly to clipboard
- 📱 **Responsive**: Mobile-first design
- 🌙 **Dark Mode**: Automatic system preference detection with manual toggle
- ⭐ **Review System**: User ratings and reviews with sentiment analysis
- 🔬 **Comprehensive Tests**: 162 tests covering all components and pages (199 passed, 1 skipped)
- ✨ **TypeScript**: Full type safety with 100% coverage

## 🛠️ Tech Stack

### Framework & Core

- **React 18.3.1** - Latest React with concurrent features
- **TypeScript 6.0.3** - Full type safety
- **Vite 8.0.13** - Lightning-fast build tool
- **React Router v6.30.3** - Client-side routing

### Styling

- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **shadcn-ui** - Modern component library
- **Lucide React 1.16.0** - Beautiful icons
- **Tailwind CSS Animate** - Built-in animations

### State & Forms

- **React Hook Form 7.76.0** - Efficient form handling
- **Zod 4.4.3** - Runtime type validation
- **TanStack Query 5.100.11** - Server state management

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
│   │   ├── Gallery.tsx     # Template gallery
│   │   ├── GalleryFilters.tsx  # Gallery filtering
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
```

### Quality & Testing

```bash
npm test                 # Run all tests (162 tests)
npm run test:coverage    # Run tests with coverage report
npm run test:watch       # Run tests in watch mode
npm run test:ci          # CI mode for GitHub Actions (maxWorkers=2)
npm run typecheck        # TypeScript type checking (zero errors guaranteed)
npm run lint             # ESLint check (zero errors guaranteed)
npm run lint:fix         # Fix linting issues automatically
```

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
- **162 Tests**: Comprehensive test suite covering all components, pages, and utilities
- **Coverage**: 100% test coverage for critical paths
- **Code Formatting**: Consistent style via Prettier

### Test Coverage

```bash
# Run tests with coverage
npm run test:coverage

# Expected output:
# - Test Suites: 17 passed
# - Tests: 162 passed, 1 skipped
# - Coverage: 100% for critical paths
```

### Pre-commit Checks

All commits run automated quality checks via Husky:

1. ESLint fixes (if applicable)
2. Prettier formatting
3. TypeScript validation

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

## 🐳 Docker

### Using Docker Compose (Development)

Quick setup with Docker Compose:

```bash
# Build and start in development mode
docker-compose up --build

# Run tests inside container
docker-compose exec app npm test

# Stop services
docker-compose down
```

### Using Docker CLI

```bash
# Build image
docker build -t swift-template-gallery:latest .

# Run container
docker run -p 3000:3000 swift-template-gallery:latest

# Run with environment variables
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  swift-template-gallery:latest
```

### Docker Documentation

For detailed information, see [DOCKER.md](DOCKER.md) which covers:
- Multi-stage build configuration
- Security best practices
- Production deployment
- Troubleshooting
- Performance optimization

## 🚀 Deployment

This project is deployed to **AWS ECS** with automated CI/CD.

### Overview

- **CI/CD Pipeline**: GitHub Actions with automated builds and deployments
- **Container Registry**: AWS ECR (Elastic Container Registry)
- **Container Service**: AWS ECS (Elastic Container Service)
- **Deployment**: Automatic on push to `main` branch

### Required Secrets

Configure these secrets in your GitHub repository:
- `AWS_ACCOUNT_ID`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `ECS_CLUSTER`
- `ECS_SERVICE`
- `ECS_TASK_DEFINITION`

### Quick Deploy

```bash
# 1. Build and test locally
npm test
npm run build
docker build -t swift-template-gallery:latest .

# 2. Push to main branch
git add .
git commit -m "feat: new feature"
git push origin main

# 3. Monitor deployment on GitHub Actions
# CI/CD will automatically deploy to ECS
```

### Deployment Documentation

For comprehensive deployment guides:
- [DEPLOYMENT.md](DEPLOYMENT.md) - Step-by-step deployment guide
- [CICD_SUMMARY.md](.github/workflows/CICD_SUMMARY.md) - CI/CD pipeline overview

### Verify Deployment

Use the verification script after deployment:

```bash
# Make script executable
chmod +x scripts/verify-deployment.sh

# Run verification (with default cluster/service)
./scripts/verify-deployment.sh

# Or specify custom values
./scripts/verify-deployment.sh --cluster my-cluster --service my-service
```
```

### Project Structure Overview

```
swift-template-gallery/
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn-ui components
│   │   ├── Gallery.tsx      # Main gallery component
│   │   ├── TemplateCard.tsx # Individual template cards
│   │   └── PreviewModal.tsx # Template preview modal
│   ├── pages/          # Page components
│   ├── lib/            # Utility functions
│   └── hooks/          # Custom React hooks
├── public/             # Static assets
├── src/__tests__/      # Test suites
├── jest.config.ts      # Jest configuration
└── package.json        # Dependencies
```

## 📚 Documentation

- [Getting Started](#-quick-start) - Initial setup guide
- [Architecture](./ARCHITECTURE.md) - System design overview
- [Contributing](./CONTRIBUTING.md) - How to contribute
- [API Reference](./docs/api.md) - API documentation

## 🧪 Testing

### Test Structure

The project has a comprehensive test suite with **162 tests** covering:

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
Test Suites: 17 passed, 17 total
Tests:       162 passed, 1 skipped, 163 total
Coverage:    Critical paths: 100%
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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
