#!/bin/bash

# Build the React application
npm run build

# Deploy to Hostinger server
rsync -avz --delete build/ root@69.62.78.171:/var/www/html/

echo "Deployment completed!" 