#!/usr/bin/env node
/**
 * Blog post generation (Opus) – gated until BLOG_GENERATION_AFTER.
 *
 * Reads BLOG_GENERATION_ENABLED, BLOG_GENERATION_AFTER, ANTHROPIC_API_KEY.
 * If disabled or before gate date: exits with no API calls.
 * If enabled: calls Claude Opus, generates 2 articles, writes to content/blog-drafts/.
 *
 * See docs/BLOG_AUTOMATION_DECISIONS.md.
 * Run: npm run blog:generate  (or node scripts/blog-generate.js)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRAFTS_DIR = path.join(ROOT, 'content', 'blog-drafts');

const DEFAULT_AFTER = '2026-02-23'; // ~1 month from now
const BLOG_MODEL = 'claude-3-opus-20240229';
const QUEUE_THRESHOLD = 5; // Generate if unshared blog posts < this

const isCron = process.argv.includes('--cron');
const checkQueue = process.argv.includes('--check-queue');

/** Count blog posts that haven't been shared to LinkedIn yet. */
function countUnsharedBlogPosts() {
  const BLOG_FILE = path.join(ROOT, 'app', 'blog', 'page.tsx');
  const POSTS_FILE = path.join(ROOT, 'tools', 'linkedin', 'content', 'posts.json');
  
  if (!fs.existsSync(BLOG_FILE)) return 0;
  
  // Extract blog slugs from page.tsx
  const blogContent = fs.readFileSync(BLOG_FILE, 'utf-8');
  const blogMatches = blogContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
  const blogSlugs = Array.from(blogMatches, m => m[1]);
  
  // Check which ones are in LinkedIn posts.json
  let sharedSlugs = new Set();
  if (fs.existsSync(POSTS_FILE)) {
    const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
    for (const p of posts) {
      if (p.blogSlug) sharedSlugs.add(p.blogSlug);
    }
  }
  
  const unshared = blogSlugs.filter(slug => !sharedSlugs.has(slug));
  return unshared.length;
}

// Load .env from repo root if present (simple parser)
function loadEnv() {
  const p = path.join(ROOT, '.env');
  if (!fs.existsSync(p)) return;
  const raw = fs.readFileSync(p, 'utf-8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
}

loadEnv();

const enabled = process.env.BLOG_GENERATION_ENABLED === 'true';
const after = process.env.BLOG_GENERATION_AFTER || DEFAULT_AFTER;
const apiKey = process.env.ANTHROPIC_API_KEY;

function isAfter() {
  const now = new Date();
  const [y, m, d] = after.split('-').map(Number);
  const gate = new Date(y, m - 1, d);
  return now >= gate;
}

function defer() {
  console.log('📅 Blog generation deferred.');
  console.log(`   Set BLOG_GENERATION_ENABLED=true and ensure date >= ${after} to run.`);
  console.log('   See docs/BLOG_AUTOMATION_DECISIONS.md.');
  process.exit(0);
}

// Queue check (bypasses gate when --check-queue)
if (checkQueue) {
  const unshared = countUnsharedBlogPosts();
  console.log(`📊 Blog queue status: ${unshared} unshared articles (threshold: ${QUEUE_THRESHOLD})`);
  console.log(`   ${unshared >= QUEUE_THRESHOLD ? '✅ Queue healthy - would skip generation' : '⚠️  Queue low - would generate 2 articles'}`);
  process.exit(0);
}

if (!enabled) defer();
if (!isAfter()) defer();
if (!apiKey) {
  console.error('❌ ANTHROPIC_API_KEY required when blog generation is enabled.');
  process.exit(1);
}

// Queue check: only generate if content is low
const unshared = countUnsharedBlogPosts();
if (unshared >= QUEUE_THRESHOLD) {
  console.log(`📊 Blog queue healthy: ${unshared} unshared articles (threshold: ${QUEUE_THRESHOLD}).`);
  console.log('   Skipping generation. Will check again next run.');
  process.exit(0);
}

console.log(`📊 Blog queue low: ${unshared} unshared articles (threshold: ${QUEUE_THRESHOLD}).`);
console.log('   Generating new articles...\n');

// Opus prompt: 2 full articles (metadata + content), JSON array
const SYSTEM = `You are a technical content writer for ZeroShare, an AI security gateway (PII redaction, secrets blocking). Audience: CISOs, compliance, DevSecOps. Tone: authoritative, research-backed, no fluff.`;

const USER = `Generate exactly 2 new blog articles for deployzeroshare.com. Each must have:
- slug: lowercase, hyphenated (e.g. ai-security-policy-template-2026)
- title: compelling, specific
- excerpt: 1–2 sentences, under 200 chars
- author: one of Sarah Chen, Michael Rodriguez, David Kim, Emily Watson, Dr. Amanda Foster, James Park, Marcus Chen, Rachel Thompson
- authorRole: match existing (Security Research Lead, Compliance Director, Solutions Architect, DevSecOps Engineer, Healthcare Compliance Advisor, Security Researcher, Senior DevOps Engineer, Guest Contributor)
- date: use current month in "Month DD, YYYY" format
- readTime: e.g. "12 min read"
- category: one of Security Best Practices, Compliance, Architecture, DevSecOps, Governance, Technology
- content: full article body in markdown. Use ## and ###. 800–1200 words. Include 1–2 cited stats (name source). End with a short CTA to deployzeroshare.com/pricing or AWS Marketplace. No placeholder text.

Return valid JSON only: an array of 2 objects, each with keys slug, title, excerpt, author, authorRole, date, readTime, category, content.`;

async function anthropicMessages(body) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${t}`);
  }
  return res.json();
}

async function generate() {
  const out = await anthropicMessages({
    model: BLOG_MODEL,
    max_tokens: 16384,
    system: SYSTEM,
    messages: [{ role: 'user', content: USER }],
  });

  const raw = out.content?.find((c) => c.type === 'text')?.text;
  if (!raw) throw new Error('No text in Anthropic response');

  // Extract JSON (handle markdown code block)
  let json = raw;
  const m = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (m) json = m[1];
  const posts = JSON.parse(json.trim());
  if (!Array.isArray(posts) || posts.length < 1) throw new Error('Expected array of posts');

  fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);

  for (let i = 0; i < Math.min(2, posts.length); i++) {
    const p = posts[i];
    const slug = (p.slug || `generated-${today}-${i}`).replace(/[^a-z0-9-]/g, '-');
    const file = path.join(DRAFTS_DIR, `${today}-${slug}.json`);
    fs.writeFileSync(file, JSON.stringify(p, null, 2), 'utf-8');
    console.log(`✅ ${file}`);
  }

  console.log(`\n📁 Drafts in content/blog-drafts/. Ingest manually into app/blog (see docs/BLOG_AUTOMATION_DECISIONS.md).`);
}

generate().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
