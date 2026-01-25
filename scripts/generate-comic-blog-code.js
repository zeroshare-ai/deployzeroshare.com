#!/usr/bin/env node
/**
 * Generate Comic Blog Posts
 * 
 * Creates TypeScript code to add all 34 comic episodes to the blog.
 * Outputs code that can be copied into app/blog/page.tsx
 * 
 * Usage:
 *   node scripts/generate-comic-blog-code.js
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const EPISODES_FILE = join(__dirname, '../docs/COMIC_EPISODES_DATA.json');
const OUTPUT_FILE = join(__dirname, '../docs/COMIC_BLOG_CODE.txt');

const EPISODES_DATA = JSON.parse(fs.readFileSync(EPISODES_FILE, 'utf-8'));
const EPISODES = EPISODES_DATA.episodes;
const SERIES_INFO = EPISODES_DATA.seriesInfo;

// Calculate posting dates
function calculateDate(episodeNumber) {
  const startDate = new Date(SERIES_INFO.startDate);
  const weeksToAdd = episodeNumber - 1;
  const episodeDate = new Date(startDate);
  episodeDate.setDate(startDate.getDate() + (weeksToAdd * 7));
  
  return episodeDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Generate TypeScript code for blog posts array
function generateBlogPostsCode() {
  const entries = EPISODES.map(ep => {
    const date = calculateDate(ep.number);
    const title = `The Gateway: Episode ${ep.number} - ${ep.title}`;
    const excerpt = `${ep.linkedinHook} See how Alex and Jordan protect everyone silently.`;
    const image = `/images/comics/comic-episode-${String(ep.number).padStart(2, '0')}.png`;
    
    return `  {
    slug: '${ep.slug}',
    title: ${JSON.stringify(title)},
    excerpt: ${JSON.stringify(excerpt)},
    author: 'The Gateway Team',
    authorRole: 'Office Comedy',
    date: '${date}',
    readTime: '1 min read',
    category: 'Comics',
    featured: ${ep.number <= 3},
    image: '${image}',
  },`;
  }).join('\n');
  
  return `// Comics - "The Gateway" series (${EPISODES.length} episodes)
${entries}`;
}

// Generate TypeScript code for generateStaticParams
function generateStaticParamsCode() {
  const slugs = EPISODES.map(ep => `    { slug: '${ep.slug}' },`).join('\n');
  return `    // Comics - "The Gateway" series
${slugs}`;
}

// Generate blog content entries
function generateBlogContentCode() {
  const entries = EPISODES.map(ep => {
    const date = calculateDate(ep.number);
    const title = `The Gateway: Episode ${ep.number} - ${ep.title}`;
    const excerpt = `${ep.linkedinHook} See how Alex and Jordan protect everyone silently.`;
    
    const content = `# ${title}

**${ep.theme}**

It's Thursday. Here's what happened at the office this week.

![The Gateway Episode ${ep.number}](/images/comics/comic-episode-${String(ep.number).padStart(2, '0')}.png)

${ep.linkedinHook}

Alex and Jordan protect everyone silently. No drama. No speeches. Just quiet heroism.

---

## About "The Gateway"

"The Gateway" is a weekly comic series about two engineers who protect their entire organization from AI data leaks. Every Thursday, we share a new episode showing how ZeroShare Gateway blocks PII and secrets automatically.

**Previous episodes:** [View all comics](/blog?category=Comics)

**Next episode:** Coming next Thursday`;

    return `  '${ep.slug}': {
    title: ${JSON.stringify(title)},
    author: 'The Gateway Team',
    authorRole: 'Office Comedy',
    date: '${date}',
    readTime: '1 min read',
    category: 'Comics',
    excerpt: ${JSON.stringify(excerpt)},
    content: ${JSON.stringify(content)},
  },`;
  }).join('\n');
  
  return entries;
}

// Generate all code
const blogPostsCode = generateBlogPostsCode();
const staticParamsCode = generateStaticParamsCode();
const blogContentCode = generateBlogContentCode();

const output = `# Comic Blog Integration Code
# Copy these sections into the appropriate files

## 1. Add to app/blog/page.tsx
# Insert after the last blog post entry, before the closing bracket:

${blogPostsCode}

---

## 2. Add to app/blog/[slug]/page.tsx - generateStaticParams()
# Insert before the closing bracket:

${staticParamsCode}

---

## 3. Add to app/blog/[slug]/page.tsx - blogContent object
# Insert before the closing brace:

${blogContentCode}

---

## 4. Import ComicCTA component
# Add to imports in app/blog/[slug]/page.tsx:
import { ComicCTA } from '../../components/ComicCTA';

# Then add CTA block after content in render:
<ComicCTA />
`;

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`✅ Generated blog integration code`);
console.log(`📁 Saved to: ${OUTPUT_FILE}`);
console.log(`\n📋 Next steps:`);
console.log(`   1. Copy code from ${OUTPUT_FILE}`);
console.log(`   2. Paste into app/blog/page.tsx and app/blog/[slug]/page.tsx`);
console.log(`   3. Import ComicCTA component`);
