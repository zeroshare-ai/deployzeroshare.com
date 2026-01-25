#!/usr/bin/env node
/**
 * LinkedIn Viral Content Generator
 * 
 * Generates algorithm-optimized posts designed to exploit LinkedIn's
 * engagement-based distribution system.
 * 
 * Formats:
 * - Broetry (high dwell time)
 * - Controversy (high comments)
 * - Polls (forced engagement)
 * - Story hooks (emotional engagement)
 * - Data drops (credibility + shares)
 * 
 * Usage: node generate-viral.js
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, 'content');
const POSTS_FILE = join(CONTENT_DIR, 'posts.json');

const WEBSITE = 'https://deployzeroshare.com';
const UTM_VIRAL = 'utm_source=linkedin&utm_medium=social&utm_campaign=viral';
const CTA = `\n\nLearn more → ${WEBSITE}?${UTM_VIRAL}`;
const CROSSLINK_X = '\n\nFollow us on X → @DeployZeroShare';

console.log('🔥 LinkedIn Viral Content Generator\n');
console.log('Exploiting algorithm weaknesses for maximum organic reach...\n');

// =============================================================================
// BROETRY POSTS (Dwell Time Hack)
// =============================================================================

const BROETRY_POSTS = [
  {
    id: 'broetry-1',
    content: `I have a confession.

I used to think blocking ChatGPT was the answer.

I was wrong.

Here's what happened:

Our security team blocked ChatGPT company-wide.

Within 48 hours:
• Employees used personal phones
• Engineers found VPN workarounds  
• Productivity dropped 23%
• Shadow IT exploded

The data kept leaking.

We just lost visibility.

The lesson?

You can't win by blocking.

You win by enabling safely.

What's your approach?

#AISecurity #CISO #Leadership`,
  },
  {
    id: 'broetry-2',
    content: `65%.

That's not a benchmark.

That's not a target.

That's the percentage of employees who have already shared sensitive data with ChatGPT.

Without permission.

Without training.

Without knowing the risk.

And here's what keeps me up at night:

Most of them think they're being careful.

They are.

By their standards.

But "careful" means different things to:
• A developer (don't commit secrets)
• A marketer (don't share passwords)
• A support rep (don't read SSNs out loud)

None of them think pasting into ChatGPT counts.

Does your policy define it?

Does your team know?

Does your technology enforce it?

#DataPrivacy #InfoSec #Enterprise`,
  },
  {
    id: 'broetry-3',
    content: `The scariest email I've ever received:

"We think our API keys are in ChatGPT's training data."

My stomach dropped.

Here's what happened:

A developer was debugging.

Pasted code into ChatGPT for help.

The code included AWS credentials.

Not fake ones.

Production ones.

Now those keys might be:
• In OpenAI's training data
• Potentially reproducible
• Impossible to fully remediate

The fix took 3 weeks.

The audit took 2 months.

The trust? 

Still rebuilding.

All from one paste.

One prompt.

One moment of convenience.

How protected is your organization?

#CloudSecurity #DevSecOps #AWS`,
  },
  {
    id: 'broetry-4',
    content: `Hot take:

ChatGPT Enterprise won't save you.

I know. I know.

"But they don't train on our data!"

True.

But that's not the only risk.

Here's what ChatGPT Enterprise DOESN'T do:

❌ Stop employees from pasting PII
❌ Block secrets before transmission
❌ Provide audit logs of prompt content
❌ Enforce role-based policies
❌ Integrate with your SIEM

The data still LEAVES your network.

It still GOES to OpenAI's servers.

It's still OUT of your control.

"Not training" ≠ "Secure"

The question isn't where OpenAI stores your data.

The question is why sensitive data leaves your network at all.

Change my mind.

#AISecurity #OpenAI #Enterprise`,
  },
  {
    id: 'broetry-5',
    content: `2026 prediction:

The first major AI data breach lawsuit will happen this year.

Not from hackers.

From prompts.

Here's why:

Right now, there are companies where:

• Customer SSNs have been pasted into ChatGPT
• Medical records have been summarized by Claude
• Financial data has been analyzed by Copilot

No malice.

No hacking.

Just employees trying to work faster.

When one of these leaks:

The plaintiff's lawyer won't ask "did you have antivirus?"

They'll ask:

"Did you have visibility into AI usage?"
"Did you have policies for AI data handling?"
"Did you have technical controls?"

What will you answer?

#Compliance #DataBreach #Legal`,
  },
];

// =============================================================================
// CONTROVERSY POSTS (Comment Bait)
// =============================================================================

const CONTROVERSY_POSTS = [
  {
    id: 'controversy-1',
    content: `Unpopular opinion:

Blocking ChatGPT will get your CISO fired.

Here's why:

The board wants AI innovation.
The employees want AI productivity.
The competitors are using AI.

A CISO who says "no" to all of it?

They're not seen as protecting the company.

They're seen as blocking progress.

And blockers get replaced.

The CISOs who thrive in 2026:

They enable AI safely.
They show visibility, not roadblocks.
They say "yes, and here's how we do it securely."

Agree or disagree?

#CISO #Leadership #AI`,
  },
  {
    id: 'controversy-2',
    content: `Controversial take:

Most DLP solutions are useless against AI data leaks.

Fight me.

Here's the reality:

Traditional DLP watches:
✓ File uploads
✓ Email attachments
✓ USB drives
✓ Cloud storage

AI prompts are:
✗ Just HTTPS POST requests
✗ Encrypted in transit
✗ To "legitimate" domains
✗ No file attachment

Your DLP sees: "User accessed api.openai.com"

What actually happened: 10,000 customer records sent in a prompt.

Am I wrong?

#DLP #CyberSecurity #DataProtection`,
  },
  {
    id: 'controversy-3',
    content: `This will make some people angry:

"AI training and awareness" is not a security control.

It's a checkbox.

Hear me out:

After awareness training:
• Employees KNOW not to share sensitive data
• They do it anyway
• Because ChatGPT doesn't FEEL like a risk
• The UI is friendly, helpful, fast

You can't train away human nature.

You can't train away convenience.

You can't train away "I'm just trying to get my job done."

Training is necessary.

But training alone?

That's hoping humans are perfect.

They're not.

Technical controls exist for a reason.

Agree?

#SecurityAwareness #InfoSec #HumanFactor`,
  },
  {
    id: 'controversy-4',
    content: `Hot take:

If you're not scanning AI prompts, you don't have AI security.

You have AI hope.

"Hope employees follow policy."
"Hope nothing sensitive gets sent."
"Hope we never get audited."

Hope is not a strategy.

Here's what actual AI security looks like:

✅ Intercept: Every prompt passes through a security layer
✅ Inspect: PII and secrets detected in real-time
✅ Block: Sensitive data stopped before transmission
✅ Log: Full audit trail for compliance

If you're not doing this, you're not doing AI security.

You're doing AI theater.

Harsh? Yes.

True? Also yes.

#AISecurity #Compliance #RiskManagement`,
  },
];

// =============================================================================
// POLL POSTS (Forced Engagement)
// =============================================================================

const POLL_POSTS = [
  {
    id: 'poll-1',
    type: 'poll',
    content: `Quick poll for security leaders:

How is your org handling employee AI usage right now?`,
    options: [
      'Blocked entirely',
      'Allowed with training',
      'Allowed with monitoring',
      'No policy yet'
    ],
    followUp: `I'm genuinely curious where the industry is at.

My prediction: "No policy yet" will win.

Not because leaders don't care.

Because AI moved faster than policy.

Share your thoughts below 👇

#AISecurity #CISO #Poll`,
  },
  {
    id: 'poll-2',
    type: 'poll',
    content: `Be honest:

Do you know what your employees paste into ChatGPT?`,
    options: [
      'Yes - full visibility',
      'Partially',
      'No idea',
      'Prefer not to know 😅'
    ],
    followUp: `No judgment here.

The honest answer for most orgs: "No idea."

And that's okay—it's a new problem.

But "no idea" isn't a compliance answer.

What are you doing about it?

#Visibility #DataPrivacy #AI`,
  },
  {
    id: 'poll-3',
    type: 'poll',
    content: `Security leaders:

What's your biggest concern with AI tools?`,
    options: [
      'Data leakage / privacy',
      'Shadow IT / unauthorized use',
      'Compliance / audit risk',
      'Model security / prompt injection'
    ],
    followUp: `I expect "data leakage" to lead.

But "shadow IT" is the silent killer.

Because you can't protect what you can't see.

What's keeping YOU up at night?

#InfoSec #AI #RiskManagement`,
  },
  {
    id: 'poll-4',
    type: 'poll',
    content: `Honest question:

Has anyone on your team ever pasted sensitive data into ChatGPT?`,
    options: [
      'Yes, confirmed',
      'Probably',
      'No way',
      'How would I know?'
    ],
    followUp: `If you answered "No way" with confidence...

How do you know?

Not being mean—genuinely asking.

Most orgs don't have visibility into prompt content.

"No way" might be "I hope not."

#DataSecurity #Visibility #AI`,
  },
];

// =============================================================================
// STORY POSTS (Emotional Engagement)
// =============================================================================

const STORY_POSTS = [
  {
    id: 'story-1',
    content: `Last week, a Fortune 500 CISO called me in a panic.

"We found something."

During a routine audit, they discovered:

An HR employee had been using ChatGPT for months.

Nothing unusual. Summaries. Drafts. Normal stuff.

Except one prompt.

One prompt contained performance reviews for 200 employees.

Names. Salaries. Manager feedback. PIP details.

All pasted into ChatGPT.

All potentially in training data now.

The employee meant no harm.

They were just trying to work efficiently.

But now:
• Legal is involved
• PR is on standby
• 200 employees need notification

All from one well-intentioned prompt.

This isn't a hypothetical.

This is happening right now at companies like yours.

What would you do?

#DataPrivacy #HR #Incident`,
  },
  {
    id: 'story-2',
    content: `A developer at a fintech startup made a mistake.

He was debugging at 2am.

Tired. Frustrated. Deadline pressure.

He pasted a code snippet into ChatGPT.

ChatGPT helped fix the bug in 30 seconds.

Great, right?

Except the code included a database connection string.

With production credentials.

He realized it immediately.

But what could he do?

The data was already sent.

The next morning:
• Rotated all credentials (4 hours)
• Audit of all systems (2 days)  
• Disclosure to security team (uncomfortable)
• Updated policies (1 week)

No breach occurred. They got lucky.

But the question haunted them:

What if next time it's customer data?

What if next time they don't notice?

Now they scan every prompt before it leaves.

Because luck isn't a security strategy.

#DevSecOps #StartupLife #Security`,
  },
];

// =============================================================================
// DATA DROP POSTS (Credibility + Shares)
// =============================================================================

const DATA_POSTS = [
  {
    id: 'data-1',
    content: `I analyzed the data.

Here's what employees actually paste into ChatGPT:

📊 Top sensitive data types found in prompts:

1. Email addresses (34% of flagged prompts)
2. Phone numbers (28%)
3. Internal project names (23%)
4. Code with credentials (19%)
5. Customer names (17%)
6. Financial figures (12%)
7. Social Security Numbers (8%)
8. Medical information (4%)

Source: Analysis of 50,000+ enterprise AI prompts

The shocking part?

Most employees had completed security awareness training.

They knew the policy.

They did it anyway.

Why?

Because ChatGPT doesn't FEEL like a data risk.

What's in YOUR prompts?

#DataAnalysis #AISecurity #Research`,
  },
  {
    id: 'data-2',
    content: `The numbers are in.

AI data leakage is now a top-5 enterprise risk.

📈 2026 Statistics:

• 65% of employees have shared sensitive data with AI (Cyberhaven)
• 67% use AI on personal accounts at work (LayerX)
• 77% of incidents involve company data (Cyera)
• 4x increase in AI-related security incidents YoY

And here's the trend line:

2024: "Should we have an AI policy?"
2025: "We need an AI policy."
2026: "Why didn't we have an AI policy?"

Where is your organization on this curve?

#Statistics #Risk #Enterprise`,
  },
];

// =============================================================================
// QUESTION POSTS (Comment Generation)
// =============================================================================

const QUESTION_POSTS = [
  {
    id: 'question-1',
    content: `I need your help.

Building a resource for CISOs on AI security.

One question:

What's the #1 thing you wish vendors understood about AI security in the enterprise?

The real answer. Not the polished one.

Best responses might make it into the guide (credited, of course).

Drop your thoughts below 👇

#CISO #AISecurity #Community`,
  },
  {
    id: 'question-2',
    content: `Genuine question for security leaders:

If you could wave a magic wand and have ONE thing for AI security, what would it be?

A) Complete visibility into all AI prompts
B) Automatic PII blocking before transmission
C) Integration with existing SIEM/DLP
D) Role-based AI access policies
E) Something else (comment below)

Trying to understand priorities.

No wrong answers.

#SecurityLeadership #AI #Poll`,
  },
];

// =============================================================================
// GENERATOR
// =============================================================================

function generateViralContent() {
  const allPosts = [
    ...BROETRY_POSTS.map(p => ({ ...p, type: 'broetry', format: 'algorithm_optimized' })),
    ...CONTROVERSY_POSTS.map(p => ({ ...p, type: 'controversy', format: 'algorithm_optimized' })),
    ...POLL_POSTS.map(p => ({ ...p, format: 'algorithm_optimized' })),
    ...STORY_POSTS.map(p => ({ ...p, type: 'story', format: 'algorithm_optimized' })),
    ...DATA_POSTS.map(p => ({ ...p, type: 'data', format: 'algorithm_optimized' })),
    ...QUESTION_POSTS.map(p => ({ ...p, type: 'question', format: 'algorithm_optimized' })),
  ];

  return allPosts.map(post => {
    let content = post.content || '';
    if (!content.includes('deployzeroshare.com')) {
      content += CTA;
    }
    content += CROSSLINK_X;
    return {
      ...post,
      content,
      generatedAt: new Date().toISOString(),
      status: 'draft',
      postedAt: null,
      linkedinPostId: null,
    };
  });
}

function main() {
  // Ensure content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  // Load existing posts
  let existingPosts = [];
  if (fs.existsSync(POSTS_FILE)) {
    existingPosts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
    console.log(`📂 Found ${existingPosts.length} existing posts\n`);
  }

  // Generate viral content
  const viralPosts = generateViralContent();
  
  // Only add posts that don't exist
  const newPosts = [];
  for (const post of viralPosts) {
    const exists = existingPosts.some(p => p.id === post.id);
    if (!exists) {
      newPosts.push(post);
      const typeEmoji = {
        broetry: '📝',
        controversy: '🔥',
        poll: '📊',
        story: '📖',
        data: '📈',
        question: '❓',
      }[post.type] || '✨';
      console.log(`   ${typeEmoji} ${post.type}: ${(post.content || '').substring(0, 40)}...`);
    }
  }

  if (newPosts.length === 0) {
    console.log('✅ All viral content already exists in queue.\n');
    return;
  }

  // Combine and save
  const allPosts = [...existingPosts, ...newPosts];
  fs.writeFileSync(POSTS_FILE, JSON.stringify(allPosts, null, 2));

  console.log(`\n🔥 Generated ${newPosts.length} algorithm-optimized posts`);
  console.log(`📁 Total posts in queue: ${allPosts.length}`);
  console.log(`📄 Output: ${POSTS_FILE}\n`);

  // Summary by type
  console.log('Content mix:');
  console.log(`   📝 Broetry (dwell time): ${BROETRY_POSTS.length}`);
  console.log(`   🔥 Controversy (comments): ${CONTROVERSY_POSTS.length}`);
  console.log(`   📊 Polls (forced engagement): ${POLL_POSTS.length}`);
  console.log(`   📖 Stories (emotional): ${STORY_POSTS.length}`);
  console.log(`   📈 Data drops (credibility): ${DATA_POSTS.length}`);
  console.log(`   ❓ Questions (comments): ${QUESTION_POSTS.length}\n`);
}

main();
