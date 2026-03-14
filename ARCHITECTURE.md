# Architecture Overview

## Project Structure

```
swift-template-gallery-main/
├── src/
│   ├── __tests__/              # Test suites
│   │   ├── components/        # Component tests
│   │   ├── lib/              # Utility tests
│   │   └── __setup__/        # Test utilities
│   ├── components/            # React components
│   │   ├── ui/               # shadcn-ui components
│   │   ├── gallery/          # Gallery-specific components
│   │   └── templates/        # Template preview components
│   ├── lib/                   # Core logic
│   │   ├── template-generator.ts
│   │   ├── validation.ts
│   │   └── utils.ts
│   ├── types/                 # TypeScript definitions
│   │   ├── template.ts
│   │   └── index.ts
│   └── app/                   # Next.js App Router
│       ├── (home)/           # Home page layout
│       ├── api/              # API routes
│       ├── templates/        # Template browsing
│       └── gallery/          # Gallery view
├── dist/                      # Generated templates
├── public/                    # Static assets
├── coverage/                  # Test coverage reports
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind config
└── jest.config.ts             # Jest config
```

## Technology Stack

### Frontend Framework
- **Next.js 14**: App Router architecture
- **React 18**: Component library
- **TypeScript**: Type safety

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn-ui**: Reusable UI components built on Radix UI

### Testing
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing

### Build Tools
- **Vite**: Build tool and dev server

## Core Features

### Template Gallery
- Display reusable React templates
- Filter templates by category
- Preview template code
- Export templates as files

### Search & Filter
- Text search functionality
- Category filtering
- Sort by popularity/name

### Developer Tools
- Copy template code
- Preview in browser
- Generate template files

## Component Architecture

### Library Components
Located in `src/components/ui/`, these are shadcn-ui components:
- Button, Input, Card, Dialog, Dropdown Menu
- Tabs, Select, Switch, etc.

### Feature Components
Feature-specific components in `src/components/`:
- `Gallery`: Main gallery layout
- `TemplateCard`: Individual template display
- `GalleryFilters`: Filter controls
- `TemplatePreview`: Code preview modal

## Data Flow

```
User Interaction → Component Event
    ↓
State Update (Zustand/React State)
    ↓
Component Re-render
    ↓
API Call (if needed)
    ↓
Response → State Update → UI Update
```

## State Management

### React State
For component-level state:
```typescript
const [isOpen, setIsOpen] = useState(false);
```

### Libraries (if needed)
- Currently using React state directly
- Consider Zustand for complex global state

## Routing

Next.js App Router structure:
- `(home)/` - Root layout with navigation
- `/templates` - Template browsing
- `/gallery` - Enhanced gallery view
- `/api/*` - API routes

## Testing Strategy

### Unit Tests
- Test utility functions in `lib/`
- Test business logic in isolation
- Mock external dependencies

### Component Tests
- Test render behavior
- Test user interactions
- Test accessibility

### Integration Tests
- Test API routes
- Test data flow between components

## Build Process

1. **Development**: Vite dev server with hot reload
2. **Production**: Vite build → Optimized assets
3. **Tests**: Jest runs with coverage reporting

## Deployment

The project is designed for deployment on Vercel:
- Automatic builds from git
- Preview deployments for PRs
- Global CDN for static assets
- Serverless functions for API routes

## Performance Considerations

- Code splitting by route
- Lazy loading of components
- Optimized images
- Tree shaking for unused code
- Minification and compression

## Security Considerations

- Input validation on all user inputs
- XSS protection with React's automatic escaping
- CSRF tokens for form submissions
- Secure cookie configuration
- Environment variable management

## Extensibility

The architecture is designed for easy extension:
- Modular component structure
- Clear separation of concerns
- Type-safe interfaces
- Plugin-friendly design
