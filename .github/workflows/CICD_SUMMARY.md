# CI/CD Pipeline Summary

This document provides an overview of the CI/CD pipeline for Swift Template Gallery.

## Pipeline Overview

The project uses a comprehensive CI/CD pipeline with the following workflows:

1. **Build and Deploy** - Builds, tests, and deploys to AWS ECS
2. **Security Audit** - Daily security scans and vulnerability checks
3. **CI/CD Shared** - Shared configuration for multiple projects

## Build and Deploy Workflow

### Triggers

- Push to `main` branch
- Push to version tags (`v*.*.*`)
- Pull requests to `main`
- Manual workflow dispatch

### Job Stages

#### 1. Security Scan (`security-scan`)
- Runs `npm audit` with moderate severity level
- Runs `npm outdated` to check for outdated packages
- Runs on every push and PR
- Non-blocking (uses `|| true`)

#### 2. Build (`build`)
**Depends on:** Security Scan

**Steps:**
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (cached)
4. Type checking (`npm run typecheck`)
5. Linting (`npm run lint`)
6. Tests (`npm test -- --passWithNoTests`)
7. Build production bundle
8. Build Docker image with multiple tags
9. Push to ECR (if main branch)
10. Save Docker artifact (if PR)

**Docker Image Tags:**
- `swift-template-gallery:${{ github.sha }}` - Full commit SHA
- `swift-template-gallery:latest` - Latest version
- `swift-template-gallery:${{ github.ref_name }}` - Branch/tag name

#### 3. Deploy (`deploy`)
**Depends on:** Build
**Only runs on:** Push to main branch

**Steps:**
1. Download Docker artifact
2. Load Docker image
3. Configure AWS credentials
4. Login to ECR
5. Deploy to ECS with force-new-deployment
6. Wait for deployment to complete
7. Verify deployment status (must be PRIMARY)
8. Notify deployment result

### Required Secrets

```
AWS_ACCOUNT_ID      - AWS Account ID
AWS_ACCESS_KEY_ID   - AWS Access Key
AWS_SECRET_ACCESS_KEY - AWS Secret Key
AWS_REGION          - AWS Region (e.g., us-east-1)
ECS_CLUSTER         - ECS Cluster Name
ECS_SERVICE         - ECS Service Name
ECS_TASK_DEFINITION - ECS Task Definition Name
```

### Deployment Verification

The deployment step includes comprehensive verification:

1. **Service Update** - Forces new deployment to ECS
2. **Wait for Stability** - Waits until service is stable
3. **Status Check** - Verifies deployment status is PRIMARY
4. **Failure Handling** - Exits with error if not PRIMARY

## Security Audit Workflow

### Triggers

- Push to `main` and `develop` branches
- Pull requests to `main` and `develop`
- Daily schedule (2 AM UTC)
- Manual workflow dispatch

### Jobs

#### npm-audit
- Runs `npm audit --audit-level=moderate`
- Generates warnings for high-severity vulnerabilities
- Continues execution on failure

#### npm-outdated
- Checks for outdated packages
- Generates JSON report
- Uploads report as artifact (7-day retention)

#### snyk
- Runs Snyk security scan
- Requires `SNYK_TOKEN` secret
- Checks for high-severity vulnerabilities
- Continues on error (for security token issues)

#### pre-commit-security
- Checks for dangerous files in commit
- Warns if `.env.local` or `.env.development` found
- Should be committed to `.gitignore`

### Required Secrets

```
SNYK_TOKEN  - Snyk API token (optional)
```

## Local Development & Testing

### Run Full Pipeline Locally

```bash
# Clone and install
git clone <repo>
cd swift-template-gallery
npm install

# Run all checks (equivalent to CI)
npm run typecheck  # TypeScript
npm run lint       # ESLint
npm test           # Tests
npm run build      # Production build

# Build Docker image
docker build -t swift-template-gallery:latest .

# Run with Docker Compose
docker-compose up --build
```

### Verify CI/CD Before Pushing

1. **Run tests locally**
   ```bash
   npm test
   ```

2. **Type check**
   ```bash
   npm run typecheck
   ```

3. **Lint**
   ```bash
   npm run lint
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Docker build**
   ```bash
   docker build -t swift-template-gallery:latest .
   ```

6. **Test Docker image**
   ```bash
   docker run -p 3000:3000 swift-template-gallery:latest
   ```

## Monitoring & Alerts

### CI/CD Status

- View workflows on GitHub Actions tab
- Build status indicated by:
  - ✅ Green checkmark = Success
  - 🟡 Yellow dot = Warning
  - ❌ Red X = Failure

### Deployment Status

- Check ECS service status:
  ```bash
  aws ecs describe-services \
    --cluster <cluster-name> \
    --service <service-name>
  ```

- View ECS deployment logs in AWS Console

## Troubleshooting

### Build Fails

1. **Check test failures**
   ```bash
   npm test -- --verbose
   ```

2. **TypeScript errors**
   ```bash
   npm run typecheck
   ```

3. **Lint errors**
   ```bash
   npm run lint
   ```

4. **Docker build errors**
   ```bash
   docker build --no-cache -t swift-template-gallery:test .
   ```

### Deployment Fails

1. **Check AWS credentials**
   - Verify secrets are set in repository settings

2. **ECS task definition**
   - Verify task definition name matches
   - Check task definition is published

3. **Service health**
   - Check ECS service status
   - Review task logs

4. **Manual trigger**
   - Try manual workflow dispatch with detailed logs

### Security Alerts

1. **npm audit warnings**
   - Review vulnerabilities
   - Consider upgrading dependencies
   - Update package.json

2. **Snyk findings**
   - Review Snyk report
   - Apply security patches
   - Update dependencies

## Best Practices

### Before Pushing to Main

1. ✅ Run all tests locally
2. ✅ Check TypeScript compilation
3. ✅ Verify ESLint passes
4. ✅ Test build locally
5. ✅ Docker build succeeds
6. ✅ Review code changes
7. ✅ Update documentation if needed

### Code Review Checklist

- [ ] Tests pass locally
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Build succeeds
- [ ] Docker image builds
- [ ] No security vulnerabilities (moderate or higher)
- [ ] Code follows project style
- [ ] Documentation updated if needed
- [ ] Comments explain complex logic

### Commit Message Style

Use conventional commits:
```
feat: add new feature
fix: fix bug in authentication
docs: update documentation
style: format code
refactor: improve code structure
test: add tests for X
chore: update dependencies
```

## Future Improvements

- [ ] Add integration tests
- [ ] Implement blue-green deployment
- [ ] Add staging environment
- [ ] Configure automated rollback on failure
- [ ] Add performance monitoring
- [ ] Implement feature flags
- [ ] Add automated database migrations
- [ ] Set up change request approval workflow

## Support

For CI/CD issues:
1. Check GitHub Actions logs
2. Review this document
3. Check DOCKER.md for Docker-related issues
4. Check SECURITY.md for security-related issues
5. Open an issue with:
   - Workflow name
   - Error messages
   - Steps that failed
   - Environment details
