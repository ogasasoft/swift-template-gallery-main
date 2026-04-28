# Storybook Documentation

This guide helps you get started with Storybook for the Swift Template Gallery project.

## Overview

Storybook is an interactive development environment for UI components. It allows you to develop and test components in isolation from your application logic.

## Features

- **Component Isolation**: Develop components without affecting other parts of the app
- **Interactive Design**: Preview components with real React state and props
- **Documentation**: Document components with examples and usage patterns
- **Testing**: Visual testing and regression testing of UI components

## Getting Started

### Install Storybook (if not already installed)

```bash
npm run storybook
```

This will automatically install and start Storybook in development mode at `http://localhost:6006`.

### Build for Production

```bash
npm run build-storybook
```

This generates a static build of Storybook in the `storybook-static/` directory, ready for deployment.

## Available Scripts

| Command                   | Description                         |
| ------------------------- | ----------------------------------- |
| `npm run storybook`       | Start Storybook in development mode |
| `npm run build-storybook` | Build Storybook for production      |
| `npm run test-storybook`  | Run tests within Storybook          |

## Component Structure

Components are located in `src/components/` and have corresponding stories in `src/stories/`:

```
src/
├── components/
│   ├── ui/          # shadcn-ui base components
│   ├── Header.tsx   # Navigation component
│   ├── Footer.tsx   # Footer component
│   └── ...
├── stories/
│   ├── Header.stories.tsx
│   ├── Footer.stories.tsx
│   └── ...
```

## Creating Your First Story

1. Create a story file in `src/stories/`:

```tsx
// src/stories/Example.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Example } from "@/components/Example";

const meta: Meta<typeof Example> = {
	title: "Example/Example",
	component: Example,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Default: Story = {
	args: {
		text: "Hello Storybook!",
	},
};
```

2. Open Storybook at `http://localhost:6006` to view your component.

## Developing Components in Storybook

- **Props Panel**: Adjust component props in the right sidebar
- **Actions Panel**: Track events and state changes
- **Global Controls**: Control theme, locale, and other global settings
- **Canvas**: The preview area where your component renders

## Testing in Storybook

### Test Integration

This project integrates Storybook with Jest for comprehensive component testing:

```bash
# Run all tests including stories
npm run test-storybook

# Run tests in watch mode
npm run test-storybook -- --watch

# Run tests with coverage
npm run test-storybook -- --coverage
```

### Test Structure

- **Unit Tests**: Located in `src/__tests__/` directory
- **Story Tests**: Component stories in `src/stories/` directory
- **Coverage**: Runs automatically with `test-storybook --coverage`

### Quality Checks

```bash
# Quality check script (runs build, typecheck, lint, and tests)
npm run quality
```

This quality check script validates:

- Build status (zero errors)
- TypeScript compilation (zero errors)
- Security (no hardcoded secrets)
- Test coverage (203 tests, 1 skipped)
- Overall quality score (25/25)

## Customization

### Adding Addons

See `.storybook/main.ts` for addon configuration. Common addons include:

- `@storybook/addon-essentials`: Contains many useful addons
- `@storybook/addon-interactions`: For component interactions
- `@storybook/addon-onboarding`: For onboarding new developers

### Theme Customization

The project uses Tailwind CSS for styling. Storybook will automatically inherit your Tailwind configuration.

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/getting-started/introduction)
- [React Component Documentation](https://storybook.js.org/docs/react/writing-docs/introduction)
- [React Testing Library Integration](https://storybook.js.org/docs/react/get-started/integrate-with-testing-libraries)

## Troubleshooting

### Storybook won't start

- Ensure all dependencies are installed: `npm install`
- Check for port conflicts on 6006
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

### Components not rendering

- Verify component files exist in `src/components/`
- Check story file syntax and imports
- Ensure path aliases (`@/`) are correctly configured in `tsconfig.json`
