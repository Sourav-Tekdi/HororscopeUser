#!/bin/bash

# Variables
PROJECT_DIR="/root/HororscopeUser"
REPO_URL="https://github.com/Sourav-Tekdi/HororscopeUser.git"
BRANCH="main"

# Optional: Clean up old source directory (be careful with rm -rf *)
# rm -rf $PROJECT_DIR/source

# Pull the latest code (if you want to clone, uncomment below)
# git clone -b $BRANCH $REPO_URL $PROJECT_DIR/source
# Or, if code is already present, just pull latest
cd $PROJECT_DIR || exit 1
git pull origin $BRANCH

# Build Docker image
if [ -f Dockerfile ]; then
  docker build -t horoscope-app:latest .
fi

# Try to run with docker-compose if available
if command -v docker-compose &> /dev/null; then
  docker-compose up -d --force-recreate --no-deps
else
  # Fallback to docker run if docker-compose is not available
  docker stop horoscope-app || true
  docker rm horoscope-app || true
  docker run -d -p 5544:80 --name horoscope-app --restart always horoscope-app:latest
fi

# Clean up dangling images
docker images --no-trunc -aqf "dangling=true" | xargs -r docker rmi

# Restart nginx if needed
if command -v nginx >/dev/null 2>&1; then
  sudo nginx -t && sudo systemctl restart nginx
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
  sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi 