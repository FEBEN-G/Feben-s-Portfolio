#!/bin/bash

# Start PostgreSQL only (local development without Docker)
echo "🚀 Starting PostgreSQL with Docker Compose..."

docker compose up db -d

echo "✅ PostgreSQL started"
echo "⏳ Waiting for database to be ready..."
sleep 5

echo "📊 Database connection string:"
echo "   postgresql://portfolio:[REDACTED]@localhost:5432/portfolio"
echo ""
echo "🏃 Run 'npm run dev' to start the development server"
