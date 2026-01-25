# "The Gateway" Comic Series - Implementation Guide
## Complete Setup Instructions

This document provides step-by-step instructions for implementing "The Gateway" comic series.

---

## Overview

**Series:** "The Gateway" - AI Security Office Comedy  
**Episodes:** 34 weekly comics  
**Posting:** Every Thursday morning  
**Format:** 3-panel comic strip (2400x800px)  
**Location:** Blog section with "Comics" category  
**LinkedIn:** Viral hook posts driving traffic to deployzeroshare.com

---

## Step 1: Generate All Episode Images

### Prerequisites
```bash
export GOOGLE_API_KEY=your_api_key
```

### Generate All Episodes
```bash
node scripts/generate-comic-series.js
```

### Generate Single Episode (for testing)
```bash
node scripts/generate-comic-series.js --episode 1
```

### List All Episodes
```bash
node scripts/generate-comic-series.js --list
```

**Output:** Images saved to `public/images/comics/comic-episode-01.png` through `comic-episode-34.png`

---

## Step 2: Create Episode Data File

Create `docs/COMIC_EPISODES_DATA.json` with all 34 episodes. Each episode needs:
- `number`: Episode number (1-34)
- `title`: Episode title
- `slug`: URL slug (e.g., "the-gateway-episode-01-thursday-morning")
- `theme`: Episode theme
- `panel1`, `panel2`, `panel3`: Detailed panel descriptions
- `linkedinHook`: Viral hook text for LinkedIn
- `linkedinCaption`: Full LinkedIn caption
- `date`: Posting date (calculated from start date + episode number weeks)

---

## Step 3: Add Comics to Blog

### Update Blog Page
✅ Already done: Added "Comics" to categories array

### Add Comic Posts to Blog Array
Add all 34 comic posts to `app/blog/page.tsx` in the `blogPosts` array:

```typescript
{
  slug: 'the-gateway-episode-01-thursday-morning',
  title: 'The Gateway: Episode 1 - Thursday Morning',
  excerpt: 'Meet Alex and Jordan, two engineers who keep things running smoothly. It\'s Thursday. Is it always Thursday?',
  author: 'The Gateway Team',
  authorRole: 'Office Comedy',
  date: 'January 30, 2026', // First Thursday
  readTime: '1 min read',
  category: 'Comics',
  featured: false,
  image: '/images/comics/comic-episode-01.png',
}
```

### Create Comic Post Pages
Add entries to `app/blog/[slug]/page.tsx`:
- Add slugs to `generateStaticParams()`
- Add content to `blogContent` object

---

## Step 4: Create LinkedIn Posting Script

Create `tools/linkedin/post-comic.js`:

```javascript
#!/usr/bin/env node
/**
 * Post "The Gateway" comic to LinkedIn
 * 
 * Usage:
 *   node tools/linkedin/post-comic.js --episode 1  # Post specific episode
 *   node tools/linkedin/post-comic.js --next       # Post next scheduled episode
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const EPISODES = JSON.parse(
  fs.readFileSync(join(__dirname, '../../docs/COMIC_EPISODES_DATA.json'), 'utf-8')
);

// LinkedIn API posting logic here
// Use existing post-next.js as reference
```

---

## Step 5: Set Up Weekly Cron Job

Add to crontab:

```bash
# "The Gateway" Comic - Every Thursday 8 AM ET
0 8 * * 4 cd /home/rick/checkout/deployzeroshare.com/tools/linkedin && /usr/bin/node post-comic.js --next >> logs/comic.log 2>&1
```

---

## Step 6: Create Episode Content

For each episode, create:
1. **Blog Post Page** - Full-size comic with context
2. **LinkedIn Post** - Hook + link to full comic
3. **SEO Metadata** - Title, description, keywords

---

## Episode Schedule

**Start Date:** This Thursday (calculate from today)  
**Frequency:** Every Thursday  
**Duration:** 34 weeks (8+ months)

**Example Schedule:**
- Episode 1: January 30, 2026 (Thursday)
- Episode 2: February 6, 2026 (Thursday)
- Episode 15: May 7, 2026 (Reveal episode)
- Episode 34: September 18, 2026 (Final episode)

---

## LinkedIn Strategy

### Hook Format (First 1-2 panels shown)
- Episode 1-5: "It's Thursday. Here's what happened."
- Episode 6-15: "Thursday update: Things are getting interesting."
- Episode 16-25: "Thursday: The engineers know something."
- Episode 26-34: "Final Thursdays: The truth comes out."

### Caption Strategy
- Short (under 200 characters)
- Funny, curiosity-driven
- Never spoil plot
- Reference Thursday
- Dry humor matching comic tone
- CTA: "See full comic → deployzeroshare.com/blog/[slug]"

### Image Strategy
- Show first 1-2 panels in LinkedIn preview
- Square format (1200x1200px) works best for mobile
- Force click-through to see full comic
- Text must be readable at small sizes

---

## Success Metrics

Track:
- LinkedIn engagement (clicks, comments, shares)
- Website traffic to comic pages
- AWS Marketplace conversions from comic traffic
- Reader anticipation (comments about waiting for Thursday)
- Hidden element discovery (easter egg comments)

---

## Next Steps

1. ✅ Create master plan (done)
2. ✅ Create character designs (done)
3. ✅ Create episode prompts (done)
4. ⏳ Create episode data JSON file (34 episodes)
5. ⏳ Generate all episode images
6. ⏳ Add comics to blog
7. ⏳ Create LinkedIn posting script
8. ⏳ Set up cron job
9. ⏳ Start posting this Thursday

---

## Files Created

- `docs/COMIC_SERIES_MASTER_PLAN.md` - Story arc and production guide
- `docs/COMIC_CHARACTER_DESIGN.md` - Character visual descriptions
- `docs/COMIC_EPISODE_PROMPTS.md` - Episode prompts (partial)
- `scripts/generate-comic-series.js` - Image generation script
- `docs/COMIC_IMPLEMENTATION_GUIDE.md` - This file

---

## Notes

- All episodes must maintain character consistency
- Thursday references must be visible in every episode
- ZeroShare branding must be subtle but present
- Dry humor tone must be consistent
- Educational elements must be hidden/subtle
- LinkedIn hooks must be curiosity-driven
- Blog posts must include SEO optimization
- All content must feed AWS Marketplace funnel
