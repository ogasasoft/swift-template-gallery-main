# Deployment Guide

This guide covers the deployment process for Swift Template Gallery.

## Overview

Swift Template Gallery is deployed to **AWS ECS (Elastic Container Service)** with automatic CI/CD integration.

## Prerequisites

### AWS Requirements

- AWS Account with ECS, ECR, and IAM access
- Existing ECS cluster
- ECS service configured
- ECS task definition created
- Docker registry (ECR) configured
- IAM credentials with necessary permissions

### Local Requirements

- Docker installed
- AWS CLI configured
- Node.js 20+ installed

## Deployment Architecture

```
┌─────────────┐
│ GitHub Push │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│ CI/CD Pipeline       │
│  - Security Scan     │
│  - Build            │
│  - Test             │
│  - Deploy to ECS    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ AWS ECR              │
│ (Docker Registry)    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ AWS ECS              │
│ (Container Service)  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Production App       │
│ (Swift Template      │
│  Gallery)            │
└──────────────────────┘
```

## Step-by-Step Deployment

### 1. Prepare Environment

#### AWS Credentials

Set up AWS credentials locally:

```bash
aws configure
```

Enter your:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., us-east-1)
- Default output format (json)

#### Verify AWS CLI

```bash
# Check credentials
aws sts get-caller-identity

# List ECR repositories
aws ecr list-repositories
```

### 2. Configure GitHub Secrets

Go to repository Settings → Secrets and variables → Actions → New repository secret

Required secrets:
```
AWS_ACCOUNT_ID      - Your AWS account ID
AWS_ACCESS_KEY_ID   - IAM access key
AWS_SECRET_ACCESS_KEY - IAM secret key
AWS_REGION          - AWS region (e.g., us-east-1)
ECS_CLUSTER         - ECS cluster name
ECS_SERVICE         - ECS service name
ECS_TASK_DEFINITION - ECS task definition name
```

### 3. Build and Test Locally

Before pushing, ensure everything works locally:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint

# Build
npm run build

# Docker build
docker build -t swift-template-gallery:latest .
```

### 4. Push to Main Branch

```bash
git add .
git commit -m "feat: new feature"
git push origin main
```

### 5. Monitor CI/CD Pipeline

#### View Pipeline Progress

1. Go to GitHub repository → Actions tab
2. Click on the running workflow
3. Watch each job complete:
   - Security Scan → Build → Deploy

#### Check Build Status

Green checkmark = Success
Yellow dot = Warning
Red X = Failure

### 6. Verify Deployment

#### Check ECS Service Status

```bash
# List services in cluster
aws ecs describe-services \
  --cluster <cluster-name> \
  --services <service-name> \
  --region <region>

# Check deployment status
aws ecs describe-services \
  --cluster <cluster-name> \
  --services <service-name> \
  --query 'services[0].deployments[0].status' \
  --output text
```

Expected status: `PRIMARY`

#### View ECS Task Logs

1. Go to AWS ECS Console
2. Select your cluster and service
3. Click on the latest task
4. View CloudWatch logs

#### Check Application Health

Access your application URL and verify:
- Homepage loads
- Templates are visible
- Search works
- Dark mode toggle works

## Manual Deployment

If you need to deploy manually (without pushing):

### Option 1: Manual Workflow Dispatch

1. Go to GitHub repository → Actions
2. Select "Build and Deploy" workflow
3. Click "Run workflow"
4. Select branch: `main`
5. Click "Run workflow" button

### Option 2: AWS CLI Deployment

```bash
# Build and tag Docker image
docker build -t swift-template-gallery:latest .
docker tag swift-template-gallery:latest \
  <account-id>.dkr.ecr.<region>.amazonaws.com/swift-template-gallery:latest

# Login to ECR
aws ecr get-login-password --region <region> | \
  docker login --username AWS --password-stdin \
  <account-id>.dkr.ecr.<region>.amazonaws.com

# Push to ECR
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/swift-template-gallery:latest

# Deploy to ECS
aws ecs update-service \
  --cluster <cluster-name> \
  --service <service-name> \
  --force-new-deployment \
  --region <region>

# Wait for deployment
aws ecs wait services-stable \
  --cluster <cluster-name> \
  --service <service-name> \
  --region <region>

# Verify deployment
aws ecs describe-services \
  --cluster <cluster-name> \
  --services <service-name> \
  --region <region> \
  --query 'services[0].deployments[0].status' \
  --output text
