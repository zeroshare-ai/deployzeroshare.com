# ZeroShare LinkedIn Automation Tools

## Active Posting Schedule

**Automated via unified cron (LinkedIn + Twitter + Comic).**

| Day | Posts | Times (ET) | Rationale |
|-----|-------|------------|-----------|
| Monday | 1 | 8:00 AM | Catch-up day |
| Tuesday | 2 | 8:00 AM, 5:00 PM | Peak B2B engagement |
| Wednesday | 2 | 8:00 AM, 5:00 PM | Peak B2B engagement |
| Thursday | 2 | 8:00 AM (comic), 5:00 PM (post) | Comic 8 AM; no regular post that slot |
| Friday | 1 | 8:00 AM | Wind-down day |
| Weekend | 0 | — | B2B audience offline |

**Total: 7 regular + 1 comic/week.** Twitter cross-posts ~15 min after each LinkedIn post.

### Install / view schedule
```bash
./scripts/setup-marketing-cron.sh   # Install LinkedIn + Twitter + Comic cron
crontab -l                          # View schedule
crontab -e                          # Edit
```

### Content generation
| When | What |
|------|------|
| Sunday 8 PM ET | `generate:all` (content + strategic + viral + whitepapers + executive) |

### Logs
```bash
tail -f tools/linkedin/logs/post.log         # LinkedIn posting
tail -f tools/linkedin/logs/generate.log     # Generation
tail -f tools/linkedin/logs/comic-release.log # Comic Thu
tail -f tools/twitter/logs/crosspost.log     # Twitter cross-posts
```

**Full cron docs:** `docs/CRON_AND_AUTOMATION.md`

---

> **Location:** `deployzeroshare.com/tools/linkedin/`  
> **Part of:** ZeroShare Marketing Automation (see `docs/MULTI_PROJECT_ARCHITECTURE.md`)

Automation scripts for managing ZeroShare's LinkedIn presence.

## Configuration

| Setting | Value |
|---------|-------|
| **App ID** | 228538213 |
| **Company Page ID** | 110457262 |
| **Partner ID (Insight Tag)** | 519048716 |
| **API Access** | Default Tier (500 posts/day) |
| **Redirect URI** | `http://localhost:8888/callback` |

---

## API Permissions

### Current Scopes
| Scope | Purpose | Status |
|-------|---------|--------|
| `w_organization_social` | Post as company page | ✅ Active |
| `r_organization_social` | Read company posts | ✅ Active |
| `rw_ads` | Manage ad campaigns | ✅ Active |
| `r_ads_reporting` | Read ad analytics | ✅ Active |

### Required for Full Automation
| Scope | Purpose | Status |
|-------|---------|--------|
| `rw_organization_admin` | Edit company page profile | ⏳ Request |
| `r_organization_admin` | Read company admin data | ⏳ Request |

### How to Request Additional Permissions

1. Go to: https://www.linkedin.com/developers/apps/228538213/products
2. Find **"Community Management API"** 
3. Click **"Request Access"**
4. After approval, re-run: `npm run auth`

---

## ⚠️ Safety First

These tools have multiple safety checks:

1. **Dry run by default** - `npm run preview` shows posts without publishing
2. **Environment flag required** - Must set `LINKEDIN_LIVE_MODE=true` to post
3. **Explicit --live flag** - Must pass `--live` argument to publish
4. **One-at-a-time option** - Can post individual posts with `--index`

---

## Setup

### 1. Install Dependencies

```bash
cd tools/linkedin
npm install
```

### 2. Configure Credentials

```bash
# Copy example environment file
cp env.example .env

# Edit .env with your credentials from:
# https://www.linkedin.com/developers/apps/228538213/auth
```

Required credentials:
- `LINKEDIN_CLIENT_ID` - OAuth Client ID
- `LINKEDIN_CLIENT_SECRET` - OAuth Client Secret

### 3. Authenticate with LinkedIn

```bash
npm run auth
```

This will:
1. Open your browser to LinkedIn authorization
2. Ask you to grant permissions
3. Save the access token to `.env`

---

## Company Page Profile Management

### View Current Profile
```bash
npm run profile:get
```

### Preview Changes (what would be updated)
```bash
npm run profile:preview
```

### Update Profile via API
```bash
npm run profile:update
```

### Upload Logo
```bash
npm run profile:logo
# Or specify path:
npm run profile:logo /path/to/logo.png
```

### Fields Updated via API
| Field | Via API | Notes |
|-------|---------|-------|
| Description | ✅ Yes | About section (2000 chars) |
| Website | ✅ Yes | Company URL |
| Specialties | ✅ Yes | Search keywords |
| Staff count | ✅ Yes | Company size |
| Industry | ✅ Yes | Industry category |
| Logo | ✅ Yes | Company logo image |
| Tagline | ❌ Manual | Must update in LinkedIn admin |
| Cover image | ❌ Manual | Must update in LinkedIn admin |

