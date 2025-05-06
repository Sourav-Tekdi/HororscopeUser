#!/bin/bash

# Check Node.js version and enforce Node.js 18
NODE_VERSION=$(node -v)
REQUIRED_NODE_VERSION="v18"

if [[ $NODE_VERSION != $REQUIRED_NODE_VERSION* ]]; then
  echo "Error: This project requires Node.js 18 or later. Current version: $NODE_VERSION"
  echo "Please update your Node.js version using nvm, n, or by downloading from nodejs.org"
  exit 1
fi

# Build the React application
npm run build

# Deploy to Hostinger server
rsync -avz --delete build/ root@69.62.78.171:/var/www/html/

echo "Deployment completed!" 