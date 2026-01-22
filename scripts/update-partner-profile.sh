#!/bin/bash
# Script to update AWS Partner Central public profile
# Updates website URL and branding from beaverpaw.com to deployzeroshare.com

set -e

# Configuration
CATALOG="AWS"  # Use "Sandbox" for testing
REGION="us-east-1"

# Partner identifier - you need to get this from AWS Partner Central console
# Format: partner-XXXXXXXXXXXXX (13 alphanumeric characters)
# To find it: Go to AWS Partner Central → Account → Partner Profile
# Or check the URL when viewing your partner profile
# Default: Try to use numeric ID 2608007 (will be converted to proper format)
PARTNER_ID="${PARTNER_ID:-2608007}"

# Convert numeric ID to partner-XXXXXXXXXXXXX format if needed
if [[ ! "$PARTNER_ID" =~ ^partner- ]]; then
    # If it's just a number, try to format it
    if [[ "$PARTNER_ID" =~ ^[0-9]+$ ]]; then
        # Try different formats
        FORMATTED_ID=$(printf "partner-%013d" "$PARTNER_ID")
        echo "⚠️  Converting numeric ID to format: $FORMATTED_ID"
        PARTNER_ID="$FORMATTED_ID"
    else
        echo "❌ Error: PARTNER_ID must be in format 'partner-XXXXXXXXXXXXX' or a numeric ID"
        echo "   Provided: $PARTNER_ID"
        echo ""
        echo "To find your Partner ID:"
        echo "1. Go to https://partnercentral.aws.amazon.com/"
        echo "2. Navigate to Account → Partner Profile"
        echo "3. Check the URL or profile details for your Partner ID"
        echo ""
        echo "Then run:"
        echo "  export PARTNER_ID='partner-XXXXXXXXXXXXX'"
        echo "  ./scripts/update-partner-profile.sh"
        exit 1
    fi
fi

# Get current partner info to preserve existing values
echo "📋 Retrieving current partner profile..."
CURRENT_PROFILE=$(aws partnercentral-account get-partner \
    --catalog "$CATALOG" \
    --identifier "$PARTNER_ID" \
    --region "$REGION" \
    --output json 2>&1)

if [ $? -ne 0 ]; then
    echo "❌ Error retrieving partner profile. Check your PARTNER_ID."
    echo "$CURRENT_PROFILE"
    exit 1
fi

# Extract current values (you may need to adjust these based on actual response structure)
CURRENT_DISPLAY_NAME=$(echo "$CURRENT_PROFILE" | jq -r '.Partner.Profile.DisplayName // "ZeroShare"')
CURRENT_DESCRIPTION=$(echo "$CURRENT_PROFILE" | jq -r '.Partner.Profile.Description // "On-premise AI security gateway"')
CURRENT_LOGO_URL=$(echo "$CURRENT_PROFILE" | jq -r '.Partner.Profile.LogoUrl // ""')
CURRENT_PRIMARY_SOLUTION_TYPE=$(echo "$CURRENT_PROFILE" | jq -r '.Partner.Profile.PrimarySolutionType // "SOFTWARE_PRODUCTS"')
CURRENT_INDUSTRY_SEGMENTS=$(echo "$CURRENT_PROFILE" | jq -r '.Partner.Profile.IndustrySegments // ["COMPUTER_SOFTWARE"] | @json')

# Update website URL to deployzeroshare.com
NEW_WEBSITE_URL="https://deployzeroshare.com"

# Set logo URL to the new logo on deployzeroshare.com
NEW_LOGO_URL="https://deployzeroshare.com/logo_150x150.png"

# If current logo URL exists and doesn't contain beaverpaw, we could keep it
# But for now, always update to the new logo
if [[ -n "$CURRENT_LOGO_URL" ]] && [[ "$CURRENT_LOGO_URL" != *"beaverpaw.com"* ]] && [[ "$CURRENT_LOGO_URL" != *"deployzeroshare.com"* ]]; then
    echo "ℹ️  Current logo URL: $CURRENT_LOGO_URL"
    echo "   Will update to: $NEW_LOGO_URL"
fi

# Update display name to remove beaverpaw branding
if [[ "$CURRENT_DISPLAY_NAME" == *"beaverpaw"* ]] || [[ "$CURRENT_DISPLAY_NAME" == *"BeaverPaw"* ]]; then
    NEW_DISPLAY_NAME="ZeroShare"
else
    NEW_DISPLAY_NAME="$CURRENT_DISPLAY_NAME"
fi

# Update description to remove beaverpaw references
NEW_DESCRIPTION=$(echo "$CURRENT_DESCRIPTION" | sed 's/beaverpaw\.com/deployzeroshare.com/g' | sed 's/BeaverPaw/ZeroShare/g')

echo ""
echo "📝 Updating Partner Profile:"
echo "   Display Name: $NEW_DISPLAY_NAME"
echo "   Website URL: $NEW_WEBSITE_URL"
echo "   Logo URL: $NEW_LOGO_URL"
echo "   Description: $NEW_DESCRIPTION"
echo ""

# Create task details JSON
TASK_DETAILS=$(jq -n \
    --arg displayName "$NEW_DISPLAY_NAME" \
    --arg description "$NEW_DESCRIPTION" \
    --arg websiteUrl "$NEW_WEBSITE_URL" \
    --arg logoUrl "$NEW_LOGO_URL" \
    --arg solutionType "$CURRENT_PRIMARY_SOLUTION_TYPE" \
    --argjson industrySegments "$CURRENT_INDUSTRY_SEGMENTS" \
    --arg translationSourceLocale "en-US" \
    '{
        "DisplayName": $displayName,
        "Description": $description,
        "WebsiteUrl": $websiteUrl,
        "LogoUrl": $logoUrl,
        "PrimarySolutionType": $solutionType,
        "IndustrySegments": $industrySegments,
        "TranslationSourceLocale": $translationSourceLocale
    }')

# Start profile update task
echo "🚀 Starting profile update task..."
RESULT=$(aws partnercentral-account start-profile-update-task \
    --catalog "$CATALOG" \
    --identifier "$PARTNER_ID" \
    --task-details "$TASK_DETAILS" \
    --region "$REGION" \
    --output json 2>&1)

if [ $? -eq 0 ]; then
    TASK_ID=$(echo "$RESULT" | jq -r '.TaskId')
    echo "✅ Profile update task started successfully!"
    echo "   Task ID: $TASK_ID"
    echo ""
    echo "📊 Checking task status..."
    
    # Wait a moment and check status
    sleep 3
    aws partnercentral-account get-profile-update-task \
        --catalog "$CATALOG" \
        --identifier "$PARTNER_ID" \
        --task-id "$TASK_ID" \
        --region "$REGION" \
        --output json | jq '.'
    
    echo ""
    echo "✅ Profile update submitted! The update will be processed asynchronously."
    echo "   Check status with:"
    echo "   aws partnercentral-account get-profile-update-task --catalog $CATALOG --identifier $PARTNER_ID --task-id $TASK_ID --region $REGION"
else
    echo "❌ Error starting profile update:"
    echo "$RESULT"
    exit 1
fi
