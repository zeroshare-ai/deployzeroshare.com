# Email Nurture Sequence - ZeroShare

Automated email sequence for new newsletter subscribers.
Goal: Educate → Build trust → Convert to free trial → Upsell to paid.

---

## Sequence Overview

| Day | Email | Goal | CTA |
|-----|-------|------|-----|
| 0 | Welcome | Confirm subscription, set expectations | Read blog |
| 3 | Problem Aware | Show the AI data leak problem | Watch demo |
| 7 | Solution Intro | Introduce ZeroShare Gateway | Explore features |
| 14 | Social Proof | Case studies, testimonials | See pricing |
| 21 | Free Trial | Direct push to try free tier | Start free |
| 30 | Check-in | Value reminder, address objections | Book demo |

---

## Email 1: Welcome (Day 0)
**Already implemented in newsletter Lambda**

Subject: `Welcome to ZeroShare Security Insights`

---

## Email 2: Problem Awareness (Day 3)

**Subject:** `65% of your employees have done this (without knowing)`

**Body:**

```
Hi,

Quick stat that might surprise you:

65% of employees have shared sensitive data with ChatGPT, Copilot, or other AI tools—without authorization.

They're not being malicious. They're just:
- Pasting customer emails for help drafting responses
- Sharing code snippets (with credentials) for debugging
- Uploading documents for summarization

The AI doesn't feel like a data risk. But it is.

We put together a 5-minute read on the most common ways data leaks to AI:

→ [Read: How Employees Leak Data to AI](https://deployzeroshare.com/blog/prevent-pii-leaks-ai-chatbots)

Stay secure,
The ZeroShare Team

P.S. Reply to this email if you have questions. We read everything.
```

---

## Email 3: Solution Introduction (Day 7)

**Subject:** `What if you could enable AI safely?`

**Body:**

```
Hi,

Last email, we talked about how employees leak data to AI.

The typical response: block AI entirely.

But that doesn't work:
- Employees use personal devices
- Productivity drops
- Shadow IT explodes
- You lose visibility

There's a better approach: enable AI with protection.

ZeroShare Gateway sits between your employees and AI services. It:

✓ Detects PII in prompts (SSNs, emails, credit cards)
✓ Blocks secrets (API keys, credentials)
✓ Logs everything for compliance
✓ Works with ChatGPT, Copilot, Claude

Your employees use AI normally. Your data stays protected.

See how it works in 2 minutes:

→ [Explore ZeroShare Gateway](https://deployzeroshare.com/docs)

Questions? Just reply.

The ZeroShare Team
```

---

## Email 4: Social Proof (Day 14)

**Subject:** `How a healthcare company secured AI in 2 hours`

**Body:**

```
Hi,

Quick case study:

A mid-size healthcare company came to us with a problem:

Their clinical staff loved using AI for documentation.
Their compliance team was terrified of HIPAA violations.
Blocking AI meant angry doctors and slower patient care.

They deployed ZeroShare Gateway on a Monday morning.

By lunch, they had:
✓ Full visibility into AI usage
✓ Automatic PHI detection
✓ Audit logs for their compliance team
✓ Happy clinicians who could keep using AI

No code changes. No workflow disruption.

The compliance officer told us: "I can actually sleep now."

Want similar results?

→ [See Pricing](https://deployzeroshare.com/pricing)

Free tier available for small teams.

The ZeroShare Team
```

---

## Email 5: Free Trial Push (Day 21)

**Subject:** `Try ZeroShare free (10 minute setup)`

**Body:**

```
Hi,

You've been on our list for 3 weeks. By now you've probably:

✓ Seen the stats on AI data leaks
✓ Understood the solution approach
✓ Maybe even checked out our docs

Ready to try it?

ZeroShare Gateway - Free Tier:
- Up to 1,000 requests/day
- Full PII detection
- Secrets blocking
- Audit logging
- No credit card required

Deploy in 10 minutes:

→ [Start Free on AWS Marketplace](https://deployzeroshare.com/pricing)

Or if you want a guided tour:

→ [Book a 15-min Demo](https://deployzeroshare.com/contact-us)

Either way, we're here to help.

The ZeroShare Team
```

---

## Email 6: Check-in (Day 30)

**Subject:** `Still thinking about AI security?`

**Body:**

```
Hi,

It's been a month since you joined our list.

We know evaluating security tools takes time. You've got priorities, stakeholders, budgets.

Quick reminder of why ZeroShare might be worth another look:

For CISOs:
→ Enable AI without the risk profile

For Compliance:
→ Audit logs that satisfy SOC 2, HIPAA, GDPR

For Engineering:
→ 10-minute deployment, no code changes

If now isn't the right time, no worries. We'll keep sending helpful content.

But if you're ready to move forward:

→ [Start Free](https://deployzeroshare.com/pricing)
→ [Talk to Us](https://deployzeroshare.com/contact-us)

The ZeroShare Team

P.S. What's holding you back? Reply and let us know—we might be able to help.
```

---

## Implementation Options

### Option 1: AWS SES + Lambda (DIY)

Extend current newsletter Lambda:
1. Store subscribe date in DynamoDB
2. Create scheduled Lambda to check for due emails
3. Send via SES

Pros: Free (within AWS free tier)
Cons: Build & maintain yourself

### Option 2: Email Service Provider

Recommended: **Loops** (startup-friendly) or **ConvertKit**

1. Export subscribers from DynamoDB
2. Import to ESP
3. Set up automation sequence
4. Webhook to add new subscribers

Pros: Proven deliverability, easy UI
Cons: $29-49/month

### Option 3: Mailchimp/Sendinblue

Same as above, more enterprise-focused.

---

## Quick Setup: Loops.so

1. Sign up at loops.so (free tier available)
2. Create these emails as "Campaigns"
3. Set up automation:
   - Trigger: New contact added
   - Delays: 3, 7, 14, 21, 30 days
4. Add webhook to newsletter Lambda:

```javascript
// In newsletter Lambda, after successful subscribe:
await fetch('https://app.loops.so/api/v1/contacts/create', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: email,
    source: source,
    subscribed: true,
  }),
});
```

---

## Tracking

Add UTM parameters to all links:

```
?utm_source=email&utm_medium=nurture&utm_campaign=day_3
```

This lets you see which email drove the conversion.

---

## A/B Testing Ideas

Once running, test:
- Subject lines (question vs statement)
- CTA button color/text
- Send time (morning vs afternoon)
- Email length (short vs detailed)
