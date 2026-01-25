# "The Gateway" Comic Series — Implementation Complete
## Release-date gated · Generate now · Go live on LinkedIn day only

---

## What’s done

### 1. **Release-date logic**
- **Prebuild:** `scripts/prebuild-comics.js` runs before `next build`. Uses `COMIC_RELEASE_AS_OF` (or build day) to filter episodes.
- **Only released comics on blog:** Episodes with `releaseDate <= COMIC_RELEASE_AS_OF` are added to `comic-posts-generated.ts` and `comic-content-generated.ts`. Unreleased comics never appear on the site.
- **Amplify:** `amplify.yml` preBuild sets `COMIC_RELEASE_AS_OF` to build day (ET) so Thursday deploys release that week’s episode.

### 2. **Blog**
- **Comics category** in filter.
- **Comic posts** merged from `comic-posts-generated.ts` (release-date filtered).
- **Comic content** merged from `comic-content-generated.ts` in `[slug]` page.
- **ComicCTA** for comic posts only; same CTA everywhere.

### 3. **Episode data**
- **`docs/COMIC_EPISODES_DATA.json`:** All 34 episodes, each with `releaseDate` (Thursdays from `startDate`).
- Same CTA block, same LinkedIn caption formula, same hashtags.

### 4. **Image generation**
- **`scripts/generate-comic-series.js`:** Uses `@google/genai` (`gemini-2.5-flash-image`).
  - **Blog:** 3-panel strip → `comic-episode-NN.png`
  - **LinkedIn:** Panel 1 only → `comic-episode-NN-linkedin.png` (used if present).
- **Requires `GOOGLE_API_KEY`.** Run **before** first Thursday:
  ```bash
  export GOOGLE_API_KEY=your_key
  npm run comics:generate       # all 34
  npm run comics:generate:1     # episode 1 only
  ```
- Commit `public/images/comics/*.png` so deploy and LinkedIn post have images.

### 5. **LinkedIn**
- **`tools/linkedin/post-comic.js`:** Uses episode `linkedinCaption`, prefers `-linkedin.png` when available.
- **`scripts/release-comic-thursday.sh`:** Push → wait → `post-comic --next`.
- **Cron:** `scripts/setup-comic-cron.sh` adds Thursday 8 AM ET cron.
- **GitHub Action:** `.github/workflows/comic-release-thursday.yml` runs Thursdays 13:00 UTC; set `LINKEDIN_ACCESS_TOKEN` and `LINKEDIN_LIVE_MODE=true` to post live.

---

## Go-live checklist

1. **Generate images**
   ```bash
   export GOOGLE_API_KEY=...
   npm run comics:generate
   git add public/images/comics && git commit -m "comic images" && git push
   ```

2. **Prebuild = 0 until first Thursday**  
   Builds use `COMIC_RELEASE_AS_OF` = build day. Before the first Thursday, no comics are released. On first Thursday, Amplify build uses that day → episode 1 released.

3. **LinkedIn**
   - `tools/linkedin/.env`: `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_LIVE_MODE=true` for live posting.
   - **Cron:** `./scripts/setup-comic-cron.sh`  
     **Or** GitHub Action: add `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_LIVE_MODE` (optional) secrets.

4. **First Thursday**
   - Cron or Action: push → Amplify builds (episode 1 released) → wait → `post-comic --next`.
   - Blog post for episode 1 is live only from that day; LinkedIn links to it.

---

## Commands

| Command | Purpose |
|--------|--------|
| `npm run prebuild:comics` | Regenerate comic modules (uses `COMIC_RELEASE_AS_OF` or today) |
| `npm run comics:generate` | Generate all 34 comic images |
| `npm run comics:generate:1` | Generate episode 1 only |
| `npm run comics:list` | List episodes |
| `npm run comic:post:next` | Post next episode to LinkedIn |
| `npm run comic:post:preview` | Preview episode 1 post |
| `./scripts/release-comic-thursday.sh` | Full Thursday flow (push → wait → post) |
| `./scripts/release-comic-thursday.sh --no-push --no-wait --preview` | Dry run |

---

## Files touched

- `app/blog/page.tsx` — merge `comicPostsReleased`
- `app/blog/[slug]/page.tsx` — merge `comicContentReleased`, ComicCTA for comics
- `app/blog/comic-posts-generated.ts` — generated
- `app/blog/comic-content-generated.ts` — generated
- `app/components/ComicCTA.tsx` — CTA block
- `docs/COMIC_EPISODES_DATA.json` — episodes + `releaseDate`
- `scripts/prebuild-comics.js` — release-date filter
- `scripts/add-comic-release-dates.js` — add `releaseDate` to episodes
- `scripts/generate-comic-series.js` — blog + LinkedIn images
- `scripts/release-comic-thursday.sh` — Thursday release script
- `scripts/setup-comic-cron.sh` — cron setup
- `tools/linkedin/post-comic.js` — post episode, prefer `-linkedin` image
- `amplify.yml` — `COMIC_RELEASE_AS_OF` in preBuild
- `package.json` — comics/prebuild/post scripts
- `.github/workflows/comic-release-thursday.yml` — Thursday Action

---

Content is generated and wired. Comics stay off the blog until each episode’s LinkedIn release day.
