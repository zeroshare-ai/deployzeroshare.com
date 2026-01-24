#!/bin/bash
#===============================================================================
# ZeroShare LinkedIn Cron Setup
# 
# Run this script to restore the LinkedIn posting schedule after:
# - New machine setup
# - Cron was cleared
# - Fresh git clone
#
# Usage: ./setup-cron.sh
#===============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "📅 Setting up ZeroShare LinkedIn cron jobs..."
echo ""

# Remove any existing ZeroShare LinkedIn cron entries
crontab -l 2>/dev/null | grep -v "deployzeroshare.com/tools/linkedin" | crontab - 2>/dev/null || true

# Add the optimized posting schedule
(crontab -l 2>/dev/null; cat << CRON
# ZeroShare LinkedIn - Optimized B2B Schedule
# Target: CISOs, CTOs, Engineering Managers
# Goal: Drive AWS Marketplace traffic

# Tuesday-Thursday: 2x/day (peak B2B engagement)
# 8:00 AM ET - Morning commute/coffee
0 8 * * 2-4 cd $SCRIPT_DIR && /usr/bin/npm run post:next >> $SCRIPT_DIR/logs/post.log 2>&1

# 5:00 PM ET - End of workday scroll
0 17 * * 2-4 cd $SCRIPT_DIR && /usr/bin/npm run post:next >> $SCRIPT_DIR/logs/post.log 2>&1

# Monday & Friday: 1x/day (lower engagement days)
# 8:00 AM ET only
0 8 * * 1,5 cd $SCRIPT_DIR && /usr/bin/npm run post:next >> $SCRIPT_DIR/logs/post.log 2>&1

# Weekly Content Generation - Sunday 8 PM ET (blogs + whitepapers)
0 20 * * 0 cd $SCRIPT_DIR && /usr/bin/npm run generate:all >> $SCRIPT_DIR/logs/generate.log 2>&1
CRON
) | crontab -

# Create logs directory
mkdir -p "$SCRIPT_DIR/logs"

echo "✅ Cron jobs installed!"
echo ""
echo "📋 Schedule:"
echo "   Mon/Fri:     8:00 AM ET (1 post)"
echo "   Tue-Thu:     8:00 AM + 5:00 PM ET (2 posts)"
echo "   Sunday:      8:00 PM ET (generate new content)"
echo ""
echo "📁 Logs:"
echo "   $SCRIPT_DIR/logs/post.log"
echo "   $SCRIPT_DIR/logs/generate.log"
echo ""
echo "🔧 Commands:"
echo "   crontab -l     # View schedule"
echo "   crontab -e     # Edit schedule"
echo ""

# Check if .env exists
if [ ! -f "$SCRIPT_DIR/.env" ]; then
    echo "⚠️  WARNING: .env file not found!"
    echo "   Copy from env.example and add your LinkedIn credentials:"
    echo "   cp $SCRIPT_DIR/env.example $SCRIPT_DIR/.env"
    echo ""
fi
