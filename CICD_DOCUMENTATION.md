# CI/CD Pipeline Documentation

This document provides detailed documentation for the GitHub Actions CI/CD pipeline used in the Swift Template Gallery project.

## Overview

The CI/CD pipeline automates code quality checks, testing, building, security scanning, and deployment. It runs on every push to `main`, `feature/*`, and `update/*` branches, as well as every pull request to `main`.

## Pipeline Triggers

The pipeline is triggered by:

- **Push events**: When code is pushed to `main`, `feature/*`, or `update/*` branches
- **Pull requests**: When a pull request is created or updated targeting the `main` branch
- **Manual dispatch**: Can be manually triggered from GitHub Actions UI

### Manual Dispatch Input

When manually triggered, you can set:

```yaml
test-only: true
```

When enabled, the pipeline runs only the test job (skip lint and build).

## Environment Variables

The pipeline uses the following environment variables:

### Fixed Variables

| Variable       | Value | Description                       |
| -------------- | ----- | --------------------------------- |
| `NODE_VERSION` | `20`  | Node.js version used for all jobs |

### Required Secrets

The following secrets must be configured in GitHub repository settings:

| Secret            | Purpose                   | Required For                |
| ----------------- | ------------------------- | --------------------------- |
| `VERCEL_TOKEN`    | Vercel deployment token   | `deploy` job                |
| `ORG_ID`          | Vercel organization ID    | `deploy` job                |
| `PROJECT_ID`      | Vercel project ID         | `deploy` job                |
| `DOCKER_USERNAME` | Docker Hub username       | `docker-build` job (non-PR) |
| `DOCKER_PASSWORD` | Docker Hub password/token | `docker-build` job (non-PR) |

### Local Environment Variables

Projects can define environment variables in `.env` files:

```env
PORT=3000
NODE_ENV=production
```

## Pipeline Architecture

The pipeline consists of 7 main jobs organized by dependency:

```
┌─────────────────────────────────────────────────────────────┐
│                         Pipeline                             │
├─────────────────────────────────────────────────────────────┤
│  typecheck ──► lint ──► test ──► build ──► deploy           │
│         │         │         │         │                     │
│         ▼         ▼         ▼         ▼                     │
│       security-scan                              docker-build │
│                                                         (needs build, test) │
└─────────────────────────────────────────────────────────────┘
```

## Job Descriptions

### 1. Type Check (typecheck)

**Purpose**: Verify TypeScript code type safety

**Runs on**: `ubuntu-latest`

**Timeout**: 5 minutes

**Dependencies**: None

**Steps**:

1. **Checkout Code**: Pulls the latest code from the repository
2. **Setup Node.js**: Installs Node.js 20.x
3. **Install Dependencies**: Runs `npm ci` to install production dependencies
4. **Run TypeScript Check**: Executes `npm run typecheck`

**Success Criteria**: No TypeScript compilation errors

**Purpose in Pipeline**: Ensures all code conforms to TypeScript types before further processing.

---

### 2. Lint Check (lint)

**Purpose**: Validate code quality with ESLint and Prettier

**Runs on**: `ubuntu-latest`

**Timeout**: 5 minutes

**Dependencies**: `typecheck`

**Steps**:

1. **Checkout Code**: Pulls the latest code
2. **Setup Node.js**: Installs Node.js 20.x
3. **Install Dependencies**: Runs `npm ci`
4. **Run ESLint**: Executes `npm run lint` to check code style
5. **Check Prettier Formatting**: Validates code formatting with `npm run format:check`
6. **Run lint-staged**: Executes pre-commit checks on staged files

**Success Criteria**: No ESLint errors and Prettier formatting is compliant

**Purpose in Pipeline**: Enforces consistent code style and catches code quality issues before merging.

---

### 3. Run Tests (test)

**Purpose**: Execute comprehensive test suite with coverage

**Runs on**: `ubuntu-latest`

**Timeout**: 10 minutes

**Dependencies**: `lint`, `typecheck`

**Steps**:

