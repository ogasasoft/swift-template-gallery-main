# CI/CD Documentation

This document describes the continuous integration and continuous deployment (CI/CD) pipeline for the Swift Template Gallery project.

## Overview

The CI/CD pipeline automates the following processes:

- Code quality checks (TypeScript, ESLint)
- Test execution with coverage reporting
- Security scanning
- Production builds
- Docker containerization
- Automated deployments (when configured)

## Workflow Triggers

### CI/CD Pipeline (.github/workflows/ci.yml)

Runs on:

- Push to `main`, `feature/*`, `update/*`, or `fix/*` branches
- Pull requests targeting `main`
- Manual workflow dispatch

**Environment:**

- Node.js: 20.x
- Timeout: 10 minutes for full pipeline

### Build and Deploy Pipeline (.github/workflows/build-and-deploy.yml)

Runs on:

- Push to `main` branch only
- Manual workflow dispatch (with test-only option)

**Environment:**

- Node.js: 20.x
- Docker: 20-alpine images
- AWS: ECR and ECS (when configured)

## Pipeline Stages

### 1. Type Check

**Purpose**: Ensure TypeScript code is type-safe.

**Command**: `npm run typecheck`

**Requirements**:

- Must pass before proceeding to next stages
- 0 TypeScript errors allowed

**Timeout**: 5 minutes

### 2. Lint Check

**Purpose**: Enforce code style and catch potential bugs.

**Commands**:

- `npm run lint` - ESLint validation
- `npm run format:check` - Prettier formatting check

**Requirements**:

- Must pass before proceeding to test stage
- Failures indicate style or formatting issues

**Timeout**: 5 minutes

### 3. Tests

**Purpose**: Run comprehensive test suite with coverage reporting.

**Commands**:

- `npm run test:ci` - CI mode execution (maxWorkers=2)

**Coverage**:

- Coverage reports uploaded to Codecov
- Flags: `unittests`
- Fail CI on coverage threshold breaches (when configured)

**Requirements**:

- Must pass before build stage
- 162 tests expected (100% critical path coverage)

**Timeout**: 10 minutes

### 4. Build Check

**Purpose**: Verify production build works correctly.

**Commands**:

- `npm run build` - Create optimized production bundle

**Outputs**:

- Production build in `dist/` directory
- Artifacts uploaded for inspection

**Requirements**:

- Must pass before deployment
- Zero build errors or warnings

**Timeout**: 10 minutes

### 5. Security Audit

**Purpose**: Identify and report security vulnerabilities.

**Commands**:

- `npm audit --audit-level=moderate`
- `npm audit --audit-level=high`

**Requirements**:

- Must pass before deployment
- Critical/high severity vulnerabilities require immediate attention

**Timeout**: 5 minutes

### 6. Docker Build (Production)

**Purpose**: Create production-ready Docker image.

**Process**:

1. Multi-stage build (builder + runner)
2. Optimized layers
3. Production dependencies only

**Output**:

- Docker image saved as artifact (7-day retention)

**Timeout**: 10 minutes

### 7. Deploy (Production Only)

**Purpose**: Deploy to Amazon ECS.

**Conditions**:

- Must be on `main` branch
- Must be a push event (not PR)
- Requires AWS credentials configured

**Process**:

1. Load saved Docker image
2. Tag with commit SHA
3. Push to Amazon ECR
4. Update ECS service with force-new-deployment

**Timeout**: 10 minutes

## Branch Protection Rules

### Main Branch

To protect the `main` branch:

- Require pull request reviews
- Require status checks to pass before merging
- Enforce branch protection rules

### Status Checks Required

Before merging to `main`:

- ✅ Type check must pass
- ✅ Lint must pass
- ✅ All tests must pass
- ✅ Build must succeed
- ✅ Security audit must pass (no critical/high vulnerabilities)

## Environment Variables

### CI/CD Pipeline (.github/workflows/ci.yml)

No secrets required for basic CI checks.

### Build and Deploy Pipeline (.github/workflows/build-and-deploy.yml)

Required secrets:

- `AWS_ACCESS_KEY_ID` - AWS access key for ECR
- `AWS_SECRET_ACCESS_KEY` - AWS secret access key
- `AWS_REGION` - AWS region (e.g., `us-east-1`)
- `ECS_CLUSTER` - ECS cluster name
- `ECS_SERVICE` - ECS service name

