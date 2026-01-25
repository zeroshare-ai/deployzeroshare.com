#!/usr/bin/env node
/**
 * Twitter/X Profile Setup via API
 *
 * Updates profile (name, bio, url, location) using v1.1 account/update_profile.
 * Requires OAuth 1.0a credentials in .env.
 *
 * Usage:
 *   node profile-update.js              # Show current profile
 *   node profile-update.js --preview    # Preview ZeroShare profile (no changes)
 *   node profile-update.js --apply      # Apply ZeroShare profile
 *   node profile-update.js --apply --name "X" --description "Y"  # Custom values
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { TwitterApi } from 'twitter-api-v2';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const config = {
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
  liveMode: process.env.TWITTER_LIVE_MODE === 'true',
};

// ZeroShare-branded profile (Twitter limits: name 50, description 160, url 100, location 30)
const ZEROSHARE_PROFILE = {
  name: 'ZeroShare',
  description: 'AI Security Gateway. Block PII & secrets before they reach ChatGPT, Copilot, Claude. On-premise. SOC 2 ready. 🛡️',
  url: 'https://deployzeroshare.com',
  location: '',
};

function getClient() {
  if (!config.appKey || !config.appSecret || !config.accessToken || !config.accessSecret) {
    throw new Error('Missing Twitter credentials. Set TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET in .env');
  }
  return new TwitterApi({
    appKey: config.appKey,
    appSecret: config.appSecret,
    accessToken: config.accessToken,
    accessSecret: config.accessSecret,
  });
}

async function showCurrent() {
  const client = getClient();
  const me = await client.v2.me({ 'user.fields': ['description', 'public_metrics', 'url', 'location'] });
  const u = me.data;
  console.log('\n🐦 Current Twitter profile\n');
  console.log('  Name:       ', u.name);
  console.log('  @username:  ', u.username);
  console.log('  Bio:        ', u.description || '(empty)');
  console.log('  URL:        ', u.url || '(empty)');
  console.log('  Location:   ', u.location || '(empty)');
  console.log('  Followers:  ', u.public_metrics?.followers_count ?? '—');
  console.log('  Following:  ', u.public_metrics?.following_count ?? '—');
  console.log('');
}

function showPreview() {
  console.log('\n🐦 ZeroShare profile (preview)\n');
  console.log('  name:       ', ZEROSHARE_PROFILE.name);
  console.log('  description:', ZEROSHARE_PROFILE.description);
  console.log('  url:        ', ZEROSHARE_PROFILE.url);
  console.log('  location:   ', ZEROSHARE_PROFILE.location || '(empty)');
  console.log('\n  Run: node profile-update.js --apply  to apply.\n');
}

async function applyProfile(custom = {}) {
  const profile = { ...ZEROSHARE_PROFILE, ...custom };
  if (!config.liveMode) {
    console.log('\n🔸 DRY RUN – set TWITTER_LIVE_MODE=true to apply changes.\n');
    console.log('  Would update to:', profile);
    return;
  }
  const client = getClient();
  await client.v1.updateAccountProfile({
    name: profile.name,
    description: profile.description,
    url: profile.url,
    location: profile.location || undefined,
  });
  console.log('\n✅ Profile updated.\n');
  await showCurrent();
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { preview: false, apply: false, name: '', description: '', url: '', location: '' };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--preview') out.preview = true;
    else if (args[i] === '--apply') out.apply = true;
    else if (args[i] === '--name' && args[i + 1]) { out.name = args[++i]; }
    else if (args[i] === '--description' && args[i + 1]) { out.description = args[++i]; }
    else if (args[i] === '--url' && args[i + 1]) { out.url = args[++i]; }
    else if (args[i] === '--location' && args[i + 1]) { out.location = args[++i]; }
  }
  return out;
}

async function main() {
  const { preview, apply, name, description, url, location } = parseArgs();
  const custom = {};
  if (name) custom.name = name;
  if (description) custom.description = description;
  if (url) custom.url = url;
  if (location) custom.location = location;

  try {
    if (preview) {
      showPreview();
      return;
    }
    if (apply) {
      await applyProfile(Object.keys(custom).length ? custom : {});
      return;
    }
    await showCurrent();
  } catch (e) {
    console.error('\n❌ Error:', e.message || e);
    const err = e.data ?? e;
    if (err?.detail) console.error('   Detail:', typeof err.detail === 'string' ? err.detail : JSON.stringify(err.detail));
    if (e.code === 401 || e.data?.status === 401) {
      console.error('\n   → Profile update may require extra app permissions.');
      console.error('   → Set name, bio, URL manually at https://twitter.com/settings/profile');
    }
    process.exit(1);
  }
}

main();
