<#
.SYNOPSIS
    Stops the OPS Program Approval System local development processes.

.DESCRIPTION
    Finds and stops any processes listening on port 8080 (backend) and
    port 3000 (frontend). Use this script to cleanly shut down services
    started by Start-Local.ps1.

.EXAMPLE
    .\scripts\Stop-Local.ps1
    # Stops both backend and frontend processes
#>

$ErrorActionPreference = "SilentlyContinue"

function Stop-ProcessOnPort {
    param(
        [int]$Port,
        [string]$ServiceName
    )

    $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($connections) {
        $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
        foreach ($processId in $pids) {
            $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "Stopping $ServiceName (PID: $processId, Process: $($process.ProcessName)) on port $Port..." -ForegroundColor Yellow
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
                Write-Host "$ServiceName stopped." -ForegroundColor Green
            }
        }
    } else {
        Write-Host "No $ServiceName process found on port $Port." -ForegroundColor Gray
    }
}

Write-Host "=== Stopping OPS Program Approval System ===" -ForegroundColor Magenta

# Stop backend (port 8080)
Stop-ProcessOnPort -Port 8080 -ServiceName "Backend"

# Stop frontend (port 3000)
Stop-ProcessOnPort -Port 3000 -ServiceName "Frontend"

# Stop any background jobs from Start-Local.ps1
$runningJobs = Get-Job | Where-Object { $_.State -eq 'Running' }
if ($runningJobs) {
    Write-Host "Stopping background jobs..." -ForegroundColor Yellow
    $runningJobs | Stop-Job -ErrorAction SilentlyContinue
    $runningJobs | Remove-Job -ErrorAction SilentlyContinue
    Write-Host "Background jobs stopped." -ForegroundColor Green
} else {
    Write-Host "No background jobs found." -ForegroundColor Gray
}

Write-Host "=== All services stopped ===" -ForegroundColor Magenta
