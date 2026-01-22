# Automated Blog Agent Workflow

This document outlines the setup and workflow for an automated AI agent that writes daily blog posts for ZeroShare Gateway, creates accompanying visuals, and publishes to LinkedIn.

## Overview

The blog agent will:
1. Generate a daily blog post about AI security topics
2. Create a featured image/graphic for the post
3. Publish to the website's blog section
4. Cross-post to LinkedIn with appropriate formatting

## Technical Architecture

### Blog Content Structure

Blog posts are stored in `/app/blog/[slug]/page.tsx` for static generation, or can be migrated to a headless CMS:

```
/app/blog/
├── page.tsx                    # Blog listing page
├── layout.tsx                  # Blog metadata
├── [slug]/
│   └── page.tsx               # Dynamic blog post template
└── content/                   # (future) Markdown content folder
    └── posts/
        └── YYYY-MM-DD-slug.md
```

### Recommended CMS Options

For production, migrate to a headless CMS for easier content management:

1. **Contentful** - Excellent API, good free tier
2. **Sanity** - Real-time collaboration, great for content teams
3. **Strapi** - Self-hosted option, full control
4. **MDX Files** - Simple, git-based approach

## Agent Implementation

### Option 1: GitHub Actions + OpenAI API

Create `.github/workflows/blog-agent.yml`:

```yaml
name: Daily Blog Post Generator

on:
  schedule:
    - cron: '0 8 * * *'  # 8 AM UTC daily
  workflow_dispatch:      # Manual trigger

jobs:
  generate-blog-post:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Generate Blog Post
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: |
          node scripts/generate-blog-post.js
      
      - name: Generate Featured Image
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: |
          node scripts/generate-blog-image.js
      
      - name: Commit and Push
        run: |
          git config user.name "Blog Agent"
          git config user.email "blog-agent@deployzeroshare.com"
          git add .
          git commit -m "📝 New blog post: $(date +%Y-%m-%d)"
          git push
      
      - name: Post to LinkedIn
        env:
          LINKEDIN_ACCESS_TOKEN: ${{ secrets.LINKEDIN_ACCESS_TOKEN }}
        run: |
          node scripts/post-to-linkedin.js
```

### Option 2: Dedicated Agent Service

For more control, create a dedicated agent service:

```javascript
// scripts/generate-blog-post.js
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TOPICS = [
  'AI security best practices',
  'PII protection strategies',
  'Compliance updates (GDPR, SOC 2, HIPAA)',
  'AI governance frameworks',
  'Zero trust for AI applications',
  'Secrets management in AI workflows',
  'Case studies: AI data breaches',
  'Emerging AI threats',
  'DevSecOps for AI',
  'Enterprise AI adoption security',
];

async function generateBlogPost() {
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const today = new Date().toISOString().split('T')[0];
  
  const prompt = `Write a comprehensive, SEO-optimized blog post about "${topic}" for an AI security company called ZeroShare Gateway. 

Requirements:
- 1500-2000 words
- Include an engaging introduction
- Use H2 and H3 headers for structure
- Include actionable takeaways
- Reference industry statistics where appropriate
- End with a call-to-action about ZeroShare Gateway
- Write in a professional but approachable tone
- Include keywords: AI security, data leak prevention, PII protection, enterprise AI

Format the output as JSON with:
{
  "title": "...",
  "slug": "...",
  "excerpt": "...",
  "content": "...",
  "category": "...",
  "readTime": "...",
  "keywords": ["..."]
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  const post = JSON.parse(response.choices[0].message.content);
  
  // Save to content directory
  const filename = `${today}-${post.slug}.json`;
  fs.writeFileSync(
    path.join(__dirname, '../app/blog/content/posts', filename),
    JSON.stringify(post, null, 2)
  );
  
  return post;
}

