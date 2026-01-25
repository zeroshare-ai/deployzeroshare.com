# ZeroShare Marketing Cron & Automation

**Single source of truth** for LinkedIn, Twitter, and Comic scheduling. All times **America/New_York**.

---

## Install

```bash
./scripts/setup-marketing-cron.sh
```

This installs the unified schedule and removes any older ZeroShare LinkedIn/Twitter/Comic crons.

---

## Schedule (cohesive system)

| When (ET) | Action | Platform |
|-----------|--------|----------|
| **Sun 8 PM** | `generate:all` (content + strategic + viral + whitepapers + executive) | LinkedIn queue |
| **Mon 8 AM** | `post:next` (publish next draft) | LinkedIn |
| **Mon 8:15 AM** | `npm run post` (cross-post latest published) | Twitter |
| **Tue 8 AM** | `post:next` | LinkedIn |
| **Tue 8:15 AM** | Twitter cross-post | Twitter |
| **Tue 5 PM** | `post:next` | LinkedIn |
| **Tue 5:15 PM** | Twitter cross-post | Twitter |
| **Wed 8 AM** | `post:next` | LinkedIn |
| **Wed 8:15 AM** | Twitter cross-post | Twitter |
| **Wed 5 PM** | `post:next` | LinkedIn |
| **Wed 5:15 PM** | Twitter cross-post | Twitter |
| **Thu 8 AM** | **Comic release** (`release-comic-thursday.sh`: git push → Amplify → post episode) | LinkedIn (comic) |
| **Thu 8:15 AM** | Twitter cross-post (often no-op; comic does not add to `posts.json`) | Twitter |
| **Thu 5 PM** | `post:next` | LinkedIn |
| **Thu 5:15 PM** | Twitter cross-post | Twitter |
| **Fri 8 AM** | `post:next` | LinkedIn |
| **Fri 8:15 AM** | Twitter cross-post | Twitter |
| **Mon 9 AM** | `report-weekly` (LinkedIn analytics) | Log / optional email |

**Notes:**

- **Thu 8 AM:** Comic only. No `post:next` that slot. Regular LinkedIn posts resume at Thu 5 PM.
- **Twitter** runs ~15 min after each LinkedIn post so `posts.json` is updated before cross-posting.
- **Comic** posts to LinkedIn via `post-comic.js`; it does *not* write to `posts.json`, so Twitter does not cross-post comic episodes (LinkedIn-only).

---

## Flow

```
Sun 8 PM     generate:all → tools/linkedin/content/posts.json (drafts)
     ↓
Mon–Fri      post:next → publish draft to LinkedIn, mark published in posts.json
     ↓
~15 min      Twitter post → cross-post from posts.json (published, not yet in posted.json)
```

- **LinkedIn:** `tools/linkedin/` — `generate:all`, `post:next`, `post-comic.js`, `report-weekly.js`
- **Twitter:** `tools/twitter/` — `post-cross.js` (reads `../linkedin/content/posts.json`)

---

## Logs

| Log | Content |
|-----|---------|
| `tools/linkedin/logs/generate.log` | `generate:all` output |
| `tools/linkedin/logs/post.log` | `post:next` (LinkedIn) |
| `tools/linkedin/logs/comic-release.log` | Comic Thursday (git push + post-comic) |
| `tools/linkedin/logs/report.log` | `report-weekly` |
| `tools/twitter/logs/crosspost.log` | Twitter cross-posts |

---

## Commands

```bash
# View crontab
crontab -l

# Edit crontab
crontab -e

# Manual runs (same as cron)
cd tools/linkedin && npm run generate:all
cd tools/linkedin && npm run post:next
cd tools/twitter && TWITTER_LIVE_MODE=true npm run post
./scripts/release-comic-thursday.sh --no-push --no-wait --preview
```

---

## Prerequisites

- **LinkedIn:** `tools/linkedin/.env` (see `env.example`). Access token for company page.
- **Twitter:** `tools/twitter/.env` (see `env.example`). OAuth 1.0a keys + `TWITTER_LIVE_MODE=true` for live posts.
- **Comic:** `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_LIVE_MODE=true` in `tools/linkedin/.env`; git push access for Amplify.

---

## Related docs

- **Conversion & crosslinking:** `tools/linkedin/CONVERSION_PLAYBOOK.md`
- **Growth playbook:** `tools/linkedin/GROWTH_PLAYBOOK.md`
- **Twitter setup:** `tools/twitter/README.md`
- **Marketing overview:** `docs/MARKETING_AUTOMATION.md`
