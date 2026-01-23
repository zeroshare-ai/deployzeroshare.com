# SEO & AI Search Engine Optimization

## Overview

This document covers the SEO implementation for deployzeroshare.com, optimized for both traditional search engines (Google, Bing) and AI search engines (Perplexity, ChatGPT, Claude, etc.).

## ✅ Implemented Features

### 1. AI Search Engine Support

#### llms.txt Files
New standard context files for AI assistants and language models:

| File | URL | Purpose |
|------|-----|---------|
| `llms.txt` | https://deployzeroshare.com/llms.txt | Quick overview for AI assistants |
| `llms-full.txt` | https://deployzeroshare.com/llms-full.txt | Detailed product information |

**Contents include:**
- Product overview and quick facts
- Feature list and capabilities
- Pricing tiers
- Technical architecture
- Compliance information
- FAQ for AI citations
- Contact information

#### robots.txt AI Crawler Rules
Explicit allow rules for AI crawlers (`public/robots.txt`):

```
# AI Search Engines
User-agent: GPTBot          # OpenAI ChatGPT
User-agent: ChatGPT-User    # ChatGPT Plugins
User-agent: Claude-Web      # Anthropic Claude
User-agent: ClaudeBot
User-agent: anthropic-ai
User-agent: PerplexityBot   # Perplexity AI
User-agent: Google-Extended # Google Bard/Gemini
User-agent: cohere-ai       # Cohere
User-agent: Meta-ExternalAgent  # Meta AI
User-agent: Applebot-Extended   # Apple Intelligence
User-agent: YouBot          # You.com
User-agent: CCBot           # Common Crawl
```

All AI crawlers are allowed with `Crawl-delay: 2`.

### 2. Structured Data (JSON-LD)

Enhanced schema markup in `app/layout.tsx`:

| Schema Type | Purpose |
|-------------|---------|
| `Organization` | Company info, contact points, social links |
| `WebSite` | Site metadata with SearchAction |
| `SoftwareApplication` | Product details, pricing, features, ratings |
| `Product` | Aggregate ratings and customer reviews |
| `HowTo` | 5-step deployment guide (for featured snippets) |
| `FAQPage` | Key questions for AI/search citations |
| `BreadcrumbList` | Site navigation structure |

**Key Data Points:**
- Aggregate rating: 4.8/5 (127 reviews)
- 3 pricing tiers with structured offers
- 11 features in featureList
- Customer review snippets

### 3. FAQ Page

**URL:** https://deployzeroshare.com/faq

**Features:**
- 25+ questions across 7 categories
- Full FAQPage JSON-LD schema
- Categories: Product Overview, Technical, Security & Privacy, Compliance, Pricing, Getting Started, Support
- Optimized for featured snippets and AI citations
- Quick navigation links

**File:** `app/faq/page.tsx`

### 4. Sitemaps & Feeds

| Type | URL | Purpose |
|------|-----|---------|
| XML Sitemap | `/sitemap.xml` | Main pages for search engines |
| Blog Sitemap | `/sitemap-blog.xml` | All 36+ blog posts |
| RSS Feed | `/feed.xml` | RSS 2.0 for feed readers |
| Atom Feed | `/atom.xml` | Atom format feed |
| JSON Feed | `/feed.json` | JSON Feed 1.1 |

**Files:**
- `public/sitemap.xml`
- `public/sitemap-blog.xml`
- `public/feed.xml`
- `public/atom.xml`
- `public/feed.json`

### 5. Meta Tags

