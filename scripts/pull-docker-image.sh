#!/bin/bash
# Docker Pull Retry Script
# This script retries pulling the PostgreSQL image with exponential backoff

set -e

MAX_ATTEMPTS=5
WAIT_TIME=15
IMAGE="postgres:16-alpine"

echo "🐳 Attempting to pull Docker image: $IMAGE"
echo "   Max attempts: $MAX_ATTEMPTS"
echo "   Wait time between attempts: ${WAIT_TIME}s"
echo ""

for attempt in $(seq 1 $MAX_ATTEMPTS); do
  echo "Attempt $attempt/$MAX_ATTEMPTS..."
  
  if docker pull $IMAGE 2>&1; then
    echo ""
    echo "✅ Successfully pulled $IMAGE"
    echo ""
    echo "Now run: npm run db:up"
    exit 0
  fi
  
  if [ $attempt -lt $MAX_ATTEMPTS ]; then
    echo "❌ Pull failed. Waiting ${WAIT_TIME}s before retry..."
    sleep $WAIT_TIME
    WAIT_TIME=$((WAIT_TIME * 2))  # Exponential backoff
  fi
done

echo ""
echo "❌ Failed to pull image after $MAX_ATTEMPTS attempts"
echo ""
echo "Alternatives:"
echo "1. Check your internet connection"
echo "2. Try using postgres:15-alpine instead:"
echo "   - Edit docker-compose.yml"
echo "   - Change '16-alpine' to '15-alpine'"
echo "   - Run: docker pull postgres:15-alpine"
echo ""
echo "3. Check Docker Hub status: https://www.dockerstatus.com/"
echo "4. Restart Docker Desktop and try again"
echo ""
exit 1
