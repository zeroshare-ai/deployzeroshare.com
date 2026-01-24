#!/usr/bin/env node
/**
 * Strategic LinkedIn Content Generator
 * 
 * MISSION: Generate content that converts.
 * 
 * Every post must:
 * 1. Target a specific audience segment
 * 2. Optimize for algorithm (engagement hooks)
 * 3. Drive toward conversion (AWS Marketplace)
 * 4. Relate to the audience without alienating others
 * 
 * Target Audiences:
 * - CISOs / Security Leaders (budget holders)
 * - Compliance Officers / DPOs (risk buyers)
 * - Security Engineers (technical influencers)
 * - DevSecOps Engineers (tool adopters)
 * - IT Directors / CTOs (strategic buyers)
 * 
 * Usage: node generate-strategic.js --replace
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, 'content');
const POSTS_FILE = join(CONTENT_DIR, 'posts.json');

const WEBSITE = 'https://deployzeroshare.com';
const MARKETPLACE = 'https://aws.amazon.com/marketplace/pp/prodview-zeroshare';

console.log('🎯 Strategic Content Generator\n');
console.log('Building conversion-focused content for each audience...\n');

// =============================================================================
// AUDIENCE: CISOs & Security Leaders
// Goal: Get them to evaluate ZeroShare for their org
// Tone: Peer-level, strategic, ROI-focused
// =============================================================================

const CISO_CONTENT = [
  {
    id: 'ciso-1',
    audience: 'CISO',
    hook: 'peer-insight',
    content: `The CISOs I talk to are all dealing with the same problem right now.

Their boards want AI innovation.
Their employees are already using AI.
Their security posture wasn't built for this.

The old playbook doesn't work:
→ Blocking AI creates shadow IT
→ Policies alone don't prevent data leaks
→ Training doesn't change behavior at scale

What's working:

Technical controls that intercept data before it leaves.

Not blocking AI. Enabling it safely.

The orgs doing this well have:
✓ Visibility into what's being sent to AI
✓ Automatic detection of sensitive data
✓ Real-time blocking without user friction

This is the infrastructure that lets you say "yes" to AI.

We built ZeroShare Gateway for exactly this problem.

Free tier available → ${WEBSITE}

#CISO #AIGovernance #SecurityLeadership`,
  },
  {
    id: 'ciso-2',
    audience: 'CISO',
    hook: 'board-prep',
    content: `Your next board meeting will include AI security.

Here's what high-performing CISOs are presenting:

Instead of:
❌ "We blocked ChatGPT"
❌ "We did training"
❌ "We have policies"

They're showing:
✅ "We enabled AI with data protection controls"
✅ "We have visibility into every AI request"
✅ "Zero sensitive data has left our network"

The shift: from prohibition to enablement.

Boards don't want to hear you're blocking innovation.

They want to hear you've made it safe.

That requires infrastructure, not just policy.

See how it works → ${WEBSITE}/docs

#BoardReporting #CISO #AIStrategy`,
  },
  {
    id: 'ciso-3',
    audience: 'CISO',
    hook: 'roi-calculation',
    content: `The math on AI security investment:

Cost of blocking AI:
→ 18% productivity hit (industry avg)
→ Shadow IT from 67% of employees
→ Zero actual risk reduction

Cost of AI incident:
→ $4.45M average breach cost
→ 6-9 months remediation
→ Regulatory scrutiny

Cost of AI security infrastructure:
→ ~$500/month for most teams
→ Deployed in hours
→ ROI positive after preventing ONE incident

The question isn't whether you can afford AI security.

It's whether you can afford not to have it.

Free trial on AWS Marketplace → ${WEBSITE}/pricing

#SecurityROI #CISO #RiskManagement`,
  },
];

// =============================================================================
// AUDIENCE: Compliance Officers & DPOs
// Goal: Position ZeroShare as compliance infrastructure
// Tone: Authoritative, regulation-focused, audit-ready
// =============================================================================

const COMPLIANCE_CONTENT = [
  {
    id: 'compliance-1',
    audience: 'Compliance',
    hook: 'audit-reality',
    content: `What auditors are asking about AI in 2026:

"Show me your AI tool inventory."
"How do you prevent data from reaching AI services?"
"What's your detection and response capability?"
"Where are your audit logs?"

If you can't answer these with evidence, not just policies, you have a gap.

Technical controls are becoming baseline expectations.

ZeroShare Gateway provides:
✓ Complete audit logging of all AI requests
✓ Automatic PII/secrets detection
✓ Evidence for SOC 2, HIPAA, GDPR audits
✓ Exportable compliance reports

Built for audit day → ${WEBSITE}/compliance

#Compliance #SOC2 #AuditReady`,
  },
  {
    id: 'compliance-2',
    audience: 'Compliance',
    hook: 'regulation-timeline',
    content: `Key AI compliance dates for 2026:

Q1: HIPAA Security Rule modernization
→ AI tools now require risk assessments

Q2: SEC AI disclosure requirements
→ Material AI risks in 10-K filings

Q3: EU AI Act enforcement begins
→ High-risk systems face €15M+ fines

Q4: State privacy law updates
→ AI-specific provisions enforceable

Common thread: "We have policies" is no longer sufficient.

Regulators expect technical controls.

ZeroShare Gateway gives you the infrastructure to demonstrate compliance—not just claim it.

Compliance documentation → ${WEBSITE}/compliance

#Compliance2026 #GDPR #HIPAA`,
  },
  {
    id: 'compliance-3',
    audience: 'Compliance',
    hook: 'dpo-specific',
    content: `For Data Protection Officers:

The GDPR question you'll face this year:

"How do you ensure personal data isn't processed by AI systems without lawful basis?"

The honest answer for most orgs: "We ask people not to."

That's not a control. That's hope.

Technical controls you need:
1. Detection of personal data in AI prompts
2. Blocking or redaction before transmission
3. Audit trail proving no unauthorized processing
4. Data subject access request capability

This is what Article 32 looks like for AI.

See the GDPR features → ${WEBSITE}/compliance

#DPO #GDPR #DataProtection`,
  },
];

// =============================================================================
// AUDIENCE: Security Engineers & Architects
// Goal: Get them to try the free tier / recommend internally
// Tone: Technical, peer-to-peer, implementation-focused
// =============================================================================

const ENGINEER_CONTENT = [
  {
    id: 'engineer-1',
    audience: 'Security Engineer',
    hook: 'technical-approach',
    content: `How we built ZeroShare Gateway (technical thread):

The problem: intercept AI traffic without breaking anything.

Our approach:

1. Transparent proxy architecture
   → Works with any AI service (ChatGPT, Claude, Copilot)
   → No code changes required
   → Sub-5ms latency impact

2. Streaming detection
   → Scan request payloads in real-time
   → Don't buffer full requests (latency killer)
   → Pattern matching on stream chunks

3. Detection engine
   → 50+ PII patterns (Presidio-based)
   → 100+ secret patterns (API keys, credentials)
   → Custom regex support

4. Action flexibility
   → Block (stop request)
   → Redact (replace sensitive data)
   → Alert (log and continue)

Full architecture docs → ${WEBSITE}/docs

Try it free → deploys in 10 minutes

#SecurityEngineering #Architecture #AI`,
  },
  {
    id: 'engineer-2',
    audience: 'Security Engineer',
    hook: 'deployment-simplicity',
    content: `Deploying an AI security gateway shouldn't take weeks.

ZeroShare Gateway deployment options:

Option 1: Docker (10 min)
\`\`\`
docker pull zeroshare/gateway
docker run -p 8080:8080 zeroshare/gateway
\`\`\`

Option 2: Kubernetes (15 min)
\`\`\`
helm install zeroshare zeroshare/gateway
\`\`\`

Option 3: AWS Marketplace (5 min)
→ One-click CloudFormation
→ Runs in your VPC
→ Your data never leaves your network

All options include:
✓ Dashboard UI
✓ API access
✓ Log streaming
✓ Slack/webhook alerts

Docs → ${WEBSITE}/docs

#DevOps #Security #Kubernetes`,
  },
  {
    id: 'engineer-3',
    audience: 'Security Engineer',
    hook: 'integration-friendly',
    content: `ZeroShare Gateway integrations:

SIEM:
→ Splunk (native app)
→ Elastic (Logstash output)
→ Any syslog consumer

Identity:
→ SAML SSO
→ OIDC
→ Azure AD / Okta

Alerting:
→ Slack
→ PagerDuty
→ Webhooks (build your own)

Deployment:
→ Terraform modules
→ Helm charts
→ CloudFormation templates

API:
→ REST API for everything
→ Prometheus metrics
→ OpenTelemetry tracing

We built this to fit into your stack, not replace it.

Integration docs → ${WEBSITE}/docs

#Integration #SecurityTools #DevSecOps`,
  },
];

// =============================================================================
// AUDIENCE: DevSecOps Engineers
// Goal: Get them to advocate for ZeroShare internally
// Tone: Developer-friendly, tooling-focused, practical
// =============================================================================

const DEVSECOPS_CONTENT = [
  {
    id: 'devsecops-1',
    audience: 'DevSecOps',
    hook: 'copilot-risk',
    content: `GitHub Copilot security reality check:

Researchers extracted 2,702 real credentials from Copilot-generated code.

The problem isn't Copilot.

It's what developers paste INTO Copilot.

Common pattern:
1. Dev has bug in code with hardcoded creds
2. Pastes code into Copilot for help
3. Creds now in GitHub's training pipeline

Your secrets management doesn't cover this.

Your DLP doesn't see it.

Your training didn't prevent it.

What works: intercepting the request before it leaves.

ZeroShare detects secrets in code snippets going to AI.

Free tier includes secrets detection → ${WEBSITE}

#DevSecOps #GitHubCopilot #SecretsManagement`,
  },
  {
    id: 'devsecops-2',
    audience: 'DevSecOps',
    hook: 'cursor-security',
    content: `Using Cursor, Copilot, or Claude for coding?

Security checklist:

✓ Secrets detection before AI
✓ API key pattern blocking
✓ Audit log of code sent to AI
✓ Policy enforcement per repo

Most teams have zero visibility into what code goes to AI.

That's a problem when:
→ Devs paste prod configs
→ Code includes database URLs
→ API keys are in context

ZeroShare Gateway sits between your IDE and AI.

Detects and blocks secrets before transmission.

Works with any AI coding assistant.

Try it free → ${WEBSITE}

#CursorIDE #DevSecOps #CodeSecurity`,
  },
  {
    id: 'devsecops-3',
    audience: 'DevSecOps',
    hook: 'pipeline-integration',
    content: `Adding AI security to your CI/CD pipeline:

Pre-commit hook:
→ Scan staged code for secrets before AI interaction

Proxy configuration:
→ Route AI traffic through ZeroShare Gateway

Terraform:
\`\`\`hcl
module "zeroshare" {
  source = "zeroshare/gateway/aws"
  vpc_id = var.vpc_id
}
\`\`\`

The goal: make secure AI usage automatic.

No developer friction.
No workflow changes.
Just protection.

Terraform modules available → ${WEBSITE}/docs

#InfrastructureAsCode #DevSecOps #Terraform`,
  },
];

// =============================================================================
// AUDIENCE: IT Directors & CTOs
// Goal: Get strategic buy-in for security infrastructure
// Tone: Strategic, business-focused, vendor-neutral
// =============================================================================

const IT_LEADER_CONTENT = [
  {
    id: 'it-leader-1',
    audience: 'IT Director',
    hook: 'vendor-evaluation',
    content: `Evaluating AI security solutions?

Questions to ask vendors:

1. "Where does my data go?"
   → On-prem vs cloud processing
   → Data residency options

2. "What's the latency impact?"
   → Sub-5ms is acceptable
   → >50ms will cause user complaints

3. "How does it integrate?"
   → SSO support
   → SIEM integration
   → Existing proxy compatibility

4. "What's the deployment model?"
   → Agent vs agentless
   → Network changes required
   → Time to production

5. "What's the pricing model?"
   → Per user vs per request
   → Hidden costs

ZeroShare: On-prem, <5ms, agentless, deploys in hours.

Compare options → ${WEBSITE}/pricing

#ITLeadership #VendorEvaluation #Security`,
  },
  {
    id: 'it-leader-2',
    audience: 'IT Director',
    hook: 'shadow-ai-visibility',
    content: `The shadow AI problem is worse than you think.

Data from Q4 2025:

→ Average enterprise has 23 unauthorized AI tools in use
→ 67% of AI interactions happen on personal accounts
→ 65% of employees have shared sensitive data with AI

Your IT team probably knows about 5-10 approved tools.

Employees are using 3x that.

Step 1: Get visibility.

Before you can govern AI, you need to see it.

ZeroShare Gateway shows you:
✓ Every AI tool in use
✓ What data is being sent
✓ Who is sending it
✓ When it happens

Start with visibility → ${WEBSITE}

#ShadowIT #AIGovernance #Visibility`,
  },
];

// =============================================================================
// UNIVERSAL: High-engagement posts for all audiences
// Goal: Viral reach + brand awareness
// Tone: Engaging but professional
// =============================================================================

const UNIVERSAL_CONTENT = [
  {
    id: 'universal-1',
    audience: 'Universal',
    hook: 'stat-shock',
    content: `65% of employees have shared sensitive data with AI.

Without authorization.
Without training.
Without knowing the risk.

Source: Cyberhaven 2025 AI Data Security Report

This isn't a future problem.

It's happening right now, in your organization.

The question isn't IF data has been leaked.

It's whether you have visibility to know.

Get visibility → ${WEBSITE}

#AISecurity #DataProtection #Statistics`,
  },
  {
    id: 'universal-2',
    audience: 'Universal',
    hook: 'problem-aware',
    content: `The AI security gap most organizations have:

Policy says: "Don't share sensitive data with AI"

Reality:
→ Employees do it anyway
→ They don't think ChatGPT "counts"
→ There's no technical enforcement
→ There's no visibility when it happens

This gap exists in almost every organization I talk to.

The fix isn't more training.

It's technical controls that work automatically.

Block sensitive data before it reaches AI.

See how → ${WEBSITE}

#AISecurity #DataLoss #Enterprise`,
  },
  {
    id: 'universal-3',
    audience: 'Universal',
    hook: 'poll-engagement',
    type: 'poll',
    content: `Quick pulse check:

How confident are you that sensitive data ISN'T being sent to AI tools in your org?`,
    pollOptions: [
      'Very confident - we have controls',
      'Somewhat confident',
      'Not confident at all',
      'We have no visibility'
    ],
    pollFollowUp: `

Based on industry data, "no visibility" is the honest answer for most.

65% of employees have already shared sensitive data with AI.

Visibility is the first step → ${WEBSITE}

#Poll #AISecurity`,
  },
  {
    id: 'universal-4',
    audience: 'Universal',
    hook: 'simple-explanation',
    content: `What is an AI security gateway?

Simple version:

It sits between your employees and AI services.

When someone sends a prompt to ChatGPT:
1. Gateway intercepts the request
2. Scans for sensitive data (PII, secrets, code)
3. Blocks or redacts if found
4. Logs everything for compliance

Your employees use AI normally.
Your data stays protected.
Your compliance team has evidence.

That's it. No agent install. No workflow change.

See a demo → ${WEBSITE}

#AISecurity #Explainer #Gateway`,
  },
  {
    id: 'universal-5',
    audience: 'Universal',
    hook: 'cta-direct',
    content: `If you're evaluating AI security solutions:

ZeroShare Gateway - free tier available.

What you get:
✓ PII detection (50+ patterns)
✓ Secrets blocking (API keys, credentials)
✓ Audit logging
✓ Works with ChatGPT, Claude, Copilot

Deploy in 10 minutes.
No sales call required.
Free for small teams.

Start free → ${WEBSITE}

AWS Marketplace available for enterprise.

#AISecurity #FreeTier #StartToday`,
  },
];

// =============================================================================
// GENERATOR
// =============================================================================

function generateStrategicContent() {
  const allPosts = [
    ...CISO_CONTENT,
    ...COMPLIANCE_CONTENT,
    ...ENGINEER_CONTENT,
    ...DEVSECOPS_CONTENT,
    ...IT_LEADER_CONTENT,
    ...UNIVERSAL_CONTENT,
  ];

  return allPosts.map(post => ({
    ...post,
    format: 'strategic',
    generatedAt: new Date().toISOString(),
    status: 'draft',
    postedAt: null,
    linkedinPostId: null,
  }));
}

function main() {
  const args = process.argv.slice(2);
  const shouldReplace = args.includes('--replace');

  // Ensure content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  // Load existing posts
  let existingPosts = [];
  if (fs.existsSync(POSTS_FILE)) {
    existingPosts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
    console.log(`📂 Found ${existingPosts.length} existing posts`);
  }

  // Keep published posts, optionally replace drafts
  const publishedPosts = existingPosts.filter(p => p.status === 'published');
  console.log(`📤 Keeping ${publishedPosts.length} published posts\n`);

  // Generate strategic content
  const strategicPosts = generateStrategicContent();

  if (shouldReplace) {
    // Replace all drafts with strategic content
    const allPosts = [...publishedPosts, ...strategicPosts];
    fs.writeFileSync(POSTS_FILE, JSON.stringify(allPosts, null, 2));
    
    console.log(`🔥 Replaced drafts with ${strategicPosts.length} strategic posts`);
    console.log(`📁 Total posts: ${allPosts.length}\n`);
  } else {
    // Only add posts that don't exist
    const newPosts = [];
    for (const post of strategicPosts) {
      const exists = existingPosts.some(p => p.id === post.id);
      if (!exists) {
        newPosts.push(post);
      }
    }

    if (newPosts.length === 0) {
      console.log('✅ All strategic content already exists.\n');
      console.log('Use --replace to rebuild the queue with only strategic content.\n');
      return;
    }

    const allPosts = [...existingPosts, ...newPosts];
    fs.writeFileSync(POSTS_FILE, JSON.stringify(allPosts, null, 2));
    
    console.log(`➕ Added ${newPosts.length} new strategic posts`);
    console.log(`📁 Total posts: ${allPosts.length}\n`);
  }

  // Summary by audience
  console.log('Content by audience:');
  console.log(`   👔 CISOs:           ${CISO_CONTENT.length} posts`);
  console.log(`   📋 Compliance:      ${COMPLIANCE_CONTENT.length} posts`);
  console.log(`   🔧 Engineers:       ${ENGINEER_CONTENT.length} posts`);
  console.log(`   🛠️  DevSecOps:       ${DEVSECOPS_CONTENT.length} posts`);
  console.log(`   💼 IT Leaders:      ${IT_LEADER_CONTENT.length} posts`);
  console.log(`   🌐 Universal:       ${UNIVERSAL_CONTENT.length} posts`);
  console.log(`\n   Total: ${strategicPosts.length} conversion-focused posts\n`);

  console.log('Each post includes:');
  console.log('   ✓ Target audience');
  console.log('   ✓ Engagement hook');
  console.log('   ✓ Clear CTA to website/marketplace');
  console.log('   ✓ Professional tone\n');
}

main();