generateBlogPost();
```

### Image Generation Script

```javascript
// scripts/generate-blog-image.js
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateBlogImage(title, slug) {
  const prompt = `Create a professional, modern blog header image for an article titled "${title}". 
  Style: Clean, minimalist tech design with gradients in purple and blue (#667eea to #764ba2).
  Include abstract security/shield iconography.
  No text in the image.
  16:9 aspect ratio suitable for Open Graph.`;

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1792x1024',
    quality: 'standard',
  });

  const imageUrl = response.data[0].url;
  
  // Download and save image
  const imageResponse = await fetch(imageUrl);
  const buffer = await imageResponse.arrayBuffer();
  
  fs.writeFileSync(
    path.join(__dirname, '../public/blog', `${slug}.png`),
    Buffer.from(buffer)
  );
  
  return `/blog/${slug}.png`;
}
```

### LinkedIn Posting Script

```javascript
// scripts/post-to-linkedin.js
const axios = require('axios');

async function postToLinkedIn(post) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const authorUrn = process.env.LINKEDIN_AUTHOR_URN; // urn:li:person:XXXXX
  
  const linkedInPost = {
    author: authorUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: `🔐 New on the ZeroShare Blog: ${post.title}

${post.excerpt}

Read more: https://deployzeroshare.com/blog/${post.slug}

#AISecurity #DataProtection #CyberSecurity #Enterprise`,
        },
        shareMediaCategory: 'ARTICLE',
        media: [
          {
            status: 'READY',
            originalUrl: `https://deployzeroshare.com/blog/${post.slug}`,
          },
        ],
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  };

  await axios.post(
    'https://api.linkedin.com/v2/ugcPosts',
    linkedInPost,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
}
```

## Required Secrets

Add these to your GitHub repository secrets:

| Secret | Description |
|--------|-------------|
| `OPENAI_API_KEY` | OpenAI API key for content generation |
| `LINKEDIN_ACCESS_TOKEN` | LinkedIn OAuth access token |
| `LINKEDIN_AUTHOR_URN` | LinkedIn author URN for posting |

## LinkedIn API Setup

1. Create a LinkedIn App at https://www.linkedin.com/developers/
2. Request access to Marketing API (for publishing)
3. Generate an access token with `w_member_social` scope
4. Store the token securely (tokens expire, implement refresh flow)

## Content Guidelines

### Topic Categories
- Security Best Practices
- Compliance & Governance
- Technology Deep-Dives
- Industry News & Analysis
- Case Studies
- How-To Guides

### SEO Requirements
- Target keywords for each post
- Meta description under 160 characters
- Internal links to product pages
- External links to authoritative sources
- Alt text for images

### Quality Checklist
- [ ] Factually accurate
- [ ] No AI hallucinations
- [ ] Proper citations
- [ ] Engaging headline
- [ ] Clear CTAs
- [ ] Mobile-friendly formatting

## Analytics Integration

Track blog performance with:

```javascript
// Add to blog post page
import { trackEvent } from '@/components/Analytics';

// Track article views
trackEvent('blog_view', {
  article_slug: slug,
  article_title: title,
  article_category: category,
});

// Track scroll depth
trackPageScroll(percentage);

// Track CTA clicks
trackCTAClick('demo_request', 'blog_post_footer');
```

## Deployment

The blog automatically deploys via AWS Amplify when changes are pushed to main.

New blog posts trigger:
1. Static page generation
2. Sitemap update
3. RSS feed update

## Monitoring

Set up alerts for:
- Failed blog generation
- LinkedIn posting failures
- SEO score drops
- Engagement metrics

## Future Enhancements

1. **Multi-language support** - Auto-translate posts for international audiences
2. **A/B testing headlines** - Test different titles for engagement
3. **Personalization** - Show relevant posts based on visitor industry
4. **Email newsletter** - Weekly digest of new posts
5. **Podcast generation** - Convert posts to audio using TTS
6. **Video summaries** - Create short video clips for social media

## Support

For questions about the blog agent setup:
- Technical issues: Open a GitHub issue
- Content guidelines: Contact marketing@deployzeroshare.com