```

## Rollback Procedure

### Automated Rollback

If deployment fails, GitHub Actions will exit with an error. You can manually trigger a rollback:

1. Go to the failed workflow run
2. Check the failed deployment
3. Redeploy previous version:
   ```bash
   # Force new deployment (redeploys current version)
   aws ecs update-service \
     --cluster <cluster-name> \
     --service <service-name> \
     --force-new-deployment \
     --region <region>
   ```

### Manual Rollback Steps

1. Go to AWS ECS Console
2. Select your cluster and service
3. Click "Deployments" tab
4. Find the failed deployment
5. Create a rollback deployment:
   - Click "Create rollback deployment"
   - Select previous task definition
   - Click "Deploy"

### Redeploy Latest Working Version

If you know the last successful version:

1. List task definitions:
   ```bash
   aws ecs list-task-definitions \
     --family-prefix swift-template-gallery \
     --region <region>
   ```

2. Redeploy specific task definition:
   ```bash
   aws ecs update-service \
     --cluster <cluster-name> \
     --service <service-name> \
     --task-definition <task-definition-arn> \
     --region <region>
   ```

## Monitoring

### ECS Health Checks

```bash
# Check service status
aws ecs describe-services \
  --cluster <cluster-name> \
  --services <service-name> \
  --region <region>

# Check task health
aws ecs describe-tasks \
  --cluster <cluster-name> \
  --tasks <task-id> \
  --region <region>
```

### CloudWatch Metrics

Monitor in AWS CloudWatch:

- **CPUUtilization** - ECS task CPU usage
- **MemoryUtilization** - ECS task memory usage
- **NetworkIn/NetworkOut** - Network traffic
- **StatusCheckFailed** - Health check failures

### Application Logs

Logs are streamed to CloudWatch. View them:

1. Go to AWS CloudWatch Console
2. Navigate to Logs → Log Groups
3. Find: `/ecs/swift-template-gallery`
4. Select the latest log stream

### Health Endpoints

The application exposes health checks at:
- `/health` - Application health endpoint

## Troubleshooting

### Build Fails

**Problem:** CI/CD build fails during Docker image creation

**Solution:**
1. Check build logs in GitHub Actions
2. Verify Dockerfile syntax
3. Test locally: `docker build -t test .`
4. Check for file permission issues

### Deployment Fails

**Problem:** ECS deployment fails

**Solution:**
1. Check deployment status: `aws ecs describe-services`
2. Review task definition in ECS console
3. Check CloudWatch logs for errors
4. Verify task definition exists and is published
5. Check ECS service configuration

### Image Push Fails

**Problem:** Cannot push Docker image to ECR

**Solution:**
1. Verify ECR repository exists
2. Check AWS credentials are correct
3. Verify IAM permissions:
   ```bash
   aws ecr get-login-password --region <region>
   ```
4. Check if repository is private/public correctly

### Service Not Stable

**Problem:** Service stuck in PENDING or STABILIZING state

**Solution:**
1. Check task logs for errors
2. Verify database connectivity
3. Check if all required environment variables are set
4. Review ECS service health checks
5. Wait longer (can take several minutes)

### Application Errors

**Problem:** Application returns 500 errors after deployment

**Solution:**
1. Check CloudWatch logs for application errors
2. Verify Node.js environment variables
3. Check database connection
4. Verify file permissions
5. Review recent code changes

## Environment Variables

Configure environment variables in ECS task definition:

### Required Variables

```env
NODE_ENV=production
VITE_DEV_SERVER=false
```

### Optional Variables

```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

**Note:** Add secrets to AWS Secrets Manager, not as plain text in task definition.

## Performance Tuning

### ECS Task Configuration

Adjust based on load:

```bash
# Update service with new task count
aws ecs update-service \
  --cluster <cluster-name> \
  --service <service-name> \
  --desired-count 3 \
  --region <region>

# Update task memory
aws ecs register-task-definition \
  --family swift-template-gallery \
  --cpu "512" \
  --memory "1024" \
  --region <region>
```

### Auto Scaling

Configure ECS Auto Scaling:

1. Go to ECS Console
2. Select service → Auto Scaling
3. Configure scaling policy:
   - Target tracking
   - Step scaling
   - Scheduled scaling

## Backup and Recovery

### Create ECS Task Definition Snapshot

```bash
aws ecs describe-task-definition \
  --task-definition <task-definition-name> \
  --region <region> > task-definition-backup.json
```

### Restore Task Definition

```bash
# Extract ARN from backup
TASK_DEF_ARN=$(jq -r '.taskDefinition.taskDefinitionArn' task-definition-backup.json)

# Register as new task definition
aws ecs register-task-definition \
  --cli-input-json file://task-definition-backup.json \
  --region <region>
```

## Security Best Practices

1. **Use IAM roles for services**
2. **Encrypt data at rest**
3. **Use managed policies**
4. **Rotate credentials regularly**
5. **Enable CloudTrail logging**
6. **Review security groups**
7. **Keep ECS agent updated**

## Additional Resources

- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [AWS ECR Documentation](https://docs.aws.amazon.com/AmazonECR/)
- [GitHub Actions for AWS](https://docs.github.com/en/actions/deployment/targeting-docker-registries-with-github-actions)
- [Docker Documentation](https://docs.docker.com/)

## Support

For deployment issues:
1. Check this guide
2. Review GitHub Actions logs
3. Check AWS CloudWatch logs
4. Open an issue with:
   - Deployment step
   - Error messages
   - Environment details
   - AWS configuration
