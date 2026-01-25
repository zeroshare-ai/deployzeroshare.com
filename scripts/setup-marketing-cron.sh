#!/bin/bash
#===============================================================================
# ZeroShare Marketing Cron – LinkedIn, Twitter, Comic (unified)
#
# Single install for all marketing automation. Ensures:
# - Content generation (Sun) → LinkedIn posts (Mon–Fri) → Twitter cross-posts
# - Comic release Thu 8 AM ET (replaces regular LinkedIn post that slot)
# - All times America/New_York
#
# Usage: ./scripts/setup-marketing-cron.sh
#===============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
LINKEDIN_DIR="$REPO_DIR/tools/linkedin"
TWITTER_DIR="$REPO_DIR/tools/twitter"
RELEASE_COMIC="$SCRIPT_DIR/release-comic-thursday.sh"

echo "📅 ZeroShare Marketing Cron (LinkedIn + Twitter + Comic)"
echo ""

# Remove existing ZeroShare marketing block (paths + comic script + block markers)
crontab -l 2>/dev/null | grep -v "deployzeroshare.com/tools/linkedin" | grep -v "deployzeroshare.com/tools/twitter" | grep -v "release-comic-thursday" | grep -v "BEGIN ZeroShare marketing" | grep -v "END ZeroShare marketing" | crontab - 2>/dev/null || true

# Ensure log dirs exist
mkdir -p "$LINKEDIN_DIR/logs" "$TWITTER_DIR/logs"

# Install unified schedule (all TZ=America/New_York)
(crontab -l 2>/dev/null; cat << CRON
# ----- BEGIN ZeroShare marketing -----
# Content generation – Sunday 8 PM ET
0 20 * * 0 TZ=America/New_York cd $LINKEDIN_DIR && /usr/bin/npm run generate:all >> $LINKEDIN_DIR/logs/generate.log 2>&1

# Blog generation – 1st & 3rd Sunday 9 PM ET (gated until BLOG_GENERATION_AFTER; see docs/BLOG_AUTOMATION_DECISIONS.md)
0 21 * * 0 TZ=America/New_York cd $REPO_DIR && /usr/bin/npm run blog:generate -- --cron >> $LINKEDIN_DIR/logs/blog-generate.log 2>&1

# LinkedIn post:next — Mon/Fri 8 AM, Tue–Thu 8 AM (Tue/Wed only; Thu 8 AM = comic), Tue–Thu 5 PM
0 8 * * 1 TZ=America/New_York cd $LINKEDIN_DIR && /usr/bin/npm run post:next >> $LINKEDIN_DIR/logs/post.log 2>&1
0 8 * * 5 TZ=America/New_York cd $LINKEDIN_DIR && /usr/bin/npm run post:next >> $LINKEDIN_DIR/logs/post.log 2>&1
0 8 * * 2 TZ=America/New_York cd $LINKEDIN_DIR && /usr/bin/npm run post:next >> $LINKEDIN_DIR/logs/post.log 2>&1
0 8 * * 3 TZ=America/New_York cd $LINKEDIN_DIR && /usr/bin/npm run post:next >> $LINKEDIN_DIR/logs/post.log 2>&1
0 17 * * 2 TZ=America/New_York cd $LINKEDIN_DIR && /usr/bin/npm run post:next >> $LINKEDIN_DIR/logs/post.log 2>&1
0 17 * * 3 TZ=America/New_York cd $LINKEDIN_DIR && /usr/bin/npm run post:next >> $LINKEDIN_DIR/logs/post.log 2>&1
0 17 * * 4 TZ=America/New_York cd $LINKEDIN_DIR && /usr/bin/npm run post:next >> $LINKEDIN_DIR/logs/post.log 2>&1

# Comic – Thursday 8 AM ET only (no post:next this slot)
0 8 * * 4 TZ=America/New_York $RELEASE_COMIC >> $LINKEDIN_DIR/logs/comic-release.log 2>&1

# Twitter cross-post – ~15 min after each LinkedIn post (same days/times, except Thu 8 AM = comic)
15 8 * * 1 TZ=America/New_York cd $TWITTER_DIR && TWITTER_LIVE_MODE=true /usr/bin/npm run post >> $TWITTER_DIR/logs/crosspost.log 2>&1
15 8 * * 5 TZ=America/New_York cd $TWITTER_DIR && TWITTER_LIVE_MODE=true /usr/bin/npm run post >> $TWITTER_DIR/logs/crosspost.log 2>&1
15 8 * * 2 TZ=America/New_York cd $TWITTER_DIR && TWITTER_LIVE_MODE=true /usr/bin/npm run post >> $TWITTER_DIR/logs/crosspost.log 2>&1
15 8 * * 3 TZ=America/New_York cd $TWITTER_DIR && TWITTER_LIVE_MODE=true /usr/bin/npm run post >> $TWITTER_DIR/logs/crosspost.log 2>&1
15 17 * * 2 TZ=America/New_York cd $TWITTER_DIR && TWITTER_LIVE_MODE=true /usr/bin/npm run post >> $TWITTER_DIR/logs/crosspost.log 2>&1
15 17 * * 3 TZ=America/New_York cd $TWITTER_DIR && TWITTER_LIVE_MODE=true /usr/bin/npm run post >> $TWITTER_DIR/logs/crosspost.log 2>&1
15 8 * * 4 TZ=America/New_York cd $TWITTER_DIR && TWITTER_LIVE_MODE=true /usr/bin/npm run post >> $TWITTER_DIR/logs/crosspost.log 2>&1
15 17 * * 4 TZ=America/New_York cd $TWITTER_DIR && TWITTER_LIVE_MODE=true /usr/bin/npm run post >> $TWITTER_DIR/logs/crosspost.log 2>&1

# Weekly report – Monday 9 AM ET (optional)
0 9 * * 1 TZ=America/New_York cd $LINKEDIN_DIR && /usr/bin/npm run report >> $LINKEDIN_DIR/logs/report.log 2>&1
# ----- END ZeroShare marketing -----
CRON
) | crontab -

