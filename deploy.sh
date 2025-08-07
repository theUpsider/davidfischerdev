#!/bin/bash

# Deployment script for David Fischer Dev website
# Usage: ./deploy.sh [environment]
# Environment: dev, prod, or ghcr (default: prod)

ENVIRONMENT=${1:-prod}

echo "🚀 Deploying David Fischer Dev website..."
echo "📝 Environment: $ENVIRONMENT"

if [ "$ENVIRONMENT" = "dev" ]; then
    echo "🔧 Building for development..."
    docker-compose -f docker-compose.dev.yml up --build -d
    echo "✅ Development deployment complete!"
    echo "🌐 Access at: http://localhost:3000"
elif [ "$ENVIRONMENT" = "prod" ]; then
    echo "🔧 Building for production (local build)..."
    docker-compose up --build -d
    echo "✅ Production deployment complete!"
    echo "🌐 Access at: http://localhost"
elif [ "$ENVIRONMENT" = "ghcr" ]; then
    echo "🔧 Deploying from GitHub Container Registry..."
    docker-compose -f docker-compose.prod.yml up -d
    echo "✅ GitHub Container Registry deployment complete!"
    echo "🌐 Access at: http://localhost"
else
    echo "❌ Invalid environment. Use 'dev', 'prod', or 'ghcr'"
    exit 1
fi

echo "📊 Container status:"
docker ps --filter "name=davidfischerdev"
