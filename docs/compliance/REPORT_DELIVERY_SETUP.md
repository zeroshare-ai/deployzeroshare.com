# Compliance Report Delivery Setup

This guide explains how to set up automated compliance report delivery via email with S3 download links.

## Overview

The compliance report system:
1. Generates compliance evidence and documentation packages
2. Creates ZIP files organized by certification
3. Uploads to S3 with encryption
4. Sends email with pre-signed download links (expire in 7 days)

## Delivery Options

### Option 1: GitHub Actions (Recommended)

Automatically generates and delivers reports on a schedule or on-demand.

#### Setup Steps

1. **Add GitHub Secrets**

   Go to your repository → Settings → Secrets and variables → Actions

   | Secret Name | Description | Example |
   |-------------|-------------|---------|
   | `AWS_ACCESS_KEY_ID` | AWS access key for S3/SES | `AKIA...` |
   | `AWS_SECRET_ACCESS_KEY` | AWS secret key | `wJalr...` |
   | `COMPLIANCE_S3_BUCKET` | S3 bucket name | `zeroshare-compliance-reports` |
   | `COMPLIANCE_EMAIL_FROM` | Sender email (must be verified in SES) | `compliance@zeroshare.io` |
   | `COMPLIANCE_EMAIL_TO` | Default recipient | `cto@zeroshare.io` |

2. **Create S3 Bucket**

   ```bash
   # Create bucket
   aws s3 mb s3://zeroshare-compliance-reports --region us-east-1
   
   # Enable encryption
   aws s3api put-bucket-encryption \
     --bucket zeroshare-compliance-reports \
     --server-side-encryption-configuration '{
       "Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]
     }'
   
   # Block public access
   aws s3api put-public-access-block \
     --bucket zeroshare-compliance-reports \
     --public-access-block-configuration \
       "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
   
   # Set lifecycle policy (auto-delete after 90 days)
   aws s3api put-bucket-lifecycle-configuration \
     --bucket zeroshare-compliance-reports \
     --lifecycle-configuration '{
       "Rules": [{
         "ID": "DeleteOldReports",
         "Status": "Enabled",
         "Filter": {"Prefix": "compliance-reports/"},
         "Expiration": {"Days": 90}
       }]
     }'
   ```

3. **Verify Email in SES**

   ```bash
   # Verify sender email
   aws ses verify-email-identity --email-address compliance@zeroshare.io
   
   # If in sandbox, also verify recipient
   aws ses verify-email-identity --email-address recipient@company.com
   ```

