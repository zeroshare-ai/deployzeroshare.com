#!/usr/bin/env node
/**
 * LinkedIn Post Publisher
 * 
 * Publishes posts to your LinkedIn company page.
 * 
 * Usage:
 *   npm run preview         # Dry run - shows what would be posted
 *   node post.js --live     # Actually posts (requires LINKEDIN_LIVE_MODE=true)
 *   node post.js --live --index 0   # Post specific index from posts.json
 * 
 * SAFETY: Will not post unless LINKEDIN_LIVE_MODE=true in .env
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config, validateConfig, requireAccessToken, requireLiveMode } from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_FILE = join(__dirname, 'content/posts.json');

// Parse command line arguments
const args = process.argv.slice(2);
const isLive = args.includes('--live');
const indexArg = args.findIndex(a => a === '--index');
const specificIndex = indexArg !== -1 ? parseInt(args[indexArg + 1]) : null;

console.log('📤 LinkedIn Post Publisher\n');

// Validate configuration
validateConfig();
const accessToken = requireAccessToken();

// Check live mode
const liveMode = isLive && requireLiveMode();

// Load posts
if (!fs.existsSync(POSTS_FILE)) {
  console.error('❌ No posts found. Run "npm run generate" first.');
  process.exit(1);
}

const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
const draftPosts = posts.filter(p => p.status === 'draft');

if (draftPosts.length === 0) {
  console.log('✅ No draft posts to publish. All posts have been published.');
  process.exit(0);
}

console.log(`📋 Found ${draftPosts.length} draft posts\n`);

// Get posts to publish
let postsToPublish = draftPosts;
if (specificIndex !== null) {
  if (specificIndex < 0 || specificIndex >= posts.length) {
    console.error(`❌ Invalid index: ${specificIndex}. Valid range: 0-${posts.length - 1}`);
    process.exit(1);
  }
  postsToPublish = [posts[specificIndex]];
}

// LinkedIn API: Create a post
async function createPost(postContent) {
  const response = await fetch(config.endpoints.posts, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': config.apiVersion,
    },
    body: JSON.stringify({
      author: `urn:li:organization:${config.companyId}`,
      commentary: postContent,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  // Get post ID from header
  const postId = response.headers.get('x-restli-id');
  return postId;
}

// Main publishing logic
async function publishPosts() {
  for (let i = 0; i < postsToPublish.length; i++) {
    const post = postsToPublish[i];
    const postIndex = posts.indexOf(post);
    
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`📝 Post ${i + 1} of ${postsToPublish.length}`);
    if (post.blogTitle) {
      console.log(`   Blog: ${post.blogTitle}`);
    }
    if (post.type) {
      console.log(`   Type: ${post.type}`);
    }
    console.log(`${'─'.repeat(60)}`);
    console.log('\n' + post.content + '\n');
    console.log(`${'─'.repeat(60)}`);
    
    if (!liveMode) {
      console.log('⏸️  DRY RUN - Post not published\n');
      continue;
    }
    
    try {
      console.log('📤 Publishing to LinkedIn...');
      const postId = await createPost(post.content);
      
      // Update post status
      posts[postIndex].status = 'published';
      posts[postIndex].postedAt = new Date().toISOString();
      posts[postIndex].linkedinPostId = postId;
      
      // Save updated posts
      fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
      
      console.log(`✅ Published! Post ID: ${postId}`);
      console.log(`   View: https://www.linkedin.com/feed/update/${postId}`);
      
      // Rate limiting: wait between posts
      if (i < postsToPublish.length - 1) {
        console.log('\n⏳ Waiting 30 seconds before next post...');
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
      
    } catch (err) {
      console.error(`❌ Failed to publish: ${err.message}`);
      
      // Mark as failed
      posts[postIndex].status = 'failed';
      posts[postIndex].error = err.message;
      fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
    }
  }
}

// Summary
function printSummary() {
  console.log('\n' + '═'.repeat(60));
  console.log('📊 Summary');
  console.log('═'.repeat(60));
  
  if (!liveMode) {
    console.log(`\n⚠️  DRY RUN COMPLETE`);
    console.log(`   ${postsToPublish.length} posts previewed`);
    console.log(`\nTo publish for real:`);
    console.log(`   1. Set LINKEDIN_LIVE_MODE=true in .env`);
    console.log(`   2. Run: node post.js --live`);
    console.log(`\n   Or to post one at a time:`);
    console.log(`   node post.js --live --index 0`);
  } else {
    const published = posts.filter(p => p.status === 'published').length;
    const failed = posts.filter(p => p.status === 'failed').length;
    const remaining = posts.filter(p => p.status === 'draft').length;
    
    console.log(`\n✅ Published: ${published}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📝 Remaining drafts: ${remaining}`);
  }
  
  console.log('\n');
}

// Run
publishPosts().then(printSummary).catch(err => {
  console.error(`\n❌ Fatal error: ${err.message}`);
  process.exit(1);
});
