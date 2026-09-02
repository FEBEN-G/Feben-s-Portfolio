#!/bin/bash
set -e

echo "🚀 Starting Feben Portfolio Backend Setup..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
fi

echo "✅ Docker is running"

# Check .env file
if [ ! -f ".env" ]; then
  echo "❌ .env file not found. Creating from .env.example..."
  cp .env.example .env
  echo "⚠️  Please update .env with your actual values (ADMIN_PASSWORD, ADMIN_SESSION_SECRET, EmailJS keys)"
fi

echo "📦 Starting services with docker compose..."
docker compose up -d

echo "⏳ Waiting for database to be ready..."
sleep 10

echo "✅ All services started!"
echo ""
echo "📍 Access your application:"
echo "   Frontend:  http://localhost:3000"
echo "   Admin UI:  http://localhost:3000/admin"
echo ""
echo "🔐 Admin Login:"
echo "   Password: portfolio-admin-2025 (change in .env)"
echo ""
echo "📊 Database:"
echo "   Host: localhost:5432"
echo "   User: portfolio"
echo "   Password: portfolio"
echo "   Database: portfolio"
echo ""
echo "💡 Useful commands:"
echo "   npm run dev         # Run locally without Docker"
echo "   npm run db:up       # Start only the database"
echo "   npm run db:down     # Stop the database"
echo "   npm run db:psql     # Connect to database CLI"
echo "   docker compose logs -f  # View logs"
echo ""
