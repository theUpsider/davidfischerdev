#!/bin/bash

# Build verification script for David Fischer Dev
echo "🔍 David Fischer Dev - Build Verification"
echo "========================================"

# Check Node.js version
echo "📋 Node.js version:"
node --version

# Check npm version
echo "📋 npm version:"
npm --version

# Check environment variables
echo "📋 Environment variables:"
echo "NODE_ENV: $NODE_ENV"
echo "VITE_API_BASE_URL: $VITE_API_BASE_URL"

# Clean build
echo "🧹 Cleaning previous builds..."
rm -rf dist node_modules/.vite

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build project
echo "🔨 Building project..."
if npm run build-prod; then
    echo "✅ Build successful!"
    echo "📊 Build output:"
    ls -la dist/
    echo "📏 Build sizes:"
    du -sh dist/*
else
    echo "❌ Build failed!"
    echo "🔄 Trying legacy build..."
    if npm run build-prod-legacy; then
        echo "✅ Legacy build successful!"
    else
        echo "❌ Legacy build also failed!"
        exit 1
    fi
fi

echo "🎉 Build verification complete!"
