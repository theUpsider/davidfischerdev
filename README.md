# David Fischer Dev - Personal Website

A personal website built with React, TypeScript, Vite, and includes a Major System Mnemonics Generator.

## Environment Configuration

The application uses environment variables to configure the API endpoint:

- **Development**: `http://localhost:5000`
- **Production**: `https://davidfischer.dev:5000`

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

1. Runs on pushes to `master`/`main` branches
2. Installs dependencies and runs tests
3. Builds the application with production environment variables
4. Creates Docker image ready for deployment

## Environment Variables

- `VITE_API_BASE_URL`: Base URL for API calls
  - Development: `http://localhost:5000`
  - Production: `https://davidfischer.dev:5000`

## Docker Commands

```bash
# Build production image
docker build -t davidfischerdev-frontend \
  --build-arg VITE_API_BASE_URL=https://davidfischer.dev:5000 \
  --build-arg NODE_ENV=production .

# Run container
docker run -p 80:80 davidfischerdev-frontend
```

## Deployment

The application is containerized and ready for deployment to any Docker-compatible environment. The production build uses nginx to serve the static files with proper routing configuration for React Router.

## Features

- **Major System Mnemonics Generator**: Tool for generating mnemonic devices using the Major System
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Theme switching capability
- **Production Ready**: Environment-specific configuration and Docker support
