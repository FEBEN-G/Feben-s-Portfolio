# Start local Postgres for the portfolio admin (Docker)
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

Write-Host "Checking Docker..."
docker info | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Host @"

Docker engine is not running.
Open Docker Desktop and wait until the engine is running, then re-run:
  npm run db:up

"@ -ForegroundColor Yellow
  exit 1
}

Write-Host "Starting Postgres..."
docker compose up -d

$deadline = (Get-Date).AddMinutes(2)
do {
  Start-Sleep -Seconds 2
  docker exec feben-pg pg_isready -U portfolio -d portfolio 2>$null | Out-Null
  if ($LASTEXITCODE -eq 0) { break }
} while ((Get-Date) -lt $deadline)

if ($LASTEXITCODE -ne 0) {
  Write-Host "Postgres did not become ready in time. Check: docker compose logs db" -ForegroundColor Red
  exit 1
}

Write-Host @"

Postgres is ready.
Ensure .env contains:
  DATABASE_URL=postgresql://portfolio:portfolio@localhost:5432/portfolio
  DATABASE_SSL=false
  ADMIN_PASSWORD=...
  ADMIN_SESSION_SECRET=... (min 32 chars)

Then restart: npm run dev
Admin: http://localhost:3000/admin

"@ -ForegroundColor Green
