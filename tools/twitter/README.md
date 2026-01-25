# Twitter/X Tools – Profile & Posting

Profile setup and cross-posting from LinkedIn to Twitter/X.

## 1. Developer setup

1. **Twitter Developer Account** – https://developer.twitter.com  
   - Use case (250+ chars): automated marketing for ZeroShare, etc.

2. **Create app** (e.g. `zeroshare-poster`) in your project.

3. **OAuth 1.0a – Read and write (required)**
   - App → **Settings** → **User authentication settings**
   - **App permissions**: **Read and write** (not “Read only”)
   - **Type of App**: Web App (or use defaults)
   - Callback URL: `https://deployzeroshare.com` (or any valid URL)
   - Save

4. **Keys and tokens**
   - **Keys and tokens** tab
   - **API Key and Secret** (Consumer keys)
   - **Access Token and Secret** (user context) — regenerate *after* switching to Read and write

5. **`.env`** (OAuth 1.0a only — not Client ID / Client Secret)
   ```bash
   # Option A: use configure script (no pasting into files)
   TWITTER_API_KEY=xxx TWITTER_API_SECRET=yyy TWITTER_ACCESS_TOKEN=zzz TWITTER_ACCESS_SECRET=www npm run configure

   # Option B: copy env.example, then edit .env with your four values
   cp env.example .env
   ```
   All Twitter scripts read from `tools/twitter/.env` only. There are no other token locations.

## 2. Profile setup

```bash
npm run profile         # Show current profile
npm run profile:preview # Preview ZeroShare profile (no changes)
npm run profile:apply   # Apply ZeroShare profile (requires TWITTER_LIVE_MODE=true)
```

**Custom fields:**
```bash
node profile-update.js --apply --name "ZeroShare" --description "AI Security Gateway…" --url "https://deployzeroshare.com"
```

If you get **401** on `--apply`, set name, bio, and URL manually:  
https://twitter.com/settings/profile

## 3. Posting (cross-post from LinkedIn)

```bash
npm run preview   # Preview next cross-posts (dry run)
npm run post      # Post next item (dry run unless TWITTER_LIVE_MODE=true)
npm run sync      # Cross-post all pending LinkedIn content
```

**Live posting:**
```bash
TWITTER_LIVE_MODE=true npm run post
```

## 4. Troubleshooting

| Error | Meaning | Fix |
|-------|---------|-----|
| **403** “oauth1 app permissions” | App is Read only | Set **Read and write**, regenerate Access Token + Secret, update `.env` |
| **401** on profile `--apply` | Profile update not allowed | Set profile manually at https://twitter.com/settings/profile |
| “Missing Twitter credentials” | `.env` incomplete | Add API Key, Secret, Access Token, Access Secret |

## 5. How posting works

1. Reads published LinkedIn posts from `../linkedin/content/posts.json`
2. Reformats for Twitter (shorter, hashtags, threads)
3. Posts via OAuth 1.0a (user context)
4. Records what’s posted in `posted.json`

## 6. Automation (cron)

Use the **unified marketing cron** (LinkedIn + Twitter + Comic):

```bash
./scripts/setup-marketing-cron.sh
```

Twitter cross-posts run ~15 min after each LinkedIn post (Mon–Fri).  
**Full schedule:** `docs/CRON_AND_AUTOMATION.md`

## Rate limits

- **Tweets**: 200 per 15 min (v2)
- Script waits 5s between posts during `sync`
