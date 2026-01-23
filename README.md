# DeployZeroShare.com

Marketing website for ZeroShare Gateway - an on-premise AI security gateway with PII redaction and secrets blocking.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **AWS Amplify** - Hosting and deployment
- **AWS Lambda** - Backend services (Support, Newsletter, Chatbot)
- **AWS SES** - Email delivery
- **AWS DynamoDB** - Newsletter subscriber storage
- **AWS Bedrock** - AI chatbot
- **Playwright** - E2E testing

## Project Structure

```
deployzeroshare.com/
├── .github/workflows/          # CI/CD automation
│   ├── daily-health-check.yml  # Daily cron + digest email
│   ├── deploy-amplify.yml      # Post-push verification
│   ├── qa-checks.yml           # Pre-deployment QA
│   └── verify-deployment.yml   # Manual verification
│
├── amplify/backend/function/   # AWS Lambda functions
│   ├── chatbot/                # AI Chatbot (Bedrock)
│   ├── newsletter/             # Newsletter subscriptions
│   └── support-email/          # Support form emails
│
├── app/                        # Next.js App Router
│   ├── components/             # React components
│   │   ├── Analytics.tsx       # GA4, Clarity, LinkedIn
│   │   ├── Chatbot.tsx         # AI chat widget
│   │   ├── MarketplaceButton.tsx
│   │   └── Navigation.tsx
│   ├── blog/                   # Blog pages
│   │   ├── [slug]/page.tsx     # Individual posts
│   │   └── page.tsx            # Blog listing
│   ├── contact-us/page.tsx     # Contact/demo form
│   ├── docs/page.tsx           # Documentation
│   ├── faq/page.tsx            # FAQ with schema
│   ├── pricing/page.tsx        # Pricing tiers
│   ├── support/page.tsx        # Support form
│   ├── layout.tsx              # Root layout + JSON-LD
│   └── page.tsx                # Homepage
│
├── docs/                       # Internal documentation
│   ├── ARCHITECTURE.md
│   ├── PRODUCT_REQUIREMENTS.md
│   └── configuration/          # IDE setup guides
│
├── public/                     # Static assets
│   ├── llms.txt                # AI assistant context
│   ├── llms-full.txt           # Extended AI context
│   ├── robots.txt              # Crawler rules (incl. AI)
│   ├── sitemap.xml             # Main sitemap
│   ├── sitemap-blog.xml        # Blog sitemap
│   ├── feed.xml                # RSS feed
│   ├── atom.xml                # Atom feed
│   └── feed.json               # JSON Feed 1.1
│
├── scripts/                    # Utility scripts
│   └── generate-images.js      # Gemini image generation
│
├── tests/                      # Playwright E2E tests
│   ├── api-health.spec.ts      # API endpoint checks
│   ├── forms.spec.ts           # Form tests
│   ├── smoke.spec.ts           # Critical functionality
│   └── README.md               # Test documentation
│
├── tools/linkedin/             # LinkedIn automation
│
└── Documentation
    ├── IMPLEMENTATION_SUMMARY.md  # Feature documentation
    ├── SEO_SETUP.md              # SEO & AI search config
    ├── STATUS.md                 # Current project status
    ├── TESTING_SUMMARY.md        # Test coverage
    └── QA_PROCESS.md             # QA procedures
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Testing

```bash
# Install Playwright browsers
npm run test:install

# Run all tests
npm run test

# Run specific test suites
npm run test:smoke      # Critical functionality
npm run test:forms      # Form UI tests
npm run test:api        # API health checks
npm run test:qa         # Full QA suite

# Run tests that send emails (manual only)
RUN_EMAIL_TESTS=true npm run test:forms
```

## Build & Deploy

```bash
# Local build
npm run build

# Deploy (auto via GitHub push)
git push origin main
```

Amplify auto-deploys on push to `main`. Build config in `amplify.yml`.

## Live URLs

| URL | Description |
|-----|-------------|
| https://deployzeroshare.com | Production site |
| https://deployzeroshare.com/llms.txt | AI context file |
| https://deployzeroshare.com/sitemap.xml | Sitemap |

## Backend Services

| Service | Endpoint | Purpose |
|---------|----------|---------|
| Support | `/prod/support` | Form submissions → Email |
| Newsletter | `/prod/subscribe` | Subscriptions → DynamoDB + Email |
| Chatbot | `/prod/chat` | AI Q&A via Bedrock |

## CI/CD

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `qa-checks.yml` | Push/PR | Pre-deployment tests |
| `deploy-amplify.yml` | Push to main | Post-deploy verification |
| `daily-health-check.yml` | Daily 6AM UTC | Health check + digest email |

## Documentation Index

| Document | Purpose |
|----------|---------|
| `STATUS.md` | Current project status |
| `IMPLEMENTATION_SUMMARY.md` | All implemented features |
| `SEO_SETUP.md` | SEO & AI search configuration |
| `QA_PROCESS.md` | Testing procedures |
| `TESTING_SUMMARY.md` | Test coverage |
| `tests/README.md` | Test documentation |

## Environment Variables

Set in Amplify Console → Environment Variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity ID |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag |

## License

MIT
