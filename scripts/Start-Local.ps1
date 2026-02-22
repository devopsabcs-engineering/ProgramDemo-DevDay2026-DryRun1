<#
.SYNOPSIS
    Starts the OPS Program Approval System locally for development.

.DESCRIPTION
    Launches the backend (Java Spring Boot on port 8080) and/or frontend
    (React Vite on port 3000) for local development. Supports skipping
    builds, running individual tiers, and switching between H2 and Azure SQL.

.PARAMETER SkipBuild
    Skip Maven and npm build steps. Use when code has not changed.

.PARAMETER BackendOnly
    Start only the backend API on port 8080.

.PARAMETER FrontendOnly
    Start only the frontend dev server on port 3000.

.PARAMETER UseAzureSql
    Use Azure SQL instead of H2 in-memory database.
    Sets SPRING_PROFILES_ACTIVE=azure.

.EXAMPLE
    .\scripts\Start-Local.ps1
    # Builds and starts both backend and frontend

.EXAMPLE
    .\scripts\Start-Local.ps1 -SkipBuild -BackendOnly
    # Starts only the backend without rebuilding

.EXAMPLE
    .\scripts\Start-Local.ps1 -UseAzureSql
    # Starts both tiers using Azure SQL instead of H2
#>

param(
    [switch]$SkipBuild,
    [switch]$BackendOnly,
    [switch]$FrontendOnly,
    [switch]$UseAzureSql
)

$ErrorActionPreference = "Stop"

function Test-PortInUse {
    param([int]$Port)
    $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue |
        Where-Object { $_.State -eq 'Listen' -or $_.State -eq 'Established' }
    return $null -ne $connection
}

# --- Port conflict detection ---
if (-not $FrontendOnly) {
    if (Test-PortInUse -Port 8080) {
        Write-Host "ERROR: Port 8080 is already in use. Stop the existing process or use Stop-Local.ps1." -ForegroundColor Red
        exit 1
    }
}

if (-not $BackendOnly) {
    if (Test-PortInUse -Port 3000) {
        Write-Host "ERROR: Port 3000 is already in use. Stop the existing process or use Stop-Local.ps1." -ForegroundColor Red
        exit 1
    }
}

# --- Build phase ---
if (-not $SkipBuild) {
    if (-not $FrontendOnly) {
        Write-Host "Building backend (Maven)..." -ForegroundColor Cyan
        & backend/mvnw.cmd -f backend/pom.xml clean package -DskipTests
        if ($LASTEXITCODE -ne 0) {
            Write-Host "ERROR: Maven build failed." -ForegroundColor Red
            exit 1
        }
        Write-Host "Backend build complete." -ForegroundColor Green
    }

    if (-not $BackendOnly) {
        Write-Host "Installing frontend dependencies (npm)..." -ForegroundColor Cyan
        & npm --prefix frontend install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "ERROR: npm install failed." -ForegroundColor Red
            exit 1
        }
        Write-Host "Frontend dependencies installed." -ForegroundColor Green
    }
}

# --- Set Spring profile ---
$springProfile = "local"
if ($UseAzureSql) {
    $springProfile = "azure"
    Write-Host "Using Azure SQL profile." -ForegroundColor Yellow
} else {
    Write-Host "Using H2 in-memory database (local profile)." -ForegroundColor Yellow
}

$env:SPRING_PROFILES_ACTIVE = $springProfile

# --- Start services ---
$jobs = @()

if (-not $FrontendOnly) {
    Write-Host "Starting backend on port 8080..." -ForegroundColor Cyan
    $backendJob = Start-Job -ScriptBlock {
        Set-Location $using:PWD
        $env:SPRING_PROFILES_ACTIVE = $using:springProfile
        & backend/mvnw.cmd -f backend/pom.xml spring-boot:run
    }
    $jobs += $backendJob
    Write-Host "Backend started (Job ID: $($backendJob.Id))." -ForegroundColor Green
}

if (-not $BackendOnly) {
    Write-Host "Starting frontend on port 3000..." -ForegroundColor Cyan
    $frontendJob = Start-Job -ScriptBlock {
        Set-Location $using:PWD
        & npm --prefix frontend run dev
    }
    $jobs += $frontendJob
    Write-Host "Frontend started (Job ID: $($frontendJob.Id))." -ForegroundColor Green
}

# --- Summary ---
Write-Host "" -ForegroundColor White
Write-Host "=== OPS Program Approval System ===" -ForegroundColor Magenta
if (-not $FrontendOnly) {
    Write-Host "  Backend:  http://localhost:8080/api" -ForegroundColor White
    Write-Host "  H2 Console: http://localhost:8080/h2-console" -ForegroundColor White
}
if (-not $BackendOnly) {
    Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
}
Write-Host "  Profile:  $springProfile" -ForegroundColor White
Write-Host "===================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Press Ctrl+C to stop, or run .\scripts\Stop-Local.ps1" -ForegroundColor Yellow

# --- Wait for jobs ---
if ($jobs.Count -gt 0) {
    try {
        $jobs | Wait-Job
    } finally {
        $jobs | Stop-Job -ErrorAction SilentlyContinue
        $jobs | Remove-Job -ErrorAction SilentlyContinue
    }
}
