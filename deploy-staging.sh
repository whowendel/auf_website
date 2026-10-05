#!/usr/bin/env bash
set -e

echo "🚀 Starting staging deployment..."

# Navigate to app directory
cd /opt/auf_website

# 1. Pull latest code from staging branch
echo "📥 Pulling latest changes from staging..."
git fetch origin staging
git checkout staging
git pull origin staging

# 2. Build and restart containers
echo "🔨 Building and starting Docker containers..."
docker compose -f docker-compose.prod.yml up -d --build --remove-orphans

# 3. Wait for database and apply Prisma migrations
echo "📦 Running Prisma database migrations inside web container..."
docker compose -f docker-compose.prod.yml exec -T web npx prisma migrate deploy

# 4. Clean up dangling images to keep disk clean
docker image prune -f

echo "✅ Staging deployment completed successfully!"
