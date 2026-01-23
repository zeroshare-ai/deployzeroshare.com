# ZeroShare Gateway: LinkedIn Marketing Strategy & Campaign Playbook

## Document Information
- **Version:** 1.0
- **Created:** January 2026
- **Status:** Ready for Implementation
- **LinkedIn Company Page:** https://www.linkedin.com/company/110457262/

---

## Executive Summary

This document outlines a focused LinkedIn marketing strategy following the **"1-1-1-1" Framework**:

| Element | Decision |
|---------|----------|
| **1 Offer** | ZeroShare Gateway (On-Premise AI Security) |
| **1 Problem** | Data leakage when employees use AI tools (PII & Secrets) |
| **1 Audience** | Security leaders at mid-to-enterprise companies |
| **1 Channel** | LinkedIn Ads → deployzeroshare.com → AWS Marketplace |

**Primary Goal:** Drive qualified leads to AWS Marketplace purchase
**Secondary Goal:** Capture contact information from prospects not ready to buy

---

## Part 1: Target Audience Deep Dive

### Primary Persona: "Security-First Sarah"

| Attribute | Details |
|-----------|---------|
| **Title** | CISO, VP of Security, Head of Information Security, Director of Cybersecurity |
| **Company Size** | 200-10,000 employees |
| **Industry** | Healthcare, Financial Services, Technology, Government Contractors |
| **Pain Level** | HIGH - Board is asking about AI risk, employees are using ChatGPT anyway |
| **Budget Authority** | Yes - can approve $5K-50K without committee |
| **LinkedIn Behavior** | Active 2-3x/week, consumes thought leadership, shares compliance news |

#### Psychographic Profile
- **Fears:** Data breach headlines, regulatory fines, career-ending incident
- **Desires:** Enable innovation safely, look like a forward-thinking leader
- **Current State:** Blocked AI tools OR looking the other way while employees use them
- **Desired State:** AI-enabled workforce with full visibility and control

### Secondary Persona: "Engineering Manager Eric"

| Attribute | Details |
|-----------|---------|
| **Title** | Engineering Manager, DevOps Lead, Platform Engineering Director |
| **Company Size** | 50-5,000 employees |
| **Industry** | SaaS, Fintech, Healthtech, Enterprise Software |
| **Pain Level** | MEDIUM - Wants team to use Copilot/Cursor but worried about secrets |
| **Budget Authority** | Can recommend, needs approval from Security/CTO |
| **LinkedIn Behavior** | Follows tech influencers, engages with technical content |

#### Psychographic Profile
- **Fears:** Developer productivity loss, accidental credential leak, being the one who caused a breach
- **Desires:** Give developers modern AI tools without security blocking everything
- **Current State:** Fighting with security team about AI tool access
- **Desired State:** Approved AI usage with automatic guardrails

### Tertiary Persona: "Compliance Chris"

| Attribute | Details |
|-----------|---------|
| **Title** | Compliance Officer, GRC Director, Privacy Officer, DPO |
| **Company Size** | 500+ employees |
| **Industry** | Healthcare (HIPAA), Finance (SOC 2, PCI), Any EU presence (GDPR) |
| **Pain Level** | HIGH - Auditors are asking about AI governance |
| **Budget Authority** | Influences security spend, can champion projects |

---

## Part 2: LinkedIn Company Page Setup

### Profile Optimization Checklist

```
Company Name: ZeroShare
Tagline: "Stop Data Leaks Before They Reach AI" (120 chars max)
Industry: Computer & Network Security
Company Size: 2-10 employees (or actual)
Website: https://deployzeroshare.com
```

### About Section (2,000 chars)

```
ZeroShare Gateway is the enterprise security layer for AI adoption.

THE PROBLEM
Your employees are using ChatGPT, Copilot, Claude, and other AI tools—whether you've approved them or not. Every prompt is a potential data leak. 

Research shows:
• 22% of files uploaded to AI tools contain sensitive data
• 65% of employees have shared sensitive data with AI without authorization  
• $4.45M average cost of a data breach (IBM 2023)

THE SOLUTION
ZeroShare Gateway deploys on-premise as a transparent proxy between your users and AI services. It automatically:

✓ Detects PII (emails, SSNs, credit cards, health data)
✓ Blocks secrets (API keys, credentials, connection strings)
✓ Logs everything for compliance audits
✓ Works with ChatGPT, Copilot, Cursor, Claude & more

No code changes. Deploy in minutes. Sub-millisecond latency.

COMPLIANCE READY
• SOC 2 Type II aligned
• HIPAA compliant
• GDPR ready
• Complete audit logging

GET STARTED
Available now on AWS Marketplace with 1-click deployment.

🔗 Learn more: https://deployzeroshare.com
📧 Contact: support@deployzeroshare.com
```

