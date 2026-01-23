# ZeroShare Multi-Project Architecture

## Overview

ZeroShare consists of multiple interconnected projects that share requirements, messaging, and brand assets. This document defines how they work together.

---

## Project Map

```
~/checkout/
│
├── zeroshare-gateway/              # THE PRODUCT
│   ├── backend/                    # FastAPI + Presidio + LiteLLM
│   ├── dashboard/                  # Streamlit monitoring
│   ├── marketplace/                # AWS Marketplace listing assets
│   ├── PRD.md                      # Source of truth for features
│   └── docker-compose.yml
│
├── deployzeroshare.com/            # MARKETING WEBSITE
│   ├── app/                        # Next.js site
│   ├── docs/                       # Strategy, requirements, architecture
│   ├── public/                     # Brand assets, images
│   └── tools/                      # LinkedIn automation (NEW)
│       └── linkedin/
│
└── zeroshare-shared/               # SHARED CONFIG (PROPOSED)
    ├── .cursorrules                # Cursor rules for all projects
    ├── brand/                      # Logos, colors, fonts
    ├── requirements/               # Unified product requirements
    └── messaging/                  # Copy, taglines, value props
```

---

## Data Flow: LinkedIn → Website → Marketplace → Product

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CUSTOMER JOURNEY                                │
└─────────────────────────────────────────────────────────────────────────────┘

     LinkedIn Campaign                                              
          │                                                         
          │ Ad click                                                
          ▼                                                         
┌─────────────────────┐                                             
│ deployzeroshare.com │ ◄─── Blog posts describe features           
│                     │      that map to actual PRD                 
│  • Landing page     │                                             
│  • Blog             │                                             
│  • Pricing          │                                             
│  • Contact form     │                                             
└──────────┬──────────┘                                             
           │                                                         
           │ CTA click                                               
           ▼                                                         
┌─────────────────────┐                                             
│   AWS Marketplace   │ ◄─── Listing assets from                    
│                     │      zeroshare-gateway/marketplace/         
│  • Product listing  │                                             
│  • Pricing tiers    │                                             
│  • Subscribe        │                                             
└──────────┬──────────┘                                             
           │                                                         
           │ Subscribe + Deploy                                      
           ▼                                                         
┌─────────────────────┐                                             
│  zeroshare-gateway  │ ◄─── Actual product from                    
│                     │      zeroshare-gateway/                     
│  • Docker deploy    │                                             
│  • PII redaction    │                                             
│  • Secrets blocking │                                             
│  • Dashboard        │                                             
└─────────────────────┘                                             
```

---

## Requirements Synchronization

### Source of Truth

| Requirement Type | Source Location | Consumers |
|------------------|-----------------|-----------|
| **Product Features** | `zeroshare-gateway/PRD.md` | Website, blog posts, LinkedIn |
| **Marketing Messaging** | `deployzeroshare.com/docs/PROJECT_CONTEXT.md` | LinkedIn, ads, website |
| **Target Audience** | `deployzeroshare.com/docs/LINKEDIN_MARKETING_STRATEGY.md` | All marketing |
| **Brand Assets** | `deployzeroshare.com/public/` | All projects |
| **Pricing** | `zeroshare-gateway/marketplace/listing.md` | Website pricing page |

### Feature → Marketing Mapping

From `zeroshare-gateway/PRD.md`:

| PRD Feature | Marketing Message | Blog Topic |
|-------------|-------------------|------------|
| PII Redaction (Presidio) | "Automatically redact emails, SSNs, credit cards" | "How to Prevent PII Leaks" |
| Secrets Blocking (Regex) | "Hard block AWS keys, API tokens, private keys" | "Stop Secrets from Leaking" |
| Two Lanes (Standard/Dev) | "Protection for both staff and developers" | "Zero Trust AI Architecture" |
| RBAC (Roles) | "Role-based access control" | "Enterprise AI Governance" |
| Audit Logs | "Complete visibility for compliance" | "SOC 2 Controls for AI" |
| Azure OpenAI + Bedrock | "Works with your existing AI providers" | "Multi-Provider AI Gateway" |
| Docker Compose | "Deploy in minutes, not months" | "On-Premise AI Security" |

---

## Cursor Configuration

### Shared .cursorrules

Create a shared rules file that all projects reference:

```
# In each project's .cursorrules, add:

## Cross-Project Context

This project is part of the ZeroShare ecosystem:

1. **zeroshare-gateway** - The product (Docker/Python/FastAPI)
   - PRD.md defines all features
   - Marketing claims must match actual capabilities
   
2. **deployzeroshare.com** - Marketing website (Next.js)
   - Blog posts should reflect PRD features
   - All CTAs lead to AWS Marketplace
   
3. **LinkedIn Marketing** - Traffic generation
   - Content derived from blog posts
   - Targets CISOs, Security VPs, Compliance Officers

## Key Constraints

- FREE TIER: 5 users max (matches PRD standard tier)
- PRICING: $499/month per gateway (from marketplace/listing.md)
- DEPLOYMENT: Docker Compose only (no Kubernetes yet)
- AI PROVIDERS: Azure OpenAI + AWS Bedrock

