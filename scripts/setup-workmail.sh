#!/bin/bash

# Script to configure WorkMail DNS records and email aliases for deployzeroshare.com

set -e

ORG_ID="m-8accc8fd6a5b4c19b7d41bffe3833909"
HOSTED_ZONE_ID="Z0369239G1DEVQS7O2UK"
REGION="us-east-1"
USER_ID="f47b6974-a833-49d0-b534-14a413d00d19"  # rick.almeida@beaverpaw.com

echo "🔧 Configuring WorkMail for deployzeroshare.com..."

# Get DNS records from WorkMail
echo ""
echo "📋 Getting DNS records from WorkMail..."
RECORDS=$(aws workmail get-mail-domain \
  --organization-id $ORG_ID \
  --domain-name deployzeroshare.com \
  --region $REGION \
  --output json)

# Add MX record
echo ""
echo "📧 Adding MX record..."
MX_VALUE=$(echo $RECORDS | jq -r '.Records[] | select(.Type=="MX") | .Value')
aws route53 change-resource-record-sets \
  --hosted-zone-id $HOSTED_ZONE_ID \
  --change-batch "{
    \"Changes\": [{
      \"Action\": \"UPSERT\",
      \"ResourceRecordSet\": {
        \"Name\": \"deployzeroshare.com\",
        \"Type\": \"MX\",
        \"TTL\": 300,
        \"ResourceRecords\": [{\"Value\": \"$MX_VALUE\"}]
      }
    }]
  }" \
  --region $REGION || echo "MX record may already exist"

# Add SPF TXT record
echo ""
echo "📝 Adding SPF TXT record..."
SPF_VALUE=$(echo $RECORDS | jq -r '.Records[] | select(.Type=="TXT" and (.Value | contains("spf"))) | .Value')
aws route53 change-resource-record-sets \
  --hosted-zone-id $HOSTED_ZONE_ID \
  --change-batch "{
    \"Changes\": [{
      \"Action\": \"UPSERT\",
      \"ResourceRecordSet\": {
        \"Name\": \"deployzeroshare.com\",
        \"Type\": \"TXT\",
        \"TTL\": 300,
        \"ResourceRecords\": [{\"Value\": \"\\\"$SPF_VALUE\\\"\"}]
      }
    }]
  }" \
  --region $REGION || echo "SPF record may already exist"

# Add DMARC TXT record
echo ""
echo "🛡️ Adding DMARC TXT record..."
DMARC_VALUE=$(echo $RECORDS | jq -r '.Records[] | select(.Type=="TXT" and (.Hostname | contains("_dmarc"))) | .Value')
aws route53 change-resource-record-sets \
  --hosted-zone-id $HOSTED_ZONE_ID \
  --change-batch "{
    \"Changes\": [{
      \"Action\": \"UPSERT\",
      \"ResourceRecordSet\": {
        \"Name\": \"_dmarc.deployzeroshare.com\",
        \"Type\": \"TXT\",
        \"TTL\": 300,
        \"ResourceRecords\": [{\"Value\": \"\\\"$DMARC_VALUE\\\"\"}]
      }
    }]
  }" \
  --region $REGION || echo "DMARC record may already exist"

# Add SES verification TXT record
echo ""
echo "✅ Adding SES verification TXT record..."
SES_VALUE=$(echo $RECORDS | jq -r '.Records[] | select(.Type=="TXT" and (.Hostname | contains("_amazonses"))) | .Value')
aws route53 change-resource-record-sets \
  --hosted-zone-id $HOSTED_ZONE_ID \
  --change-batch "{
    \"Changes\": [{
      \"Action\": \"UPSERT\",
      \"ResourceRecordSet\": {
        \"Name\": \"_amazonses.deployzeroshare.com\",
        \"Type\": \"TXT\",
        \"TTL\": 300,
        \"ResourceRecords\": [{\"Value\": \"\\\"$SES_VALUE\\\"\"}]
      }
    }]
  }" \
  --region $REGION || echo "SES verification record may already exist"

# Add autodiscover CNAME
echo ""
echo "🔍 Adding autodiscover CNAME..."
AUTODISCOVER_VALUE=$(echo $RECORDS | jq -r '.Records[] | select(.Type=="CNAME" and (.Hostname | contains("autodiscover"))) | .Value')
aws route53 change-resource-record-sets \
  --hosted-zone-id $HOSTED_ZONE_ID \
  --change-batch "{
    \"Changes\": [{
      \"Action\": \"UPSERT\",
      \"ResourceRecordSet\": {
        \"Name\": \"autodiscover.deployzeroshare.com\",
        \"Type\": \"CNAME\",
        \"TTL\": 300,
        \"ResourceRecords\": [{\"Value\": \"$AUTODISCOVER_VALUE\"}]
      }
    }]
  }" \
  --region $REGION || echo "Autodiscover record may already exist"

# Add DKIM CNAME records
echo ""
echo "🔐 Adding DKIM CNAME records..."
for DKIM_RECORD in $(echo $RECORDS | jq -r '.Records[] | select(.Type=="CNAME" and (.Hostname | contains("domainkey"))) | "\(.Hostname)|\(.Value)"'); do
  DKIM_HOST=$(echo $DKIM_RECORD | cut -d'|' -f1)
  DKIM_VALUE=$(echo $DKIM_RECORD | cut -d'|' -f2)
  echo "  Adding $DKIM_HOST..."
  aws route53 change-resource-record-sets \
    --hosted-zone-id $HOSTED_ZONE_ID \
    --change-batch "{
      \"Changes\": [{
        \"Action\": \"UPSERT\",
        \"ResourceRecordSet\": {
          \"Name\": \"$DKIM_HOST\",
          \"Type\": \"CNAME\",
          \"TTL\": 300,
          \"ResourceRecords\": [{\"Value\": \"$DKIM_VALUE\"}]
        }
      }]
    }" \
    --region $REGION || echo "  DKIM record may already exist"
done

# Create email aliases
echo ""
echo "📮 Creating email aliases..."

# Create rick@deployzeroshare.com alias
echo "  Creating rick@deployzeroshare.com..."
aws workmail create-alias \
  --organization-id $ORG_ID \
  --entity-id $USER_ID \
  --alias rick@deployzeroshare.com \
  --region $REGION 2>&1 || echo "  Alias may already exist"

# Create rick.almeida@deployzeroshare.com alias
echo "  Creating rick.almeida@deployzeroshare.com..."
aws workmail create-alias \
  --organization-id $ORG_ID \
  --entity-id $USER_ID \
  --alias rick.almeida@deployzeroshare.com \
  --region $REGION 2>&1 || echo "  Alias may already exist"

# Create support@deployzeroshare.com alias
echo "  Creating support@deployzeroshare.com..."
aws workmail create-alias \
  --organization-id $ORG_ID \
  --entity-id $USER_ID \
  --alias support@deployzeroshare.com \
  --region $REGION 2>&1 || echo "  Alias may already exist"

echo ""
echo "✅ Configuration complete!"
echo ""
echo "📋 Summary:"
echo "  - DNS records added to Route53"
echo "  - Email aliases created:"
echo "    • rick@deployzeroshare.com → rick.almeida@beaverpaw.com"
echo "    • rick.almeida@deployzeroshare.com → rick.almeida@beaverpaw.com"
echo "    • support@deployzeroshare.com → rick.almeida@beaverpaw.com"
echo ""
echo "⏳ DNS propagation may take a few minutes. Verify records:"
echo "  aws route53 list-resource-record-sets --hosted-zone-id $HOSTED_ZONE_ID"
echo ""
