# PowerShell Deployment script for David Fischer Dev website
# Usage: .\deploy.ps1 [environment]
# Environment: dev, prod, or ghcr (default: prod)

param(
    [string]$Environment = "prod"
)

Write-Host "Deploying David Fischer Dev website..." -ForegroundColor Cyan
Write-Host "Environment: $Environment" -ForegroundColor Yellow

switch ($Environment.ToLower()) {
    "dev" {
        Write-Host "Building for development..." -ForegroundColor Green
        docker-compose -f docker-compose.dev.yml up --build -d
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Development deployment complete!" -ForegroundColor Green
            Write-Host "Access at: http://localhost:3000" -ForegroundColor Blue
        }
    }
    "prod" {
        Write-Host "Building for production (local build)..." -ForegroundColor Green
        docker-compose up --build -d
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Production deployment complete!" -ForegroundColor Green
            Write-Host "Access at: http://localhost" -ForegroundColor Blue
        }
    }
    "ghcr" {
        Write-Host "Deploying from GitHub Container Registry..." -ForegroundColor Green
        docker-compose -f docker-compose.prod.yml up -d
        if ($LASTEXITCODE -eq 0) {
            Write-Host "GitHub Container Registry deployment complete!" -ForegroundColor Green
            Write-Host "Access at: http://localhost" -ForegroundColor Blue
        }
    }
    default {
        Write-Host "Invalid environment. Use 'dev', 'prod', or 'ghcr'" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Container status:" -ForegroundColor Cyan
docker ps --filter "name=davidfischerdev"
