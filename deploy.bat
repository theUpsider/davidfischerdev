@echo off
REM Deployment script for David Fischer Dev website (Windows)
REM Usage: deploy.bat [environment]
REM Environment: dev, prod, or ghcr (default: prod)

set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=prod

echo 🚀 Deploying David Fischer Dev website...
echo 📝 Environment: %ENVIRONMENT%

if "%ENVIRONMENT%"=="dev" (
    echo 🔧 Building for development...
    docker-compose -f docker-compose.dev.yml up --build -d
    echo ✅ Development deployment complete!
    echo 🌐 Access at: http://localhost:3000
) else if "%ENVIRONMENT%"=="prod" (
    echo 🔧 Building for production (local build)...
    docker-compose up --build -d
    echo ✅ Production deployment complete!
    echo 🌐 Access at: http://localhost
) else if "%ENVIRONMENT%"=="ghcr" (
    echo 🔧 Deploying from GitHub Container Registry...
    docker-compose -f docker-compose.prod.yml up -d
    echo ✅ GitHub Container Registry deployment complete!
    echo 🌐 Access at: http://localhost
) else (
    echo ❌ Invalid environment. Use 'dev', 'prod', or 'ghcr'
    exit /b 1
)

echo 📊 Container status:
docker ps --filter "name=davidfischerdev"