## Messaging Rules

- Problem: "Data leakage to AI tools (PII & Secrets)"
- Solution: "On-premise gateway that redacts PII and blocks secrets"
- Proof: "50+ PII patterns, 200+ secret patterns"
- CTA: "Deploy on AWS Marketplace"
```

---

## LinkedIn Integration Location

### Recommendation: `deployzeroshare.com/tools/linkedin/`

```
deployzeroshare.com/
├── app/                    # Website (deployed to Amplify)
├── docs/                   # Documentation
├── public/                 # Assets
└── tools/                  # NOT deployed, local automation
    └── linkedin/
        ├── package.json    # Separate dependencies
        ├── auth.js         # OAuth flow
        ├── post.js         # Post to company page
        ├── campaign.js     # Create ad campaigns
        ├── content/        # Generated post content
        │   └── posts.json
        └── README.md
```

### Why This Location?

1. **Close to content source** - Can read from `docs/` and `app/blog/`
2. **Shares brand assets** - Access to `public/images/`
3. **Won't pollute website** - Add to `.gitignore` or Amplify ignore
4. **Same repo** - Easier to keep messaging in sync

### Amplify Build Ignore

Add to `amplify.yml`:

```yaml
build:
  commands:
    # Ignore tools folder
    - rm -rf tools/
    - npm run build
```

---

## Content Generation Flow

### Blog Post → LinkedIn Post

```
1. Blog post exists in app/blog/page.tsx (blogPosts array)
                    │
                    ▼
2. tools/linkedin/generate.js reads blog posts
                    │
                    ▼
3. AI generates LinkedIn-optimized versions
                    │
                    ▼
4. Saves to tools/linkedin/content/posts.json
                    │
                    ▼
5. post.js publishes to LinkedIn via API
```

### Feature → Blog Post → LinkedIn

```
1. New feature added to zeroshare-gateway/PRD.md
                    │
                    ▼
2. Blog post written about the feature
   (app/blog/page.tsx)
                    │
                    ▼
3. LinkedIn content generated from blog
   (tools/linkedin/)
                    │
                    ▼
4. Ad campaign created targeting relevant audience
   (tools/linkedin/campaign.js)
```

---

## Environment Variables

### Shared Across Projects

Create `~/.zeroshare-env` or use dotenv files:

```bash
# Brand
ZEROSHARE_WEBSITE_URL=https://deployzeroshare.com
ZEROSHARE_COMPANY_NAME=ZeroShare

# LinkedIn (Marketing)
LINKEDIN_CLIENT_ID=xxx
LINKEDIN_CLIENT_SECRET=xxx
LINKEDIN_COMPANY_ID=110457262
LINKEDIN_APP_ID=228538213

# AWS (Product + Marketplace)
AWS_REGION=us-east-1
AWS_MARKETPLACE_PRODUCT_ID=xxx

# Analytics
NEXT_PUBLIC_GA_ID=xxx
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=519048716
```

---

## Development Workflow

### Working on Marketing Website
```bash
cd ~/checkout/deployzeroshare.com
cursor .
# Cursor loads .cursorrules with website context
```

### Working on Product
```bash
cd ~/checkout/zeroshare-gateway
cursor .
# Cursor loads .cursorrules with product context
```

### Working on LinkedIn Automation
```bash
cd ~/checkout/deployzeroshare.com
cursor .
# Work in tools/linkedin/ folder
# Has access to docs/ and public/ for content
```

### Syncing Requirements
```bash
# After updating PRD.md in zeroshare-gateway:
# 1. Update relevant blog posts in deployzeroshare.com
# 2. Regenerate LinkedIn content
# 3. Update website feature descriptions if needed
```

---

## Quick Reference

| Task | Project | Command/Location |
|------|---------|------------------|
| Update product features | zeroshare-gateway | Edit `PRD.md` |
| Update website | deployzeroshare.com | Edit `app/` |
| Write blog post | deployzeroshare.com | Edit `app/blog/page.tsx` |
| Generate LinkedIn content | deployzeroshare.com | Run `tools/linkedin/generate.js` |
| Post to LinkedIn | deployzeroshare.com | Run `tools/linkedin/post.js` |
| Create ad campaign | deployzeroshare.com | Run `tools/linkedin/campaign.js` |
| Update AWS listing | zeroshare-gateway | Edit `marketplace/` |
| Deploy website | deployzeroshare.com | Push to GitHub → Amplify |
| Deploy product | zeroshare-gateway | Push to GitHub → Marketplace |

---

## Next Steps

1. [ ] Create `tools/linkedin/` folder structure
2. [ ] Build LinkedIn OAuth flow (using App ID 228538213)
3. [ ] Create content generator that reads from blog posts
4. [ ] Build posting script using LinkedIn Posts API
5. [ ] Build campaign management using Advertising API
6. [ ] Update `.cursorrules` in both projects with cross-references
7. [ ] Create first batch of LinkedIn content from existing blog posts

---

*Document Version 1.0 | January 2026*
