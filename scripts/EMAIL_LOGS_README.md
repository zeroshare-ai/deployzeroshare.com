# Email Cron Logs

Automatically email cron logs to rick@deployzeroshare.com via AWS SES.

## Setup

Requires AWS CLI configured with SES access:

```bash
aws configure
```

Ensure `no-reply@deployzeroshare.com` is verified in AWS SES.

## Usage

### Daily Digest (Automatic)

Runs every morning at 7 AM ET via cron. Sends all logs as a digest email.

```bash
npm run logs:email
# or
node scripts/email-logs.js --daily
```

### Send All Logs Now

```bash
npm run logs:email:all
# or
node scripts/email-logs.js --all
```

### Send Specific Log

```bash
node scripts/email-logs.js post        # LinkedIn post log
node scripts/email-logs.js generate   # Content generation log
node scripts/email-logs.js crosspost  # Twitter cross-post log
node scripts/email-logs.js comic      # Comic release log
node scripts/email-logs.js report     # Weekly report log
node scripts/email-logs.js blog       # Blog generation log
```

## Logs Included

- **LinkedIn:**
  - `post.log` - LinkedIn posting
  - `generate.log` - Content generation
  - `comic-release.log` - Comic releases
  - `report.log` - Weekly analytics
  - `blog-generate.log` - Blog post generation

- **Twitter:**
  - `crosspost.log` - Twitter cross-posting

## Cron Schedule

Daily digest runs automatically at **7 AM ET** via `scripts/setup-marketing-cron.sh`.

See `docs/CRON_AND_AUTOMATION.md` for full schedule.

## Troubleshooting

If emails fail:

1. Check AWS credentials: `aws sts get-caller-identity`
2. Verify SES setup: `aws ses get-account-sending-enabled --region us-east-1`
3. Check email verification: `aws ses list-verified-email-addresses --region us-east-1`
4. View email script logs: `tail -f tools/linkedin/logs/email-logs.log`
