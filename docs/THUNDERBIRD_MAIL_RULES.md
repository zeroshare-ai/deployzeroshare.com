# Thunderbird Mail Rules for ZeroShare Marketing

Set up automatic email filtering for marketing automation emails.

---

## Blog Post Reports

When a blog post is shared on LinkedIn, an automatic email is sent with the subject:

```
[Blog Post Report] <Blog Title>
```

### Create the Mail Rule

1. **Open Thunderbird** → Tools → Message Filters
2. **Select account**: rick@deployzeroshare.com
3. **Click "New..."** to create a new filter

### Filter Settings

| Field | Value |
|-------|-------|
| **Filter name** | Blog Post Reports |
| **Apply filter when** | Getting New Mail |
| **Match** | Match all of the following |

### Conditions

| Condition | Operator | Value |
|-----------|----------|-------|
| Subject | contains | `[Blog Post Report]` |

### Actions

| Action | Value |
|--------|-------|
| Move Message to | Marketing/Blog Posts |

### Screenshot Reference

```
┌─────────────────────────────────────────────────────────────┐
│ Filter name: [Blog Post Reports                          ]  │
├─────────────────────────────────────────────────────────────┤
│ Apply filter when: [✓] Getting New Mail                     │
│                    [ ] Manually Run                         │
│                    [ ] After Junk Classification            │
├─────────────────────────────────────────────────────────────┤
│ Match [all ▼] of the following:                             │
│                                                             │
│   [Subject ▼] [contains ▼] [[Blog Post Report]         ]    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Perform these actions:                                      │
│                                                             │
│   [Move Message to ▼] [Marketing/Blog Posts ▼]              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

4. **Click OK** to save

---

## Cron Log Digests

Daily log digest emails have the subject:

```
ZeroShare Cron Logs Digest - <date>
```

### Filter Settings

| Field | Value |
|-------|-------|
| **Filter name** | Cron Log Digests |
| **Subject contains** | `ZeroShare Cron Logs Digest` |
| **Move to** | Marketing/Automation Logs |

---

## All Marketing Emails

To catch all ZeroShare marketing automation emails:

| Field | Value |
|-------|-------|
| **Filter name** | ZeroShare Marketing |
| **From** | contains `no-reply@deployzeroshare.com` |
| **Move to** | Marketing |

---

## Folder Structure

Create this folder hierarchy in Thunderbird:

```
rick@deployzeroshare.com
└── Marketing
    ├── Blog Posts        ← [Blog Post Report] emails
    ├── Automation Logs   ← Cron log digests
    └── Reports           ← Weekly reports
```

### Create Folders

1. Right-click on your inbox
2. Select "New Folder..."
3. Name: "Marketing"
4. Right-click on "Marketing" → New Subfolder → "Blog Posts"
5. Repeat for other subfolders

---

## Email Subject Patterns

| Email Type | Subject Pattern | Suggested Folder |
|------------|-----------------|------------------|
| Blog post shared | `[Blog Post Report] *` | Marketing/Blog Posts |
| Daily cron logs | `ZeroShare Cron Logs Digest - *` | Marketing/Automation Logs |
| Individual log | `ZeroShare Cron Log: *` | Marketing/Automation Logs |
| Weekly report | `ZeroShare Weekly Report - *` | Marketing/Reports |

---

## Testing

After creating filters, test them:

```bash
# Trigger a blog report manually
npm run blog:report -- --slug ai-security-best-practices

# Trigger a log digest
npm run logs:email
```

Check that emails arrive and are filtered to the correct folders.

---

## Troubleshooting

### Emails not being filtered

1. Check filter is enabled (checkmark in Message Filters list)
2. Verify folder exists
3. Try running filter manually: Tools → Run Filters on Folder

### Emails not arriving

1. Check AWS SES setup: `aws ses list-verified-email-addresses --region us-east-1`
2. Check spam folder
3. Verify `no-reply@deployzeroshare.com` is verified in SES

### Wrong folder

Double-check the subject pattern matches exactly. Use "contains" not "is" for flexibility.
