# Automatic Deployment to Hostinger Guide

This guide will help you set up automatic deployment of your React app to your Hostinger server whenever code is merged to the main branch.

## Prerequisites

1. A GitHub repository for your project
2. SSH access to your Hostinger server (root@69.62.78.171)
3. A React application (like the one in this repo)

## Step 1: Set Up SSH Keys

1. Generate an SSH key pair if you don't already have one:
   ```
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

2. Add your public key to the Hostinger server's authorized_keys:
   ```
   ssh-copy-id root@69.62.78.171
   ```

3. Test your SSH connection:
   ```
   ssh root@69.62.78.171
   ```

## Step 2: Configure GitHub Repository

1. Push your React app to GitHub:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. In your GitHub repository, go to Settings > Secrets and Variables > Actions

3. Add the following secrets:
   - `SSH_PRIVATE_KEY`: Copy your private SSH key (usually from ~/.ssh/id_rsa)
   - `KNOWN_HOSTS`: Generate this by running `ssh-keyscan 69.62.78.171`

## Step 3: Create GitHub Actions Workflow

1. Create a directory for GitHub Actions workflows:
   ```
   mkdir -p .github/workflows
   ```

2. Create a deployment workflow file:
   ```
   touch .github/workflows/deploy.yml
   ```

3. Add the following content to deploy.yml:
   ```yaml
   name: Deploy to Hostinger

   on:
     push:
       branches: [ main ]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 16
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build
           run: npm run build
           
         - name: Install SSH key
           uses: shimataro/ssh-key-action@v2
           with:
             key: ${{ secrets.SSH_PRIVATE_KEY }}
             known_hosts: ${{ secrets.KNOWN_HOSTS }}
             
         - name: Deploy to Hostinger
           run: |
             rsync -avz --delete build/ root@69.62.78.171:/var/www/html/
   ```

## Step 4: Manual Deployment Script (Optional)

For convenience, create a script to deploy manually:

1. Create deploy.sh in your project root:
   ```bash
   #!/bin/bash

   # Build the React application
   npm run build

   # Deploy to Hostinger server
   rsync -avz --delete build/ root@69.62.78.171:/var/www/html/

   echo "Deployment completed!"
   ```

2. Make it executable:
   ```
   chmod +x deploy.sh
   ```

## Step 5: Testing

1. Push code to your repository's main branch
2. Check GitHub Actions tab in your repository to see if the workflow runs
3. Visit your website to verify the changes are deployed

## Troubleshooting

- If rsync fails, ensure your server has rsync installed: `apt-get install rsync`
- If SSH connection fails, verify your SSH key is correctly added to GitHub secrets
- Check the GitHub Actions logs for detailed error messages 