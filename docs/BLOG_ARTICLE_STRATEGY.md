# Blog Article Release Schedule & Strategy

**High-level overview** of blog/article content, release schedule, and automation.

---

## Current State

### Blog Articles: **Static (Manual)**

- **Location:** `app/blog/page.tsx` (hardcoded array)
- **Count:** ~36 articles (July 2025 → January 2026)
- **Frequency:** ~6 articles/month (backdated)
- **Categories:** Security Best Practices, Compliance, Architecture, DevSecOps, Governance, Technology
- **Status:** ✅ **Published** (all visible on site)

**How articles are created:**
- Manually added to `blogPostsStatic` array in `app/blog/page.tsx`
- Each article has: slug, title, excerpt, author, date, category, image
- Full content lives in `app/blog/[slug]/page.tsx` (individual pages)

---

## Content Flow

```
┌─────────────────────────────────────────────────────────────┐
│  STATIC BLOG ARTICLES (Manual)                             │
│  app/blog/page.tsx (36 articles, July 2025 - Jan 2026)     │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  LINKEDIN CONTENT GENERATION (Automated - Sun 8 PM)        │
│  tools/linkedin/generate-content.js                         │
│  • Reads blog posts from page.tsx                           │
│  • Creates LinkedIn-optimized shares                        │
│  • Adds to posts.json queue                                 │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  LINKEDIN POSTING (Automated - Mon-Fri)                     │
│  • 7 regular posts/week                                     │
│  • 1 comic post/week (Thu)                                  │
│  • Cross-posted to Twitter ~15 min later                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Release Schedule

| Content Type | Frequency | How Created | Status |
|--------------|-----------|-------------|--------|
| **Blog Articles** | ~6/month | Manual (hardcoded) | ✅ 36 articles exist |
| **LinkedIn Posts** | 7/week | Auto-generated from blog | ✅ Automated |
| **Comic Episodes** | 1/week (Thu) | Auto-generated + date-gated | ✅ Automated |
| **Twitter Cross-Posts** | ~7/week | Auto from LinkedIn | ✅ Automated |

---

## Automated Blog Generation (Gated)

**Goal:** Generate ~4 new blog articles/month via Claude Opus to keep the queue high.

**Workflow:**
1. Cron runs **every Sunday 9 PM ET** (`npm run blog:generate -- --cron`).
2. Script checks **queue depth**: counts blog posts not yet shared to LinkedIn.
3. **Only generates if queue < 5** unshared articles. If ≥ 5, skips (no Opus call).
4. Script is **gated** until `BLOG_GENERATION_AFTER` (default **2026-02-23**). No Opus calls before then (e.g. until Cursor credits refresh).
5. When enabled + queue low: calls Anthropic Opus, generates **2** articles per run, writes drafts to `content/blog-drafts/`.
6. Ingest drafts manually into `app/blog/page.tsx` and `app/blog/[slug]/page.tsx` (or future `blog-ingest` script).

**Status:** ✅ **Implemented** · 🔒 **Deferred** until ~1 month from now (2026-02-23)

**Control:** Set `BLOG_GENERATION_ENABLED=true` and `BLOG_GENERATION_AFTER` (and `ANTHROPIC_API_KEY`) in repo-root `.env` when ready.

**Check queue:** `npm run blog:check-queue` (works even when gated)

**Decisions & env:** `docs/BLOG_AUTOMATION_DECISIONS.md`

---

## Current Article Categories

| Category | Count | Examples |
|----------|-------|----------|
| Security Best Practices | ~8 | PII leaks, shadow AI, phishing |
| Compliance | ~7 | HIPAA, GDPR, SOC 2, EU AI Act |
| Architecture | ~6 | Zero trust, microservices, Kubernetes |
| DevSecOps | ~6 | CI/CD, Copilot, Cursor, Terraform |
| Governance | ~5 | Risk register, vendor assessment, policies |
| Technology | ~6 | LLM security, vector DBs, Bedrock |

---

## How New Articles Are Added

**Manual process:**

1. **Add to `app/blog/page.tsx`:**
   ```typescript
   {
     slug: 'new-article-slug',
     title: 'Article Title',
     excerpt: 'Brief description...',
     author: 'Author Name',
     authorRole: 'Role',
     date: 'January 25, 2026',
     readTime: '12 min read',
     category: 'Security Best Practices',
     featured: false,
     image: '/images/blog/blog-image.png',
   }
   ```

2. **Create content page:** `app/blog/[slug]/page.tsx`
   - Full article content (markdown/JSX)
   - SEO metadata
   - CTA to pricing/marketplace

3. **Generate image:** `scripts/generate-images.js` (optional)

4. **LinkedIn auto-picks it up:** Next `generate:all` run (Sun 8 PM) creates LinkedIn post

---

## Conversion Strategy

**Every blog article should:**

1. **Drive to website** → `/blog/[slug]` with UTM tracking
2. **Capture leads** → Newsletter signup, whitepaper download
3. **Convert** → Link to `/pricing` or AWS Marketplace

**LinkedIn posts** (auto-generated from blog):
- Include link to blog article
- UTM: `utm_source=linkedin&utm_medium=social&utm_campaign=share`
- Cross-posted to Twitter

---

## Recommendations

### Short-term (Current)
- ✅ **Keep static articles** (manual control, quality)
- ✅ **Continue LinkedIn automation** (reads from blog)
- ✅ **Add new articles manually** as needed

### Future (If scaling)
- 🔲 **Implement blog agent** (`BLOG_AGENT_README.md`)
- 🔲 **Migrate to CMS** (Contentful, Sanity, or MDX files)
- 🔲 **Editorial calendar** (plan topics 1-3 months ahead)
- 🔲 **A/B test headlines** (LinkedIn performance)

---

## Related Docs

- **Blog automation decisions:** `docs/BLOG_AUTOMATION_DECISIONS.md` (frequency, queue, Opus, gate)
- **LinkedIn automation:** `tools/linkedin/GROWTH_PLAYBOOK.md`
- **Cron schedule:** `docs/CRON_AND_AUTOMATION.md`
- **Blog agent (legacy plan):** `BLOG_AGENT_README.md`
- **Marketing strategy:** `docs/MARKETING_AUTOMATION.md`
