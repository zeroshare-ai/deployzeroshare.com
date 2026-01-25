#!/usr/bin/env node
/**
 * Twitter/X Cross-Posting from LinkedIn
 * 
 * Takes LinkedIn posts and reformats them for Twitter:
 * - Shorter (280 char limit for main hook)
 * - Different hashtag style
 * - Thread format for longer content
 * 
 * Usage:
 *   node post-cross.js --preview     # See what would be posted
 *   node post-cross.js --post        # Post next item to Twitter
 *   node post-cross.js --sync        # Sync all unposted LinkedIn content
 * 
 * Setup:
 *   1. Create Twitter Developer account
 *   2. Create app with read/write permissions
 *   3. Add credentials to .env
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const LINKEDIN_POSTS = join(__dirname, '../linkedin/content/posts.json');
const TWITTER_LOG = join(__dirname, 'posted.json');

const WEBSITE = 'https://deployzeroshare.com';
const MARKETPLACE = 'https://aws.amazon.com/marketplace/pp/prodview-zeroshare';
const LINKEDIN_COMPANY = 'https://www.linkedin.com/company/110457262';
const UTM_TWITTER = 'utm_source=twitter&utm_medium=social&utm_campaign=crosspost';
const CROSSLINK_LINKEDIN = `Also on LinkedIn → ${LINKEDIN_COMPANY}`;

const config = {
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
  liveMode: process.env.TWITTER_LIVE_MODE === 'true',
};

function getClient() {
  if (!config.appKey || !config.appSecret || !config.accessToken || !config.accessSecret) {
    throw new Error('Twitter credentials missing. Set TWITTER_API_KEY, _SECRET, ACCESS_TOKEN, ACCESS_SECRET in .env');
  }
  return new TwitterApi({
    appKey: config.appKey,
    appSecret: config.appSecret,
    accessToken: config.accessToken,
    accessSecret: config.accessSecret,
  });
}

// =============================================================================
// CONTENT TRANSFORMATION
// =============================================================================

/**
 * Pick best conversion URL from post. Priority: pricing/marketplace > docs > compliance > blog > homepage.
 * Always add UTM for attribution.
 */
