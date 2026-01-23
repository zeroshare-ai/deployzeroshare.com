#!/bin/bash

# =============================================================================
# Compliance Report S3 Bucket Setup Script
# =============================================================================
# This script creates and configures an S3 bucket for compliance report storage
# with proper security settings.
#
# Usage:
#   ./scripts/setup-compliance-s3.sh [bucket-name] [region]
#
# Example:
#   ./scripts/setup-compliance-s3.sh zeroshare-compliance-reports us-east-1
# =============================================================================

set -e

# Configuration
BUCKET_NAME="${1:-zeroshare-compliance-reports}"
REGION="${2:-us-east-1}"
RETENTION_DAYS=90

echo "=============================================="
echo "Compliance S3 Bucket Setup"
echo "=============================================="
echo "Bucket: $BUCKET_NAME"
echo "Region: $REGION"
echo "Retention: $RETENTION_DAYS days"
echo ""

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Run 'aws configure' first."
    exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "AWS Account: $ACCOUNT_ID"
echo ""

# Step 1: Create bucket
echo "Step 1: Creating S3 bucket..."
if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
    echo "  ⚠️  Bucket already exists"
else
    if [ "$REGION" = "us-east-1" ]; then
        aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION"
    else
        aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" \
            --create-bucket-configuration LocationConstraint="$REGION"
    fi
    echo "  ✅ Bucket created"
fi

# Step 2: Enable encryption
echo "Step 2: Enabling server-side encryption..."
aws s3api put-bucket-encryption \
    --bucket "$BUCKET_NAME" \
    --server-side-encryption-configuration '{
        "Rules": [{
            "ApplyServerSideEncryptionByDefault": {
                "SSEAlgorithm": "AES256"
            },
            "BucketKeyEnabled": true
        }]
    }'
echo "  ✅ Encryption enabled (AES-256)"

# Step 3: Block public access
echo "Step 3: Blocking public access..."
aws s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration \
        "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
echo "  ✅ Public access blocked"

# Step 4: Enable versioning
echo "Step 4: Enabling versioning..."
aws s3api put-bucket-versioning \
    --bucket "$BUCKET_NAME" \
    --versioning-configuration Status=Enabled
echo "  ✅ Versioning enabled"

# Step 5: Set lifecycle policy
echo "Step 5: Setting lifecycle policy..."
aws s3api put-bucket-lifecycle-configuration \
    --bucket "$BUCKET_NAME" \
    --lifecycle-configuration "{
        \"Rules\": [
            {
                \"ID\": \"DeleteOldReports\",
                \"Status\": \"Enabled\",
                \"Filter\": {
                    \"Prefix\": \"compliance-reports/\"
                },
                \"Expiration\": {
                    \"Days\": $RETENTION_DAYS
                },
                \"NoncurrentVersionExpiration\": {
                    \"NoncurrentDays\": 30
                }
            }
        ]
    }"
echo "  ✅ Lifecycle policy set ($RETENTION_DAYS day retention)"

# Step 6: Enable logging (optional)
echo "Step 6: Creating access logging bucket..."
LOGGING_BUCKET="${BUCKET_NAME}-logs"
if aws s3api head-bucket --bucket "$LOGGING_BUCKET" 2>/dev/null; then
    echo "  ⚠️  Logging bucket already exists"
else
    if [ "$REGION" = "us-east-1" ]; then
        aws s3api create-bucket --bucket "$LOGGING_BUCKET" --region "$REGION" 2>/dev/null || true
    else
        aws s3api create-bucket --bucket "$LOGGING_BUCKET" --region "$REGION" \
            --create-bucket-configuration LocationConstraint="$REGION" 2>/dev/null || true
    fi
fi

# Enable logging
aws s3api put-bucket-logging \
    --bucket "$BUCKET_NAME" \
    --bucket-logging-status "{
        \"LoggingEnabled\": {
            \"TargetBucket\": \"$LOGGING_BUCKET\",
            \"TargetPrefix\": \"compliance-bucket-logs/\"
        }
    }" 2>/dev/null || echo "  ⚠️  Logging setup skipped (may require additional permissions)"

echo "  ✅ Access logging configured"

# Step 7: Create IAM policy
echo "Step 7: Creating IAM policy..."
POLICY_NAME="ComplianceReportAccess"
POLICY_DOCUMENT="{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
        {
            \"Sid\": \"S3ReportAccess\",
            \"Effect\": \"Allow\",
            \"Action\": [
                \"s3:PutObject\",
                \"s3:GetObject\",
                \"s3:ListBucket\"
            ],
            \"Resource\": [
                \"arn:aws:s3:::$BUCKET_NAME\",
                \"arn:aws:s3:::$BUCKET_NAME/*\"
            ]
        },
        {
            \"Sid\": \"SESAccess\",
            \"Effect\": \"Allow\",
            \"Action\": [
                \"ses:SendEmail\",
                \"ses:SendRawEmail\"
            ],
            \"Resource\": \"*\"
        }
    ]
}"

# Check if policy exists
if aws iam get-policy --policy-arn "arn:aws:iam::$ACCOUNT_ID:policy/$POLICY_NAME" 2>/dev/null; then
    echo "  ⚠️  Policy already exists"
else
    aws iam create-policy \
        --policy-name "$POLICY_NAME" \
        --policy-document "$POLICY_DOCUMENT" \
        --description "Access policy for compliance report generation and delivery"
    echo "  ✅ IAM policy created"
fi

# Summary
echo ""
echo "=============================================="
echo "Setup Complete!"
echo "=============================================="
echo ""
echo "Bucket ARN: arn:aws:s3:::$BUCKET_NAME"
echo "Policy ARN: arn:aws:iam::$ACCOUNT_ID:policy/$POLICY_NAME"
echo ""
echo "Next steps:"
echo "1. Create an IAM user or role with the policy attached"
echo "2. Add credentials to GitHub Secrets:"
echo "   - AWS_ACCESS_KEY_ID"
echo "   - AWS_SECRET_ACCESS_KEY"
echo "   - COMPLIANCE_S3_BUCKET=$BUCKET_NAME"
echo ""
echo "3. Verify your sender email in SES:"
echo "   aws ses verify-email-identity --email-address compliance@yourcompany.com"
echo ""
echo "4. Test the setup:"
echo "   npm run compliance:send-report -- --email=your@email.com"
echo ""
