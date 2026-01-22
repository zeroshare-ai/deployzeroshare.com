# Amplify Backend Resources

This directory contains backend infrastructure definitions that are automatically deployed by AWS Amplify.

## Structure

```
amplify/backend/
└── function/
    └── support-email/
        ├── template.yaml    # AWS SAM/CloudFormation template
        ├── index.js         # Lambda function code
        └── package.json     # Node.js dependencies
```

## Deployment

The Lambda function is automatically deployed during the Amplify build process via the `backend` section in `amplify.yml`.

## Configuration

- **Function Name:** `deployzeroshare-support-email`
- **Runtime:** Node.js 18.x
- **API Endpoint:** `/support` (POST)
- **From Email:** `no-reply@deployzeroshare.com`
- **To Email:** `rick@beaverpaw.com`

## Outputs

After deployment, the CloudFormation stack outputs:
- `ApiUrl` - The API Gateway endpoint URL for the support form
- `FunctionArn` - The Lambda function ARN

To get the API URL after deployment:
```bash
aws cloudformation describe-stacks \
  --stack-name deployzeroshare-support-email \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiUrl`].OutputValue' \
  --output text
```

Then update `app/support/page.tsx` with the API URL or set it as an environment variable.