4. **Create IAM Policy**

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "S3Access",
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:GetObject"
         ],
         "Resource": "arn:aws:s3:::zeroshare-compliance-reports/*"
       },
       {
         "Sid": "SESAccess",
         "Effect": "Allow",
         "Action": [
           "ses:SendEmail",
           "ses:SendRawEmail"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

5. **Trigger Report Generation**

   - **Automatic**: Runs every Monday at 8 AM UTC
   - **Manual**: Go to Actions → "Compliance Report Generation" → Run workflow

#### Manual Trigger Options

| Option | Description |
|--------|-------------|
| Certification | Choose specific certification or "all" |
| Email recipient | Override default recipient |
| Upload to S3 | Enable/disable S3 upload and email |

---

### Option 2: Local Generation

Generate reports locally without AWS.

```bash
# Install dependencies
npm install archiver

# Generate all reports (local only)
npm run compliance:local

# Generate specific certification
npm run compliance:local -- --cert=soc2

# Output location
ls -la compliance-artifacts/
```

---

### Option 3: Lambda Trigger

Set up automatic emails when reports are uploaded to S3.

1. **Deploy Lambda Function**

   ```bash
   cd amplify/backend/function/compliance-report
   npm install
   zip -r function.zip .
   
   aws lambda create-function \
     --function-name compliance-report-email \
     --runtime nodejs18.x \
     --handler index.handler \
     --role arn:aws:iam::ACCOUNT:role/lambda-ses-s3-role \
     --zip-file fileb://function.zip \
     --environment Variables='{
       "EMAIL_FROM": "compliance@zeroshare.io",
       "EMAIL_TO": "cto@zeroshare.io"
     }'
   ```

2. **Add S3 Trigger**

   ```bash
   aws lambda add-permission \
     --function-name compliance-report-email \
     --statement-id s3-trigger \
     --action lambda:InvokeFunction \
     --principal s3.amazonaws.com \
     --source-arn arn:aws:s3:::zeroshare-compliance-reports
   
   aws s3api put-bucket-notification-configuration \
     --bucket zeroshare-compliance-reports \
     --notification-configuration '{
       "LambdaFunctionConfigurations": [{
         "LambdaFunctionArn": "arn:aws:lambda:us-east-1:ACCOUNT:function:compliance-report-email",
         "Events": ["s3:ObjectCreated:*"],
         "Filter": {
           "Key": {
             "FilterRules": [
               {"Name": "prefix", "Value": "compliance-reports/"},
               {"Name": "suffix", "Value": ".zip"}
             ]
           }
         }
       }]
     }'
   ```

---

## Report Packages

Each certification generates a ZIP file containing:

| Certification | Package Contents |
|---------------|------------------|
| **SOC 2** | soc2.md, security-policy.md, incident-response-plan.md, evidence/* |
| **ISO 27001** | iso27001.md, security-policy.md, vendor-assessment.md, evidence/* |
| **GDPR** | gdpr.md, data-processing-agreement.md, evidence/* |
| **HIPAA** | hipaa.md, security-policy.md, incident-response-plan.md, evidence/* |
| **PCI DSS** | pci-dss.md, security-policy.md, evidence/* |
| **CCPA** | ccpa.md, data-processing-agreement.md, evidence/* |
| **AWS** | All AWS marketplace and certification docs, CloudFormation |

---

## Email Format

### HTML Email Preview

```
┌─────────────────────────────────────────┐
│  COMPLIANCE REPORTS READY               │
│  Monday, January 22, 2026              │
├─────────────────────────────────────────┤
│                                         │
│  Your compliance documentation packages │
│  are ready for download.                │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ SOC 2 Type II                   │   │
│  │ 📦 soc2-compliance-package.zip  │   │
│  │ 📊 245 KB                       │   │
│  │ [Download Package]              │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ISO 27001                       │   │
│  │ 📦 iso27001-compliance-...zip   │   │
│  │ 📊 198 KB                       │   │
│  │ [Download Package]              │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ⚠️ Links expire in 7 days             │
│                                         │
├─────────────────────────────────────────┤
│  ZeroShare Compliance System            │
│  compliance@zeroshare.io                │
└─────────────────────────────────────────┘
```

---

## Schedule

| Schedule | Frequency | Description |
|----------|-----------|-------------|
| Weekly | Every Monday 8 AM UTC | Full report generation |
| On-demand | Manual trigger | Generate specific reports |
| On upload | S3 trigger | Email when new reports uploaded |

---

## Troubleshooting

### Email Not Received

1. Check SES sending limits and sandbox status
2. Verify sender email is verified in SES
3. Check spam/junk folder
4. Review CloudWatch logs for Lambda errors

### S3 Upload Failed

1. Verify IAM permissions
2. Check bucket exists and is accessible
3. Verify AWS credentials in GitHub secrets

### Package Generation Failed

1. Check Node.js version (requires 18+)
2. Verify all source files exist
3. Check disk space for output

---

## Security Considerations

- S3 bucket has encryption enabled (AES-256)
- Public access is blocked
- Pre-signed URLs expire after 7 days
- Reports auto-delete after 90 days
- All access is logged in CloudTrail

---

## Commands Reference

```bash
# Generate and send all reports
npm run compliance:send-all

# Generate specific certification
npm run compliance:send-report -- --cert=soc2

# Override email recipient
npm run compliance:send-report -- --email=auditor@firm.com

# Local generation only (no S3/email)
npm run compliance:local

# Generate evidence artifacts only
npm run compliance:generate
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `COMPLIANCE_S3_BUCKET` | S3 bucket for reports | `zeroshare-compliance-reports` |
| `COMPLIANCE_EMAIL_FROM` | Sender email | `compliance@zeroshare.io` |
| `COMPLIANCE_EMAIL_TO` | Recipient email | `compliance@zeroshare.io` |
| `AWS_REGION` | AWS region | `us-east-1` |
