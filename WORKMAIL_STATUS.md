# WorkMail Configuration Status

## ✅ Completed

1. **DNS Records Added to Route53:**
   - MX record: `deployzeroshare.com` → `10 inbound-smtp.us-east-1.amazonaws.com`
   - SPF TXT record: `v=spf1 include:amazonses.com ~all`
   - DMARC TXT record: `_dmarc.deployzeroshare.com`
   - SES verification TXT: `_amazonses.deployzeroshare.com`
   - Autodiscover CNAME: `autodiscover.deployzeroshare.com`
   - DKIM CNAME records (3 records)

2. **Code Updates:**
   - All `support@zeroshare.com` → `support@deployzeroshare.com`
   - All `docs.zeroshare.com` → `docs.deployzeroshare.com`
   - Lambda function updated to use deployzeroshare.com

## ⏳ Pending Domain Verification

WorkMail needs to verify the domain before email aliases can be created. This typically takes 5-15 minutes after DNS records are added.

## 📋 Email Aliases to Create

Once domain is verified, run:

```bash
ORG_ID="m-8accc8fd6a5b4c19b7d41bffe3833909"
USER_ID="f47b6974-a833-49d0-b534-14a413d00d19"

# Create aliases
aws workmail create-alias --organization-id $ORG_ID --entity-id $USER_ID --alias rick@deployzeroshare.com --region us-east-1
aws workmail create-alias --organization-id $ORG_ID --entity-id $USER_ID --alias rick.almeida@deployzeroshare.com --region us-east-1
aws workmail create-alias --organization-id $ORG_ID --entity-id $USER_ID --alias support@deployzeroshare.com --region us-east-1
```

Or run the script again:
```bash
./scripts/setup-workmail.sh
```

## 📧 Email Configuration

All emails will be delivered to: **rick.almeida@beaverpaw.com**

Aliases:
- `rick@deployzeroshare.com` → rick.almeida@beaverpaw.com
- `rick.almeida@deployzeroshare.com` → rick.almeida@beaverpaw.com
- `support@deployzeroshare.com` → rick.almeida@beaverpaw.com

## 🔍 Verify Domain Status

```bash
aws workmail get-mail-domain \
  --organization-id m-8accc8fd6a5b4c19b7d41bffe3833909 \
  --domain-name deployzeroshare.com \
  --region us-east-1
```

## 📝 Next Steps

1. Wait 5-15 minutes for DNS propagation and WorkMail verification
2. Run the alias creation commands above
3. Test sending email to support@deployzeroshare.com
4. Update Lambda function to use support@deployzeroshare.com (already done in code)
