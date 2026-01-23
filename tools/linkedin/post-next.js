#!/usr/bin/env node
/**
 * Post Next Draft to LinkedIn
 * 
 * Designed to be called by n8n, cron, or any scheduler.
 * Posts the next available draft and marks it as published.
 * 
 * Usage: node post-next.js
 * 
 * Exit codes:
 *   0 = Success (posted)
 *   1 = Error
 *   2 = No drafts available
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config, validateConfig, requireAccessToken } from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_FILE = join(__dirname, 'content/posts.json');

// LinkedIn API: Create a post
async function createPost(postContent) {
  const response = await fetch(config.endpoints.posts, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.accessToken}`,
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
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  
  return response.headers.get('x-restli-id');
}

async function main() {
  console.log('📤 LinkedIn Auto-Post\n');
  
  // Validate
  validateConfig();
  requireAccessToken();
  
  // Load posts
  if (!fs.existsSync(POSTS_FILE)) {
    console.error('❌ No posts file found. Run "npm run generate" first.');
    process.exit(1);
  }
  
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
  const drafts = posts.filter(p => p.status === 'draft');
  
  if (drafts.length === 0) {
    console.log('📭 No drafts available. Run "npm run generate" to create more.');
    process.exit(2);
  }
  
  // Get next draft (first one)
  const nextPost = drafts[0];
  const postIndex = posts.indexOf(nextPost);
  
  console.log(`📝 Posting: ${nextPost.blogTitle || nextPost.type || 'Post'}`);
  console.log(`📊 Drafts remaining after this: ${drafts.length - 1}\n`);
  
  try {
    const postId = await createPost(nextPost.content);
    
    // Update status
    posts[postIndex].status = 'published';
    posts[postIndex].postedAt = new Date().toISOString();
    posts[postIndex].linkedinPostId = postId;
    
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
    
    console.log(`✅ Published!`);
    console.log(`🔗 https://www.linkedin.com/feed/update/${postId}`);
    console.log(`\n📊 Status: ${posts.filter(p => p.status === 'published').length} published, ${posts.filter(p => p.status === 'draft').length} drafts remaining`);
    
    // Output for n8n to capture
    console.log(`\n__N8N_OUTPUT__`);
    console.log(JSON.stringify({
      success: true,
      postId: postId,
      url: `https://www.linkedin.com/feed/update/${postId}`,
      draftsRemaining: drafts.length - 1,
    }));
    
    process.exit(0);
    
  } catch (err) {
    console.error(`❌ Failed: ${err.message}`);
    
    posts[postIndex].status = 'failed';
    posts[postIndex].error = err.message;
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
    
    process.exit(1);
  }
}

main();
