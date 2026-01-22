# Support Form Setup Guide

This guide explains how to set up the support form with AWS SES email functionality.

## Prerequisites

- AWS CLI configured with appropriate credentials
- AWS SES access in your account
- Node.js and npm installed (for Lambda deployment)

## Step 1: Set Up AWS SES

Run the SES setup script to configure email sending:

```bash
./scripts/setup-ses.sh
```

This script will:
- Verify the email address `no-reply@deployzeroshare.com`
- Check domain verification status
- Verify the recipient email `rick@beaverpaw.com` (if in sandbox mode)
- Provide instructions for moving out of SES sandbox mode if needed

**Important:** 
- Check your email inbox and verify `no-reply@deployzeroshare.com`
- If your AWS account is in SES sandbox mode, also verify `rick@beaverpaw.com`
- Sandbox mode only allows sending to verified email addresses

## Step 2: Deploy Lambda Function

Deploy the Lambda function and API Gateway:

```bash
./scripts/deploy-lambda.sh
```

This script will:
- Create or update the Lambda function
- Set up API Gateway endpoint
- Configure IAM roles and permissions
- Output the API Gateway URL

**Note:** Save the API Gateway URL that's displayed at the end of the script.

## Step 3: Configure Frontend

Update the support form to use your API Gateway URL. You have two options:

### Option A: Environment Variable (Recommended)

Add to your `.env.local` file (or Amplify environment variables):

```
NEXT_PUBLIC_SUPPORT_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/support
```

### Option B: Direct Update

Edit `app/support/page.tsx` and replace the `apiEndpoint` line with your actual API Gateway URL.

## Step 4: Test the Form

1. Navigate to `/support` on your website
2. Fill out the support form
3. Submit the form
4. Check `rick@beaverpaw.com` for the support case email
5. Check the submitter's email for the confirmation email

## Troubleshooting

### Email Not Received

1. **Check SES Sandbox Mode:**
   ```bash
   aws ses get-account-sending-enabled --region us-east-1
   ```
   If in sandbox mode, verify recipient email addresses.

2. **Check Email Verification:**
   ```bash
   aws ses get-identity-verification-attributes \
     --identities no-reply@deployzeroshare.com \
     --region us-east-1
   ```

3. **Check Lambda Logs:**
   ```bash
   aws logs tail /aws/lambda/deployzeroshare-support-email --follow
   ```

### API Gateway Errors

1. **Check Lambda Function:**
   ```bash
   aws lambda get-function --function-name deployzeroshare-support-email
   ```

2. **Test Lambda Directly:**
   ```bash
   aws lambda invoke \
     --function-name deployzeroshare-support-email \
     --payload '{"httpMethod":"POST","body":"{\"name\":\"Test\",\"email\":\"test@example.com\",\"subject\":\"Test\",\"message\":\"Test message\"}"}' \
     response.json
   ```

### CORS Issues

If you see CORS errors, ensure the Lambda function includes CORS headers in the response (already configured in `lambda/support-email/index.js`).

## Moving Out of SES Sandbox

To send emails to any address (not just verified ones):

1. Go to AWS SES Console
2. Navigate to "Account dashboard"
3. Click "Request production access"
4. Fill out the form explaining your use case
5. Wait for AWS approval (usually 24-48 hours)

## Security Notes

- The Lambda function validates all input
- Email addresses are verified before sending
- CORS is configured to allow requests from your domain
- IAM roles follow least-privilege principles
- Sensitive data is not logged

## Cost Estimation

- **SES:** First 62,000 emails/month are free (if sent from EC2)
- **Lambda:** First 1M requests/month are free
- **API Gateway:** First 1M API calls/month are free

For typical usage, this setup should be free or very low cost.