Optional secrets:

- `VERCEL_TOKEN` - Vercel deployment token (for preview deployments)
- `ORG_ID` - Vercel organization ID
- `PROJECT_ID` - Vercel project ID

## Local Testing

Before pushing changes, ensure all checks pass locally:

```bash
# 1. Type check
npm run typecheck

# 2. Lint
npm run lint

# 3. Format check
npm run format:check

# 4. Run tests
npm test

# 5. Build
npm run build
```

All commands should complete with exit code 0.

## Troubleshooting

### Type Check Failures

**Error**: TypeScript type errors detected

**Solution**:

```bash
npm run typecheck
# Fix errors shown in output
# Re-run typecheck until 0 errors
```

### Lint Failures

**Error**: ESLint violations detected

**Solution**:

```bash
npm run lint:fix
# Auto-fix fixable issues
# Review and fix remaining issues manually
npm run lint
# Ensure 0 errors
```

### Test Failures

**Error**: One or more tests failed

**Solution**:

1. Run tests in watch mode to understand failures:
   ```bash
   npm test -- --watch
   ```
2. Fix failing tests
3. Re-run full test suite:
   ```bash
   npm test
   ```

### Build Failures

**Error**: Production build fails

**Solution**:

1. Check build output for errors
2. Ensure all tests pass (build runs after tests)
3. Verify all dependencies are installed:
   ```bash
   rm package-lock.json
   npm install
   npm run build
   ```

### Security Vulnerabilities

**Error**: Security audit reports vulnerabilities

**Solution**:

1. Review vulnerability details:
   ```bash
   npm audit
   ```
2. Update vulnerable packages:
   ```bash
   npm audit fix
   ```
3. If vulnerabilities persist, update manually in `package.json`
4. Commit and push changes

## Deployment Process

### Manual Deployment

1. Go to GitHub Actions
2. Select "Build and Deploy" workflow
3. Click "Run workflow"
4. Choose branch (usually `main`)
5. Review or skip the "test-only" input
6. Click "Run workflow" button

### Automated Deployment

When pushing to `main`:

1. CI pipeline runs (checks + tests)
2. Build pipeline runs (Docker + deploy)
3. If all stages pass, deployment is automatic
4. Check Actions tab for deployment status

### Rollback Procedure

If deployment fails:

1. Check Actions logs for error details
2. Revert to previous commit:
   ```bash
   git revert <commit-sha>
   git push origin main
   ```
3. New deployment will use reverted version

## Performance Metrics

### Pipeline Duration

- Type check: ~2 minutes
- Lint: ~1 minute
- Tests: ~5 minutes
- Build: ~5 minutes
- Security scan: ~2 minutes
- Docker build: ~10 minutes
- Deploy: ~5 minutes

**Total**: ~30 minutes (full pipeline)

### Optimizations

- Node.js caching enabled (actions/setup-node)
- npm ci for clean installs
- Parallel job execution where possible
- Docker multi-stage builds

## Best Practices

### Before Committing

1. ✅ Run all quality checks locally
2. ✅ Ensure all tests pass
3. ✅ Commit with conventional commit message
4. ✅ Push to feature branch

### Before Merging to Main

1. ✅ Open pull request
2. ✅ Address all review comments
3. ✅ Ensure CI pipeline passes
4. ✅ Merge after approval

### During Development

1. ✅ Keep PRs focused and small
2. ✅ Update tests for new features
3. ✅ Run tests frequently (watch mode)
4. ✅ Document breaking changes

## Maintenance

### Workflow Updates

When updating workflows:

1. Test changes in a feature branch
2. Run full pipeline to verify
3. Create pull request for review
4. Merge to main after approval

### Dependency Updates

To update dependencies:

1. Check for breaking changes in changelog
2. Update in `package.json`
3. Run `npm ci`
4. Run all quality checks
5. Test thoroughly
6. Commit and push

### Secrets Management

- Never commit secrets to repository
- Use GitHub Secrets for sensitive data
- Rotate secrets regularly
- Share secrets via PR comments if needed

## Links

- [CI/CD Pipeline](.github/workflows/ci.yml)
- [Build and Deploy Pipeline](.github/workflows/build-and-deploy.yml)
- [Project README](README.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Architecture Documentation](ARCHITECTURE.md)
