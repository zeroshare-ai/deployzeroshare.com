#!/bin/bash

# Script to deploy the support email Lambda function
# This creates a Lambda function and API Gateway endpoint

set -e

echo "🚀 Deploying support email Lambda function..."

# Configuration
FUNCTION_NAME="deployzeroshare-support-email"
REGION="us-east-1"
ROLE_NAME="deployzeroshare-lambda-role"
FROM_EMAIL="no-reply@deployzeroshare.com"
TO_EMAIL="rick@beaverpaw.com"

# Check if Lambda function exists
FUNCTION_EXISTS=$(aws lambda get-function \
  --function-name "$FUNCTION_NAME" \
  --region "$REGION" \
  --query 'Configuration.FunctionName' \
  --output text 2>/dev/null || echo "")

if [ -z "$FUNCTION_EXISTS" ]; then
  echo "📦 Creating Lambda function..."
  
  # Create IAM role for Lambda
  echo "Creating IAM role..."
  ROLE_ARN=$(aws iam create-role \
    --role-name "$ROLE_NAME" \
    --assume-role-policy-document '{
      "Version": "2012-10-17",
      "Statement": [{
        "Effect": "Allow",
        "Principal": {"Service": "lambda.amazonaws.com"},
        "Action": "sts:AssumeRole"
      }]
    }' \
    --query 'Role.Arn' \
    --output text 2>/dev/null || \
    aws iam get-role \
      --role-name "$ROLE_NAME" \
      --query 'Role.Arn' \
      --output text)

  # Attach SES policy
  echo "Attaching SES permissions..."
  aws iam attach-role-policy \
    --role-name "$ROLE_NAME" \
    --policy-arn arn:aws:iam::aws:policy/AmazonSESFullAccess 2>/dev/null || true

  # Attach basic Lambda execution policy
  aws iam attach-role-policy \
    --role-name "$ROLE_NAME" \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole 2>/dev/null || true

  # Wait for role to be ready
  echo "Waiting for IAM role to be ready..."
  sleep 5

  # Create deployment package
  echo "Creating deployment package..."
  cd lambda/support-email
  npm install --production
  zip -r function.zip . -x "*.git*" "*.zip"
  cd ../..

  # Create Lambda function
  aws lambda create-function \
    --function-name "$FUNCTION_NAME" \
    --runtime nodejs18.x \
    --role "$ROLE_ARN" \
    --handler index.handler \
    --zip-file fileb://lambda/support-email/function.zip \
    --timeout 30 \
    --memory-size 256 \
    --environment "Variables={FROM_EMAIL=$FROM_EMAIL,TO_EMAIL=$TO_EMAIL,AWS_REGION=$REGION}" \
    --region "$REGION"

  echo "✅ Lambda function created!"
else
  echo "📦 Updating existing Lambda function..."
  
  # Create deployment package
  cd lambda/support-email
  npm install --production
  zip -r function.zip . -x "*.git*" "*.zip"
  cd ../..

  # Update Lambda function
  aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file fileb://lambda/support-email/function.zip \
    --region "$REGION"

  # Update environment variables
  aws lambda update-function-configuration \
    --function-name "$FUNCTION_NAME" \
    --environment "Variables={FROM_EMAIL=$FROM_EMAIL,TO_EMAIL=$TO_EMAIL,AWS_REGION=$REGION}" \
    --region "$REGION"

  echo "✅ Lambda function updated!"
fi

# Create or update API Gateway
echo ""
echo "🌐 Setting up API Gateway..."

# Check if API exists
API_ID=$(aws apigateway get-rest-apis \
  --region "$REGION" \
  --query "items[?name=='$FUNCTION_NAME-api'].id" \
  --output text 2>/dev/null || echo "")

if [ -z "$API_ID" ]; then
  echo "Creating API Gateway..."
  API_ID=$(aws apigateway create-rest-api \
    --name "$FUNCTION_NAME-api" \
    --description "API for ZeroShare Gateway support form" \
    --region "$REGION" \
    --query 'id' \
    --output text)

  # Get root resource ID
  ROOT_ID=$(aws apigateway get-resources \
    --rest-api-id "$API_ID" \
    --region "$REGION" \
    --query 'items[?path==`/`].id' \
    --output text)

  # Create /support resource
  RESOURCE_ID=$(aws apigateway create-resource \
    --rest-api-id "$API_ID" \
    --parent-id "$ROOT_ID" \
    --path-part "support" \
    --region "$REGION" \
    --query 'id' \
    --output text)

  # Create POST method
  aws apigateway put-method \
    --rest-api-id "$API_ID" \
    --resource-id "$RESOURCE_ID" \
    --http-method POST \
    --authorization-type NONE \
    --region "$REGION"

  # Set up integration
  LAMBDA_ARN=$(aws lambda get-function \
    --function-name "$FUNCTION_NAME" \
    --region "$REGION" \
    --query 'Configuration.FunctionArn' \
    --output text)

  aws apigateway put-integration \
    --rest-api-id "$API_ID" \
    --resource-id "$RESOURCE_ID" \
    --http-method POST \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations" \
    --region "$REGION"

  # Add CORS
  aws apigateway put-method-response \
    --rest-api-id "$API_ID" \
    --resource-id "$RESOURCE_ID" \
    --http-method POST \
    --status-code 200 \
    --response-parameters "method.response.header.Access-Control-Allow-Origin=true" \
    --region "$REGION"

  # Deploy API
  aws apigateway create-deployment \
    --rest-api-id "$API_ID" \
    --stage-name "prod" \
    --region "$REGION"

  echo "✅ API Gateway created!"
else
  echo "API Gateway already exists. Updating..."
  
  # Get resource ID
  RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id "$API_ID" \
    --region "$REGION" \
    --query "items[?path=='/support'].id" \
    --output text)

  if [ -z "$RESOURCE_ID" ]; then
    ROOT_ID=$(aws apigateway get-resources \
      --rest-api-id "$API_ID" \
      --region "$REGION" \
      --query 'items[?path==`/`].id' \
      --output text)
    
    RESOURCE_ID=$(aws apigateway create-resource \
      --rest-api-id "$API_ID" \
      --parent-id "$ROOT_ID" \
      --path-part "support" \
      --region "$REGION" \
      --query 'id' \
      --output text)
  fi

  # Update deployment
  aws apigateway create-deployment \
    --rest-api-id "$API_ID" \
    --stage-name "prod" \
    --region "$REGION"
fi

# Get API endpoint URL
API_URL="https://$API_ID.execute-api.$REGION.amazonaws.com/prod/support"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 API Endpoint: $API_URL"
echo ""
echo "📝 Next steps:"
echo "   1. Update NEXT_PUBLIC_SUPPORT_API_URL in your environment variables"
echo "   2. Or update the API endpoint in app/support/page.tsx"
echo "   3. Test the form submission"
echo ""
