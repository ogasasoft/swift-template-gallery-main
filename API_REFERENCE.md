# API Reference - Swift Template Gallery

This document provides comprehensive API reference for the Swift Template Gallery project.

## Overview

The Swift Template Gallery API is designed to enable programmatic access to the template gallery functionality. The API provides endpoints for:

- Template listing and filtering
- Template detail retrieval
- Search functionality
- Template preview access
- Component usage examples

## Base URL

### Development

```
http://localhost:5173/api/v1
```

### Production

```
https://api.swift-template-gallery.com/v1
```

## API Authentication

Currently, the API does not require authentication for public endpoints. Authentication may be added in future versions.

## API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

### Response Codes

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Endpoints

### 1. Get Templates List

Retrieve a list of available templates with optional filtering.

**Endpoint:** `GET /templates`

**Query Parameters:**

| Parameter  | Type   | Required | Description                           |
| ---------- | ------ | -------- | ------------------------------------- |
| `page`     | number | No       | Page number (default: 1)              |
| `limit`    | number | No       | Items per page (default: 10, max: 50) |
| `category` | string | No       | Filter by category                    |
| `search`   | string | No       | Search in name and description        |
| `sort`     | string | No       | Sort field (name, popularity, rating) |
| `order`    | string | No       | Sort order (asc, desc)                |

**Request Example:**

```bash
GET /templates?page=1&limit=10&category=components&sort=popularity&order=desc
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "templates": [
      {
        "id": "template-001",
        "name": "Button Component",
        "description": "A modern, accessible button component with multiple variants",
        "category": "components",
        "rating": 4.8,
        "views": 1520,
        "downloads": 856,
        "tags": ["button", "ui", "accessibility"],
        "created_at": "2024-01-15T10:30:00Z"
      },
      {
        "id": "template-002",
        "name": "Card Layout",
        "description": "Responsive card component with image, title, and description",
        "category": "layouts",
        "rating": 4.5,
        "views": 987,
        "downloads": 423,
        "tags": ["card", "layout", "responsive"],
        "created_at": "2024-01-20T14:15:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "total_pages": 5
    }
  },
  "error": null
}
```

### 2. Get Template Details

Retrieve detailed information about a specific template.

**Endpoint:** `GET /templates/:id`

**Request Example:**

```bash
GET /templates/template-001
```

**Success Response (200):**

````json
{
  "success": true,
  "data": {
    "id": "template-001",
    "name": "Button Component",
    "description": "A modern, accessible button component with multiple variants",
    "category": "components",
    "rating": 4.8,
    "reviews_count": 23,
    "views": 1520,
    "downloads": 856,
    "tags": ["button", "ui", "accessibility"],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-06-20T08:45:00Z",
    "author": "OpenClaw Team",
    "component_code": {
      "tsx": "import { Button } from '@/components/ui/button'\n\nexport function Button({ variant = 'default' }: { variant?: 'default' | 'primary' | 'outline' | 'ghost' }) {\n  return <Button variant={variant}>Click me</Button>\n}",
      "css": ".button {\n  padding: 0.5rem 1rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}",
      "usage": "```tsx\nimport { Button } from '@/components/ui/button'\n\n<Button variant=\"primary\">Primary Action</Button>\n<Button variant=\"outline\">Cancel</Button>\n```"
    }
  },
  "error": null
}
````

### 3. Search Templates

Search for templates by name, description, or tags.

**Endpoint:** `GET /templates/search`

**Query Parameters:**

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| `q`       | string | Yes      | Search query                     |
| `filters` | object | No       | Additional filters (JSON object) |

**Request Example:**

```bash
GET /templates/search?q=button+card&filters={"category":"components"}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "template-001",
        "name": "Button Component",
        "description": "A modern, accessible button component",
        "category": "components",
        "rating": 4.8
      },
      {
        "id": "template-003",
        "name": "Card Component",
        "description": "Responsive card layout component",
        "category": "components",
        "rating": 4.6
      }
    ],
    "total": 2,
    "query": "button card"
  },
  "error": null
}
```

### 4. Get Template Preview

Get a preview of the template with live rendering.

**Endpoint:** `GET /templates/:id/preview`

**Query Parameters:**

| Parameter | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| `theme`   | string | No       | Preview theme (light, dark, auto) |

**Request Example:**

```bash
GET /templates/template-001/preview?theme=dark
```

**Success Response (200):**

Returns HTML content with the rendered template preview.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Template Preview - Button Component</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="bg-gray-100 min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Button Component Preview</h1>
      <div class="space-y-4">
        <!-- Button Variants -->
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Default Button
        </button>
        <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Primary Button
        </button>
        <button class="px-4 py-2 border-2 border-gray-600 text-gray-600 rounded hover:bg-gray-50">
          Outline Button
        </button>
        <button class="px-4 py-2 text-gray-600 hover:bg-gray-100">Ghost Button</button>
      </div>
    </div>
  </body>
