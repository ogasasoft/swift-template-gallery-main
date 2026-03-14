# Swift Template Gallery

A modern template gallery for developers to discover and preview reusable React components with shadcn-ui design system.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## 🌟 Features

- 📦 **Template Gallery**: Browse and discover ready-to-use React templates
- 🔍 **Smart Search**: Find templates by name, category, or description
- 🎨 **shadcn-ui**: Modern, accessible design system
- 💻 **Live Preview**: See templates rendered in real-time
- 📋 **Code Export**: Copy code directly to clipboard
- 📱 **Responsive**: Mobile-first design

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd swift-template-gallery-main

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
# Build the project
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
swift-template-gallery-main/
├── src/
│   ├── __tests__/          # Test suites
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript definitions
│   └── app/               # Next.js App Router
├── dist/                  # Generated templates
├── public/                # Static assets
├── jest.config.ts         # Jest configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build            # Build for production
npm run start            # Start production server

# Quality
npm test                 # Run all tests
npm test -- --coverage   # Run tests with coverage
npm run typecheck        # TypeScript type checking
npm run lint             # ESLint check

# Utilities
npm run format           # Format code with Prettier
npm run lint:fix         # Fix linting issues automatically
```

## 🎯 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS + shadcn-ui
- **Testing**: Jest + React Testing Library
- **Build**: Vite

## 📚 Documentation

- [Getting Started](#-quick-start) - Initial setup guide
- [Architecture](./ARCHITECTURE.md) - System design overview
- [Contributing](./CONTRIBUTING.md) - How to contribute
- [API Reference](./docs/api.md) - API documentation

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test -- components/Gallery.test.tsx
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋♂️ Support

For support, email support@example.com or open an issue in our GitHub repository.

## 📈 Roadmap

- [ ] Add dark mode support
- [ ] Template categorization with tags
- [ ] User ratings and reviews
- [ ] Template download functionality
- [ ] RESTful API for templates
- [ ] Template marketplace integration

---

Built with ❤️ using Next.js, TypeScript, and shadcn-ui
