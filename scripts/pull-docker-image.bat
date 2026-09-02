@echo off
REM Docker Pull Retry Script for Windows
REM This script retries pulling the PostgreSQL image with delays

setlocal enabledelayedexpansion

set MAX_ATTEMPTS=5
set WAIT_TIME=15
set IMAGE=postgres:16-alpine

echo.
echo ========================================
echo.
echo 🐳 Attempting to pull Docker image: %IMAGE%
echo    Max attempts: %MAX_ATTEMPTS%
echo    Wait time between attempts: %WAIT_TIME%s
echo.
echo ========================================
echo.

for /l %%A in (1,1,%MAX_ATTEMPTS%) do (
    echo Attempt %%A of %MAX_ATTEMPTS%...
    echo.
    
    docker pull %IMAGE%
    
    if !errorlevel! equ 0 (
        echo.
        echo ✅ Successfully pulled %IMAGE%
        echo.
        echo Now run: npm run db:up
        echo.
        exit /b 0
    )
    
    if %%A lss %MAX_ATTEMPTS% (
        echo.
        echo ❌ Pull failed. Waiting %WAIT_TIME% seconds before retry...
        echo.
        timeout /t %WAIT_TIME% /nobreak
        set /a WAIT_TIME=!WAIT_TIME! * 2
    )
)

echo.
echo ❌ Failed to pull image after %MAX_ATTEMPTS% attempts
echo.
echo Alternatives:
echo 1. Check your internet connection
echo 2. Try using postgres:15-alpine instead:
echo    - Edit docker-compose.yml
echo    - Change '16-alpine' to '15-alpine'
echo    - Run: docker pull postgres:15-alpine
echo.
echo 3. Check Docker Hub status: https://www.dockerstatus.com/
echo 4. Restart Docker Desktop and try again
echo.
exit /b 1
