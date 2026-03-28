# TypeScript Type Definitions

This document provides comprehensive documentation for all TypeScript types used in the Swift Template Gallery project.

## Type System Overview

The project uses **TypeScript 6.0.2** with strict mode enabled for maximum type safety. All type definitions are exported from `src/lib/types.ts` and can be imported anywhere in the codebase.

---

## Core Types

### `TagCategory`

The category to which a tag belongs.

```typescript
export type TagCategory = "industry" | "tone" | "style" | "feature";
```

**Possible Values:**

- `industry` - Industry-specific tags (e.g., "e-commerce", "dashboard")
- `tone` - Tone and voice (e.g., "professional", "casual")
- `style` - Visual style (e.g., "minimal", "vibrant")
- `feature` - Feature-based tags (e.g., "dark mode", "responsive")

**Usage Example:**

```typescript
const category: TagCategory = "industry";
```

---

### `TagDefinition`

Defines a tag with its metadata.

```typescript
export interface TagDefinition {
	id: string;
	label: string;
	category: TagCategory;
}
```

**Properties:**

| Property   | Type          | Required | Description                   |
| ---------- | ------------- | -------- | ----------------------------- |
| `id`       | `string`      | ✅       | Unique identifier for the tag |
| `label`    | `string`      | ✅       | Display label for the tag     |
| `category` | `TagCategory` | ✅       | Category the tag belongs to   |

**Example:**

```typescript
const tag: TagDefinition = {
	id: "industry-ecommerce",
	label: "E-commerce",
	category: "industry",
};
```

---

### `Template`

Represents a template in the gallery.

```typescript
export interface Template {
	id: string;
	title: string;
	tags: string[];
	industry: string;
	tone: string;
	style: string;
	thumb: string;
	preview_path: string;
	rating?: number;
	reviewCount?: number;
	description?: string;
}
```

**Properties:**

| Property       | Type       | Required | Description                                    |
| -------------- | ---------- | -------- | ---------------------------------------------- |
| `id`           | `string`   | ✅       | Unique template identifier                     |
| `title`        | `string`   | ✅       | Template display name                          |
| `tags`         | `string[]` | ✅       | Array of tag IDs associated with this template |
| `industry`     | `string`   | ✅       | Industry category                              |
| `tone`         | `string`   | ✅       | Writing/voice tone                             |
| `style`        | `string`   | ✅       | Visual style                                   |
| `thumb`        | `string`   | ✅       | Thumbnail image URL/path                       |
| `preview_path` | `string`   | ✅       | Path to the preview template                   |
| `rating`       | `number?`  | ❌       | Average rating (0-5), optional                 |
| `reviewCount`  | `number?`  | ❌       | Number of reviews, optional                    |
| `description`  | `string?`  | ❌       | Template description, optional                 |

**Example:**

```typescript
const template: Template = {
	id: "template-1",
	title: "E-commerce Dashboard",
	tags: ["industry-ecommerce", "feature-dynamic"],
	industry: "e-commerce",
	tone: "professional",
	style: "minimal",
	thumb: "/thumbnails/dashboard.png",
	preview_path: "/templates/dashboard.html",
	rating: 4.5,
	reviewCount: 24,
	description: "A comprehensive e-commerce dashboard template",
};
```

---

### `TemplateReview`

Represents a user review for a template.

```typescript
export interface TemplateReview {
	id: string;
	templateId: string;
	userId: string;
	userName: string;
	rating: number;
	comment: string;
	createdAt: string;
}
```

**Properties:**

| Property     | Type     | Required | Description                           |
| ------------ | -------- | -------- | ------------------------------------- |
| `id`         | `string` | ✅       | Unique review identifier              |
| `templateId` | `string` | ✅       | ID of the reviewed template           |
| `userId`     | `string` | ✅       | ID of the reviewing user              |
| `userName`   | `string` | ✅       | Display name of the user              |
| `rating`     | `number` | ✅       | Rating value (0-5)                    |
| `comment`    | `string` | ✅       | Review text content                   |
| `createdAt`  | `string` | ✅       | ISO 8601 timestamp of review creation |

**Example:**

