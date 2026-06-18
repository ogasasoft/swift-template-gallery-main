# Docker Deployment Guide

This project includes Docker support for easy local development and production deployment of the Swift Template Gallery.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [How It Works](#how-it-works)
- [Development Workflow](#development-workflow)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)
- [Advanced Usage](#advanced-usage)

## Prerequisites

### System Requirements

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Disk Space**: At least 2GB for Docker images
- **RAM**: Minimum 2GB (4GB recommended for development)

### Verify Installation

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker compose version

# Test Docker installation
docker run hello-world
```

## Quick Start

### Development Mode (Recommended)

Start the application in development mode with hot-reload:

```bash
# Build and start containers
npm run docker:up

# Or explicitly
docker-compose up --build

# View logs in real-time
docker-compose logs -f
```

**Development Features**:

- Hot-reload enabled (code changes reflect automatically)
- Source code mounted for live editing
- Development server runs on http://localhost:3000

### Production Build

```bash
# Build optimized production image
npm run docker:build

# Start in production mode
npm run docker:up

# Or start with environment variables
docker-compose up -d
```

**Production Features**:

- Optimized image size
- No hot-reload
- Better performance
- No source code mounting

### Stop and Clean Up

```bash
# Stop containers
npm run docker:down

# Stop and remove volumes (destructive - data lost!)
npm run docker:clean
```

## Configuration

### Environment Variables

Create a `.env` file in the project root (optional):

```env
PORT=3000
NODE_ENV=development
```

#### Available Environment Variables

| Variable              | Default                     | Description      | Example                                       |
| --------------------- | --------------------------- | ---------------- | --------------------------------------------- |
| `PORT`                | `3000`                      | Application port | `PORT=3000`                                   |
| `NODE_ENV`            | `development`               | Node environment | `NODE_ENV=production`                         |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000/api` | API base URL     | `NEXT_PUBLIC_API_URL=https://api.example.com` |

#### Production Configuration

For production deployment, set these environment variables:

```env
NODE_ENV=production
PORT=3000
```

### Docker Compose Configuration

The `docker-compose.yml` file includes:

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
      - PORT=3000
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev
    restart: unless-stopped
```

#### Service Configuration

- **Build Context**: Current directory (`.`)
- **Port Mapping**: `3000:3000` (host:container)
- **Volumes**:
  - `.:/app` - Mount source code for development
  - `/app/node_modules` - Exclude node_modules for performance
  - `/app/.next` - Exclude Next.js build for performance
- **Restart Policy**: `unless-stopped` - Automatic restart on failure
- **Command**: Development server (`npm run dev`)

### Dockerfile (Multi-stage Build)

The project uses a multi-stage Dockerfile for optimization:

#### Stage 1: Dependencies (`deps`)

- Installs Node.js 20
- Installs production dependencies only
- Reduces final image size

#### Stage 2: Builder (`builder`)

- Installs dev dependencies
- Builds the application with Vite
- Creates production bundle

#### Stage 3: Runner (`runner`)

- Copies only necessary files from builder
- Sets up non-root user (`nextjs`)
- Runs the production server
- **Result**: Smaller, more secure final image

## How It Works

### Multi-stage Build Process

1. **Dependencies Stage**:

   ```dockerfile
   FROM node:20-alpine AS deps
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci --only=production
   ```

2. **Builder Stage**:

   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build
   ```

3. **Runner Stage**:
   ```dockerfile
   FROM node:20-alpine AS runner
   WORKDIR /app
   COPY --from=builder /app/dist ./dist
   COPY --from=builder /app/public ./public
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   RUN chown -R nextjs:nodejs /app
   USER nextjs
   ENV NODE_ENV production
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

### Volume Mounting

Development mode uses volume mounts for hot-reload:

- **Source Code**: Host directory → Container `/app`
- **node_modules**: Volume mount prevents conflicts
- **Next.js Build**: Volume mount preserves build cache

### Security Features

- **Non-root User**: Runs as `nextjs` user (UID 1001)
- **Limited Permissions**: Only necessary files copied
- **Production Environment**: No dev dependencies in final image
- **Environment Isolation**: No host file system access

### Hot-Reload Mechanism

1. Code changes detected in mounted volume
2. Vite development server detects changes
3. Browser auto-reloads with updated content
4. No container restart required

## Development Workflow

### Hot Reload

When running with volume mount, changes are reflected automatically:

```bash
# Start development server
docker-compose up

# Make code changes - they appear instantly
# Refresh browser to see updates
```

### Manual Restart

```bash
# Restart specific service
docker-compose restart app

# Restart all services
docker-compose restart

# Rebuild and restart (for config changes)
docker-compose up --build
```

### Viewing Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs app

# View last 100 lines
docker-compose logs --tail=100 app
```

### Accessing Container Shell

```bash
# Enter app container
docker-compose exec app sh

# Run npm commands inside container
docker-compose exec app npm run lint
docker-compose exec app npm test
```

### Database Migrations

```bash
# Run migrations
docker-compose exec app npm run migrate

# Run seed data
docker-compose exec app npm run seed
```

### Using Docker CLI Directly

Build the image:

```bash
docker build -t swift-template-gallery:latest .
```

Run the container:

```bash
docker run -p 3000:3000 swift-template-gallery:latest
```

Run with environment variables:

```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  swift-template-gallery:latest
```

Run with custom port:

```bash
docker run -p 8080:3000 swift-template-gallery:latest
```

## Production Deployment

### Deployment Options

#### Option 1: Docker Compose (Recommended)

```bash
# Build production image
docker-compose -f docker-compose.prod.yml build

# Start in production mode
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

#### Option 2: Docker Hub Image

```bash
# Pull latest image
docker pull yourusername/swift-template-gallery:latest

# Run container
docker run -d \
  --name swift-gallery \
  -p 3000:3000 \
  -e NODE_ENV=production \
  yourusername/swift-template-gallery:latest

# View logs
docker logs -f swift-gallery
```

#### Option 3: Container Orchestration

**Kubernetes Deployment**:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: swift-template-gallery
spec:
  replicas: 3
  selector:
    matchLabels:
      app: swift-template-gallery
  template:
    metadata:
      labels:
        app: swift-template-gallery
    spec:
      containers:
        - name: app
          image: yourusername/swift-template-gallery:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: 'production'
            - name: PORT
              value: '3000'
```

### Production Best Practices

1. **Use Environment-Specific Configurations**:

   ```bash
   # Use different docker-compose files for each environment
   docker-compose -f docker-compose.dev.yml up
   docker-compose -f docker-compose.staging.yml up
   docker-compose -f docker-compose.prod.yml up
   ```

2. **Remove Volume Mounting in Production**:

   ```yaml
   # docker-compose.prod.yml
   services:
     app:
       volumes:
         # Comment out or remove volume mounts in production
         # - .:/app
         - /app/node_modules
         - /app/.next
   ```

3. **Use Environment Variables**:

   ```yaml
   environment:
     - NODE_ENV=production
     - PORT=3000
     - NEXT_PUBLIC_API_URL=https://api.example.com
   ```

4. **Configure Reverse Proxy**:
   - **Nginx**: Serve static files, handle SSL/TLS
   - **Caddy**: Automatic HTTPS
   - **Traefik**: Modern reverse proxy with auto-configuration

5. **Set Up SSL/TLS**:

   ```nginx
   server {
       listen 443 ssl http2;
       server_name example.com;

       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Database Backup Strategy**:

   ```bash
   # Create backup
   docker exec swift-template-gallery-db pg_dump -U postgres > backup.sql

   # Restore backup
   docker exec -i swift-template-gallery-db psql -U postgres < backup.sql
   ```

7. **Monitor Logs**:
   - Use Docker logging drivers
   - Set up log aggregation (ELK, Loki)
   - Configure log rotation

8. **Set Resource Limits**:
   ```yaml
   services:
     app:
       deploy:
         resources:
           limits:
             cpus: '1'
             memory: 1G
           reservations:
             cpus: '0.5'
             memory: 512M
   ```

### Health Checks

```yaml
healthcheck:
  test: ['CMD', 'curl', '-f', 'http://localhost:3000']
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## Troubleshooting

### Port Already in Use

**Problem**: Port 3000 is already occupied

**Solution 1**: Check what's using the port:

```bash
# macOS/Linux
lsof -i :3000

# Find process and kill it
kill -9 <PID>
```

**Solution 2**: Use a different port:

```bash
# Modify docker-compose.yml
ports:
  - "8080:3000"  # Map host 8080 to container 3000

# Or override when running
docker-compose up -p 8080
```

**Solution 3**: Kill existing container:

```bash
docker-compose down
docker-compose up
```

### Build Failures

**Problem**: Docker image won't build

**Solution 1**: Clean Docker cache:

```bash
# Remove all containers, volumes, and networks
docker-compose down -v

# Remove images
docker rmi swift-template-gallery:latest

# Rebuild
docker-compose build --no-cache
```

**Solution 2**: Check Dockerfile syntax:

```bash
# Validate Dockerfile
docker build --dry-run .

# Check for errors
docker-compose build 2>&1 | grep -i error
```

**Solution 3**: Increase Docker build memory:

```bash
# In Docker Desktop settings:
# Resources -> Advanced -> Increase Memory and Swap
```

**Solution 4**: Check file permissions:

```bash
# Ensure files are readable
ls -la .

# Fix permissions
sudo chown -R $USER:$USER .
```

### Volume Permission Issues

**Problem**: "Permission denied" errors

**Solution 1**: Fix file ownership:

```bash
# Ensure node_modules is owned correctly
sudo chown -R $USER:$USER .
sudo chown -R $USER:$USER node_modules
```

**Solution 2**: Use Docker CLI with proper flags:

```bash
# Run as current user
docker-compose run --user $(id -u):$(id -g) app npm run dev
```

**Solution 3**: Run in container with elevated permissions:

```bash
# Check if issue is with volume permissions
docker-compose exec app ls -la /app
```

### Database Connection Issues

**Problem**: Cannot connect to database

**Solution 1**: Verify DATABASE_URL:

```bash
# Check environment variables
docker-compose exec app env | grep DATABASE

# Or set explicitly
docker-compose up -d --env-file .env
```

**Solution 2**: Check network connectivity:

```bash
# Test connection from container
docker-compose exec app npx prisma db push

# Check if database is accessible
docker-compose exec app ping your-database-host
```

**Solution 3**: Review database logs:

```bash
docker-compose logs -f db
```

**Solution 4**: Ensure database is running:

```bash
docker-compose ps
docker-compose up -d db
```

### Container Won't Start

**Problem**: Container exits immediately

**Solution 1**: Check container logs:

```bash
# View logs
docker-compose logs app

# Follow logs
docker-compose logs -f app

# Check exit code
docker-compose ps -a
```

**Solution 2**: Enter container for debugging:

```bash
docker-compose exec app sh

# Run commands manually
npm run dev
```

**Solution 3**: Verify configuration:

```bash
# Check docker-compose.yml syntax
docker-compose config

# Validate environment variables
docker-compose config | grep -A 10 env_file
```

### Memory Issues

**Problem**: Container OOM (Out of Memory) errors

**Solution 1**: Check memory usage:

```bash
docker stats
```

**Solution 2**: Increase container memory limits:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          memory: 2G
    shm_size: '2gb' # Increase shared memory
```

**Solution 3**: Check for memory leaks in code

### Slow Performance

**Problem**: Application runs slowly

**Solution 1**: Clear Docker cache:

```bash
docker-compose down -v
docker-compose build
docker-compose up
```

**Solution 2**: Optimize Dockerfile layers:

```dockerfile
# Combine RUN commands to reduce layers
RUN npm ci && \
    npm run build && \
    npm run test
```

**Solution 3**: Enable Docker BuildKit:

```bash
export DOCKER_BUILDKIT=1
docker-compose build
```

**Solution 4**: Check for unnecessary volumes:

```yaml
volumes:
  # Remove unnecessary mounts
  - /app/node_modules
  - /app/.next
```

### Network Issues

**Problem**: Cannot access application in browser

**Solution 1**: Verify port mapping:

```bash
docker-compose ps
# Should show: 0.0.0.0:3000->3000/tcp
```

**Solution 2**: Check if container is running:

```bash
docker-compose ps
docker-compose ps app
```

**Solution 3**: Test from host:

```bash
curl http://localhost:3000
```

**Solution 4**: Check firewall rules:

```bash
# macOS
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate off

# Check listening ports
lsof -i :3000
```

### HTTPS/SSL Issues

**Problem**: SSL certificate errors

**Solution 1**: Use reverse proxy with SSL:

```nginx
server {
    listen 443 ssl;
    server_name example.com;
    ssl_certificate /etc/ssl/certs/ssl-cert-snakeoil.pem;
    ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
    location / {
        proxy_pass http://localhost:3000;
    }
}
```

**Solution 2**: Use Let's Encrypt:

```bash
# Install certbot
sudo apt-get install certbot

# Obtain certificate
sudo certbot certonly --standalone -d example.com

# Configure Nginx
```

### Health Check Failures

**Problem**: Health checks failing

**Solution 1**: Check health check endpoint:

```bash
# Test from inside container
docker-compose exec app curl -f http://localhost:3000

# Check health status
docker-compose ps
```

**Solution 2**: Adjust health check settings:

```yaml
healthcheck:
  test: ['CMD', 'wget', '--spider', '-q', 'http://localhost:3000']
  interval: 60s
  timeout: 10s
  retries: 5
  start_period: 60s
```

**Solution 3**: Increase start period:

```yaml
healthcheck:
  start_period: 120s
```

## Advanced Usage

### Multi-Environment Setup

Create separate docker-compose files:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Custom Docker Compose Files

**docker-compose.dev.yml**:

```yaml
services:
  app:
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev
    ports:
      - '3000:3000'
```

**docker-compose.prod.yml**:

```yaml
services:
  app:
    environment:
      - NODE_ENV=production
    volumes:
      - /app/node_modules
      - /app/.next
    command: npm start
    deploy:
      replicas: 2
```

### Using .env Files

Create environment-specific files:

```bash
# .env.development
NODE_ENV=development
DATABASE_URL=postgresql://dev:dev@localhost:5432/swift_gallery

# .env.production
NODE_ENV=production
DATABASE_URL=postgresql://prod:prod@prod-db:5432/swift_gallery
```

Load specific environment:

```bash
docker-compose --env-file .env.development up
```

### Persistent Data Volumes

For data persistence:

```yaml
services:
  app:
    volumes:
      - app-data:/app/data

volumes:
  app-data:
```

### Network Customization

Create custom network:

```yaml
networks:
  app-network:
    driver: bridge
```

### Resource Limits

Set resource limits:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

### Using Docker Compose in CI/CD

**GitHub Actions Example**:

```yaml
name: Docker CI/CD

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build and push
        run: |
          docker build -t swift-template-gallery:${{ github.sha }} .
          docker push yourusername/swift-template-gallery:${{ github.sha }}
```

## Performance Optimization

### Build Optimization

```dockerfile
# Use build args for flexibility
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Install dev dependencies for build
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production stage
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app
USER nextjs
ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "server.js"]
```

### Runtime Optimization

```yaml
services:
  app:
    # Use health check to enable graceful shutdown
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 30s
      timeout: 10s
      retries: 3

    # Enable restart policy
    restart: unless-stopped

    # Add resource limits
    deploy:
      resources:
        limits:
          cpus: '1.5'
          memory: 1G
```

## Security Hardening

### Non-root User

```dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs
```

### Minimal Base Image

```dockerfile
FROM node:20-alpine  # Use Alpine for smaller size
```

### Security Scanning

```bash
# Scan image for vulnerabilities
docker scan swift-template-gallery:latest

# Use Trivy for comprehensive scanning
trivy image swift-template-gallery:latest
```

### Secrets Management

```yaml
services:
  app:
    secrets:
      - database_password
    environment:
      - DATABASE_PASSWORD_FILE=/run/secrets/database_password

secrets:
  database_password:
    file: ./secrets/database_password.txt
```

## Backup and Restore

### Database Backup

```bash
# Backup database
docker-compose exec -T db pg_dump -U postgres > backup-$(date +%Y%m%d).sql

# Or using docker exec
docker exec swift-template-gallery-db pg_dump -U postgres > backup.sql
```

### Application Backup

```bash
# Backup application data
docker-compose exec app tar czf /tmp/backup.tar.gz /app/data
docker cp swift-template-gallery-app:/tmp/backup.tar.gz ./backup.tar.gz
```

### Restore Backup

```bash
# Restore database
cat backup-20240101.sql | docker exec -i swift-template-gallery-db psql -U postgres

# Restore application data
docker cp backup.tar.gz swift-template-gallery-app:/tmp/
docker-compose exec app tar xzf /tmp/backup.tar.gz -C /
```

## Monitoring

### View Resource Usage

```bash
# Monitor all containers
docker stats

# Monitor specific container
docker stats swift-template-gallery-app
```

### Check Container Status

```bash
# List all containers
docker-compose ps

# Check specific container
docker inspect swift-template-gallery-app
```

### View Event Logs

```bash
# Docker events
docker events --since 2024-01-01

# Container logs
docker logs swift-template-gallery-app
```

## Support and Resources

### Official Documentation

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)

### Useful Commands

```bash
# Build image
docker build -t swift-template-gallery:latest .

# Run container
docker run -p 3000:3000 swift-template-gallery:latest

# List images
docker images | grep swift

# List containers
docker ps -a | grep swift

# Remove old images
docker image prune -a

# Remove old containers
docker container prune
```

### Getting Help

1. Check this documentation
2. Review Docker and Next.js logs
3. Open an issue in the repository
4. Check Docker forums and communities

---

**Last Updated**: 2026-06-18
**Version**: 2.0
