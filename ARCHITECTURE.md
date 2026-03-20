# Architecture Overview

Swift Template Gallery is a modern React application built with TypeScript, Vite, and shadcn-ui. This document provides an overview of the system architecture.

## Table of Contents

- [System Overview](#system-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Core Features](#core-features)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling](#styling)
- [Testing Strategy](#testing-strategy)
- [Deployment Architecture](#deployment-architecture)

## System Overview

Swift Template Gallery is a template discovery and preview platform for React developers. The application allows users to browse, search, preview, and export React templates with shadcn-ui design system components.

### Key Characteristics

- **Modern Stack**: React 18, TypeScript 5, Vite 5
- **Performance**: Fast development server with HMR, optimized production builds
- **Quality**: 100% test coverage for critical paths, strict type checking
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **Responsiveness**: Mobile-first design with breakpoints for tablets and desktops

## Technology Stack

### Core Framework

- **React 18.3.1**: Latest React with concurrent features (Suspense, useTransition)
- **TypeScript 5.8.3**: Full type safety with strict mode
- **Vite 5.4.19**: Lightning-fast build tool and dev server
- **React Router v6.30.1**: Client-side routing

### State & Forms

- **React Hook Form 7.61.1**: Efficient form handling with performance optimization
- **Zod 3.25.76**: Runtime type validation for forms and API requests
- **TanStack Query 5.83.0**: Server state management and caching

### Styling

- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn-ui**: Modern component library built on Radix UI primitives
- **Tailwind CSS Animate**: Built-in animations

### Icons

- **Lucide React 0.462.0**: Beautiful, consistent icon set

### Code Quality

- **ESLint 9.32.0**: Code linting and style enforcement
- **Prettier 3.8.1**: Code formatting
- **Husky 4.3.8**: Git hooks automation
- **lint-staged 15.5.2**: Pre-commit code quality checks

### Testing

- **Jest 30.2.0**: Test runner
- **React Testing Library 16.3.2**: Component testing
- **Jest DOM 6.9.1**: DOM matchers
- **TypeScript Jest 29.4.6**: TypeScript support for tests

## Project Structure

```
swift-template-gallery-main/
├── public/                      # Static assets
├── src/
│   ├── components/              # React components
│   │   ├── ui/                 # shadcn-ui components
│   │   ├── Header.tsx          # Navigation header with theme toggle
│   │   ├── Footer.tsx          # Footer component
│   │   ├── Hero.tsx            # Hero section with CTA
│   │   ├── Gallery.tsx         # Main template gallery
│   │   ├── GalleryFilters.tsx  # Template filtering
│   │   ├── TemplateCard.tsx    # Individual template card
│   │   ├── PreviewModal.tsx    # Template preview modal
│   │   ├── NavLink.tsx         # Navigation link component
│   │   ├── Pricing.tsx         # Pricing section
│   │   └── Contact.tsx         # Contact form section
│   ├── pages/                   # Page components
│   │   ├── Index.tsx           # Home page
│   │   └── NotFound.tsx        # 404 page
│   ├── lib/                     # Utility functions
│   │   └── reviews.ts          # Review utilities
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.ts       # Mobile breakpoint hook
│   │   └── use-toast.ts        # Toast notification hook
│   ├── providers/               # Context providers
│   │   └── theme-provider.tsx  # Theme provider for dark mode
│   └── __tests__/               # Test suites
│       ├── components/          # Component tests
│       └── pages/               # Page tests
├── .github/
│   └── workflows/
│       ├── ci.yml               # CI pipeline
│       └── build-and-deploy.yml # GitHub Actions deployment
├── docs/                        # Additional documentation
├── jest.config.ts               # Jest configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── vite.config.ts               # Vite configuration
```

## Core Features

### Template Gallery

- Browse templates with grid layout
- Smart search functionality
- Filter by category and tags
- Live preview of templates
- Code export to clipboard

### Theme System

- Dark mode support with automatic system detection
- Manual toggle for light/dark/auto
- Persisted user preference
- Seamless transitions

### Review System

- User-submitted reviews
- Star ratings (1-5 stars)
- Sentiment analysis
- Review display with sorting options

### Mobile Experience

- Responsive design
- Touch-friendly interactions
- Optimized for mobile devices
- Smooth scrolling and animations

## Component Architecture

### UI Component System

The application uses **shadcn-ui** as its component foundation. shadcn-ui components are:

- **Headless**: No built-in styling, controlled by Tailwind CSS
- **Accessible**: Built on Radix UI primitives
- **Customizable**: Easy to style and modify
- **Reusable**: Single-file components for easy integration

### Component Organization

Components are organized into:

1. **UI Components** (`components/ui/`): shadcn-ui primitives
2. **Layout Components** (`Header`, `Footer`): Application layout
3. **Page Components** (`pages/`): Page-specific components
4. **Feature Components** (`Gallery`, `TemplateCard`, `PreviewModal`): Feature-specific components

### Component Patterns

#### Functional Components with Hooks

```typescript
const TemplateCard: React.FC<TemplateCardProps> = ({ template, onPreview }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Component logic */}
    </div>
  );
};
```

#### Custom Hooks

```typescript
const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
```

## State Management

### React State

For local component state:

- `useState`: Component-level state
- `useEffect`: Side effects and lifecycle
- `useContext`: Cross-component state (theme provider)

### React Hook Form + Zod

For form state:

- **React Hook Form**: Efficient form state management
- **Zod**: Runtime validation and schema definition

### TanStack Query

For server state and API data:

- Data fetching and caching
- Automatic refetching
- Error handling and retries

## Routing

### React Router v6

The application uses client-side routing with React Router:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
```

### Navigation Components

- **NavLink**: Styled navigation links with active state
- **Header**: Main navigation with theme toggle
- **Footer**: Secondary navigation and links

## Styling

### Tailwind CSS

All styling is done with Tailwind CSS utility classes:

```typescript
<div className="container mx-auto px-4 py-8">
  {/* Content */}
</div>
```

### Custom Configuration

- Tailwind configuration in `tailwind.config.js`
- Custom colors and fonts defined in theme
- Animation utilities configured

### Dark Mode

Dark mode is implemented via CSS variables and Tailwind's dark mode support:

```typescript
<div className="dark:bg-gray-900 dark:text-white">
  {/* Dark mode content */}
</div>
```

### Responsive Design

Mobile-first approach with breakpoints:

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## Testing Strategy

### Test Pyramid

```
      /\
     /  \   E2E Tests (Future)
    /----\
   /      \ Integration Tests (Future)
  /--------\
 /          \
/____________\
 Unit Tests
```

### Test Types

#### Unit Tests

- **Components**: Test individual component behavior
- **Libraries**: Test utility functions and hooks
- **Isolation**: Each test is independent

#### Integration Tests

- **Component interactions**: Test how components work together
- **User flows**: Test complete user journeys

#### Component Tests

- **Rendering**: Verify components render correctly
- **User interactions**: Test user actions and state changes
- **Accessibility**: Verify screen reader compatibility

### Testing Libraries

- **React Testing Library**: Component testing
- **Jest**: Test runner and assertion library
- **Jest DOM**: DOM matchers for React Testing Library

### Running Tests

```bash
npm test                          # Run all tests
npm run test:watch               # Watch mode
npm run test:coverage            # Coverage report
```

## Deployment Architecture

### Development Environment

- **Vite Dev Server**: Fast HMR with instant updates
- **TypeScript**: Development-time type checking
- **Hot Module Replacement**: Instant updates without full reload

### Production Build

- **Vite Build**: Optimized production bundle
- **Code Splitting**: Lazy loading for better performance
- **Tree Shaking**: Remove unused code

### CI/CD Pipeline

#### GitHub Actions

**ci.yml**: CI pipeline that runs on every pull request:

1. Install dependencies
2. Run type checking
3. Run linting
4. Run tests
5. Generate coverage report

**build-and-deploy.yml**: Deployment pipeline (main branch only):

1. Build Docker image (Node 20 Alpine)
2. Run typecheck, lint, tests
3. Upload artifact (7-day retention)
4. Push to AWS ECR
5. Update ECS service

### Deployment Targets

#### Local Development

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

#### AWS ECS

- **ECR**: Elastic Container Registry for Docker images
- **ECS**: Elastic Container Service for running containers
- **Auto Scaling**: Automatic scaling based on traffic

#### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance Optimization

### Code Optimization

- **Tree Shaking**: Remove unused exports
- **Code Splitting**: Lazy load routes and components
- **Minification**: Minify JavaScript and CSS
- **Compression**: Gzip compression

### Asset Optimization

- **Image Optimization**: Use modern image formats
- **Font Optimization**: Modern font formats with variable fonts
- **CDN**: Static assets served from CDN

### Runtime Optimization

- **Virtual DOM**: React's efficient diffing algorithm
- **Concurrent Rendering**: React 18's concurrent features
- **Suspense**: Lazy loading with Suspense boundaries

## Security Considerations

### XSS Prevention

- React's automatic DOM escaping
- Proper sanitization of user input
- Content Security Policy (CSP) headers

### Input Validation

- Zod schemas for form validation
- Server-side validation
- Type safety with TypeScript

### Content Security

- No server-side rendering (SSR)
- Client-side routing only
- Secure headers in production

## Accessibility

### WCAG AA Compliance

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels

### Color Contrast

- Minimum 4.5:1 contrast ratio for normal text
- 3:1 for large text
- High contrast mode support

## Future Enhancements

### Planned Features

- **Template Categories**: Categorization with tags
- **Template Download**: Direct download functionality
- **RESTful API**: Template management API
- **Template Marketplace**: Integration with marketplace

### Technical Improvements

- **SSR**: Add Next.js for better SEO
- **PWA**: Progressive Web App support
- **Analytics**: Built-in analytics and tracking
- **Internationalization**: Multi-language support

---

This architecture ensures a maintainable, scalable, and high-performance application that follows modern React development best practices.