### Cover Image Specifications
- **Size:** 1128 x 191 pixels
- **Content:** Clean design with tagline "Enable AI. Block Data Leaks." and shield imagery
- **Style:** Match website gradient (purple #667eea to #764ba2)

### Logo Specifications  
- **Size:** 300 x 300 pixels
- **Use:** Existing logo from /public/logo_150x150.png (scale up)

---

## Part 3: The Campaign Strategy

### Campaign Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     LINKEDIN ADS                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Awareness   │  │Consideration │  │  Conversion  │          │
│  │   (TOFU)     │  │   (MOFU)     │  │   (BOFU)     │          │
│  │              │  │              │  │              │          │
│  │ Thought      │  │ Problem-     │  │ Direct       │          │
│  │ Leadership   │  │ Solution     │  │ Response     │          │
│  │ Content      │  │ Content      │  │ Ads          │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│         ▼                 ▼                 ▼                   │
│  ┌─────────────────────────────────────────────────────┐       │
│  │           deployzeroshare.com                        │       │
│  │  • Homepage (conversion optimized)                   │       │
│  │  • Blog posts (SEO + retargeting)                   │       │
│  │  • Pricing page                                      │       │
│  │  • Contact/Demo form                                 │       │
│  └─────────────────────────┬───────────────────────────┘       │
│                            │                                    │
│         ┌──────────────────┼──────────────────┐                │
│         ▼                  ▼                  ▼                │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │
│  │    AWS      │   │   Contact   │   │  Retarget   │          │
│  │ Marketplace │   │    Form     │   │   Pool      │          │
│  │  (PRIMARY)  │   │ (SECONDARY) │   │  (NURTURE)  │          │
│  └─────────────┘   └─────────────┘   └─────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### Campaign 1: "The AI Data Leak" (Primary Campaign)

**Objective:** Direct Response - Drive AWS Marketplace visits and demo requests

**Targeting:**
```yaml
Job Titles (OR):
  - Chief Information Security Officer
  - CISO
  - VP Security
  - VP Information Security
  - Director of Security
  - Director of Cybersecurity
  - Head of Security
  - Security Architect
  - Chief Technology Officer
  - CTO
  - VP Engineering

Company Size: 201-10,000 employees

Industries (OR):
  - Computer & Network Security
  - Information Technology & Services
  - Financial Services
  - Banking
  - Hospital & Health Care
  - Pharmaceuticals
  - Insurance
  - Government Administration
  - Computer Software

Geography: United States, Canada, United Kingdom, Germany, Australia

Exclude:
  - Job seekers
  - Students
  - Competitors (list security vendors)
```

**Budget Allocation:**
| Phase | Duration | Daily Budget | Total |
|-------|----------|--------------|-------|
| Testing | Week 1-2 | $100/day | $1,400 |
| Optimization | Week 3-4 | $150/day | $2,100 |
| Scale | Month 2+ | $200-500/day | Variable |

---

## Part 4: Ad Creative Concepts

### Ad Format Priority
1. **Single Image Ads** - Best for awareness and consideration
2. **Carousel Ads** - Best for explaining the solution
3. **Video Ads** - Best for demos and social proof
4. **Document Ads** - Best for lead magnets

---

### Creative Set 1: "The Statistic Shock"

**Concept:** Lead with alarming statistics to create urgency

#### Ad 1A: "22% of Files"
```
┌────────────────────────────────────────┐
│                                        │
│    [IMAGE: Red warning triangle        │
│     with "22%" in large text]          │
│                                        │
│    Background: Dark gradient           │
│    Style: Bold, alarming               │
│                                        │
└────────────────────────────────────────┘

HEADLINE: Your employees are leaking data to AI. Right now.

BODY:
New research: 22% of files uploaded to AI tools contain sensitive data.

Your team uses ChatGPT. They paste customer emails. Code with API keys. Medical records. 

You can't stop AI adoption. But you can stop the leaks.

ZeroShare Gateway sits between your users and AI services. It automatically blocks PII and secrets before they leave your network.

→ On-premise deployment
→ Sub-millisecond latency  
→ Works with ChatGPT, Copilot, Claude & more

Deploy in minutes from AWS Marketplace.

CTA BUTTON: Learn More →
DESTINATION: https://deployzeroshare.com
```

#### Ad 1B: "$4.45 Million"
```
┌────────────────────────────────────────┐
│                                        │
│    [IMAGE: Stack of money with         │
│     "$4.45M" overlaid]                 │
│                                        │
│    Text: "Average cost of a            │
│           data breach"                 │
│    Source: IBM 2023                    │
│                                        │
└────────────────────────────────────────┘

HEADLINE: One ChatGPT prompt shouldn't cost you $4.45 million.

BODY:
Your developers paste code into Copilot.
Your support team pastes tickets into ChatGPT.
Your analysts paste reports into Claude.

Every prompt is a potential breach.

ZeroShare Gateway automatically detects and blocks sensitive data before it reaches external AI services:

✓ 50+ PII patterns (SSN, credit cards, health data)
✓ 200+ secret patterns (API keys, credentials)
✓ Complete audit logging for compliance

On-premise. Zero latency. Zero code changes.

CTA BUTTON: See How It Works →
DESTINATION: https://deployzeroshare.com/#solution
```

#### Ad 1C: "65% of Employees"
```
┌────────────────────────────────────────┐
│                                        │
│    [IMAGE: Office workers at           │
│     computers, one highlighted         │
│     with warning glow]                 │
│                                        │
│    Overlay: "65%"                      │
│    Subtext: "have shared sensitive     │
│              data with AI"             │
│                                        │
└────────────────────────────────────────┘

HEADLINE: 65% of your employees have already done it.

BODY:
Shared sensitive data with AI tools. Without permission. Without realizing the risk.

You have two choices:
1. Block AI (and lose to competitors who don't)
2. Enable AI safely with ZeroShare Gateway

ZeroShare Gateway intercepts every AI request and automatically:
• Redacts PII before it leaves your network
• Blocks secrets and credentials
• Logs everything for auditors

Your team gets AI productivity. You get peace of mind.

Available on AWS Marketplace.

CTA BUTTON: Deploy Now →
DESTINATION: https://deployzeroshare.com
```

---

### Creative Set 2: "The Fear Campaign"

**Concept:** Speak directly to the CISO's nightmare scenario

#### Ad 2A: "The Breach That Started With ChatGPT"
```
┌────────────────────────────────────────┐
│                                        │
│    [IMAGE: Dark, moody image of        │
│     person at computer with            │
│     ChatGPT interface visible]         │
│                                        │
│    Overlay text: "It only takes        │
│                   one prompt"          │
│                                        │
└────────────────────────────────────────┘

HEADLINE: The breach investigation started with ChatGPT.

BODY:
"How did customer SSNs end up in AI training data?"

That's a question no CISO wants to answer to the board.

But without visibility into AI usage, it's a matter of when—not if.

ZeroShare Gateway gives you complete control:
• See every AI request in real-time
• Auto-block PII and secrets
• Maintain compliance audit trails

On-premise deployment. Your data never leaves your network until it's safe.

Don't wait for the incident.

CTA BUTTON: Protect Your Organization →
DESTINATION: https://deployzeroshare.com
```

#### Ad 2B: "What Your Developers Are Pasting Into Copilot"
```
┌────────────────────────────────────────┐
│                                        │
│    [IMAGE: Code snippet with           │
│     highlighted AWS credentials]       │
│                                        │
│    "aws_secret_access_key = ..."       │
│    [REDACTED overlay]                  │
│                                        │
└────────────────────────────────────────┘

HEADLINE: Your AWS keys are in someone else's AI model now.

BODY:
Researchers extracted 2,702 real credentials from AI code assistants.

Your developers use Copilot. Cursor. Claude for code review.

Every time they paste code with hardcoded credentials, database URLs, or API keys—that data goes to external servers.

ZeroShare Gateway automatically intercepts and blocks:
• AWS/Azure/GCP credentials
• Database connection strings  
• API keys (OpenAI, Stripe, Twilio, etc.)
• Private keys and certificates

No more hoping developers remember to sanitize.

CTA BUTTON: Stop Secret Leaks →
DESTINATION: https://deployzeroshare.com
```

---

### Creative Set 3: "The Solution Story"

**Concept:** Show the transformation from problem to solution

#### Ad 3A: Carousel - "Before & After ZeroShare"

**Card 1: The Problem**
```
┌────────────────────────────────────────┐
│    BEFORE ZEROSHARE                    │
│                                        │
│    [Chaotic visual: multiple AI        │
│     logos, warning symbols]            │
│                                        │
│    • No visibility into AI usage       │
│    • PII flowing to external APIs      │
│    • Compliance nightmare              │
│    • Security vs. productivity war     │
│                                        │
└────────────────────────────────────────┘
```

**Card 2: The Solution**
```
┌────────────────────────────────────────┐
│    ZEROSHARE GATEWAY                   │
│                                        │
│    [Clean diagram: Users → Gateway     │
│     → AI APIs with shield icon]        │
│                                        │
│    Transparent proxy that sits         │
│    between your users and AI           │
│                                        │
└────────────────────────────────────────┘
```

**Card 3: PII Protection**
```
┌────────────────────────────────────────┐
│    AUTOMATIC PII DETECTION             │
│                                        │
│    [Visual: Text being scanned         │
│     with SSN highlighted/redacted]     │
│                                        │
│    50+ patterns detected:              │
│    ✓ SSN, Credit Cards, Phone          │
│    ✓ Email, Address, Names             │
│    ✓ Health data (HIPAA)               │
│                                        │
└────────────────────────────────────────┘
```

**Card 4: Secrets Blocking**
```
┌────────────────────────────────────────┐
│    SECRETS BLOCKING                    │
│                                        │
│    [Visual: Code with AWS key          │
│     being blocked with red X]          │
│                                        │
│    200+ patterns blocked:              │
│    ✓ AWS/Azure/GCP credentials         │
│    ✓ API keys & tokens                 │
│    ✓ Database connection strings       │
│                                        │
└────────────────────────────────────────┘
```

**Card 5: Compliance**
```
┌────────────────────────────────────────┐
│    COMPLIANCE READY                    │
│                                        │
│    [Visual: Compliance badges          │
│     SOC2, HIPAA, GDPR]                 │
│                                        │
│    Complete audit logging              │
│    Data residency controls             │
│    Ready for your next audit           │
│                                        │
└────────────────────────────────────────┘
```

**Card 6: CTA**
```
┌────────────────────────────────────────┐
│    DEPLOY IN MINUTES                   │
│                                        │
│    [Visual: AWS Marketplace logo       │
│     + ZeroShare logo]                  │
│                                        │
│    1-Click deployment                  │
│    Sub-millisecond latency             │
│    Enterprise support included         │
│                                        │
│    [Learn More →]                      │
│                                        │
└────────────────────────────────────────┘
```

---

### Creative Set 4: "Social Proof & Authority"

#### Ad 4A: Industry Use Case - Healthcare
```
┌────────────────────────────────────────┐
│                                        │
│    [IMAGE: Hospital/healthcare         │
│     setting, professional]             │
│                                        │
│    "99.7% of PHI blocked before        │
│     reaching AI services"              │
│                                        │
│    - Regional Healthcare Network       │
│                                        │
└────────────────────────────────────────┘

HEADLINE: A hospital network enabled AI for 2,400 clinicians. Here's how.

BODY:
The challenge: Clinicians wanted AI assistance. HIPAA said no.

The solution: ZeroShare Gateway.

Now, clinicians use AI tools freely. PHI is automatically detected and blocked before leaving the network.

Results after 90 days:
• 99.7% of PHI intercepted
• Zero compliance incidents
• AI adoption across all departments

"We went from blocking AI to championing it—without compromising patient privacy."

ZeroShare Gateway: Enable AI. Protect Data.

CTA BUTTON: See Healthcare Case Study →
DESTINATION: https://deployzeroshare.com
```

#### Ad 4B: Industry Use Case - Financial Services
```
┌────────────────────────────────────────┐
│                                        │
│    [IMAGE: Modern office,              │
│     financial/tech feel]               │
│                                        │
│    "47,000+ secrets intercepted        │
│     in the first 90 days"              │
│                                        │
└────────────────────────────────────────┘

HEADLINE: They thought their developers were careful. Then they deployed ZeroShare.

BODY:
A financial services firm turned on ZeroShare Gateway for their engineering team.

In 90 days, the gateway intercepted:
• 47,000+ credentials and secrets
• 12,000+ customer PII instances
• 3,400+ internal IP addresses

Every single one would have gone to external AI services.

"We had no idea the scale of the exposure. ZeroShare made the invisible visible."

Deploy company-wide in weeks, not months.

CTA BUTTON: Get Started →
DESTINATION: https://deployzeroshare.com
```

---

### Creative Set 5: "Direct Response / Urgency"

#### Ad 5A: Limited Time Offer
```
┌────────────────────────────────────────┐
│                                        │
│    [IMAGE: Shield with clock,          │
│     "Free Trial" badge]                │
│                                        │
│    GET PROTECTED TODAY                 │
│    Free trial available on             │
│    AWS Marketplace                     │
│                                        │
└────────────────────────────────────────┘

HEADLINE: Your employees used AI 47 times today. Was any data leaked?

BODY:
If you don't know, that's the problem.

ZeroShare Gateway gives you instant visibility and automatic protection:

→ Deploy in 15 minutes via AWS Marketplace
→ See all AI traffic immediately
→ Auto-block PII and secrets
→ Free trial available

Every day without protection is a day of unnecessary risk.

CTA BUTTON: Start Free Trial →
DESTINATION: [AWS Marketplace URL]
```

---

## Part 5: LinkedIn Organic Content Strategy

### Content Pillars

| Pillar | Purpose | Frequency |
|--------|---------|-----------|
| **Thought Leadership** | Position as AI security authority | 2x/week |
| **Education** | Teach about AI security risks | 2x/week |
| **Product Updates** | Show capability & momentum | 1x/week |
| **Industry News** | Commentary on AI security events | As needed |
| **Social Proof** | Case studies, testimonials | 1x/week |

### Weekly Content Calendar

#### Monday: "Stat of the Week"
Share a compelling AI security statistic with commentary.

```
Example Post:

📊 AI Security Stat of the Week

22% of files uploaded to AI tools contain sensitive data.

That's not a future problem. That's happening right now, in your organization.

The question isn't whether your employees are using AI. They are.

The question is: Do you have visibility into what they're sharing?

#AISecurity #DataProtection #CISO #InfoSec

[Link to blog post or website]
```

#### Tuesday: "Technical Deep Dive"
Share educational content about AI security concepts.

```
Example Post:

🔒 Why traditional DLP doesn't work for AI

Your DLP solution watches for files leaving via email or USB.

But AI prompts? They're just HTTPS requests to api.openai.com.

Traditional DLP sees: "POST request to external API"
What's actually happening: "Customer SSN + medical history sent to AI model"

This is why AI security requires a new approach.

A proxy-based gateway can:
• Inspect request payloads in real-time
• Detect PII patterns within prompts
• Block secrets before transmission
• Log everything for compliance

The threat model has changed. Your security architecture should too.

#AISecurity #DLP #ZeroTrust #CyberSecurity
```

#### Wednesday: "Risk Scenario"
Paint a picture of what can go wrong (fear-based, but educational).

```
Example Post:

⚠️ Real scenario from last month:

A developer needed to debug a database issue.

They pasted the error message into ChatGPT.

The error message included the full connection string:
postgresql://admin:P@ssw0rd123@prod-db.company.com/customers

That database held 2.3 million customer records.

The "secret" lasted 47 seconds in their clipboard. But it's now part of an AI training dataset. Forever.

How many times has this happened in your organization?

(Without a proxy gateway watching AI traffic, you'll never know.)

#DataSecurity #DevSecOps #AISecurity
```

#### Thursday: "How-To / Best Practice"
Provide actionable advice (positions you as helpful expert).

```
Example Post:

✅ 5 things to include in your AI Acceptable Use Policy

1. Define "approved" AI tools (and how to request new ones)
2. Explicitly prohibit pasting customer data, credentials, and source code
3. Require sanitization of code before using AI assistants
4. Mandate reporting of accidental sensitive data exposure
5. Specify consequences for policy violations

But here's the hard truth:

Policies don't prevent accidents. Technology does.

Even well-intentioned employees make mistakes. A policy won't stop a developer from accidentally pasting an API key at 11pm on a deadline.

That's why policy + automated detection = real protection.

Free AI policy template in comments 👇

#AIGovernance #InfoSec #CISO #Compliance
```

#### Friday: "Industry News Commentary"
React to relevant AI security news.

```
Example Post:

📰 [React to relevant news story]

"Major company discloses data breach linked to employee AI usage"

This was inevitable.

For 2 years, security leaders have been warning about shadow AI. Now we're seeing the consequences.

Key takeaways:
1. Banning AI doesn't work—employees use it anyway
2. Training alone isn't enough—accidents happen
3. You need automated controls at the network layer

The companies that get ahead of this will enable AI safely.

The companies that don't will be in next month's headlines.

#AISecurity #DataBreach #CISO
```

### Engagement Strategy

**Daily Actions:**
- [ ] Like 10 posts from target personas
- [ ] Comment thoughtfully on 5 posts from CISOs/security leaders  
- [ ] Accept connection requests from relevant profiles
- [ ] Check mentions and reply within 2 hours

**Weekly Actions:**
- [ ] Post 5 organic posts (M-F)
- [ ] Share 2 blog articles to page
- [ ] Engage in 2-3 relevant group discussions
- [ ] Update any pinned content if needed

---

## Part 6: Retargeting Strategy

### Website Pixel Setup

Install LinkedIn Insight Tag on all pages of deployzeroshare.com:

```html
<!-- LinkedIn Insight Tag -->
<script type="text/javascript">
_linkedin_partner_id = "YOUR_PARTNER_ID";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
<script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lm-sdk-web.js?" + (new Date()).getTime();
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=YOUR_PARTNER_ID&fmt=gif" />
</noscript>
```

### Audience Segments

| Segment | Definition | Retarget With |
|---------|------------|---------------|
| **Hot Leads** | Visited pricing or contact page | Direct conversion ads, demo offer |
| **Warm Leads** | Visited 2+ pages, >60 seconds | Solution-focused ads |
| **Blog Readers** | Read blog content | Related content, soft CTA |
| **Homepage Bouncers** | Only saw homepage, <30 sec | Problem-awareness ads |

### Retargeting Ad: Hot Lead Recovery

```
HEADLINE: Still evaluating AI security solutions?

BODY:
We noticed you were checking out ZeroShare Gateway.

Quick facts:
• Deploys in 15 minutes (not weeks)
• Zero code changes required
• Works with ChatGPT, Copilot, Claude & more

Still have questions? 

Let's schedule a 15-minute call. We'll show you exactly how ZeroShare works for your use case.

CTA: Schedule a Demo →
DESTINATION: https://deployzeroshare.com/contact-us
```

---

## Part 7: Conversion Tracking Setup

### LinkedIn Conversions to Track

| Conversion Name | Type | Page/Action |
|-----------------|------|-------------|
| `aws_marketplace_click` | URL Click | AWS Marketplace button clicks |
| `contact_form_submit` | Form Submit | /contact-us form completion |
| `pricing_page_view` | Page View | /pricing page load |
| `docs_engagement` | Page View | /docs pages (2+ page views) |
| `blog_subscriber` | Form Submit | Newsletter signup |

### UTM Parameter Structure

All LinkedIn ads should use consistent UTM parameters:

```
?utm_source=linkedin
&utm_medium=paid_social
&utm_campaign={campaign_name}
&utm_content={ad_variant}
&utm_term={audience_segment}
```

**Example:**
```
https://deployzeroshare.com?utm_source=linkedin&utm_medium=paid_social&utm_campaign=security_leaders_q1&utm_content=stat_22percent&utm_term=ciso_enterprise
```

---

## Part 8: Budget Recommendations

### Monthly Budget Tiers

| Tier | Monthly Spend | Expected Results |
|------|---------------|------------------|
| **Starter** | $3,000-5,000 | 5-10 demo requests, brand awareness |
| **Growth** | $7,500-15,000 | 15-30 demo requests, consistent pipeline |
| **Scale** | $20,000-50,000 | 50+ demo requests, market leadership |

### Budget Allocation (Growth Tier Example: $10,000/month)

| Category | % | Amount | Purpose |
|----------|---|--------|---------|
| Prospecting Ads | 60% | $6,000 | New audience reach |
| Retargeting Ads | 25% | $2,500 | Convert warm leads |
| Brand Awareness | 15% | $1,500 | Thought leadership boost |

### Expected Metrics (Growth Tier)

| Metric | Target Range |
|--------|--------------|
| CPM (Cost per 1000 impressions) | $30-80 |
| CPC (Cost per click) | $5-15 |
| CTR (Click-through rate) | 0.4-0.8% |
| Website visits | 800-2,000/month |
| Demo requests | 15-30/month |
| Cost per demo request | $300-600 |

---

## Part 9: Key Performance Indicators (KPIs)

### Primary KPIs (Business Outcomes)

| KPI | Target | Measurement |
|-----|--------|-------------|
| AWS Marketplace Visits | 100+/month | UTM tracking |
| Demo Requests | 20+/month | Form submissions |
| Cost Per Lead (CPL) | <$500 | Ad spend / leads |
| Lead to Opportunity Rate | >25% | CRM tracking |

### Secondary KPIs (Campaign Health)

| KPI | Target | Why It Matters |
|-----|--------|----------------|
| CTR | >0.5% | Ad relevance |
| Engagement Rate | >2% | Content resonance |
| Frequency | <5 | Ad fatigue prevention |
| Landing Page Conv. Rate | >3% | Website effectiveness |

### Reporting Cadence

| Report | Frequency | Contents |
|--------|-----------|----------|
| Daily Dashboard | Daily | Spend, clicks, conversions |
| Weekly Review | Weekly | Performance by creative, audience |
| Monthly Analysis | Monthly | Full funnel analysis, optimization recommendations |
| Quarterly Strategy | Quarterly | Strategic review, budget reallocation |

---

## Part 10: Ad Image Generation Guidelines

### For Gemini/AI Image Generation

When generating ad images, use these prompts:

#### Style 1: Statistics-Focused
```
Prompt: "Professional corporate security infographic, dark navy background, 
large white text showing '22%' with a subtle warning triangle, modern 
minimalist design, enterprise software aesthetic, no people, clean lines"
```

#### Style 2: Data Protection Visual
```
Prompt: "Abstract digital visualization of data being protected by a shield, 
purple and blue gradient background (#667eea to #764ba2), glowing particles 
representing data being filtered, futuristic but professional, suitable 
for B2B enterprise software marketing"
```

#### Style 3: Threat Scenario
```
Prompt: "Professional office setting, person at computer with code visible 
on screen, subtle red warning glow emanating from the screen, dramatic 
lighting, corporate environment, photorealistic, cybersecurity theme"
```

#### Style 4: Solution Architecture
```
Prompt: "Clean technical diagram showing data flow through a security 
gateway, minimalist icons for users, gateway shield, and cloud services, 
white background with purple accent colors (#667eea), professional 
B2B software documentation style"
```

### Image Specifications

| Placement | Size | Aspect Ratio |
|-----------|------|--------------|
| Single Image Ad | 1200 x 627 px | 1.91:1 |
| Carousel Card | 1080 x 1080 px | 1:1 |
| Video Thumbnail | 1920 x 1080 px | 16:9 |
| Company Cover | 1128 x 191 px | 5.9:1 |

---

## Part 11: Launch Checklist

### Week 1: Foundation

- [ ] Complete LinkedIn company page setup
  - [ ] Upload logo and cover image
  - [ ] Write About section
  - [ ] Add website link
  - [ ] Add showcase page if needed

- [ ] Install LinkedIn Insight Tag on website
  - [ ] Verify pixel firing correctly
  - [ ] Create audience segments

- [ ] Set up conversion tracking
  - [ ] Define conversion events
  - [ ] Test conversion tracking

- [ ] Create Campaign Manager account
  - [ ] Connect company page
  - [ ] Set up billing

### Week 2: Creative Development

- [ ] Generate ad images (use guidelines above)
- [ ] Write ad copy variations (3-5 per campaign)
- [ ] Create landing page UTMs
- [ ] Build first campaign in Campaign Manager
- [ ] Set up A/B test structure

### Week 3: Launch & Monitor

- [ ] Launch first campaign at 50% budget
- [ ] Monitor daily for first 3 days
- [ ] Check for disapprovals or issues
- [ ] Begin organic posting schedule

### Week 4: Optimize

- [ ] Review first week performance
- [ ] Pause underperforming ads
- [ ] Scale winning variations
- [ ] Adjust targeting if needed
- [ ] Increase to full budget if metrics are healthy

---

## Part 12: Competitive Positioning

### Key Competitors in AI Security Space

| Competitor | Their Angle | Our Differentiation |
|------------|-------------|---------------------|
| Nightfall AI | Cloud DLP for AI | We're on-premise first |
| Cyberhaven | Data lineage | We're simpler, faster to deploy |
| Protect AI | ML model security | We focus on data leaving to AI |
| Generic DLP vendors | Traditional DLP | We understand AI-specific threats |

### Positioning Statement

> "For security-conscious organizations who want to enable AI without data risk, ZeroShare Gateway is the on-premise security proxy that automatically blocks PII and secrets before they reach external AI services. Unlike cloud-based DLP tools, ZeroShare keeps your data entirely within your network while providing sub-millisecond latency that doesn't slow down your team."

### Objection Handling

| Objection | Response |
|-----------|----------|
| "We already have DLP" | "Traditional DLP wasn't built for AI prompts. It watches files and emails, not HTTPS POST requests to api.openai.com. ZeroShare specifically understands AI traffic patterns." |
| "We just blocked AI tools" | "That doesn't work—employees use personal devices or find workarounds. You're just losing visibility. Better to enable controlled access with automatic protection." |
| "Our developers are careful" | "Even careful developers make mistakes at 11pm on a deadline. ZeroShare is the safety net that catches what humans miss." |
| "Too expensive" | "One data breach costs $4.45M on average. One compliance fine under GDPR can be 4% of revenue. What's the cost of not having protection?" |

---

## Appendix A: Content Ideas (90-Day Calendar)

### Month 1 Content Topics

| Week | Blog Post | LinkedIn Post Theme |
|------|-----------|---------------------|
| 1 | "Why Traditional DLP Fails for AI" | AI security statistics |
| 2 | "The CISO's Guide to AI Governance" | Policy templates |
| 3 | "How to Audit AI Usage in Your Org" | Detection techniques |
| 4 | "Case Study: Healthcare AI Enablement" | Industry success |

### Month 2 Content Topics

| Week | Blog Post | LinkedIn Post Theme |
|------|-----------|---------------------|
| 5 | "Secrets in Code: The Hidden AI Risk" | Developer workflows |
| 6 | "HIPAA and AI: Compliance Guide" | Healthcare focus |
| 7 | "AI Security Architecture Patterns" | Technical deep dive |
| 8 | "The True Cost of Shadow AI" | ROI calculator |

### Month 3 Content Topics

| Week | Blog Post | LinkedIn Post Theme |
|------|-----------|---------------------|
| 9 | "SOC 2 Controls for AI" | Compliance focus |
| 10 | "Financial Services AI Security" | Industry vertical |
| 11 | "Zero Trust for AI Applications" | Architecture |
| 12 | "Q1 AI Threat Landscape Report" | Thought leadership |

---

## Appendix B: Sample LinkedIn Posts (Copy-Paste Ready)

### Post 1: Problem Awareness
```
Every day your team uses ChatGPT, Claude, and Copilot.

And every day, they're accidentally sharing:
• Customer email addresses
• Internal API keys  
• Database credentials
• Medical records
• Financial data

Not because they're careless. Because it's fast and easy to paste context into AI.

The problem: Once it's sent, it's gone. Training data. Forever.

This isn't a policy problem. It's an architecture problem.

And architecture problems need architecture solutions.

#AISecurity #DataProtection #CISO
```

### Post 2: Solution Introduction
```
You can't stop AI adoption.
You shouldn't try.

But you can make it safe.

ZeroShare Gateway sits between your users and AI services.

Every request is automatically scanned:
✓ PII detected → redacted or blocked
✓ Secrets found → blocked immediately
✓ Everything → logged for compliance

No code changes. No workflow disruption. 
Sub-millisecond latency.

Your team gets AI productivity.
You get peace of mind.

Link in comments 👇

#AISecurity #Enterprise #DataProtection
```

### Post 3: Fear/Urgency
```
A question for CISOs:

Your next board meeting is in 30 days.

The CEO will ask: "What's our AI security posture?"

What's your answer?

❌ "We blocked ChatGPT" → Not sustainable, employees work around it
❌ "We trust our training" → Accidents happen to trained people
❌ "We're looking into it" → Not acceptable in 2026

✅ "We enabled AI with automatic data protection"
✅ "Every request is scanned before leaving our network"
✅ "We have full visibility and audit logs"

Which answer do you want to give?

#CISO #AISecurity #BoardRoom
```

### Post 4: Technical Credibility
```
How ZeroShare Gateway works (technical edition):

1. DNS/Proxy Configuration
   - Point AI tool traffic to gateway
   - Supports HTTPS_PROXY, base_url config, and system proxy

2. Request Inspection
   - TLS termination (your certs, your control)
   - Payload parsing for all AI protocols
   - Sub-millisecond scan time

3. Pattern Detection
   - 50+ PII patterns (regex + ML-enhanced)
   - 200+ secret patterns (format-aware)
   - Custom pattern support

4. Action Execution
   - Redact → Replace sensitive data with placeholders
   - Block → Reject request, notify user
   - Warn → Allow with logging/alert
   - Allow → Passthrough with audit

5. Logging
   - Complete audit trail
   - SIEM integration ready
   - Compliance report generation

All on-premise. All your infrastructure.

Questions? Happy to dive deeper in comments.

#DevSecOps #AISecurity #Architecture
```

---

## Appendix C: Quick Reference Card

### The Campaign at a Glance

```
WHO: CISOs, Security VPs, Compliance Leaders
     at 200-10,000 employee companies
     in Healthcare, Finance, Tech, Government

WHAT: ZeroShare Gateway
      On-premise AI security proxy
      Auto-blocks PII and secrets

WHY: Enable AI without data leakage risk
     Maintain compliance (SOC2, HIPAA, GDPR)
     Avoid $4.45M average breach cost

WHERE: LinkedIn Ads → deployzeroshare.com → AWS Marketplace

WHEN: Always-on campaign + event-driven surges

HOW MUCH: $3,000-15,000/month depending on stage
```

### Key Messages (Memorize These)

1. **Problem:** "Your employees are leaking data to AI. Right now."

2. **Solution:** "ZeroShare Gateway automatically blocks PII and secrets before they reach external AI services."

3. **Differentiation:** "On-premise deployment. Your data never leaves until it's safe."

4. **Proof:** "Healthcare networks, financial services firms, and tech companies trust ZeroShare to enable AI safely."

5. **CTA:** "Deploy in minutes from AWS Marketplace."

---

*Document Version 1.0 | January 2026 | ZeroShare Gateway Marketing*