1. **Checkout Code**: Pulls the latest code
2. **Setup Node.js**: Installs Node.js 20.x
3. **Install Dependencies**: Runs `npm ci`
4. **Run Tests**: Executes `npm run test:ci` in CI mode
5. **Upload Coverage Reports**: Uploads coverage data to Codecov (optional, doesn't fail build)

**Success Criteria**: All tests pass

**Coverage Report**: Automatically generated and uploaded to Codecov (may fail but doesn't block deployment)

**Purpose in Pipeline**: Ensures all functionality works as expected and maintains test coverage.

---

### 4. Coverage Report (coverage-report)

**Purpose**: Generate detailed coverage report

**Runs on**: `ubuntu-latest`

**Timeout**: 10 minutes

**Dependencies**: `test`

**Steps**:

1. **Checkout Code**: Pulls the latest code
2. **Setup Node.js**: Installs Node.js 20.x
3. **Install Dependencies**: Runs `npm ci`
4. **Run Tests with Coverage**: Executes `npm run test:coverage`
5. **Download Coverage Reports**: Retrieves coverage data
6. **Upload Coverage Reports**: Uploads to Codecov (optional)
7. **Upload Coverage Summary**: Creates an artifact for 7-day retention

**Success Criteria**: Coverage report generated successfully

**Artifact**: `coverage-report` - Contains full coverage reports for review

**Purpose in Pipeline**: Provides detailed coverage metrics for code quality monitoring.

---

### 5. Build Check (build)

**Purpose**: Verify production build works correctly

**Runs on**: `ubuntu-latest`

**Timeout**: 10 minutes

**Dependencies**: `lint`, `test`

**Steps**:

1. **Checkout Code**: Pulls the latest code
2. **Setup Node.js**: Installs Node.js 20.x
3. **Install Dependencies**: Runs `npm ci`
4. **Build Project**: Executes `npm run build` to create production bundle
5. **Preview Build**: Runs `npm run preview` to verify build works
6. **Upload Build Artifacts**: Stores production build as an artifact

**Success Criteria**: Build completes without errors and preview works

**Artifact**: `production-build` - Contains the built application for deployment

**Purpose in Pipeline**: Ensures the application can be built for production without issues.

---

### 6. Security Audit (security-scan)

**Purpose**: Scan for security vulnerabilities in dependencies

**Runs on**: `ubuntu-latest`

**Timeout**: 5 minutes

**Dependencies**: `test`

**Steps**:

1. **Checkout Code**: Pulls the latest code
2. **Setup Node.js**: Installs Node.js 20.x
3. **Install Dependencies**: Runs `npm ci`
4. **Run npm audit (High)**: Checks for high-severity vulnerabilities
5. **Run npm audit (Moderate)**: Checks for moderate-severity vulnerabilities
6. **Run npm audit (Low)**: Checks for low-severity vulnerabilities

**Success Criteria**: No critical/high-severity vulnerabilities

**Output**: Audit reports generated for each severity level (non-blocking)

**Purpose in Pipeline**: Proactively identifies security vulnerabilities before deployment.

---

### 7. Deploy to Preview (deploy)

**Purpose**: Deploy application to Vercel preview environment

**Runs on**: `ubuntu-latest`

**Timeout**: 10 minutes

**Dependencies**: `build`

**Trigger**: Only runs on pull requests

**Steps**:

1. **Deploy to Vercel**: Uses `amondnet/vercel-action@v25` to deploy
   - **Vercel Token**: From `VERCEL_TOKEN` secret
   - **Organization ID**: From `ORG_ID` secret
   - **Project ID**: From `PROJECT_ID` secret
   - **Args**: `--prod` for production deployment

**Success Criteria**: Deployment completes successfully

**Purpose in Pipeline**: Provides automatic preview deployments for pull requests.

**Note**: This job does NOT run on pushes to branches (only on PRs).

---

### 8. Docker Build & Test (docker-build)

**Purpose**: Build and test Docker image for containerized deployment

**Runs on**: `ubuntu-latest`

**Timeout**: 15 minutes

**Dependencies**: `build`, `test`

**Trigger**: Only runs on branches (not on PRs)

**Steps**:

1. **Checkout Code**: Pulls the latest code
2. **Set up Docker Buildx**: Enables Docker Buildx for advanced build features
3. **Log in to Docker Hub**: Authenticate with Docker Hub (if not a PR)
4. **Extract Metadata**: Generate Docker image tags based on branch/commit
5. **Build Docker Image**: Creates `swift-template-gallery:<sha>` image
6. **Run Container & Verify**: Test container runs and responds on port 3000
7. **Run Tests in Docker**: Execute tests inside the container
8. **Upload Docker Artifacts**: Store image for 7 days (if not a PR)
9. **Build and Push to Docker Hub**: Push images to registry (if not a PR)

**Docker Tags Generated**:

```
swift-template-gallery:<sha>              # Git SHA
swift-template-gallery:latest             # Always latest
swift-template-gallery:<branch-name>      # Branch name
swift-template-gallery:<version>          # Semantic version (if applicable)
swift-template-gallery:<major>.<minor>     # Major.Minor version (if applicable)
```

**Success Criteria**: Docker image builds and tests pass

**Artifacts**: `docker-image-<sha>` - Contains the built Docker image

**Purpose in Pipeline**: Enables containerized deployment and Docker Hub publishing.

---

## Pipeline Flow

### Standard Workflow (Push to Branch)

```
push to main/feature/update/*
├── typecheck (5 min)
├── lint (5 min) ──► if success
│   └── test (10 min) ──► if success
│       ├── coverage-report (10 min)
│       ├── build (10 min) ──► if success
│       │   ├── security-scan (5 min)
│       │   ├── deploy (10 min) - only if PR
│       │   └── docker-build (15 min) - only if branch
│       └── if success
│           └── if PR
│               └── deploy (10 min)
│           └── if branch
│               └── docker-build (15 min)
```

### Pull Request Workflow

```
pull_request to main
├── typecheck (5 min)
├── lint (5 min) ──► if success
│   └── test (10 min) ──► if success
│       ├── coverage-report (10 min)
│       └── build (10 min) ──► if success
│           ├── security-scan (5 min)
│           └── deploy (10 min)
│           └── docker-build (does NOT run on PR)
```

## Testing Strategy

### Test Execution

```bash
npm run test:ci
```

**Options**:

- `--ci`: CI mode (no watch, parallel execution)
- `--coverage`: Generate coverage report
- `--maxWorkers=2`: Limit to 2 parallel workers

### Expected Test Results

```
Test Suites: 17 passed
Tests:       162 passed, 1 skipped
Coverage:    100% for critical paths
```

### Coverage Report

Coverage is automatically uploaded to Codecov. The coverage report is also stored as an artifact for 7 days.

## Security Practices

### Dependency Scanning

The pipeline performs vulnerability scanning at three levels:

1. **High Severity**: Immediately fails the build
2. **Moderate Severity**: Warns and requires manual review
3. **Low Severity**: Warns but doesn't block deployment

### Security Checks

- **npm audit**: Automated vulnerability scanning
- **Security Context**: Runs as non-root user in containers
- **Secrets Management**: All secrets stored in GitHub Secrets
- **Build Isolation**: Each job runs in a clean environment

## Deployment Strategy

### Vercel Deployment

**When**: Pull requests targeting `main`

**Trigger**: Automatically on PR creation/update

**Environment**: Preview environment

**Steps**:

1. Build application
2. Deploy to Vercel preview URL
3. Test URL availability

### Docker Deployment

**When**: Pushes to branches (excluding PRs)

**Trigger**: Automatically on push

**Target**: Docker Hub registry

**Tags**:

- `latest` - Always points to latest commit
- `<branch-name>` - Points to branch-specific version
- `<sha>` - Git commit SHA
- `<version>` - Semantic version

## Monitoring and Logs

### Viewing Logs

1. Go to GitHub Actions tab in repository
2. Select the workflow run
3. Click on individual job logs

### Common Issues

#### Type Check Failures

**Symptom**: TypeScript compilation errors

**Solution**:

```bash
npm run typecheck
# Fix errors and commit
```

#### Lint Failures

**Symptom**: ESLint or Prettier errors

**Solution**:

```bash
npm run lint:fix
npm run format
```

#### Test Failures

**Symptom**: Tests not passing

**Solution**:

```bash
npm test
# Review failing tests and fix
```

#### Docker Build Failures

**Symptom**: Docker image won't build

**Solution**:

```bash
docker-compose down -v
docker-compose build --no-cache
```

## Optimizations

### Caching

- **Node.js**: Cache `node_modules` for faster installation
- **Docker Layers**: Utilize Docker BuildKit layer caching

### Parallel Execution

- Jobs run in parallel where dependencies allow
- Reduces total pipeline time

### Timeouts

- Each job has appropriate timeout to prevent hanging
- Type check: 5 min, Lint: 5 min, Test: 10 min, Build: 10 min, Docker: 15 min

## Customization

### Adding New Jobs

To add a new job:

1. Add to `.github/workflows/ci.yml`
2. Define dependencies in `needs` field
3. Follow existing job structure

### Modifying Triggers

Edit the `on:` section to change trigger behavior:

```yaml
on:
  push:
    branches: [main, feature/*, update/*]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0' # Weekly
  workflow_dispatch: # Manual trigger
```

### Changing Node Version

Edit the `env.NODE_VERSION` variable:

```yaml
env:
  NODE_VERSION: '20'
```

## Best Practices

1. **Pre-commit Checks**: Use Husky to run checks before committing
2. **Small Commits**: Make smaller, focused commits for better troubleshooting
3. **Test Coverage**: Maintain high test coverage (target: 100% for critical paths)
4. **Security First**: Address vulnerabilities immediately when found
5. **Documentation**: Keep CI/CD documentation updated with changes

## Troubleshooting

### Pipeline Not Running

**Check**:

- Branch is in trigger list
- Pull request targets main branch
- Workflow file is in `.github/workflows/` directory

### Job Failing After Fix

**Check**:

- Fresh clone of repository
- Clear caches (`npm ci` and `docker-compose down -v`)
- Verify all secrets are configured

### Deploy Fails

**Check**:

- Vercel token is valid
- Organization ID and project ID are correct
- Build completes successfully before deployment

## Support

For issues or questions about the CI/CD pipeline:

1. Check this documentation
2. Review GitHub Actions logs
3. Open an issue in the repository
