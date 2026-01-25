# Blog Automation Decisions

**Owner:** Assistant (automation decisions). Updated as we refine.

---

## 1. When Blog Generation Runs

- **Gated until ~1 month from now.** Blog generation is **off** until `BLOG_GENERATION_AFTER` (default: **2026-02-23**). No Opus calls before then.
- **Rationale:** Cursor credits are over limit; when they refresh next month, using Opus for blog generation is acceptable.
- **Control:** Set `BLOG_GENERATION_ENABLED=true` and ensure current date ≥ `BLOG_GENERATION_AFTER` to run. Otherwise the script exits immediately (no API calls).

---

## 2. Frequency (Queue-Based)

- **Runs:** Every **Sunday 9 PM ET** (after `generate:all` at 8 PM). Script checks queue and **only generates if content is low**.
- **Queue check:** Counts blog posts in `app/blog/page.tsx` that haven't been shared to LinkedIn (not in `posts.json`).
- **Threshold:** Generate if unshared blog posts **< 5**. If ≥ 5, skip (queue healthy).
- **Per run:** Generate **2** new blog articles (metadata + full content) when queue is low.
- **Result:** Self-regulating. Only generates when needed, keeps queue healthy without overspending.

---

## 3. Queue Target

- **Goal:** Always have ≥ 5 unshared blog articles ready for LinkedIn.
- **Current:** ~36 articles; `generate-content` uses top 10 for new LinkedIn posts, plus strategic/viral/executive.
- **Logic:** Script counts unshared articles. If < 5, generates 2 more. If ≥ 5, skips (no Opus call).

---

## 4. Model

- **Model:** **Claude Opus** (Anthropic) for blog generation.
- **Rationale:** Quality matters for long-form, research-style posts; Opus is used when credits allow.

---

## 5. Output

- **Drafts:** Each run writes to `content/blog-drafts/YYYY-MM-DD-slug.json` (metadata + `content`).
- **Ingest:** Manual or future `blog-ingest` script merges drafts into `app/blog/page.tsx` and `app/blog/[slug]/page.tsx`. For now, we just produce drafts.

---

## 6. Cron

- **Schedule:** Every Sunday 9 PM ET. Script runs with `--cron` and checks queue. Exits without API calls if:
  - Not enabled (`BLOG_GENERATION_ENABLED` not true)
  - Before gate date (`BLOG_GENERATION_AFTER`)
  - Queue healthy (≥ 5 unshared articles)
- **Script:** `npm run blog:generate -- --cron` (or `node scripts/blog-generate.js` for manual run).
- **Check queue:** `npm run blog:check-queue` (shows queue status, works even when gated).
- **Log:** `tools/linkedin/logs/blog-generate.log`.
- **Env:** Loaded from repo-root `.env`. Use `BLOG_GENERATION_ENABLED`, `BLOG_GENERATION_AFTER`, `ANTHROPIC_API_KEY`.

---

## 7. Recap

| Decision | Value |
|----------|--------|
| **Enabled after** | 2026-02-23 (~1 month from now) |
| **Frequency** | Every Sunday 9 PM ET, but only generates if queue < 5 |
| **Per run** | 2 articles (when queue is low) |
| **Queue threshold** | Generate if unshared articles < 5 |
| **Model** | Claude Opus |
| **Output** | `content/blog-drafts/*.json` |
| **Ingest** | Manual / future script |

---

---

## 8. Env (blog generation)

Add to repo-root `.env` when you enable blog generation (after credits refresh):

```bash
BLOG_GENERATION_ENABLED=true
BLOG_GENERATION_AFTER=2026-02-23   # ~1 month from now (or whenever credits refresh)
ANTHROPIC_API_KEY=sk-ant-...
```

Until then, leave `BLOG_GENERATION_ENABLED` unset or `false`. The script exits with no API calls.

---

*Last updated: 2026-01-23 (queue-based generation, gate: 2026-02-23)*
