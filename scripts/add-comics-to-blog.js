#!/usr/bin/env node
/**
 * Add Comic Episodes to Blog Structure
 * 
 * Adds all 34 comic episodes to:
 * 1. app/blog/page.tsx (blogPosts array)
 * 2. app/blog/[slug]/page.tsx (generateStaticParams + blogContent)
 * 
 * Usage:
 *   node scripts/add-comics-to-blog.js
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const EPISODES_FILE = join(__dirname, '../docs/COMIC_EPISODES_DATA.json');
const BLOG_PAGE = join(__dirname, '../app/blog/page.tsx');
const BLOG_SLUG_PAGE = join(__dirname, '../app/blog/[slug]/page.tsx');

const EPISODES_DATA = JSON.parse(fs.readFileSync(EPISODES_FILE, 'utf-8'));
const EPISODES = EPISODES_DATA.episodes;
const SERIES_INFO = EPISODES_DATA.seriesInfo;

// Calculate posting dates (every Thursday starting from startDate)
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

// Generate blog post entry
function generateBlogPostEntry(episode) {
  return {
    slug: episode.slug,
    title: `The Gateway: Episode ${episode.number} - ${episode.title}`,
    excerpt: `${episode.linkedinHook} See how Alex and Jordan protect everyone silently.`,
    author: 'The Gateway Team',
    authorRole: 'Office Comedy',
    date: calculateDate(episode.number),
    readTime: '1 min read',
    category: 'Comics',
    featured: episode.number <= 3, // First 3 featured
    image: `/images/comics/comic-episode-${String(episode.number).padStart(2, '0')}.png`,
  };
}

// Generate blog content entry
function generateBlogContent(episode) {
  const cta = SERIES_INFO.ctaBlock;
  
  return {
    title: `The Gateway: Episode ${episode.number} - ${episode.title}`,
    author: 'The Gateway Team',
    authorRole: 'Office Comedy',
    date: calculateDate(episode.number),
    readTime: '1 min read',
    category: 'Comics',
    excerpt: `${episode.linkedinHook} See how Alex and Jordan protect everyone silently.`,
    content: `
# The Gateway: Episode ${episode.number} - ${episode.title}

**${episode.theme}**

It's Thursday. Here's what happened at the office this week.

![The Gateway Episode ${episode.number}](/images/comics/comic-episode-${String(episode.number).padStart(2, '0')}.png)

${episode.linkedinHook}

Alex and Jordan protect everyone silently. No drama. No speeches. Just quiet heroism.

---

## About "The Gateway"

"The Gateway" is a weekly comic series about two engineers who protect their entire organization from AI data leaks. Every Thursday, we share a new episode showing how ZeroShare Gateway blocks PII and secrets automatically.

**Previous episodes:** [View all comics](/blog?category=Comics)

**Next episode:** Coming next Thursday
`
  };
}

// Add to blog page
function addToBlogPage() {
  let content = fs.readFileSync(BLOG_PAGE, 'utf-8');
  
  // Find where blogPosts array ends (before categories)
  const blogPostsMatch = content.match(/(const blogPosts = \[[\s\S]*?\]);/);
  if (!blogPostsMatch) {
    console.error('❌ Could not find blogPosts array');
    return false;
  }
  
  // Generate comic entries
  const comicEntries = EPISODES.map(ep => generateBlogPostEntry(ep));
  
  // Insert after existing blog posts, before closing bracket
  const existingPosts = blogPostsMatch[1];
  const newPosts = comicEntries.map(ep => 
    `  {\n    slug: '${ep.slug}',\n    title: '${ep.title.replace(/'/g, "\\'")}',\n    excerpt: '${ep.excerpt.replace(/'/g, "\\'")}',\n    author: '${ep.author}',\n    authorRole: '${ep.authorRole}',\n    date: '${ep.date}',\n    readTime: '${ep.readTime}',\n    category: '${ep.category}',\n    featured: ${ep.featured},\n    image: '${ep.image}',\n  },`
  ).join('\n');
  
  // Insert comics after last existing post, before closing bracket
  const updatedPosts = existingPosts.replace(/  \];/, `  },\n  // Comics - "The Gateway" series\n${newPosts}\n  ];`);
  
  content = content.replace(blogPostsMatch[1], updatedPosts);
  
  fs.writeFileSync(BLOG_PAGE, content);
  console.log('✅ Added comics to blog page');
  return true;
}

// Add to blog slug page
function addToBlogSlugPage() {
  let content = fs.readFileSync(BLOG_SLUG_PAGE, 'utf-8');
  
  // Add slugs to generateStaticParams
  const paramsMatch = content.match(/(export function generateStaticParams\(\) \{[\s\S]*?return \[[\s\S]*?\]);/);
  if (paramsMatch) {
    const comicSlugs = EPISODES.map(ep => `    { slug: '${ep.slug}' },`).join('\n');
    const updatedParams = paramsMatch[1].replace(/  \];/, `  },\n    // Comics\n${comicSlugs}\n  ];`);
    content = content.replace(paramsMatch[1], updatedParams);
  }
  
  // Add content to blogContent object
  const contentMatch = content.match(/(const blogContent: Record<string, \{[\s\S]*?\}>) = \{/);
  if (contentMatch) {
    const comicContent = EPISODES.map(ep => {
      const blogContent = generateBlogContent(ep);
      return `  '${ep.slug}': ${JSON.stringify(blogContent, null, 4).replace(/\n/g, '\n  ')}`;
    }).join(',\n');
    
    // Find closing brace of blogContent
    const closingBrace = content.lastIndexOf('};');
    if (closingBrace !== -1) {
      content = content.slice(0, closingBrace) + `,\n${comicContent}\n};`;
    }
  }
  
  fs.writeFileSync(BLOG_SLUG_PAGE, content);
  console.log('✅ Added comics to blog slug page');
  return true;
}

// Main
console.log('📝 Adding comics to blog structure...\n');

try {
  addToBlogPage();
  addToBlogSlugPage();
  console.log(`\n✅ Successfully added ${EPISODES.length} comic episodes to blog`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