</html>
```

### 5. Get Component Usage Examples

Retrieve usage examples and documentation for a template.

**Endpoint:** `GET /templates/:id/examples`

**Request Example:**

```bash
GET /templates/template-001/examples
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "template_id": "template-001",
    "name": "Button Component",
    "examples": [
      {
        "title": "Basic Button",
        "code": "import { Button } from '@/components/ui/button'\n\n<Button>Click me</Button>",
        "description": "Basic button usage with default styling"
      },
      {
        "title": "Button with Variant",
        "code": "import { Button } from '@/components/ui/button'\n\n<Button variant=\"primary\">Primary Action</Button>\n<Button variant=\"outline\">Cancel</Button>\n<Button variant=\"ghost\">Ghost Button</Button>",
        "description": "Different button variants"
      },
      {
        "title": "Button with Loading State",
        "code": "import { useState } from 'react'\nimport { Button } from '@/components/ui/button'\n\nexport function LoadingButton() {\n  const [loading, setLoading] = useState(false)\n  \n  const handleClick = async () => {\n    setLoading(true)\n    await fetchData()\n    setLoading(false)\n  }\n  \n  return (\n    <Button onClick={handleClick} loading={loading}>\n      Submit\n    </Button>\n  )\n}",
        "description": "Button with loading state"
      },
      {
        "title": "Button with Icon",
        "code": "import { Button } from '@/components/ui/button'\nimport { Save, Delete } from 'lucide-react'\n\nexport function IconButtons() {\n  return (\n    <div className=\"space-x-2\">\n      <Button><Save className=\"mr-2\" />Save</Button>\n      <Button variant=\"outline\"><Delete className=\"mr-2\" />Delete</Button>\n    </div>\n  )\n}",
        "description": "Button with icons"
      }
    ]
  },
  "error": null
}
```

### 6. Get Template Statistics

Retrieve usage statistics for a specific template.

**Endpoint:** `GET /templates/:id/stats`

**Request Example:**

```bash
GET /templates/template-001/stats
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "template-001",
    "name": "Button Component",
    "stats": {
      "views": 1520,
      "downloads": 856,
      "ratings": 23,
      "average_rating": 4.8,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-06-20T08:45:00Z"
    }
  },
  "error": null
}
```

### 7. Submit Template Review

Submit a review for a template.

**Endpoint:** `POST /templates/:id/reviews`

**Request Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "rating": 5,
  "comment": "Excellent component! Very well documented and easy to use.",
  "tags": ["good", "easy", "useful"]
}
```

**Request Example:**

```bash
curl -X POST http://localhost:5173/api/v1/templates/template-001/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "Excellent component!",
    "tags": ["good", "easy"]
  }'
```

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "review-123",
    "template_id": "template-001",
    "user_id": "user-456",
    "rating": 5,
    "comment": "Excellent component!",
    "tags": ["good", "easy"],
    "created_at": "2024-06-21T10:00:00Z"
  },
  "error": null
}
```

## Error Responses

### 404 Not Found

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "TEMPLATE_NOT_FOUND",
    "message": "Template with id 'template-001' not found",
    "details": {}
  }
}
```

### 400 Bad Request

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_QUERY_PARAM",
    "message": "Invalid value for 'page' parameter. Must be a positive integer.",
    "details": {
      "field": "page",
      "value": "-1"
    }
  }
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred while processing your request",
    "details": {}
  }
}
```

## Rate Limiting

API rate limiting is currently not enforced. Future versions may include rate limiting to prevent abuse.

### Rate Limit Headers

In future versions, the following headers may be included:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1718889600
```

## Pagination

All list endpoints support pagination. Use the `page` and `limit` query parameters.

**Example:**

```bash
# First page, 10 items per page
GET /templates?page=1&limit=10

# Second page, 20 items per page
GET /templates?page=2&limit=20
```

**Pagination Response:**

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "total_pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

## Filtering and Sorting

### Filtering

Filters are applied as query parameters:

```bash
# Filter by category
GET /templates?category=components

# Multiple filters
GET /templates?category=components&rating__gte=4.5

# Search and filter
GET /templates?search=button&category=components
```

### Sorting

Sort by field and direction:

```bash
# Sort by rating (descending)
GET /templates?sort=rating&order=desc

# Sort by name (ascending)
GET /templates?sort=name&order=asc
```

## Webhooks (Future)

Template gallery webhooks may be provided for:

- New template uploads
- Template downloads
- Reviews submitted
- Rating updates

**Example webhook payload:**

```json
{
  "event": "template.downloaded",
  "timestamp": "2024-06-21T10:00:00Z",
  "data": {
    "template_id": "template-001",
    "template_name": "Button Component",
    "user_id": "user-456",
    "download_count": 856
  }
}
```

## Changelog

### v1.0.0 (Current)

- Basic API endpoints implemented
- Template listing and filtering
- Search functionality
- Template detail retrieval
- Preview generation
- Usage examples
- Review submission

### Future Versions

- Authentication and authorization
- User profiles and favorites
- Advanced analytics
- Template versioning
- Batch operations
- Webhook support

## Support

For API support and questions:

- **GitHub Issues**: [https://github.com/ogasasasoft/swift-template-gallery/issues](https://github.com/ogasasasoft/swift-template-gallery/issues)
- **Email**: support@example.com
- **Documentation**: [Full Documentation](./README.md)

## License

This API documentation is part of the Swift Template Gallery project and is licensed under the MIT License.

---

**Last Updated:** June 21, 2026
