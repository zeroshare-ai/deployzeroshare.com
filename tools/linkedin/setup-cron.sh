#!/bin/bash
#===============================================================================
# ZeroShare LinkedIn Cron Setup (delegates to unified marketing cron)
#
# Use the unified installer for LinkedIn + Twitter + Comic:
#   ./scripts/setup-marketing-cron.sh
#
# This script runs that for backward compatibility.
#===============================================================================

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
"$REPO_DIR/scripts/setup-marketing-cron.sh"
