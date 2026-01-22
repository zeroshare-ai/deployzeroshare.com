#!/bin/bash

# Script to set up AWS SES for deployzeroshare.com
# This script configures SES to send emails from no-reply@deployzeroshare.com

set -e

echo "🚀 Setting up AWS SES for deployzeroshare.com..."

# Configuration
FROM_EMAIL="no-reply@deployzeroshare.com"
DOMAIN="deployzeroshare.com"
REGION="us-east-1"

echo ""
echo "📧 Configuring email address: $FROM_EMAIL"

# Verify the email address (SES will send a verification email)
echo "Sending verification email to $FROM_EMAIL..."
aws ses verify-email-identity \
  --email-address "$FROM_EMAIL" \
  --region "$REGION" \
  || echo "⚠️  Email verification initiated. Check your email inbox."

# If domain is verified, we can use any email address from that domain
echo ""
echo "🌐 Checking domain verification status for $DOMAIN..."
DOMAIN_STATUS=$(aws ses get-identity-verification-attributes \
  --identities "$DOMAIN" \
  --region "$REGION" \
  --query 'VerificationAttributes.*.VerificationStatus' \
  --output text 2>/dev/null || echo "NotVerified")

if [ "$DOMAIN_STATUS" != "Success" ]; then
  echo ""
  echo "📋 Domain $DOMAIN is not verified. To verify the domain:"
  echo "   1. Run: aws ses verify-domain-identity --domain $DOMAIN --region $REGION"
  echo "   2. Add the provided TXT record to your DNS (Route53)"
  echo "   3. Wait for verification (can take up to 72 hours)"
  echo ""
  echo "   For now, we'll verify the email address instead."
else
  echo "✅ Domain $DOMAIN is already verified!"
fi

# Check if we're in SES sandbox mode
echo ""
echo "🔍 Checking SES account status..."
SES_SANDBOX=$(aws ses get-account-sending-enabled \
  --region "$REGION" \
  --query 'Enabled' \
  --output text 2>/dev/null || echo "true")

if [ "$SES_SANDBOX" = "true" ]; then
  echo ""
  echo "⚠️  WARNING: Your AWS account is in SES Sandbox mode."
  echo "   In sandbox mode, you can only send emails to verified email addresses."
  echo "   To move out of sandbox mode:"
  echo "   1. Go to AWS SES Console"
  echo "   2. Request production access"
  echo "   3. Wait for AWS approval (usually 24-48 hours)"
  echo ""
  echo "   For now, make sure rick@beaverpaw.com is verified:"
  aws ses verify-email-identity \
    --email-address "rick@beaverpaw.com" \
    --region "$REGION" \
    || echo "   Verification email sent to rick@beaverpaw.com"
fi

echo ""
echo "✅ SES setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Check your email inbox and verify $FROM_EMAIL"
echo "   2. If in sandbox mode, verify rick@beaverpaw.com"
echo "   3. Deploy the Lambda function (see scripts/deploy-lambda.sh)"
echo "   4. Update the API Gateway URL in your frontend code"
echo ""
