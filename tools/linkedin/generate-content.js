#!/usr/bin/env node
/**
 * LinkedIn Content Generator
 * 
 * Reads blog posts from the website and generates LinkedIn-optimized versions.
 * Saves to content/posts.json for review before posting.
 * 
 * Usage: npm run generate
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, 'content');
const POSTS_FILE = join(CONTENT_DIR, 'posts.json');

// Read blog posts from website
const BLOG_FILE = join(__dirname, '../../app/blog/page.tsx');

console.log('📝 LinkedIn Content Generator\n');

// Extract blog posts from the TSX file
function extractBlogPosts() {
  if (!fs.existsSync(BLOG_FILE)) {
    console.error(`❌ Blog file not found: ${BLOG_FILE}`);
    process.exit(1);
  }
  
  const content = fs.readFileSync(BLOG_FILE, 'utf-8');
  
  // Extract the blogPosts array using regex
  const match = content.match(/const blogPosts = \[([\s\S]*?)\];/);
  if (!match) {
    console.error('❌ Could not find blogPosts array in blog page');
    process.exit(1);
  }
  
  // Parse the posts (this is a simplified extraction)
  const posts = [];
  const postMatches = content.matchAll(/{\s*slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*excerpt:\s*['"]([^'"]+)['"],[\s\S]*?category:\s*['"]([^'"]+)['"],/g);
  
  for (const m of postMatches) {
    posts.push({
      slug: m[1],
      title: m[2],
      excerpt: m[3],
      category: m[4],
    });
  }
  
  return posts;
}

const CROSSLINK_X = '\n\nFollow us on X → @DeployZeroShare';
const UTM_SHARE = 'utm_source=linkedin&utm_medium=social&utm_campaign=share';

// Generate LinkedIn post from blog post
function generateLinkedInPost(blogPost, type = 'share') {
  const { title, excerpt, category, slug } = blogPost;
  const url = `https://deployzeroshare.com/blog/${slug}?${UTM_SHARE}`;
  
  // Different post formats
  const formats = {
    // Format 1: Question hook
    question: `🤔 ${title.replace(/^(How to |The |Why )/, '')}?

${excerpt}

Read more → ${url}

#AISecurity #${category.replace(/\s+/g, '')} #DataProtection #CISO${CROSSLINK_X}`,
    
    // Format 2: Stat-led
    stat: `📊 New on the blog:

${title}

${excerpt}

Full article → ${url}

#AISecurity #InfoSec #CyberSecurity${CROSSLINK_X}`,
    
    // Format 3: Problem-solution
    problem: `The challenge: ${excerpt.split('.')[0]}.

The solution: We break it down in our latest article.

📖 ${title}

${url}

#AISecurity #Enterprise #DataProtection${CROSSLINK_X}`,
    
    // Format 4: Simple share
    share: `📰 ${title}

${excerpt}

Read the full article → ${url}

#AISecurity #${category.replace(/\s+/g, '')}${CROSSLINK_X}`,
  };
  
  return {
    blogSlug: slug,
    blogTitle: title,
    category: category,
    format: type,
    content: formats[type] || formats.share,
    url: url,
    generatedAt: new Date().toISOString(),
    status: 'draft',
    postedAt: null,
    linkedinPostId: null,
  };
}

// Generate stat/insight posts (not tied to blog)
function generateStatPosts() {
  const stats = [
    {
      stat: '22%',
      text: 'of files uploaded to AI tools contain sensitive data.',
      source: 'Industry research',
      hook: 'Your employees are leaking data to AI. Right now.',
    },
    {
      stat: '$4.45M',
      text: 'is the average cost of a data breach.',
      source: 'IBM 2023',
      hook: 'One ChatGPT prompt shouldn\'t cost you $4.45 million.',
    },
    {
      stat: '65%',
      text: 'of employees have shared sensitive data with AI tools without authorization.',
      source: 'Industry survey',
      hook: '65% of your employees have already done it.',
    },
    {
      stat: '47,000+',
      text: 'secrets intercepted by one financial services firm in 90 days.',
      source: 'ZeroShare case study',
      hook: 'They thought their developers were careful. Then they deployed ZeroShare.',
    },
  ];
  
  return stats.map((s, index) => ({
    type: 'stat',
    stat: s.stat,
    content: `📊 ${s.hook}

${s.stat} ${s.text}

Source: ${s.source}

This is why AI security isn't optional anymore.

ZeroShare Gateway automatically blocks PII and secrets before they reach external AI services.

Learn more → https://deployzeroshare.com?${UTM_SHARE}

#AISecurity #DataProtection #CISO #InfoSec${CROSSLINK_X}`,
    generatedAt: new Date().toISOString(),
    status: 'draft',
    postedAt: null,
    linkedinPostId: null,
  }));
}

// Generate thought leadership posts
function generateThoughtPosts() {
  const thoughts = [
    {
      hook: 'You can\'t stop AI adoption.',
      body: `You shouldn't try.

But you can make it safe.

Traditional DLP watches files and emails.
AI prompts? They're just HTTPS requests.

Your DLP sees: "POST request to api.openai.com"
What's actually happening: Customer SSNs sent to AI training data.

This is why AI security requires a new approach.

A proxy-based gateway can:
• Inspect request payloads in real-time
• Detect PII patterns within prompts
• Block secrets before transmission
• Log everything for compliance

The threat model has changed.
Your security architecture should too.`,
    },
    {
      hook: 'A question for CISOs:',
      body: `Your next board meeting is in 30 days.

The CEO will ask: "What's our AI security posture?"

What's your answer?

❌ "We blocked ChatGPT" 
   (Not sustainable, employees work around it)

❌ "We trust our training" 
   (Accidents happen to trained people)

❌ "We're looking into it" 
   (Not acceptable in 2026)

✅ "We enabled AI with automatic data protection"
✅ "Every request is scanned before leaving our network"  
✅ "We have full visibility and audit logs"

Which answer do you want to give?`,
    },
  ];
  
  return thoughts.map((t, index) => ({
    type: 'thought',
    content: `${t.hook}

${t.body}

See how → https://deployzeroshare.com?${UTM_SHARE}

#AISecurity #CISO #DataProtection${CROSSLINK_X}`,
    generatedAt: new Date().toISOString(),
    status: 'draft',
    postedAt: null,
    linkedinPostId: null,
  }));
}

// Main
function main() {
  // Ensure content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
  
  // Load existing posts
  let existingPosts = [];
  if (fs.existsSync(POSTS_FILE)) {
    existingPosts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
    console.log(`📂 Found ${existingPosts.length} existing posts\n`);
  }
  
  // Extract blog posts
  console.log('📖 Reading blog posts from website...');
  const blogPosts = extractBlogPosts();
  console.log(`   Found ${blogPosts.length} blog posts\n`);
  
  // Generate LinkedIn posts from blog posts
  console.log('✨ Generating LinkedIn content...\n');
  
  const newPosts = [];
  
  // From blog posts (use top 10)
  const topPosts = blogPosts.slice(0, 10);
  for (const post of topPosts) {
    // Check if we already have this post
    const exists = existingPosts.some(p => p.blogSlug === post.slug);
    if (!exists) {
      const linkedinPost = generateLinkedInPost(post, 'share');
      newPosts.push(linkedinPost);
      console.log(`   ✅ ${post.title.substring(0, 50)}...`);
    }
  }
  
  // Add stat posts
  const statPosts = generateStatPosts();
  for (const post of statPosts) {
    const exists = existingPosts.some(p => p.type === 'stat' && p.stat === post.stat);
    if (!exists) {
      newPosts.push(post);
      console.log(`   ✅ Stat post: ${post.stat}`);
    }
  }
  
  // Add thought leadership posts
  const thoughtPosts = generateThoughtPosts();
  for (const post of thoughtPosts) {
    const exists = existingPosts.some(p => 
      p.type === 'thought' && p.content.substring(0, 50) === post.content.substring(0, 50)
    );
    if (!exists) {
      newPosts.push(post);
      console.log(`   ✅ Thought post: ${post.content.substring(0, 40)}...`);
    }
  }
  
  if (newPosts.length === 0) {
    console.log('\n✅ No new posts to generate (all content already exists)');
    return;
  }
  
  // Combine and save
  const allPosts = [...existingPosts, ...newPosts];
  fs.writeFileSync(POSTS_FILE, JSON.stringify(allPosts, null, 2));
  
  console.log(`\n✅ Generated ${newPosts.length} new posts`);
  console.log(`📁 Total posts saved: ${allPosts.length}`);
  console.log(`📄 Output: ${POSTS_FILE}\n`);
  
  console.log('Next steps:');
  console.log('  1. Review posts in content/posts.json');
  console.log('  2. Edit any content you want to change');
  console.log('  3. Run "npm run preview" to see what will be posted');
  console.log('  4. When ready, run "node post.js --live" to publish\n');
}

main();
