#!/bin/bash
# Script to connect GitHub repository to AWS Amplify after repo creation

set -e

APP_ID="d27qp6qcouw49r"
REPO_URL="https://github.com/zeroshare/deployzeroshare.com.git"
BRANCH="main"

echo "Setting up GitHub integration for AWS Amplify..."

# Check if repo exists
if ! gh repo view zeroshare/deployzeroshare.com &>/dev/null; then
    echo "ERROR: Repository zeroshare/deployzeroshare.com does not exist yet."
    echo "Please create it in the GitHub organization first, then run this script."
    exit 1
fi

# Push code to GitHub
echo "Pushing code to GitHub..."
git push -u origin main

# Get OAuth token (requires manual setup in Amplify console)
echo ""
echo "To connect Amplify to GitHub:"
echo "1. Go to AWS Amplify Console: https://console.aws.amazon.com/amplify"
echo "2. Select app ID: $APP_ID"
echo "3. Go to App Settings > General"
echo "4. Click 'Edit' under Repository"
echo "5. Connect your GitHub account and select: zeroshare/deployzeroshare.com"
echo "6. Select branch: $BRANCH"
echo ""
echo "Or use AWS CLI with a GitHub token:"
echo "aws amplify update-app --app-id $APP_ID --repository $REPO_URL --oauth-token <github-token>"
echo ""
echo "Then enable auto-build:"
echo "aws amplify update-branch --app-id $APP_ID --branch-name $BRANCH --enable-auto-build"
