# AWS Partner Central Profile Update Guide

## Overview
This guide helps you update your AWS Partner Central public profile to use `deployzeroshare.com` instead of `beaverpaw.com`.

## Finding Your Partner ID

The Partner ID is required to update your profile. To find it:

### Option 1: AWS Partner Central Console
1. Go to https://partnercentral.aws.amazon.com/
2. Navigate to **Account** → **Partner Profile**
3. Check the URL - it will contain your Partner ID
4. Format: `partner-XXXXXXXXXXXXX` (13 alphanumeric characters)

### Option 2: Check Current Profile API
Try running (you may need to adjust the identifier):
```bash
aws partnercentral-account get-partner --catalog AWS --identifier <your-partner-id> --region us-east-1
```

## Updating Your Profile

### Using the Script (Recommended)

1. **Set your Partner ID:**
   ```bash
   export PARTNER_ID='partner-XXXXXXXXXXXXX'  # Replace with your actual Partner ID
   ```

2. **Run the update script:**
   ```bash
   ./scripts/update-partner-profile.sh
   ```

The script will:
- Retrieve your current profile information
- Update website URL to `https://deployzeroshare.com`
- Update display name to remove beaverpaw branding
- Update description to replace beaverpaw.com references
- Preserve your logo URL (unless you update it manually)

### Manual Update via AWS CLI

If you prefer to update manually:

```bash
# Set variables
export PARTNER_ID='partner-XXXXXXXXXXXXX'
export CATALOG='AWS'  # Use 'Sandbox' for testing

# Create task details JSON
cat > /tmp/profile-update.json <<EOF
{
  "DisplayName": "ZeroShare",
  "Description": "On-premise AI security gateway protecting enterprises from data leaks and secret exposure when using ChatGPT, Copilot, and other AI tools.",
  "WebsiteUrl": "https://deployzeroshare.com",
  "LogoUrl": "https://deployzeroshare.com/logo.png",
  "PrimarySolutionType": "SOFTWARE_PRODUCTS",
  "IndustrySegments": ["COMPUTER_SOFTWARE"]
}
EOF

# Start the update task
aws partnercentral-account start-profile-update-task \
  --catalog "$CATALOG" \
  --identifier "$PARTNER_ID" \
  --task-details file:///tmp/profile-update.json \
  --region us-east-1

# Check task status (replace TASK_ID with the ID from the response)
aws partnercentral-account get-profile-update-task \
  --catalog "$CATALOG" \
  --identifier "$PARTNER_ID" \
  --task-id <TASK_ID> \
  --region us-east-1
```

## Logo Update

**Note:** The script preserves your current logo URL. To update the logo:

1. **Generate a new logo** (you mentioned using Gemini 3 CLI or nanobanana)
2. **Upload the logo** to a publicly accessible URL (e.g., S3, your website)
3. **Update the LogoUrl** in the profile update task

### Logo Requirements:
- Format: PNG or JPG
- Size: Recommended 200x200px minimum
- URL: Must be publicly accessible HTTPS URL
- Pattern: `https://[domain]/[path]`

Example logo URL: `https://deployzeroshare.com/images/logo.png`

## Profile Update Process

1. **Task Creation**: The update is submitted as an asynchronous task
2. **Validation**: AWS validates the profile information (can take a few minutes)
3. **Status**: Check task status using `get-profile-update-task`
4. **Completion**: Once status is `SUCCEEDED`, your profile is updated

## Checking Current Profile

To view your current profile:
```bash
aws partnercentral-account get-partner \
  --catalog AWS \
  --identifier "$PARTNER_ID" \
  --region us-east-1 \
  --output json | jq '.Partner.Profile'
```

## Troubleshooting

### Error: "Partner ID not found"
- Verify your Partner ID format: `partner-` + 13 alphanumeric characters
- Ensure you're using the correct catalog (`AWS` for production)

### Error: "Invalid website URL"
- Ensure URL starts with `https://`
- URL must be publicly accessible

### Error: "Invalid logo URL"
- Logo must be accessible via HTTPS
- Check logo file format and size requirements

### Task Status: FAILED
- Check error details: `get-profile-update-task` will show error reasons
- Common issues: Invalid URLs, content validation failures

## Next Steps

1. ✅ Find your Partner ID from AWS Partner Central console
2. ✅ Run the update script with your Partner ID
3. ✅ Generate and upload a new logo (if needed)
4. ✅ Verify the update in AWS Partner Central console
5. ✅ Check your public partner profile listing