echo "✅ Marketing cron installed (LinkedIn + Twitter + Comic)"
echo ""
echo "📋 Schedule (all America/New_York):"
echo "   Sun 8 PM    generate:all (content + strategic + viral + whitepapers + executive)"
echo "   Sun 9 PM    blog:generate (queue-based; only generates if unshared articles < 5; gated until BLOG_GENERATION_AFTER)"
echo "   Mon 8 AM    LinkedIn post → 8:15 Twitter cross-post"
echo "   Tue 8 AM    LinkedIn post → 8:15 Twitter | 5 PM LinkedIn → 5:15 Twitter"
echo "   Wed 8 AM    LinkedIn post → 8:15 Twitter | 5 PM LinkedIn → 5:15 Twitter"
echo "   Thu 8 AM    Comic release only → 8:15 Twitter (often no-op) | 5 PM LinkedIn → 5:15 Twitter"
echo "   Fri 8 AM    LinkedIn post → 8:15 Twitter"
echo "   Mon 9 AM    report-weekly (LinkedIn analytics)"
echo ""
echo "📁 Logs:"
echo "   $LINKEDIN_DIR/logs/post.log"
echo "   $LINKEDIN_DIR/logs/generate.log"
echo "   $LINKEDIN_DIR/logs/comic-release.log"
echo "   $LINKEDIN_DIR/logs/report.log"
echo "   $LINKEDIN_DIR/logs/blog-generate.log"
echo "   $TWITTER_DIR/logs/crosspost.log"
echo ""
echo "🔧 Commands: crontab -l | crontab -e"
echo "📖 Full docs: docs/CRON_AND_AUTOMATION.md"
echo ""

if [ ! -f "$LINKEDIN_DIR/.env" ]; then
  echo "⚠️  $LINKEDIN_DIR/.env missing (LinkedIn). cp env.example .env"
fi
if [ ! -f "$TWITTER_DIR/.env" ]; then
  echo "⚠️  $TWITTER_DIR/.env missing (Twitter). cp env.example .env, set TWITTER_LIVE_MODE=true for live posts."
fi
