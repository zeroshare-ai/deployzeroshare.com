#!/bin/bash
# Post-deployment verification script
# Runs smoke tests against the deployed site

set -e

BASE_URL="${BASE_URL:-https://deployzeroshare.com}"
echo "🧪 Running post-deployment tests against $BASE_URL"

# Run deployment verification tests
BASE_URL="$BASE_URL" npm run test:deployed

echo "✅ Post-deployment tests completed successfully"
