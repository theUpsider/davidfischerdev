# David Fischer Dev - Personal Website

A personal website built with React, TypeScript, Vite, and includes a Major System Mnemonics Generator.

## Environment Configuration

The application uses environment variables to configure the API endpoint:

- **Development**: `http://localhost:5000`
- **Production**: `https://api.davidfischer.dev`

## Development

```bash
npm install
npm run dev
```

## Production Build

### Local Build

```bash
npm run build-prod
```

### Docker Build

```bash
# Build for production
npm run docker:build-prod

# Run the container
docker run -p 3000:80 davidfischerdev-frontend
```

### Using Docker Compose

```bash
# Production
docker-compose up --build

# Development
docker-compose -f docker-compose.dev.yml up --build
```

## CI/CD

The project includes GitHub Actions workflow for automated building and deployment. The workflow:

1. Runs on pushes to `master`/`main` branches and pull requests
2. Installs dependencies and runs tests
3. Builds the application with production environment variables
4. Builds and pushes Docker images to GitHub Container Registry (ghcr.io)
5. Creates tagged images for different events (branch, PR, SHA, latest)

### Docker Images

Docker images are automatically built and pushed to GitHub Container Registry:

- **Registry**: `ghcr.io/theUpsider/davidfischerdev`
- **Tags**:
  - `latest` (for main/master branch)
  - `master` (for master branch pushes)
  - `pr-XX` (for pull requests)
  - `sha-XXXXXXX` (for specific commits)

### Pulling Docker Images

```bash
# Pull the latest image
docker pull ghcr.io/theUpsider/davidfischerdev:latest

# Run the pulled image
docker run -p 80:80 ghcr.io/theUpsider/davidfischerdev:latest
```

## Environment Variables

- `VITE_API_BASE_URL`: Base URL for API calls
  - Development: `http://localhost:5000`
  - Production: `https://api.davidfischer.dev`

## Docker Commands

```bash
# Build production image
docker build -t davidfischerdev-frontend \
  --build-arg VITE_API_BASE_URL=https://api.davidfischer.dev \
  --build-arg NODE_ENV=production .

# Run container
docker run -p 80:80 davidfischerdev-frontend
```

## Deployment

The application is containerized and ready for deployment to any Docker-compatible environment. The production build uses nginx to serve the static files with proper routing configuration for React Router.

### Deployment Options

1. **GitHub Container Registry** (Recommended for production):

   ```bash
   docker pull ghcr.io/theUpsider/davidfischerdev:latest
   docker run -p 80:80 ghcr.io/theUpsider/davidfischerdev:latest
   ```

2. **Local Docker Build**:

   ```bash
   docker build -t davidfischerdev-frontend .
   docker run -p 80:80 davidfischerdev-frontend
   ```

3. **Docker Compose** (uses local build):
   ```bash
   docker-compose up --build
   ```

### Production Deployment with GitHub Registry

Create a docker-compose.prod.yml for production deployment using GitHub Container Registry:

```yaml
version: '3.8'
services:
  frontend:
    image: ghcr.io/theUpsider/davidfischerdev:latest
    ports:
      - '80:80'
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost/health']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## Troubleshooting

### Docker Build Issues

If you encounter crypto-related errors during Docker builds:

1. **Local builds work but Docker fails**: This is usually due to Node.js compatibility with Alpine Linux. The Dockerfile now uses `node:18-slim` instead of `node:18-alpine` to avoid these issues.

2. **Legacy OpenSSL errors**: If you still encounter issues, try the legacy build:

   ```bash
   npm run build-prod-legacy
   ```

3. **Memory issues**: The build process uses `--max-old-space-size=4096` to prevent memory-related build failures.

### Common Solutions

- Ensure you're using Node.js 18 or higher
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- For Docker: Ensure Docker has sufficient memory allocated (recommend 4GB+)

## Features

- **Major System Mnemonics Generator**: Tool for generating mnemonic devices using the Major System
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Theme switching capability
- **Production Ready**: Environment-specific configuration and Docker support
