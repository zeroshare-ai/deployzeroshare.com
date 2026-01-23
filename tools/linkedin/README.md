# ZeroShare LinkedIn Automation Tools

Automation scripts for managing ZeroShare's LinkedIn presence.

**App ID:** 228538213 (Advertising API - Development Tier)
**Company Page ID:** 110457262

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

*Part of the ZeroShare Marketing Automation System*
