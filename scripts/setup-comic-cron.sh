#!/bin/bash
#===============================================================================
# "The Gateway" comic — Thursday release cron
#
# Every Thursday 8 AM ET: trigger Amplify deploy, then post that week's episode
# to LinkedIn. Blog posts for that episode go live only on release day.
#
# Prereqs: git push access, LINKEDIN_ACCESS_TOKEN (and LINKEDIN_LIVE_MODE=true)
# in tools/linkedin/.env. GOOGLE_API_KEY for image generation (run comics:generate
# beforehand).
#
# Usage: ./scripts/setup-comic-cron.sh
#===============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
RELEASE_SCRIPT="$SCRIPT_DIR/release-comic-thursday.sh"

# Remove any existing comic release cron entries
crontab -l 2>/dev/null | grep -v "release-comic-thursday" | crontab - 2>/dev/null || true

# Thursday 8 AM ET
(crontab -l 2>/dev/null; echo "0 8 * * 4 TZ=America/New_York $RELEASE_SCRIPT >> $REPO_DIR/tools/linkedin/logs/comic-release.log 2>&1") | crontab -

mkdir -p "$REPO_DIR/tools/linkedin/logs"
echo "✅ Comic Thursday cron installed."
echo "   Schedule: Thursday 8:00 AM ET"
echo "   Log: tools/linkedin/logs/comic-release.log"
echo "   Test: $RELEASE_SCRIPT --no-push --no-wait --preview"