```typescript
const review: TemplateReview = {
	id: "review-123",
	templateId: "template-1",
	userId: "user-456",
	userName: "John Doe",
	rating: 5,
	comment: "Excellent template! Highly recommended.",
	createdAt: "2026-03-28T10:30:00Z",
};
```

---

### `ReviewForm`

Form state for submitting a review.

```typescript
export interface ReviewForm {
	rating: number;
	comment: string;
}
```

**Properties:**

| Property  | Type     | Required | Description         |
| --------- | -------- | -------- | ------------------- |
| `rating`  | `number` | ✅       | Rating value (0-5)  |
| `comment` | `string` | ✅       | Review text content |

**Constraints:**

- `rating` must be between 0 and 5 (inclusive)
- `comment` is required

**Example:**

```typescript
const formState: ReviewForm = {
	rating: 5,
	comment: "This template is perfect for my needs!",
};
```

---

### `FilterState`

Current state of template filters.

```typescript
export interface FilterState {
	tags: string[];
	industry: string[];
	tone: string[];
	style: string[];
	search: string;
}
```

**Properties:**

| Property   | Type       | Required | Description                  |
| ---------- | ---------- | -------- | ---------------------------- |
| `tags`     | `string[]` | ✅       | Selected tag IDs             |
| `industry` | `string[]` | ✅       | Selected industry categories |
| `tone`     | `string[]` | ✅       | Selected tone values         |
| `style`    | `string[]` | ✅       | Selected style values        |
| `search`   | `string`   | ✅       | Search query string          |

**Usage Example:**

```typescript
const filters: FilterState = {
	tags: ["industry-ecommerce"],
	industry: ["e-commerce"],
	tone: ["professional"],
	style: ["minimal"],
	search: "dashboard",
};
```

---

## Type Guards

Use TypeScript's built-in type guards to validate types at runtime:

```typescript
// Example: Validate template structure
function isTemplate(obj: any): obj is Template {
	return (
		typeof obj.id === "string" &&
		typeof obj.title === "string" &&
		Array.isArray(obj.tags) &&
		typeof obj.industry === "string"
	);
}

// Example: Validate rating value
function isValidRating(value: number): value is number {
	return value >= 0 && value <= 5;
}
```

---

## Utility Types

For common type transformations:

```typescript
// Extract required properties
type RequiredKeys = Required<Template>;

// Extract optional properties
type OptionalKeys = Partial<Template>;

// Readonly versions
type ReadonlyTemplate = Readonly<Template>;

// Nullable versions
type NullableTemplate = Template | null;

// Union types
type Reviewable = Template | TemplateReview;
```

---

## Best Practices

1. **Always use the correct types** - Never use `any` unless absolutely necessary
2. **Define interfaces for complex data structures** - Improves readability and maintainability
3. **Use literal types for enums** - More precise than strings (e.g., `TagCategory` instead of `string`)
4. **Document optional properties** - Clearly mark which properties are optional
5. **Use TypeScript's strict mode** - Enabled in `tsconfig.json`

---

## Type Checking

Run TypeScript type checking to verify all types:

```bash
npm run typecheck
```

This command checks for:

- Type errors in all `.ts` and `.tsx` files
- Missing type definitions
- Implicit `any` types
- Type incompatibilities

**Expected Result:** 0 errors

---

## Extending Types

You can extend built-in types or create new ones based on existing definitions:

```typescript
// Example: Extended Template type
export interface ExtendedTemplate extends Template {
	lastUpdated: string;
	author: string;
	categories: string[];
}
```

---

## Related Files

- **Type Definitions**: `src/lib/types.ts`
- **Tag Definitions**: `src/lib/tagDefinitions.ts`
- **Template Data**: `src/lib/templates.json`
- **Review Utilities**: `src/lib/reviews.ts`
- **TypeScript Config**: `tsconfig.json`

---

## Testing

Type definitions are covered by comprehensive tests:

```bash
npm test -- --testPathPatterns="types"
```

**Test Coverage:** 100% for type definitions

---

**Last Updated:** 2026-03-28
**TypeScript Version:** 6.0.2
**Strict Mode:** Enabled