### Edit Profile Content
Edit `company-profile.js` → `companyProfile` object, then run `npm run profile:update`.

---

## Usage

### Generate Content from Blog Posts

```bash
npm run generate
```

Reads blog posts from the website and creates LinkedIn-optimized versions.
Output saved to `content/posts.json`.

### Preview Posts (Dry Run)

```bash
npm run preview
```

Shows what would be posted without actually posting.

### Post to LinkedIn (LIVE)

```bash
# First, enable live mode in .env:
# LINKEDIN_LIVE_MODE=true

# Then post all drafts:
node post.js --live

# Or post one specific post:
node post.js --live --index 0
```

---

## File Structure

```
tools/linkedin/
├── package.json          # Dependencies & scripts
├── config.js             # API configuration
├── auth.js               # OAuth authentication flow
├── generate-content.js   # Content generator
├── post.js               # Post publisher
├── env.example           # Example environment variables
├── .env                  # Your credentials (DO NOT COMMIT)
├── content/
│   └── posts.json        # Generated post content
└── README.md             # This file
```

---

## Content Management

### posts.json Structure

```json
[
  {
    "blogSlug": "prevent-pii-leaks-ai-chatbots",
    "blogTitle": "How to Prevent PII Leaks...",
    "category": "Security Best Practices",
    "format": "share",
    "content": "📰 How to Prevent PII Leaks...\n\nRead more → https://...",
    "url": "https://deployzeroshare.com/blog/...",
    "generatedAt": "2026-01-22T...",
    "status": "draft",
    "postedAt": null,
    "linkedinPostId": null
  }
]
```

### Post Statuses

- `draft` - Ready to publish
- `published` - Successfully posted
- `failed` - Post attempt failed (check `error` field)

### Editing Posts

1. Run `npm run generate` to create initial content
2. Open `content/posts.json` in your editor
3. Modify the `content` field for any post
4. Save and run `npm run preview` to verify
5. Post when ready

---

## API Reference

### LinkedIn Posts API

- **Endpoint:** `https://api.linkedin.com/rest/posts`
- **Auth:** Bearer token (OAuth 2.0)
- **Version Header:** `LinkedIn-Version: 202501`

### Rate Limits

- LinkedIn limits API calls per day
- This tool waits 30 seconds between posts
- Recommended: Post 3-5 times per day max

---

## Troubleshooting

### "No access token found"

Run `npm run auth` to authenticate.

### "Token expired"

LinkedIn tokens expire after ~60 days. Run `npm run auth` again.

### "Company page not found"

Verify `LINKEDIN_COMPANY_ID` in `.env` matches your page URL.

### "Permission denied"

Ensure your LinkedIn app has the required scopes:
- `w_organization_social` - Required to post to company page

---

## Security Notes

- Never commit `.env` file
- Access tokens expire after ~60 days
- Rotate credentials if compromised
- Use environment variables in CI/CD

---

## Next Steps

1. [ ] Set up credentials in `.env`
2. [ ] Run `npm run auth` to authenticate
3. [ ] Run `npm run generate` to create content
4. [ ] Review and edit `content/posts.json`
5. [ ] Run `npm run preview` to verify
6. [ ] Get explicit authorization to post live
7. [ ] Set `LINKEDIN_LIVE_MODE=true` and run `node post.js --live`

---

## n8n Automation Setup

### Option 1: Simple Scheduled Posting

1. **Create n8n workflow:**
   - Trigger: **Schedule** (e.g., 9:00 AM Mon-Fri)
   - Node: **Execute Command**
   - Command: `cd /home/rick/checkout/deployzeroshare.com/tools/linkedin && npm run post:next`

2. **Workflow will:**
   - Post the next draft from `posts.json`
   - Mark it as published
   - Exit with code 0 (success), 1 (error), or 2 (no drafts)

### Option 2: With Content Generation

1. **Daily content refresh workflow:**
   - Trigger: **Schedule** (e.g., 6:00 AM daily)
   - Node 1: **Execute Command** - `cd /path/to/tools/linkedin && npm run generate`
   - Node 2: **Execute Command** - `npm run post:next`

### n8n Node Configuration

```
Execute Command Node:
  - Command: cd /home/rick/checkout/deployzeroshare.com/tools/linkedin && npm run post:next
  - Working Directory: (leave empty)
  - Timeout: 30000
```

### Exit Codes

| Code | Meaning | n8n Action |
|------|---------|------------|
| 0 | Success - posted | Continue workflow |
| 1 | Error - API failed | Send alert |
| 2 | No drafts left | Trigger content generation |

---

## Daily Content Workflow

To generate fresh content daily (run this yourself or via n8n):

```bash
cd ~/checkout/deployzeroshare.com/tools/linkedin
npm run generate    # Creates posts from blog content
npm run preview     # Review what will be posted
```

The generator reads your blog posts and creates LinkedIn-optimized versions.

---

*Part of the ZeroShare Marketing Automation System*