function pickConversionUrl(linkedinPost) {
  const content = (linkedinPost.content || '').toLowerCase();
  const raw = (linkedinPost.content || '').match(/(https?:\/\/[^\s)\]]+)/g) || [];
  const sep = (s) => (s.includes('?') ? '&' : '?');
  const addUtm = (u) => `${u.replace(/[&\s]+$/, '')}${sep(u)}${UTM_TWITTER}`;

  if (/pricing|marketplace|free trial|try it free|try free|start free/i.test(content) || raw.some((u) => /pricing|marketplace/i.test(u))) {
    const u = raw.find((x) => /pricing|marketplace/i.test(x));
    return u ? addUtm(u) : addUtm(`${WEBSITE}/pricing`);
  }
  if (/\/docs|documentation|see how it works|architecture docs/i.test(content) || raw.some((u) => /\/docs/i.test(u))) {
    const u = raw.find((x) => /\/docs/i.test(x));
    return u ? addUtm(u) : addUtm(`${WEBSITE}/docs`);
  }
  if (/compliance|audit|gdpr|hipaa|soc2|dpo/i.test(content) || raw.some((u) => /compliance/i.test(u))) {
    const u = raw.find((x) => /compliance/i.test(x));
    return u ? addUtm(u) : addUtm(`${WEBSITE}/compliance`);
  }
  if (/\/blog\/|read the|full article/i.test(content) || raw.some((u) => /\/blog\//i.test(u))) {
    const u = raw.find((x) => /deployzeroshare\.com\/blog\//i.test(x));
    return u ? addUtm(u) : addUtm(WEBSITE);
  }
  return addUtm(raw[0] || WEBSITE);
}

/**
 * Transform LinkedIn post to Twitter. Same narrative, same CTA, conversion URLs + UTMs, crosslink to LinkedIn.
 */
function transformForTwitter(linkedinPost) {
  const content = linkedinPost.content || '';
  const lines = content.split('\n').filter((l) => l.trim());
  const hook = lines[0] || '';
  const keyPoints = lines.filter((l) => /^[→•✓✅❌\d]/.test(l.trim()) || /^[-*]/.test(l.trim())).slice(0, 2);
  const conversionUrl = pickConversionUrl(linkedinPost);
  const hashtags = '#AISec #InfoSec';
  const max = 280;

  let tweet = hook.length <= 200 ? hook : hook.substring(0, 197) + '...';
  if (keyPoints.length && tweet.length < 160) {
    tweet += '\n\n' + keyPoints.join('\n');
  }
  tweet += `\n\n${conversionUrl}`;

  const withCrosslink = tweet + '\n\n' + CROSSLINK_LINKEDIN;
  if (withCrosslink.length <= max) {
    tweet = withCrosslink;
  } else if (tweet.length + 4 + hashtags.length <= max) {
    tweet += '\n\n' + hashtags;
  }
  if (tweet.length > max) {
    const suffix = '\n\n' + conversionUrl;
    const allow = max - suffix.length - 4;
    const body = (hook.length > allow ? hook.substring(0, allow - 3) + '...' : hook) + suffix;
    tweet = body.length <= max ? body : hook.substring(0, max - suffix.length - 5) + '...' + suffix;
  }

  const thread = [tweet];
  if (lines.length > 5) {
    const more = lines.slice(3, 8).join('\n');
    if (more.length > 50) {
      let t2 = more.substring(0, 260) + (more.length > 260 ? '...' : '');
      t2 += `\n\n${conversionUrl}`;
      if (t2.length <= max) thread.push(t2);
    }
  }

  return {
    linkedinId: linkedinPost.linkedinPostId || linkedinPost.id || linkedinPost.blogSlug || 'unknown',
    tweet: thread[0],
    thread: thread.length > 1 ? thread : null,
    originalLength: content.length,
    tweetLength: thread[0].length,
  };
}

// =============================================================================
// TWITTER API (OAuth 1.0a user context – required for posting)
// =============================================================================

async function postTweet(tweetText) {
  if (!config.liveMode) {
    console.log('🔸 DRY RUN - Would post:', tweetText.substring(0, 100) + '...');
    return { data: { id: 'dry-run-' + Date.now() } };
  }
  const client = getClient();
  const res = await client.v2.tweet(tweetText);
  return res;
}

async function postThread(tweets) {
  const postedIds = [];
  let replyToId = null;
  const client = config.liveMode ? getClient() : null;

  for (const tweet of tweets) {
    if (!config.liveMode) {
      console.log(`🔸 DRY RUN - Thread tweet ${postedIds.length + 1}:`, tweet.substring(0, 80) + '...');
      postedIds.push('dry-run-' + Date.now());
      continue;
    }
    let res;
    if (replyToId) {
      res = await client.v2.reply(tweet, replyToId);
    } else {
      res = await client.v2.tweet(tweet);
    }
    replyToId = res.data.id;
    postedIds.push(replyToId);
    await new Promise((r) => setTimeout(r, 1000));
  }
  return postedIds;
}

// =============================================================================
// LOGGING
// =============================================================================

function loadPostedLog() {
  if (fs.existsSync(TWITTER_LOG)) {
    return JSON.parse(fs.readFileSync(TWITTER_LOG, 'utf-8'));
  }
  return { posted: [] };
}

function savePostedLog(log) {
  fs.writeFileSync(TWITTER_LOG, JSON.stringify(log, null, 2));
}

// =============================================================================
// COMMANDS
// =============================================================================

async function preview() {
  console.log('🐦 Twitter Cross-Post Preview\n');
  
  if (!fs.existsSync(LINKEDIN_POSTS)) {
    console.log('❌ No LinkedIn posts found. Run LinkedIn content generation first.');
    return;
  }
  
  const linkedinPosts = JSON.parse(fs.readFileSync(LINKEDIN_POSTS, 'utf-8'));
  const log = loadPostedLog();
  
  // Get posts that haven't been cross-posted
  const unposted = linkedinPosts.filter(p => 
    p.status === 'published' && 
    !log.posted.includes(p.linkedinPostId || p.id)
  );
  
  console.log(`📊 LinkedIn posts published: ${linkedinPosts.filter(p => p.status === 'published').length}`);
  console.log(`🐦 Already cross-posted: ${log.posted.length}`);
  console.log(`📝 Ready to cross-post: ${unposted.length}\n`);
  
  if (unposted.length === 0) {
    console.log('✅ All published LinkedIn posts have been cross-posted.\n');
    return;
  }
  
  // Preview next 3
  console.log('Next posts to cross-post:\n');
  for (const post of unposted.slice(0, 3)) {
    const transformed = transformForTwitter(post);
    console.log('─'.repeat(50));
    console.log(`LinkedIn ID: ${transformed.linkedinId}`);
    console.log(`Original: ${transformed.originalLength} chars → Tweet: ${transformed.tweetLength} chars`);
    console.log(`Thread: ${transformed.thread ? transformed.thread.length + ' tweets' : 'Single tweet'}`);
    console.log('\nTweet:');
    console.log(transformed.tweet);
    console.log('');
  }
}

async function postNext() {
  console.log('🐦 Twitter Cross-Post\n');
  
  const linkedinPosts = JSON.parse(fs.readFileSync(LINKEDIN_POSTS, 'utf-8'));
  const log = loadPostedLog();
  
  const unposted = linkedinPosts.filter(p => 
    p.status === 'published' && 
    !log.posted.includes(p.linkedinPostId || p.id)
  );
  
  if (unposted.length === 0) {
    console.log('✅ No posts to cross-post.\n');
    return;
  }
  
  const post = unposted[0];
  const transformed = transformForTwitter(post);
  
  console.log(`📝 Cross-posting: ${transformed.linkedinId}`);
  console.log(`📏 ${transformed.tweetLength} characters\n`);
  
  try {
    let result;
    if (transformed.thread) {
      result = await postThread(transformed.thread);
      console.log(`✅ Thread posted (${result.length} tweets)`);
    } else {
      result = await postTweet(transformed.tweet);
      console.log(`✅ Tweet posted`);
    }
    
    // Log it
    log.posted.push(post.linkedinPostId || post.id);
    savePostedLog(log);
    
    console.log(`\n📊 Remaining to cross-post: ${unposted.length - 1}`);
    
  } catch (error) {
    console.error(`❌ Failed: ${error.message}`);
    const err = error.data ?? error;
    if (err.detail) console.error(`   Detail: ${typeof err.detail === 'string' ? err.detail : JSON.stringify(err.detail)}`);
    if (err.title) console.error(`   Title: ${err.title}`);
    if (err.status === 403) {
      console.error('\n   → Ensure your app has "Read and write" permissions.');
      console.error('   → Regenerate Access Token & Secret after changing permissions.');
    }
  }
}

async function syncAll() {
  console.log('🐦 Twitter Sync - Cross-posting all LinkedIn content\n');
  
  const linkedinPosts = JSON.parse(fs.readFileSync(LINKEDIN_POSTS, 'utf-8'));
  const log = loadPostedLog();
  
  const unposted = linkedinPosts.filter(p => 
    p.status === 'published' && 
    !log.posted.includes(p.linkedinPostId || p.id)
  );
  
  console.log(`📝 Posts to sync: ${unposted.length}\n`);
  
  for (const post of unposted) {
    const transformed = transformForTwitter(post);
    console.log(`Posting: ${transformed.linkedinId}...`);
    
    try {
      if (transformed.thread) {
        await postThread(transformed.thread);
      } else {
        await postTweet(transformed.tweet);
      }
      
      log.posted.push(post.linkedinPostId || post.id);
      savePostedLog(log);
      console.log('  ✅ Done');
      
      // Rate limit: wait between posts
      await new Promise(r => setTimeout(r, 5000));
      
    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}`);
    }
  }
  
  console.log('\n✅ Sync complete');
}

// =============================================================================
// MAIN
// =============================================================================

const args = process.argv.slice(2);

if (args.includes('--preview') || args.length === 0) {
  preview();
} else if (args.includes('--post')) {
  postNext();
} else if (args.includes('--sync')) {
  syncAll();
} else {
  console.log('Usage:');
  console.log('  node post-cross.js --preview   # Preview cross-posts');
  console.log('  node post-cross.js --post      # Post next item');
  console.log('  node post-cross.js --sync      # Sync all');
}
