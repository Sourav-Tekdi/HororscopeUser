# React App with Automatic Deployment to Hostinger

This repository contains a simple React application with a complete setup for automatic deployment to a Hostinger server.

## Project Structure

- `src/` - React application source code
- `.github/workflows/` - GitHub Actions workflow files for automatic deployment
- `deploy.sh` - Script for manual deployment

## Automatic Deployment Overview

This project is configured to automatically deploy to your Hostinger server (69.62.78.171) whenever code is pushed to the `main` branch. The deployment process:

1. Builds the React application
2. Uses SSH to connect to your Hostinger server
3. Copies the built files to your server using rsync

## Setup Instructions

### 1. Clone This Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <REPOSITORY_DIRECTORY>
```

### 2. Set Up SSH Keys

Follow the detailed instructions in [SSH_SETUP_GUIDE.md](./SSH_SETUP_GUIDE.md) to:
- Generate SSH keys
- Add the public key to your Hostinger server
- Add the private key to your GitHub repository secrets

### 3. Push to GitHub

```bash
git add .
git commit -m "Initial setup with auto-deployment"
git push origin main
```

### 4. Verify Deployment

1. Check the Actions tab in your GitHub repository to see if the workflow is running
2. Visit your website to see if the changes are deployed

## Manual Deployment

If you prefer to deploy manually, you can use the included deployment script:

```bash
./deploy.sh
```

## Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Building for Production

```bash
npm run build
```

## Customizing the Deployment

The GitHub Actions workflow file is located at `.github/workflows/deploy_hostinger.yml`. You can modify this file to:
- Change the deployment destination
- Add additional deployment steps
- Configure deployment conditions

## Troubleshooting

If you encounter issues with the deployment:

1. Check the GitHub Actions logs for error messages
2. Verify your SSH setup by running `ssh -i your_private_key root@69.62.78.171`
3. Make sure rsync is installed on your server
4. Check file permissions on your server

## Security Best Practices

For enhanced security:
- Create a dedicated deployment user instead of using root
- Restrict the deployment key's permissions
- Use HTTPS for your website

See [SSH_SETUP_GUIDE.md](./SSH_SETUP_GUIDE.md) for detailed security recommendations. 