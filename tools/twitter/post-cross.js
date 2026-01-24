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

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const LINKEDIN_POSTS = join(__dirname, '../linkedin/content/posts.json');
const TWITTER_LOG = join(__dirname, 'posted.json');

const config = {
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
  bearerToken: process.env.TWITTER_BEARER_TOKEN,
  liveMode: process.env.TWITTER_LIVE_MODE === 'true',
};

// =============================================================================
// CONTENT TRANSFORMATION
// =============================================================================

/**
 * Transform LinkedIn post to Twitter format
 * LinkedIn: Long-form, professional, #MultiWordHashtags
 * Twitter: Punchy, conversational, shorter hashtags
 */
function transformForTwitter(linkedinPost) {
  const content = linkedinPost.content || '';
  
  // Extract the hook (first meaningful line)
  const lines = content.split('\n').filter(l => l.trim());
  const hook = lines[0] || '';
  
  // Get key points (lines that start with →, •, ✓, ✅, ❌, or numbers)
  const keyPoints = lines.filter(l => 
    /^[→•✓✅❌\d]/.test(l.trim()) || 
    /^[-*]/.test(l.trim())
  ).slice(0, 3);
  
  // Extract URL if present
  const urlMatch = content.match(/(https?:\/\/[^\s]+)/);
  const url = urlMatch ? urlMatch[1] : 'https://deployzeroshare.com';
  
  // Transform hashtags (shorter for Twitter)
  const hashtagMap = {
    '#AISecurity': '#AISec',
    '#DataProtection': '#DataSec',
    '#SecurityLeadership': '#SecLeadership',
    '#CyberSecurity': '#CyberSec',
    '#Compliance': '#GRC',
    '#DevSecOps': '#DevSecOps',
    '#InfoSec': '#InfoSec',
    '#CISO': '#CISO',
  };
  
  // Build Twitter post
  let tweet = '';
  
  // If hook is short enough, use it directly
  if (hook.length <= 200) {
    tweet = hook;
  } else {
    // Truncate hook
    tweet = hook.substring(0, 197) + '...';
  }
  
  // Add key points if room
  if (keyPoints.length > 0 && tweet.length < 180) {
    tweet += '\n\n' + keyPoints.slice(0, 2).join('\n');
  }
  
  // Add URL
  tweet += `\n\n${url}`;
  
  // Add hashtags (fit what we can)
  const hashtags = ['#AISec', '#InfoSec'];
  if (tweet.length + hashtags.join(' ').length + 2 <= 280) {
    tweet += '\n\n' + hashtags.join(' ');
  }
  
  // Create thread if content is substantial
  const thread = [];
  thread.push(tweet);
  
  // Second tweet with more detail (optional)
  if (lines.length > 5) {
    const moreContent = lines.slice(3, 8).join('\n');
    if (moreContent.length > 50) {
      let tweet2 = moreContent.substring(0, 270);
      if (moreContent.length > 270) tweet2 += '...';
      thread.push(tweet2);
    }
  }
  
  return {
    linkedinId: linkedinPost.id || linkedinPost.blogSlug || 'unknown',
    tweet: thread[0],
    thread: thread.length > 1 ? thread : null,
    originalLength: content.length,
    tweetLength: thread[0].length,
  };
}

// =============================================================================
// TWITTER API
// =============================================================================

async function postTweet(tweetText) {
  if (!config.liveMode) {
    console.log('🔸 DRY RUN - Would post:', tweetText.substring(0, 100) + '...');
    return { id: 'dry-run-' + Date.now() };
  }
  
  if (!config.apiKey || !config.accessToken) {
    throw new Error('Twitter credentials not configured. Add to .env');
  }
  
  // Using Twitter API v2
  const response = await fetch('https://api.twitter.com/2/tweets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: tweetText }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Twitter API error: ${error}`);
  }
  
  return response.json();
}

async function postThread(tweets) {
  const postedIds = [];
  let replyTo = null;
  
  for (const tweet of tweets) {
    const body = { text: tweet };
    if (replyTo) {
      body.reply = { in_reply_to_tweet_id: replyTo };
    }
    
    if (!config.liveMode) {
      console.log(`🔸 DRY RUN - Thread tweet ${postedIds.length + 1}:`, tweet.substring(0, 80) + '...');
      postedIds.push('dry-run-' + Date.now());
      continue;
    }
    
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`Thread failed at tweet ${postedIds.length + 1}`);
    }
    
    const result = await response.json();
    replyTo = result.data.id;
    postedIds.push(replyTo);
    
    // Rate limit protection
    await new Promise(r => setTimeout(r, 1000));
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
