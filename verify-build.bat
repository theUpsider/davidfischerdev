@echo off
REM Build verification script for David Fischer Dev (Windows)

echo 🔍 David Fischer Dev - Build Verification
echo ========================================

REM Check Node.js version
echo 📋 Node.js version:
node --version

REM Check npm version
echo 📋 npm version:
npm --version

REM Check environment variables
echo 📋 Environment variables:
echo NODE_ENV: %NODE_ENV%
echo VITE_API_BASE_URL: %VITE_API_BASE_URL%

REM Clean build
echo 🧹 Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite

REM Install dependencies
echo 📦 Installing dependencies...
npm ci

REM Build project
echo 🔨 Building project...
npm run build-prod
if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo 📊 Build output:
    dir dist
) else (
    echo ❌ Build failed!
    echo 🔄 Trying legacy build...
    npm run build-prod-legacy
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Legacy build successful!
    ) else (
        echo ❌ Legacy build also failed!
        exit /b 1
    )
)

echo 🎉 Build verification complete!
