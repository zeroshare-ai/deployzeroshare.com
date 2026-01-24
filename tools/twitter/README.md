# Twitter/X Cross-Posting

Automatically cross-posts LinkedIn content to Twitter/X.

## Setup

1. **Create Twitter Developer Account**
   - Go to https://developer.twitter.com
   - Apply for Elevated access (needed for posting)

2. **Create App**
   - Create new project and app
   - Enable OAuth 1.0a with read/write permissions
   - Generate all tokens

3. **Configure**
   ```bash
   cp env.example .env
   # Edit .env with your credentials
   ```

4. **Test**
   ```bash
   npm run preview   # See what would be posted
   ```

## Usage

```bash
# Preview cross-posts (dry run)
npm run preview

# Post next item
npm run post

# Sync all LinkedIn posts to Twitter
npm run sync
```

## How It Works

1. Reads published LinkedIn posts from `../linkedin/content/posts.json`
2. Transforms for Twitter:
   - Shortens to 280 chars
   - Adjusts hashtags
   - Creates threads for long content
3. Posts to Twitter
4. Tracks what's been posted in `posted.json`

## Automation

Add to cron to run after LinkedIn posts:

```bash
# Cross-post to Twitter 30 min after LinkedIn (Tue-Thu)
30 8 * * 2-4 cd ~/checkout/deployzeroshare.com/tools/twitter && npm run post
```

## Rate Limits

Twitter API limits:
- 200 tweets per 15 minutes (v2)
- Script waits 5s between posts during sync
