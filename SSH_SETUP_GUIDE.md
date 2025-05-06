# SSH Setup Guide for GitHub Actions Deployment

This guide will walk you through setting up SSH keys for your GitHub Actions deployment to your Hostinger server.

## Step 1: Generate an SSH Key Pair

Open a terminal on your local machine and run:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f github_actions_deploy_key
```

This creates:
- `github_actions_deploy_key` (private key)
- `github_actions_deploy_key.pub` (public key)

## Step 2: Add Public Key to Your Hostinger Server

Copy the public key to your Hostinger server:

```bash
ssh-copy-id -i github_actions_deploy_key.pub root@69.62.78.171
```

Alternatively, if ssh-copy-id is not available:

```bash
# View the public key
cat github_actions_deploy_key.pub

# Connect to your server 
ssh root@69.62.78.171

# On the server, add the key to authorized_keys
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

## Step 3: Test the SSH Connection

```bash
ssh -i github_actions_deploy_key root@69.62.78.171
```

You should connect without being prompted for a password.

## Step 4: Generate known_hosts Content

```bash
ssh-keyscan -t rsa 69.62.78.171
```

Save the output for the next step.

## Step 5: Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and Variables > Actions
3. Add new repository secrets:

   a. Add the SSH private key:
      - Name: `SSH_PRIVATE_KEY`
      - Value: *Entire contents of `github_actions_deploy_key` file*
      
   b. Add the known hosts:
      - Name: `KNOWN_HOSTS`
      - Value: *Output from the ssh-keyscan command*

## Step 6: Keep Your Private Key Secure

1. Store your private key in a secure location
2. Consider adding `github_actions_deploy_key` to your `.gitignore` to avoid accidentally committing it

## Additional Security Notes

1. For enhanced security, consider these best practices:
   - Create a deployment user instead of using root
   - Set up key-based authentication only (disable password authentication)
   - Restrict the deployment key's permissions on the server

2. To set up a dedicated deployment user:
   ```bash
   # On your Hostinger server
   adduser deploy
   usermod -aG sudo deploy
   mkdir -p /home/deploy/.ssh
   cp ~/.ssh/authorized_keys /home/deploy/.ssh/
   chown -R deploy:deploy /home/deploy/.ssh
   chmod 700 /home/deploy/.ssh
   chmod 600 /home/deploy/.ssh/authorized_keys
   ```

   Then update your GitHub Actions workflow to use `deploy@69.62.78.171` instead of `root@69.62.78.171`. 