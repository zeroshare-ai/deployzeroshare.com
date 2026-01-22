# Email Notification Setup Guide

## Overview

The deployment workflow now sends email notifications when tests pass or fail. You'll receive:
- ✅ **Success emails** when all tests pass
- ❌ **Failure emails** when critical tests fail

## Setup Instructions

### Option 1: GitHub Built-in Notifications (Easiest)

GitHub can send email notifications automatically:

1. Go to: https://github.com/settings/notifications
2. Scroll to "Actions" section
3. Check "Email" notifications
4. Choose:
   - "All workflow runs" (get notified on every deployment)
   - OR "Only failed workflows" (only get notified when tests fail)

**Pros:** No setup, works immediately  
**Cons:** Less detailed, can't customize email content

### Option 2: Custom Email via SMTP (More Control)

The workflow uses `dawidd6/action-send-mail` to send detailed test results.

#### Setup Steps:

1. **Get Gmail App Password** (if using Gmail):
   - Go to: https://myaccount.google.com/apppasswords
   - Generate an app password for "Mail"
   - Save the 16-character password

2. **Add GitHub Secrets**:
   - Go to: https://github.com/zeroshare-ai/deployzeroshare.com/settings/secrets/actions
   - Click "New repository secret"
   - Add these secrets:
     - `EMAIL_USERNAME`: Your Gmail address (e.g., `rick@beaverpaw.com`)
     - `EMAIL_PASSWORD`: Your Gmail app password (16-char app password)
     - `EMAIL_FROM`: Sender email (e.g., `deployzeroshare@beaverpaw.com` or your Gmail)
     - `EMAIL_TO`: Recipient email (e.g., `rick@beaverpaw.com`)

3. **For Other Email Providers**:
   - Update `server_address` and `server_port` in the workflow
   - Common SMTP settings:
     - **Gmail**: `smtp.gmail.com:465`
     - **Outlook**: `smtp-mail.outlook.com:587`
     - **SendGrid**: `smtp.sendgrid.net:587`
     - **AWS SES**: Use your SES SMTP endpoint

## What Happens When Tests Fail?

### Current Behavior:

1. **Critical Tests Fail** (smoke tests, link validation):
   - ❌ Workflow is marked as **FAILED**
   - 📧 Email notification sent
   - ⚠️ Deployment is already live (Amplify doesn't auto-rollback)
   - 🔍 You need to manually fix and redeploy

2. **Non-Critical Tests Fail** (support form):
   - ⚠️ Test continues with `continue-on-error: true`
   - ✅ Workflow still passes
   - 📧 No failure email (but you can check logs)

### Rollback Strategy:

**AWS Amplify doesn't automatically rollback failed deployments.** However:

1. **Failed workflow = Failed deployment status** in GitHub Actions
2. **You can manually rollback** in AWS Amplify Console:
   - Go to Amplify app
   - Click on the failed deployment
   - Click "Redeploy this version" to rollback to previous working version

3. **Future Enhancement** (optional):
   - We can add automatic rollback via AWS CLI if tests fail
   - Requires additional AWS permissions and setup

## Recommended Approach

1. **Enable GitHub email notifications** (Option 1) for immediate alerts
2. **Set up custom email** (Option 2) for detailed test reports
3. **Monitor GitHub Actions** for test results
4. **Manually rollback** in Amplify if critical tests fail

## Test Failure Scenarios

| Test Type | Failure Impact | Email Sent? | Rollback? |
|-----------|---------------|-------------|-----------|
| Smoke tests | ❌ Workflow fails | ✅ Yes | Manual |
| Link validation | ❌ Workflow fails | ✅ Yes | Manual |
| Support form | ⚠️ Continues | ❌ No | No |
| Deployment verification | ❌ Workflow fails | ✅ Yes | Manual |

## Next Steps

1. Choose your notification method (GitHub built-in or custom SMTP)
2. If using custom SMTP, add the secrets to GitHub
3. Push a test commit to verify emails are working
4. Consider setting up automatic rollback if needed (requires additional setup)
