#!/usr/bin/env node
/**
 * LinkedIn Weekly Analytics Report
 * 
 * Fetches performance data and outputs a summary.
 * Can be run via cron and piped to email.
 * 
 * Usage:
 *   node report-weekly.js              # Output to console
 *   node report-weekly.js --json       # Output as JSON
 *   node report-weekly.js | mail -s "LinkedIn Weekly Report" you@email.com
 * 
 * Cron (Mondays 9 AM):
 *   0 9 * * 1 cd ~/checkout/deployzeroshare.com/tools/linkedin && node report-weekly.js >> logs/report.log
 */

import { config, requireAccessToken } from './config.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_BASE = 'https://api.linkedin.com/rest';
const COMPANY_URN = `urn:li:organization:${config.companyId}`;

// =============================================================================
// API HELPERS
// =============================================================================

async function linkedInAPI(endpoint, method = 'GET') {
  const token = requireAccessToken();
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'LinkedIn-Version': config.apiVersion,
      'X-Restli-Protocol-Version': '2.0.0',
    },
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API Error ${response.status}: ${text}`);
  }
  
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// =============================================================================
// DATA FETCHING
// =============================================================================

async function getFollowerCount() {
  try {
    const response = await linkedInAPI(
      `/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=${encodeURIComponent(COMPANY_URN)}`
    );
    
    if (response.elements && response.elements[0]) {
      return response.elements[0].followerCounts?.organicFollowerCount || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching followers:', error.message);
    return null;
  }
}

async function getRecentPosts() {
  try {
    const response = await linkedInAPI(
      `/posts?q=author&author=${encodeURIComponent(COMPANY_URN)}&count=10`
    );
    return response.elements || [];
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    return [];
  }
}

async function getPostStats(postUrn) {
  try {
    const response = await linkedInAPI(
      `/socialActions/${encodeURIComponent(postUrn)}`
    );
    return response;
  } catch (error) {
    return null;
  }
}

function getPostQueueStats() {
  try {
    const postsFile = join(__dirname, 'content', 'posts.json');
    if (fs.existsSync(postsFile)) {
      const posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
      const drafts = posts.filter(p => p.status === 'draft').length;
      const published = posts.filter(p => p.status === 'published').length;
      const total = posts.length;
      return { drafts, published, total };
    }
  } catch (error) {
    // Ignore
  }
  return { drafts: 0, published: 0, total: 0 };
}

function getTokenExpiry() {
  // LinkedIn tokens last ~60 days
  // Check .env modification time as proxy
  try {
    const envFile = join(__dirname, '.env');
    const stats = fs.statSync(envFile);
    const authDate = new Date(stats.mtime);
    const expiryDate = new Date(authDate.getTime() + (60 * 24 * 60 * 60 * 1000));
    const daysLeft = Math.floor((expiryDate - new Date()) / (24 * 60 * 60 * 1000));
    return { authDate, expiryDate, daysLeft };
  } catch (error) {
    return { daysLeft: 'unknown' };
  }
}

// =============================================================================
// REPORT GENERATION
// =============================================================================

async function generateReport() {
  const now = new Date();
  const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  
  console.log('═'.repeat(60));
  console.log('   ZEROSHARE LINKEDIN WEEKLY REPORT');
  console.log(`   Generated: ${now.toISOString()}`);
  console.log('═'.repeat(60));
  
  // Follower count
  console.log('\n📊 FOLLOWERS\n');
  const followers = await getFollowerCount();
  if (followers !== null) {
    console.log(`   Current Followers: ${followers}`);
    // TODO: Store historical data to show growth
    console.log(`   Weekly Growth: [tracking starts next week]`);
  } else {
    console.log('   Could not fetch follower count');
  }
  
  // Content queue
  console.log('\n📝 CONTENT QUEUE\n');
  const queue = getPostQueueStats();
  console.log(`   Drafts Ready: ${queue.drafts}`);
  console.log(`   Published: ${queue.published}`);
  console.log(`   Total Posts: ${queue.total}`);
  
  if (queue.drafts < 5) {
    console.log(`   ⚠️  WARNING: Low content queue! Run: npm run generate`);
  } else {
    console.log(`   ✅ Content queue healthy`);
  }
  
  // Recent posts
  console.log('\n📰 RECENT POSTS (Last 7 Days)\n');
  const posts = await getRecentPosts();
  const recentPosts = posts.filter(p => {
    const postDate = new Date(p.createdAt);
    return postDate > weekAgo;
  });
  
  if (recentPosts.length > 0) {
    console.log(`   Posts this week: ${recentPosts.length}`);
    for (const post of recentPosts.slice(0, 5)) {
      const date = new Date(post.createdAt).toLocaleDateString();
      const preview = (post.commentary || '').slice(0, 50) + '...';
      console.log(`   • ${date}: ${preview}`);
    }
  } else {
    console.log('   No posts this week');
  }
  
  // Token status
  console.log('\n🔐 AUTHENTICATION STATUS\n');
  const token = getTokenExpiry();
  if (token.daysLeft !== 'unknown') {
    console.log(`   Token expires in: ${token.daysLeft} days`);
    if (token.daysLeft < 14) {
      console.log(`   ⚠️  WARNING: Token expiring soon! Run: npm run auth`);
    } else {
      console.log(`   ✅ Token healthy`);
    }
  } else {
    console.log('   Token expiry: Unknown');
  }
  
  // System health
  console.log('\n🔧 SYSTEM HEALTH\n');
  const checks = [];
  
  // Check if cron is set up
  try {
    const { execSync } = await import('child_process');
    const crontab = execSync('crontab -l 2>/dev/null || true').toString();
    if (crontab.includes('post-next') || crontab.includes('linkedin')) {
      checks.push({ name: 'Posting Cron', status: '✅' });
    } else {
      checks.push({ name: 'Posting Cron', status: '⚠️  Not found' });
    }
  } catch {
    checks.push({ name: 'Posting Cron', status: '❓ Could not check' });
  }
  
  // Check logs
  const logFile = join(__dirname, 'logs', 'post.log');
  if (fs.existsSync(logFile)) {
    const logStats = fs.statSync(logFile);
    const logAge = Math.floor((now - logStats.mtime) / (24 * 60 * 60 * 1000));
    if (logAge < 7) {
      checks.push({ name: 'Post Logs', status: `✅ Updated ${logAge}d ago` });
    } else {
      checks.push({ name: 'Post Logs', status: `⚠️  Stale (${logAge}d old)` });
    }
  } else {
    checks.push({ name: 'Post Logs', status: '⚠️  No logs found' });
  }
  
  // Check .env
  if (config.accessToken) {
    checks.push({ name: 'Access Token', status: '✅' });
  } else {
    checks.push({ name: 'Access Token', status: '❌ Missing' });
  }
  
  if (config.liveMode) {
    checks.push({ name: 'Live Mode', status: '✅ Enabled' });
  } else {
    checks.push({ name: 'Live Mode', status: '⚠️  Disabled (dry run)' });
  }
  
  for (const check of checks) {
    console.log(`   ${check.status} ${check.name}`);
  }
  
  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('   SUMMARY');
  console.log('═'.repeat(60));
  
  const issues = checks.filter(c => c.status.includes('⚠️') || c.status.includes('❌'));
  if (issues.length === 0 && queue.drafts >= 5) {
    console.log('\n   ✅ All systems operational. Marketing running autonomously.\n');
  } else {
    console.log('\n   ⚠️  Issues detected:');
    for (const issue of issues) {
      console.log(`      • ${issue.name}: ${issue.status}`);
    }
    if (queue.drafts < 5) {
      console.log(`      • Content queue low: ${queue.drafts} drafts`);
    }
    console.log('');
  }
  
  console.log('═'.repeat(60));
  console.log('   ZeroShare - 100% AI-Driven Marketing');
  console.log('═'.repeat(60));
  console.log('');
}

// =============================================================================
// MAIN
// =============================================================================

const args = process.argv.slice(2);

if (args.includes('--json')) {
  // JSON output for programmatic use
  (async () => {
    const data = {
      timestamp: new Date().toISOString(),
      followers: await getFollowerCount(),
      queue: getPostQueueStats(),
      token: getTokenExpiry(),
    };
    console.log(JSON.stringify(data, null, 2));
  })();
} else {
  generateReport().catch(console.error);
}
