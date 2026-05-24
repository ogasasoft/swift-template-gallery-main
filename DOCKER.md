# Docker Documentation

This project uses modern Docker practices with multi-stage builds, non-root users, and production-ready configurations.

## Quick Start

### Using Docker Compose (Development)

```bash
# Build and start in development mode
docker-compose up --build

# Run tests inside container
docker-compose exec app npm test

# Stop services
docker-compose down
```

### Using Docker Compose (Production)

```bash
# Build production image
docker-compose -f docker-compose.production.yml build

# Start production services
docker-compose -f docker-compose.production.yml up -d

# Check logs
docker-compose -f docker-compose.production.yml logs -f
```

### Using Docker CLI

```bash
# Build image
docker build -t swift-template-gallery:latest .

# Run container
docker run -p 3000:3000 swift-template-gallery:latest

# Run with environment variables
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=your_database_url \
  swift-template-gallery:latest
```

## Docker Configuration

### Multi-Stage Build

The Dockerfile uses a multi-stage build for optimized production images:

1. **Builder Stage**: Compiles the application and installs dependencies
2. **Runner Stage**: Runs the production application with a non-root user

### Security Features

- **Non-root User**: Runs as `nextjs` user (UID 1001) for security
- **Health Checks**: Built-in health checks for monitoring
- **Minimal Dependencies**: Only production dependencies included in final image

## Environment Variables

Required environment variables:

```env
NODE_ENV=production
VITE_DEV_SERVER=false
DATABASE_URL=your_database_connection_string
# Optional
REDIS_URL=your_redis_connection_string
```

## Health Checks

The container includes health checks:

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' swift-template-gallery

# View health logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' swift-template-gallery
```

## Production Deployment

### AWS ECS Deployment

1. **Build and Push to ECR**:
   ```bash
   # Login to AWS ECR
   aws ecr get-login-password --region us-east-1 | \
     docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

   # Build image
   docker build -t swift-template-gallery:latest .

   # Tag and push
   docker tag swift-template-gallery:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/swift-template-gallery:latest
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/swift-template-gallery:latest
   ```

2. **Deploy to ECS**:
   ```bash
   # Update ECS service
   aws ecs update-service \
     --cluster my-cluster \
     --service my-service \
     --force-new-deployment
   ```

### Using Docker Compose for Production

```bash
# Update environment variables
docker-compose -f docker-compose.production.yml config > .env.production

# Start services
docker-compose -f docker-compose.production.yml up -d

# View logs
docker-compose -f docker-compose.production.yml logs -f --tail=100

# Scale services
docker-compose -f docker-compose.production.yml up -d --scale app=3
```

## Development Tips

### Mount Source Code

```bash
docker-compose up --build
# Access source code from host at /app in container
```

### Run Tests

```bash
# Run all tests
docker-compose exec app npm test

# Run tests with coverage
docker-compose exec app npm test -- --coverage

# Run specific test
docker-compose exec app npm test -- --testPathPattern=api.test.ts
```

### Debugging

```bash
# Enter running container
docker-compose exec app sh

# View logs
docker-compose logs -f app

# View system stats
docker stats swift-template-gallery-dev
```

## Troubleshooting

### Port Already in Use

```bash
# Kill processes using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
docker run -p 8080:3000 swift-template-gallery:latest
```

### Container Won't Start

```bash
# Check logs
docker logs swift-template-gallery-dev

# Check container status
docker ps -a | grep swift-template-gallery

# Inspect container
docker inspect swift-template-gallery-dev
```

### Database Connection Issues

```bash
# Ensure database is running
docker-compose ps

# Check database logs
docker-compose logs database
```

### Build Failures

```bash
# Clear Docker cache
docker builder prune -af

# Rebuild without cache
docker-compose build --no-cache

# Check Dockerfile syntax
docker build -t swift-template-gallery:test .
```

## Performance Optimization

### Build Cache

The Dockerfile uses Docker layer caching. Changes to `package.json` will reset the cache.

### Production Image Size

Optimized to be as small as possible:

- Base image: `node:20-alpine` (lightweight)
- Production dependencies only
- Multi-stage build eliminates build artifacts

## Monitoring

### Container Metrics

```bash
# CPU and memory usage
docker stats swift-template-gallery-dev

# Disk usage
docker system df

# Image sizes
docker images | grep swift-template-gallery
```

### Logs

```bash
# Real-time logs
docker-compose logs -f app

# Last 100 lines
docker-compose logs --tail=100 app

# Logs with timestamps
docker-compose logs -t app
```

## Backup and Restore

### Backup Container

```bash
docker commit swift-template-gallery-dev swift-template-gallery-backup
```

### Export Image

```bash
docker save swift-template-gallery:latest | gzip > swift-template-gallery-backup.tar.gz
```

### Import Image

```bash
docker load < swift-template-gallery-backup.tar.gz
```

## Security Best Practices

1. **Never commit Dockerfiles with secrets**
2. **Use non-root users** (already implemented)
3. **Keep images updated** with security patches
4. **Use .dockerignore** to exclude unnecessary files
5. **Scan images for vulnerabilities** before deployment
