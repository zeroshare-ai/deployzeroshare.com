#!/usr/bin/env node
/**
 * Loops.so Setup Script
 * 
 * Creates contacts and triggers nurture sequences via Loops API.
 * Email templates must be created in Loops UI first.
 * 
 * Usage:
 *   node loops-setup.js --test           # Test API connection
 *   node loops-setup.js --add-contact    # Add a test contact
 *   node loops-setup.js --list-emails    # Show email content to paste into Loops
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
const BASE_URL = 'https://app.loops.so/api/v1';

// =============================================================================
// NURTURE EMAIL CONTENT
// =============================================================================

const NURTURE_EMAILS = [
  {
    id: 'nurture_day3',
    day: 3,
    subject: '65% of your employees have done this (without knowing)',
    preheader: 'The AI data leak most companies don\'t see coming.',
    body: `Quick stat that might surprise you:

65% of employees have shared sensitive data with ChatGPT, Copilot, or other AI tools—without authorization.

They're not being malicious. They're just:
• Pasting customer emails for help drafting responses
• Sharing code snippets (with credentials) for debugging  
• Uploading documents for summarization

The AI doesn't feel like a data risk. But it is.

We put together a 5-minute read on the most common ways data leaks to AI:

→ https://deployzeroshare.com/blog/prevent-pii-leaks-ai-chatbots?utm_source=loops&utm_medium=nurture&utm_campaign=day3

Stay secure,
The ZeroShare Team

P.S. Reply to this email if you have questions. We read everything.`
  },
  {
    id: 'nurture_day7',
    day: 7,
    subject: 'What if you could enable AI safely?',
    preheader: 'The alternative to blocking AI entirely.',
    body: `Last email, we talked about how employees leak data to AI.

The typical response: block AI entirely.

But that doesn't work:
• Employees use personal devices
• Productivity drops
• Shadow IT explodes
• You lose visibility

There's a better approach: enable AI with protection.

ZeroShare Gateway sits between your employees and AI services. It:

✓ Detects PII in prompts (SSNs, emails, credit cards)
✓ Blocks secrets (API keys, credentials)
✓ Logs everything for compliance
✓ Works with ChatGPT, Copilot, Claude

Your employees use AI normally. Your data stays protected.

See how it works in 2 minutes:

→ https://deployzeroshare.com/docs?utm_source=loops&utm_medium=nurture&utm_campaign=day7

Questions? Just reply.

The ZeroShare Team`
  },
  {
    id: 'nurture_day14',
    day: 14,
    subject: 'How a healthcare company secured AI in 2 hours',
    preheader: 'Real results from a real deployment.',
    body: `Quick case study:

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

→ https://deployzeroshare.com/pricing?utm_source=loops&utm_medium=nurture&utm_campaign=day14

Free tier available for small teams.

The ZeroShare Team`
  },
  {
    id: 'nurture_day21',
    day: 21,
    subject: 'Try ZeroShare free (10 minute setup)',
    preheader: 'No credit card required. Deploy on AWS in minutes.',
    body: `You've been on our list for 3 weeks. By now you've probably:

✓ Seen the stats on AI data leaks
✓ Understood the solution approach
✓ Maybe even checked out our docs

Ready to try it?

ZeroShare Gateway - Free Tier:
• Up to 1,000 requests/day
• Full PII detection
• Secrets blocking
• Audit logging
• No credit card required

Deploy in 10 minutes:

→ https://deployzeroshare.com/pricing?utm_source=loops&utm_medium=nurture&utm_campaign=day21

Or if you want a guided tour:

→ https://deployzeroshare.com/contact-us?utm_source=loops&utm_medium=nurture&utm_campaign=day21_demo

Either way, we're here to help.

The ZeroShare Team`
  },
  {
    id: 'nurture_day30',
    day: 30,
    subject: 'Still thinking about AI security?',
    preheader: 'A quick check-in and reminder.',
    body: `It's been a month since you joined our list.

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

→ https://deployzeroshare.com/pricing?utm_source=loops&utm_medium=nurture&utm_campaign=day30

→ https://deployzeroshare.com/contact-us?utm_source=loops&utm_medium=nurture&utm_campaign=day30_talk

The ZeroShare Team

P.S. What's holding you back? Reply and let us know—we might be able to help.`
  }
];

// =============================================================================
// API FUNCTIONS
// =============================================================================

async function testConnection() {
  const response = await fetch(`${BASE_URL}/api-key`, {
    headers: { 'Authorization': `Bearer ${LOOPS_API_KEY}` }
  });
  return response.json();
}

async function createContact(email, properties = {}) {
  const response = await fetch(`${BASE_URL}/contacts/create`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOOPS_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      source: 'website',
      subscribed: true,
      ...properties
    })
  });
  return response.json();
}

async function sendEvent(email, eventName) {
  const response = await fetch(`${BASE_URL}/events/send`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOOPS_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      eventName
    })
  });
  return response.json();
}

// =============================================================================
// COMMANDS
// =============================================================================

function listEmails() {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║           LOOPS.SO NURTURE SEQUENCE - EMAIL CONTENT              ║
╚══════════════════════════════════════════════════════════════════╝

Copy each email into Loops UI:

1. Go to Loops Dashboard → Loops → Create New Loop
2. Name it: "ZeroShare Nurture Sequence"
3. Trigger: "Contact Created"
4. Add each email below with the specified delay

`);

  for (const email of NURTURE_EMAILS) {
    console.log(`
════════════════════════════════════════════════════════════════════
EMAIL ${email.day / 3}: DAY ${email.day}
════════════════════════════════════════════════════════════════════

DELAY: ${email.day} days after signup

SUBJECT: ${email.subject}

PREHEADER: ${email.preheader}

BODY:
────────────────────────────────────────────────────────────────────
${email.body}
────────────────────────────────────────────────────────────────────
`);
  }
}

async function test() {
  console.log('🔄 Testing Loops API connection...\n');
  
  if (!LOOPS_API_KEY) {
    console.log('❌ LOOPS_API_KEY not set in .env');
    console.log('   Add: LOOPS_API_KEY=your_key_here');
    return;
  }
  
  try {
    const result = await testConnection();
    if (result.success) {
      console.log(`✅ Connected to Loops!`);
      console.log(`   Team: ${result.teamName}`);
    } else {
      console.log('❌ Connection failed:', result);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

async function addTestContact() {
  console.log('🔄 Adding test contact...\n');
  
  const testEmail = 'test@deployzeroshare.com';
  
  try {
    const result = await createContact(testEmail, {
      firstName: 'Test',
      lastName: 'User',
      source: 'test_script'
    });
    
    console.log('Result:', result);
    
    if (result.success) {
      console.log(`✅ Contact added: ${testEmail}`);
      console.log('   They will now receive the nurture sequence.');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

// =============================================================================
// MAIN
// =============================================================================

const args = process.argv.slice(2);

if (args.includes('--test')) {
  test();
} else if (args.includes('--add-contact')) {
  addTestContact();
} else if (args.includes('--list-emails')) {
  listEmails();
} else {
  console.log(`
Loops.so Setup Script

Usage:
  node loops-setup.js --test           Test API connection
  node loops-setup.js --list-emails    Show email content to copy into Loops
  node loops-setup.js --add-contact    Add a test contact

Setup Steps:
  1. Run --test to verify API connection
  2. Run --list-emails to see all email content
  3. Create the emails in Loops UI (Loops → Create Loop)
  4. Set trigger to "Contact Created"
  5. Your newsletter Lambda will auto-add contacts via API
`);
}
