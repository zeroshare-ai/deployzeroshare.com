#!/usr/bin/env node
/**
 * Write Twitter OAuth 1.0a credentials to .env.
 * Run with: TWITTER_API_KEY=... TWITTER_API_SECRET=... TWITTER_ACCESS_TOKEN=... TWITTER_ACCESS_SECRET=... node configure.js
 * Or: npm run configure (after exporting the four vars)
 */

import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '.env');

const key = process.env.TWITTER_API_KEY;
const secret = process.env.TWITTER_API_SECRET;
const token = process.env.TWITTER_ACCESS_TOKEN;
const tokenSecret = process.env.TWITTER_ACCESS_SECRET;

if (!key || !secret || !token || !tokenSecret) {
  console.error('Usage: TWITTER_API_KEY=... TWITTER_API_SECRET=... TWITTER_ACCESS_TOKEN=... TWITTER_ACCESS_SECRET=... node configure.js');
  console.error('Or export those four env vars, then run: npm run configure');
  process.exit(1);
}

const body = `# Twitter/X API Credentials
# ZeroShare Marketing Account

# API Key and Secret (Consumer Keys)
TWITTER_API_KEY=${key}
TWITTER_API_SECRET=${secret}

# Access Token and Secret (for your account)
TWITTER_ACCESS_TOKEN=${token}
TWITTER_ACCESS_SECRET=${tokenSecret}

# Safety flag - set to "true" to post live
TWITTER_LIVE_MODE=false
`;

writeFileSync(envPath, body, 'utf8');
console.log('Updated tools/twitter/.env');
console.log('Run: npm run profile && TWITTER_LIVE_MODE=true npm run post');
process.exit(0);
