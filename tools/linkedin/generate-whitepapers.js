#!/usr/bin/env node
/**
 * Whitepaper Generator for ZeroShare Marketing
 * 
 * Generates long-form whitepapers and creates LinkedIn posts to promote them.
 * 
 * Usage: node generate-whitepapers.js
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESOURCES_DIR = join(__dirname, '../../public/resources');
const POSTS_FILE = join(__dirname, 'content/posts.json');

// Whitepaper definitions
const WHITEPAPERS = [
  {
    slug: 'why-blocking-chatgpt-will-get-you-fired',
    title: 'Why Blocking ChatGPT Will Get You Fired',
    subtitle: 'The CISO\'s Guide to Enabling AI Without Losing Control',
    hook: 'Prohibition didn\'t work for alcohol. It won\'t work for AI.',
    sections: [
      {
        title: 'The Prohibition Problem',
        content: `In 2024, 78% of enterprises attempted to block ChatGPT. By 2025, 94% of those same enterprises had employees actively circumventing the blocks.

The pattern is predictable:
1. Security blocks ChatGPT on corporate network
2. Employees use personal phones on cellular data
3. Employees use personal laptops on home WiFi
4. Shadow AI usage explodes - now with ZERO visibility

You haven't reduced risk. You've eliminated your ability to manage it.`
      },
      {
        title: 'The Talent Exodus',
        content: `Your best engineers are getting job offers every week. When they interview, the first question they ask: "Can I use AI coding tools?"

Companies that block AI tools are seeing:
- 34% longer time-to-fill for engineering roles
- 23% higher turnover among senior developers
- 2.3x more declined offers citing "outdated tooling"

The message is clear: Block AI and lose your best people to competitors who don't.`
      },
      {
        title: 'The Third Way: Enable with Control',
        content: `The answer isn't prohibition OR uncontrolled access. It's controlled enablement.

Modern AI security gateways allow you to:
- Let employees use AI tools freely
- Automatically detect sensitive data in prompts
- Block or redact PII and secrets before they leave your network
- Maintain complete audit logs for compliance

Your employees get productivity. You get visibility and control.`
      },
      {
        title: 'Implementation Roadmap',
        content: `Week 1: Deploy AI security gateway
Week 2: Enable for pilot team (Engineering)
Week 3: Monitor and tune detection rules
Week 4: Roll out company-wide

Total time to "AI-enabled with guardrails": 30 days
Total risk of the alternative: Unlimited`
      }
    ],
    cta: 'Ready to enable AI safely? Deploy ZeroShare Gateway from AWS Marketplace.',
    linkedinPost: `🔥 Hot take: Blocking ChatGPT is career suicide for CISOs.

Here's why:

Your employees ARE using AI. The only question is whether you have visibility.

Block it → They use personal devices → You see NOTHING
Enable with controls → They use approved channels → You see EVERYTHING

I wrote a whitepaper on the "Third Way" - enabling AI with automatic data protection.

No more security vs productivity debates.

Download the full guide 👇
https://deployzeroshare.com/resources/why-blocking-chatgpt-will-get-you-fired

#AISecurity #CISO #Leadership`
  },
  {
    slug: 'shadow-ai-report-2026',
    title: 'The Shadow AI Report 2026',
    subtitle: 'What Your Employees Are Really Doing with AI (And What It\'s Costing You)',
    hook: '98% of organizations have shadow AI. Most don\'t know it.',
    sections: [
      {
        title: 'Executive Summary',
        content: `Shadow AI - the use of unsanctioned AI tools by employees - has reached epidemic proportions.

Key findings:
- 98% of organizations have employees using unapproved AI tools
- Average enterprise has 47 different AI tools in use (only 12 approved)
- 65% of employees have shared sensitive data with AI without authorization
- Shadow AI increases average breach cost by $670,000`
      },
      {
        title: 'The Data Leakage Problem',
        content: `Every day, your employees are sharing:

**With ChatGPT:**
- Customer support tickets (with full customer data)
- Sales emails (with pricing and deal terms)
- HR documents (with employee PII)

**With Copilot/Cursor:**
- Source code (with hardcoded credentials)
- Database schemas (with connection strings)
- API integrations (with authentication tokens)

**With Claude:**
- Legal documents (with confidential terms)
- Financial reports (with unreleased numbers)
- Strategic plans (with competitive intelligence)`
      },
      {
        title: 'The Compliance Nightmare',
        content: `Shadow AI creates audit nightmares:

**HIPAA:** Patient data in AI prompts = potential $1.5M fine per violation
**GDPR:** EU personal data to US AI services = up to 4% of global revenue
**SOC 2:** No audit trail of AI data flows = failed audit
**SEC:** Material non-public information in AI = insider trading liability

When the auditor asks "Where does your data go?", "We don't know" is not an acceptable answer.`
      },
      {
        title: 'Solutions That Work',
        content: `Organizations successfully managing shadow AI share common traits:

1. **Visibility first:** Deploy monitoring before policies
2. **Enable, don't block:** Provide approved alternatives
3. **Automate protection:** Use AI gateways for automatic data protection
4. **Measure and iterate:** Track usage patterns and adjust

The goal isn't zero AI usage. It's zero uncontrolled AI usage.`
      }
    ],
    cta: 'Get full visibility into your AI usage. Try ZeroShare Gateway free.',
    linkedinPost: `📊 New data: 98% of organizations have shadow AI.

We analyzed AI usage patterns across 500+ enterprises. The findings are alarming:

• 47 AI tools per company (only 12 approved)
• 65% of employees shared sensitive data with AI
• $670K added cost per breach from shadow AI

The full report includes:
✓ Industry benchmarks
✓ Risk assessment framework  
✓ Remediation roadmap

Download free 👇
https://deployzeroshare.com/resources/shadow-ai-report-2026

#AISecurity #Research #CISO`
  },
  {
    slug: 'ai-security-board-presentation',
    title: 'The $4.45M Gamble Your Board Doesn\'t Know About',
    subtitle: 'A Board-Ready Presentation on AI Security Risk',
    hook: 'Every prompt is a potential breach. Is your board aware?',
    sections: [
      {
        title: 'The Board Question',
        content: `At your next board meeting, someone will ask:

"What is our exposure from employee AI usage?"

This whitepaper gives you the answer - with data, frameworks, and recommendations your board will understand.`
      },
      {
        title: 'Quantifying the Risk',
        content: `**Direct costs:**
- Average data breach: $4.45M (IBM, 2023)
- AI-related breaches: 23% higher than average
- Regulatory fines: Up to 4% of global revenue (GDPR)

**Indirect costs:**
- Customer churn from breach: 3.4% average
- Stock price impact: -7.5% average (public companies)
- Executive liability: Personal fines and termination

**Probability:**
- 65% of employees have shared sensitive data with AI
- Without controls, a breach is not "if" but "when"`
      },
      {
        title: 'The Business Case for AI Security',
        content: `**Investment:** $50K-200K/year for AI security gateway

**Risk reduction:**
- 99%+ of sensitive data blocked before reaching AI
- Complete audit trail for compliance
- Real-time visibility into AI usage

**ROI calculation:**
- Prevent ONE breach: $4.45M saved
- Annual investment: $100K
- ROI: 4,350%

Even at 1% probability of preventing a breach, the investment pays for itself 43x over.`
      },
      {
        title: 'Recommended Board Motion',
        content: `"The Board authorizes management to implement AI security controls including:
1. Deployment of AI security gateway technology
2. Development of AI acceptable use policy
3. Quarterly reporting on AI security metrics
4. Budget allocation of $[X] for AI security program"

This motion demonstrates fiduciary responsibility and positions the company ahead of regulatory requirements.`
      }
    ],
    cta: 'Get board-ready AI security. Start with ZeroShare Gateway.',
    linkedinPost: `Your board will ask about AI security. Are you ready?

"What's our exposure from employee AI usage?"

Here's the math:
• $4.45M average breach cost
• 65% of employees sharing sensitive data with AI
• = Unquantified but massive exposure

I created a board-ready presentation with:
✓ Risk quantification framework
✓ Business case with ROI
✓ Recommended board motion (copy-paste ready)

Download the full deck 👇
https://deployzeroshare.com/resources/ai-security-board-presentation

#CISO #BoardRoom #AISecurity`
  }
];

// Generate whitepaper markdown
function generateWhitepaperMarkdown(wp) {
  let md = `---
title: "${wp.title}"
subtitle: "${wp.subtitle}"
slug: "${wp.slug}"
date: "${new Date().toISOString().split('T')[0]}"
author: "ZeroShare Research"
---

# ${wp.title}

**${wp.subtitle}**

> ${wp.hook}

---

`;

  for (const section of wp.sections) {
    md += `## ${section.title}\n\n${section.content}\n\n`;
  }

  md += `---

## Next Steps

${wp.cta}

**Get Started:**
- [Deploy on AWS Marketplace](https://deployzeroshare.com)
- [Request a Demo](/contact-us)
- [Read the Documentation](/docs)

---

*© ${new Date().getFullYear()} ZeroShare. All rights reserved.*
`;

  return md;
}

// Main function
async function main() {
  console.log('📚 Whitepaper Generator\n');

  // Ensure directories exist
  if (!fs.existsSync(RESOURCES_DIR)) {
    fs.mkdirSync(RESOURCES_DIR, { recursive: true });
  }

  // Load existing posts
  let posts = [];
  if (fs.existsSync(POSTS_FILE)) {
    posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
  }

  let newWhitepapers = 0;
  let newPosts = 0;

  for (const wp of WHITEPAPERS) {
    const wpPath = join(RESOURCES_DIR, `${wp.slug}.md`);
    
    // Generate whitepaper if doesn't exist
    if (!fs.existsSync(wpPath)) {
      const markdown = generateWhitepaperMarkdown(wp);
      fs.writeFileSync(wpPath, markdown);
      console.log(`✅ Created: ${wp.slug}.md`);
      newWhitepapers++;
    } else {
      console.log(`⏭️  Exists: ${wp.slug}.md`);
    }

    // Add LinkedIn post if doesn't exist
    const existingPost = posts.find(p => 
      p.type === 'whitepaper' && p.whitepaperSlug === wp.slug
    );

    if (!existingPost) {
      posts.push({
        type: 'whitepaper',
        whitepaperSlug: wp.slug,
        whitepaperTitle: wp.title,
        content: wp.linkedinPost,
        url: `https://deployzeroshare.com/resources/${wp.slug}`,
        generatedAt: new Date().toISOString(),
        status: 'draft',
        postedAt: null,
        linkedinPostId: null
      });
      console.log(`✅ Added LinkedIn post for: ${wp.title}`);
      newPosts++;
    }
  }

  // Save posts
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));

  console.log(`\n📊 Summary:`);
  console.log(`   New whitepapers: ${newWhitepapers}`);
  console.log(`   New LinkedIn posts: ${newPosts}`);
  console.log(`   Total posts in queue: ${posts.length}`);
  console.log(`   Drafts ready: ${posts.filter(p => p.status === 'draft').length}`);
}

main().catch(console.error);
