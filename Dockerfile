# syntax=docker/dockerfile:1
# =============================================================================
# Multi-stage build for Vite + React SPA
# Final image: nginx:alpine (~40MB) — no Node.js runtime in production
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: deps — install all dependencies with BuildKit cache mount
# -----------------------------------------------------------------------------
FROM node:20-alpine AS deps

WORKDIR /app

# Copy only manifest files for optimal layer caching
# (rebuild this layer only when package*.json changes)
COPY package.json package-lock.json* ./

# BuildKit cache mount keeps npm's download cache across builds
# --ignore-scripts skips the `prepare` (husky) postinstall hook safely
# --legacy-peer-deps handles peer dependency conflicts (Storybook)
RUN --mount=type=cache,target=/root/.npm \
    npm install --ignore-scripts --legacy-peer-deps

# -----------------------------------------------------------------------------
# Stage 2: builder — compile TypeScript + bundle with Vite
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Reuse installed node_modules from deps stage (no re-download)
COPY --from=deps /app/node_modules ./node_modules

# Copy source (node_modules excluded via .dockerignore)
COPY . .

# Production build — outputs to /app/dist
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3: runner — serve static assets with nginx (no Node.js runtime)
# -----------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config (SPA routing + performance + security headers)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Ensure nginx user owns the content and required runtime paths
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

# Run as non-root
USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
