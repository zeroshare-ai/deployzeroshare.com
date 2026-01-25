#!/bin/bash
#===============================================================================
# "The Gateway" Thursday comic release
#
# 1. Trigger Amplify deploy (git push). Build uses COMIC_RELEASE_AS_OF = build day.
# 2. Wait for deploy to complete.
# 3. Post this week's episode to LinkedIn.
#
# Run via cron: 0 8 * * 4 (Thursday 8 AM local). Set TZ=America/New_York if needed.
# Usage: ./scripts/release-comic-thursday.sh [--no-push] [--no-wait] [--preview]
#===============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_DIR"

NO_PUSH=false
NO_WAIT=false
PREVIEW=false
for x in "$@"; do
  case "$x" in
    --no-push) NO_PUSH=true ;;
    --no-wait) NO_WAIT=true ;;
    --preview) PREVIEW=true ;;
  esac
done

echo "📅 Gateway Thursday release — $(TZ=America/New_York date +%Y-%m-%d\ %H:%M\ %Z)"
echo ""

# 1. Trigger deploy
if [ "$NO_PUSH" = true ]; then
  echo "⏭️  Skipping git push (--no-push)"
else
  echo "📤 Triggering Amplify deploy via git push..."
  git pull --rebase 2>/dev/null || true
  git commit --allow-empty -m "comic release $(TZ=America/New_York date +%Y-%m-%d)" || true
  git push 2>/dev/null || { echo "⚠️  git push failed (no remote? no auth?). Run with --no-push to skip."; exit 1; }
  echo "✅ Pushed. Amplify will build with COMIC_RELEASE_AS_OF=$(TZ=America/New_York date +%Y-%m-%d)"
fi

# 2. Wait for deploy
if [ "$NO_WAIT" = false ] && [ "$NO_PUSH" = false ]; then
  WAIT_MINS="${COMIC_RELEASE_WAIT_MINS:-10}"
  echo "⏳ Waiting ${WAIT_MINS}m for Amplify build + deploy..."
  sleep "$((WAIT_MINS * 60))"
  echo "✅ Wait done."
fi

if [ "$NO_WAIT" = true ]; then
  echo "⏭️  Skipping wait (--no-wait)"
fi

# 3. Post to LinkedIn
echo ""
echo "📣 Posting comic to LinkedIn..."
if [ "$PREVIEW" = true ]; then
  node tools/linkedin/post-comic.js --next --preview
else
  node tools/linkedin/post-comic.js --next
fi

echo ""
echo "✅ Thursday release complete."
