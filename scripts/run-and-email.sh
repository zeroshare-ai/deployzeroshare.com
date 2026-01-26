#!/bin/bash
#===============================================================================
# Wrapper: Run cron job and email log
#
# Usage: ./scripts/run-and-email.sh [job-name] [command]
# Example: ./scripts/run-and-email.sh linkedin-post "cd tools/linkedin && npm run post:next"
#
# Runs the command, captures output, then emails the log to rick@deployzeroshare.com
#===============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
JOB_NAME="$1"
COMMAND="$2"

if [ -z "$JOB_NAME" ] || [ -z "$COMMAND" ]; then
  echo "Usage: $0 [job-name] [command]"
  echo "Example: $0 linkedin-post 'cd tools/linkedin && npm run post:next'"
  exit 1
fi

LOG_FILE="$REPO_DIR/tools/linkedin/logs/${JOB_NAME}.log"
mkdir -p "$(dirname "$LOG_FILE")"

echo "[$(date +%Y-%m-%d\ %H:%M:%S)] Running: $COMMAND" >> "$LOG_FILE"
eval "$COMMAND" >> "$LOG_FILE" 2>&1
EXIT_CODE=$?
echo "[$(date +%Y-%m-%d\ %H:%M:%S)] Exit code: $EXIT_CODE" >> "$LOG_FILE"

# Email the log
cd "$REPO_DIR"
node scripts/email-logs.js "$JOB_NAME" 2>&1 || echo "⚠️  Email failed, but job completed (exit $EXIT_CODE)"

exit $EXIT_CODE