Configured in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'ZeroShare Gateway - AI Security Gateway | Stop Data Leaks to AI',
  description: 'ZeroShare Gateway is the leading AI proxy security solution...',
  keywords: ['AI security gateway', 'AI proxy', 'PII redaction AI', ...],
  openGraph: { ... },
  twitter: { card: 'summary_large_image', ... },
  robots: { index: true, follow: true, ... },
  alternates: { canonical: '...', types: { 'application/rss+xml': [...] } },
};
```

### 6. Amplify Rewrite Rules

Static files are explicitly served before catch-all rules (`amplify.yml`):

```yaml
rewrites:
  - source: '/robots.txt'
    target: '/robots.txt'
    status: '200'
  - source: '/llms.txt'
    target: '/llms.txt'
    status: '200'
  - source: '/llms-full.txt'
    target: '/llms-full.txt'
    status: '200'
  # ... other static files
```

## 📁 Files Created/Modified

### New Files
- `public/llms.txt` - AI assistant context (short)
- `public/llms-full.txt` - AI assistant context (detailed)
- `public/feed.json` - JSON Feed 1.1
- `app/faq/page.tsx` - FAQ page with schema markup

### Modified Files
- `public/robots.txt` - Added AI crawler rules
- `public/sitemap.xml` - Updated with all pages
- `app/layout.tsx` - Enhanced JSON-LD schema
- `amplify.yml` - Added static file rewrites

## 📊 Analytics Integration

New tracking functions in `app/components/Analytics.tsx`:

| Function | Purpose |
|----------|---------|
| `trackNewsletterSubscribe()` | Newsletter signups |
| `trackBlogView()` | Article engagement by category |
| `trackDocsView()` | Documentation usage |
| `trackFAQExpand()` | FAQ interaction tracking |
| `trackChatbotInteraction()` | Chatbot usage |
| `trackFileDownload()` | Downloads (llms.txt, PDFs) |
| `trackSearch()` | Search query insights |

## 🔧 Configuration

### Required Environment Variables

Set in AWS Amplify Console → App Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity ID | `xxxxxxxxxx` |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag | `519048716` (set) |

### Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: `https://deployzeroshare.com`
3. Verify via DNS TXT record or HTML file
4. Submit sitemaps:
   - `https://deployzeroshare.com/sitemap.xml`
   - `https://deployzeroshare.com/sitemap-blog.xml`

### Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Add site: `https://deployzeroshare.com`
3. Import from Google Search Console (easiest)
4. Submit sitemaps

## 🔍 Testing & Verification

### Check AI Accessibility
```bash
# Verify llms.txt is accessible
curl -s https://deployzeroshare.com/llms.txt | head -20

# Verify robots.txt includes AI rules
curl -s https://deployzeroshare.com/robots.txt | grep -A2 "GPTBot"

# Check FAQ page loads
curl -s -o /dev/null -w "%{http_code}" https://deployzeroshare.com/faq
```

### Validate Structured Data
1. Go to https://search.google.com/test/rich-results
2. Enter: `https://deployzeroshare.com`
3. Verify all schema types are detected

### Validate Feeds
1. RSS: https://validator.w3.org/feed/check.cgi?url=https://deployzeroshare.com/feed.xml
2. JSON Feed: Validate at https://validator.jsonfeed.org/

## 📈 Expected SEO Benefits

### Traditional Search
- Rich snippets from FAQ schema
- Product knowledge panels
- How-to featured snippets
- Breadcrumb navigation in SERPs

### AI Search Engines
- Direct citations in Perplexity responses
- Context for ChatGPT web search
- Accurate product information in AI summaries
- Better representation in AI-generated content

## 🚀 Future Enhancements

1. **Google News Sitemap** - For blog posts to appear in Google News
2. **Video Schema** - When product demo videos are added
3. **Event Schema** - For webinars and product launches
4. **LocalBusiness Schema** - If physical presence is established
5. **AI.txt** - Emerging standard for AI-specific instructions

## 📝 Notes

- All AI crawlers are explicitly allowed (we want AI discoverability)
- llms.txt follows emerging standard from llms-txt.org
- JSON-LD is preferred over microdata for schema markup
- FAQ content is regularly updated to stay relevant
- Sitemaps are auto-indexed by search engines via robots.txt
