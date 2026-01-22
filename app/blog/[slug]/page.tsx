import { Navigation } from '../../components/Navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

// Generate static params for all blog posts at build time
export function generateStaticParams() {
  return [
    { slug: 'prevent-pii-leaks-ai-chatbots' },
    { slug: 'ai-security-compliance-guide-2026' },
    { slug: 'zero-trust-ai-architecture' },
    { slug: 'secrets-detection-ai-code-assistants' },
    { slug: 'enterprise-ai-governance-framework' },
    { slug: 'ai-proxy-gateway-explained' },
  ];
}

// In production, this would come from a CMS
const blogContent: Record<string, {
  title: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
}> = {
  'prevent-pii-leaks-ai-chatbots': {
    title: 'How to Prevent PII Leaks When Your Team Uses AI Chatbots',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'January 20, 2026',
    readTime: '8 min read',
    category: 'Security Best Practices',
    excerpt: 'Learn the essential strategies to protect personally identifiable information from being exposed through ChatGPT, Copilot, and other AI tools.',
    content: `
The rise of AI chatbots like ChatGPT, Claude, and Copilot has revolutionized workplace productivity. But with great power comes great responsibility—and significant security risks.

## The Hidden Danger in Every AI Conversation

Every day, your employees are having thousands of conversations with AI assistants. They're asking for help with emails, code reviews, data analysis, and customer communications. The problem? They're often sharing sensitive information without realizing it.

Consider these common scenarios:

- A customer service rep asks ChatGPT to "help me respond to this angry customer" and pastes the entire email thread—including the customer's email, phone number, and account details.
- A developer asks Copilot to "fix this bug in my database query" and inadvertently shares database credentials embedded in the code.
- A sales rep asks for help writing a proposal and includes confidential pricing information.

## The Scale of the Problem

According to recent studies, 65% of employees have shared sensitive data with AI tools without proper authorization. This includes:

- Personal Identifiable Information (PII)
- API keys and credentials
- Financial data
- Health information
- Proprietary business information

## Five Strategies to Protect Your Organization

### 1. Deploy an AI Security Gateway

The most effective solution is to implement a security layer between your users and AI services. An AI gateway like ZeroShare can automatically:

- Detect and redact PII before it reaches external AI services
- Block requests containing secrets and credentials
- Maintain audit logs for compliance
- Allow customizable rules for your organization's specific needs

### 2. Establish Clear AI Usage Policies

Create comprehensive guidelines that specify:
- What types of data can and cannot be shared with AI tools
- Which AI tools are approved for use
- How to handle AI-generated outputs
- Reporting procedures for potential data exposures

### 3. Train Your Employees

Regular security awareness training should cover:
- The risks of sharing sensitive data with AI
- How to identify PII and confidential information
- Safe practices for using AI tools productively

### 4. Implement Data Classification

Ensure your organization has a clear data classification system so employees can quickly identify sensitive information that shouldn't be shared with AI tools.

### 5. Monitor and Audit AI Usage

Deploy monitoring solutions that can:
- Track which AI tools are being used
- Identify patterns of risky behavior
- Generate compliance reports

## Conclusion

AI tools are here to stay, and trying to ban them entirely is neither practical nor advisable. The key is enabling your team to use these powerful tools safely. With the right security measures in place, you can have the best of both worlds: AI-powered productivity without the data leak risks.
    `
  },
  'ai-security-compliance-guide-2026': {
    title: 'The Complete Guide to AI Security Compliance in 2026',
    author: 'Michael Rodriguez',
    authorRole: 'Compliance Director',
    date: 'January 18, 2026',
    readTime: '12 min read',
    category: 'Compliance',
    excerpt: 'Navigate GDPR, HIPAA, SOC 2, and emerging AI regulations with this comprehensive compliance guide.',
    content: `
As organizations rapidly adopt generative AI tools, compliance requirements are evolving just as quickly. This guide covers everything you need to know about meeting regulatory requirements while leveraging AI.

## The Evolving Regulatory Landscape

2026 has brought significant changes to AI governance worldwide. Key developments include:

- EU AI Act: Now in full enforcement, requiring risk assessments for AI systems
- Updated GDPR Guidance: New interpretations specifically addressing AI and automated decision-making
- State Privacy Laws: California, Virginia, and Colorado have all updated their privacy laws with AI-specific provisions
- SEC Guidance: New requirements for disclosing AI-related risks to investors

## Core Compliance Frameworks

### GDPR and AI

The General Data Protection Regulation has specific implications for AI:

Lawful Basis: You need a valid legal basis for processing personal data through AI systems.

Data Minimization: Only process the minimum data necessary for your AI use case.

Right to Explanation: Users have the right to understand how AI decisions affecting them are made.

Data Protection Impact Assessment: Required for AI systems that pose high risks to individuals.

### SOC 2 for AI Systems

SOC 2 compliance for organizations using AI requires:

- Documented AI governance policies
- Access controls for AI systems
- Monitoring and logging of AI interactions
- Incident response procedures for AI-related breaches

### HIPAA and AI

Healthcare organizations face additional requirements:

- Business Associate Agreements with AI vendors
- PHI must never be exposed to external AI services
- Audit trails for all AI-assisted clinical decisions

## Implementing Compliant AI Usage

### Step 1: Inventory Your AI Tools

Create a comprehensive list of:
- All AI tools in use across your organization
- What data flows through each tool
- Who has access to each tool
- What the tool is used for

### Step 2: Conduct Risk Assessments

For each AI tool, evaluate:
- Data privacy risks
- Security vulnerabilities
- Compliance gaps
- Business impact of potential breaches

### Step 3: Implement Technical Controls

Deploy technical safeguards such as:
- AI proxy gateways to filter sensitive data
- Encryption for data in transit and at rest
- Access management and authentication
- Comprehensive logging and monitoring

## Conclusion

AI regulation will continue to evolve. Organizations that build strong AI governance foundations now will be better positioned to adapt to new requirements.
    `
  },
  'zero-trust-ai-architecture': {
    title: 'Implementing Zero Trust Architecture for AI Applications',
    author: 'David Kim',
    authorRole: 'Solutions Architect',
    date: 'January 15, 2026',
    readTime: '10 min read',
    category: 'Architecture',
    excerpt: 'A deep dive into building zero trust security models that protect your organization while enabling productive use of AI tools.',
    content: `
Zero trust architecture has become the gold standard for enterprise security. But how do you apply these principles to AI applications? This guide walks you through the key concepts and implementation strategies.

## What is Zero Trust for AI?

Traditional security models assume that anything inside your network can be trusted. Zero trust flips this assumption: trust nothing, verify everything.

For AI applications, this means:
- Every AI request must be authenticated and authorized
- All data flowing to AI services is inspected and validated
- Continuous monitoring of AI interactions
- Least privilege access to AI capabilities

## Key Components

### 1. Identity and Access Management

Implement strong identity controls:
- Multi-factor authentication for AI tool access
- Role-based access control for different AI capabilities
- Just-in-time access provisioning

### 2. Data Protection Layer

Deploy an AI proxy gateway that:
- Inspects all requests before they reach AI services
- Redacts or blocks sensitive data
- Enforces data loss prevention policies

### 3. Continuous Monitoring

Monitor all AI interactions:
- Log every request and response
- Alert on anomalous behavior
- Generate compliance reports

## Implementation Best Practices

Start small and expand gradually. Begin with your highest-risk AI use cases and extend controls as you learn.
    `
  },
  'secrets-detection-ai-code-assistants': {
    title: 'Stop Secrets from Leaking to AI Code Assistants',
    author: 'Emily Watson',
    authorRole: 'DevSecOps Engineer',
    date: 'January 12, 2026',
    readTime: '6 min read',
    category: 'DevSecOps',
    excerpt: 'Developers love AI coding assistants, but they pose serious risks for API keys and credentials. Here\'s how to protect your secrets.',
    content: `
AI coding assistants like GitHub Copilot, Cursor, and Claude have transformed software development. But they've also created a new vector for secret exposure.

## The Problem

When developers use AI code assistants, they often:
- Paste code snippets containing API keys
- Share configuration files with database credentials
- Include environment variables with secrets

These secrets are then sent to external AI services, potentially exposing them to:
- The AI provider's systems
- Training data for future models
- Potential data breaches

## Common Secret Patterns

AI security solutions should detect:
- AWS access keys and secret keys
- API tokens (Stripe, Twilio, etc.)
- Database connection strings
- Private keys and certificates
- OAuth tokens

## Protection Strategies

### 1. Pre-commit Hooks

Use tools like git-secrets to prevent commits containing secrets.

### 2. AI Proxy Gateway

Deploy a proxy that scans all AI requests for secret patterns and blocks them before they leave your network.

### 3. Secret Management

Store secrets in dedicated secret managers like HashiCorp Vault or AWS Secrets Manager, not in code.

## Conclusion

AI coding assistants are powerful tools, but they require thoughtful security controls. Implement the right safeguards to let your developers code faster without putting your infrastructure at risk.
    `
  },
  'enterprise-ai-governance-framework': {
    title: 'Building an Enterprise AI Governance Framework',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'January 8, 2026',
    readTime: '15 min read',
    category: 'Governance',
    excerpt: 'Create a robust governance structure that enables AI innovation while maintaining security, privacy, and ethical standards.',
    content: `
As AI becomes embedded in enterprise operations, organizations need formal governance structures to manage risks and maximize value.

## Why AI Governance Matters

Without governance, organizations face:
- Regulatory penalties
- Data breaches
- Reputational damage
- Ethical violations
- Inconsistent AI usage

## Key Components of AI Governance

### 1. Policy Framework

Define clear policies for:
- Approved AI tools and use cases
- Data handling requirements
- Human oversight requirements
- Incident response procedures

### 2. Organizational Structure

Establish:
- AI steering committee
- Clear roles and responsibilities
- Escalation procedures
- Training requirements

### 3. Technical Controls

Implement:
- AI security gateways
- Monitoring and logging
- Access controls
- Data classification

## Getting Started

Start by assessing your current AI usage and risks. Then build governance incrementally, starting with your highest-risk applications.
    `
  },
  'ai-proxy-gateway-explained': {
    title: 'AI Proxy Gateways Explained: The Security Layer Your AI Stack Needs',
    author: 'Michael Rodriguez',
    authorRole: 'Compliance Director',
    date: 'January 5, 2026',
    readTime: '9 min read',
    category: 'Technology',
    excerpt: 'Understanding how AI proxy gateways work and why they\'re becoming essential for enterprise security.',
    content: `
AI proxy gateways are emerging as a critical security layer for organizations using generative AI. Here's what you need to know.

## What is an AI Proxy Gateway?

An AI proxy gateway sits between your users and external AI services like ChatGPT or Claude. It inspects, filters, and logs all traffic flowing to these services.

## How It Works

1. User sends request to AI service
2. Request is intercepted by the gateway
3. Gateway scans for sensitive data (PII, secrets, etc.)
4. Sensitive data is redacted or request is blocked
5. Clean request is forwarded to AI service
6. Response is logged and returned to user

## Key Benefits

### Data Protection
- Prevents PII from reaching external AI services
- Blocks secrets and credentials
- Enforces data loss prevention policies

### Compliance
- Maintains audit logs for regulatory requirements
- Supports GDPR, HIPAA, SOC 2 compliance
- Enables data residency controls

### Visibility
- Track all AI usage across the organization
- Identify shadow AI applications
- Generate usage reports

## Choosing a Gateway

Look for:
- High accuracy detection
- Low latency impact
- Easy deployment
- Comprehensive logging
- Customizable rules

## Conclusion

As AI adoption accelerates, proxy gateways are becoming essential infrastructure for security-conscious organizations.
    `
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogContent[params.slug];
  if (!post) {
    return { title: 'Article Not Found' };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogContent[params.slug];

  if (!post) {
    return (
      <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
        <Navigation />
        <section style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Article Not Found</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            This article doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/blog"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            ← Back to Blog
          </Link>
        </section>
      </main>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key++} style={{ marginLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
            {listItems.map((item, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={key++} style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#1a1a1a',
            marginTop: '2.5rem',
            marginBottom: '1rem'
          }}>
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={key++} style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#667eea',
            marginTop: '2rem',
            marginBottom: '0.75rem'
          }}>
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        listItems.push(trimmed.slice(2));
      } else if (trimmed === '') {
        flushList();
      } else {
        flushList();
        elements.push(
          <p key={key++} style={{
            marginBottom: '1.5rem',
            lineHeight: 1.8,
            color: '#444'
          }}>
            {trimmed}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
      <Navigation />

      {/* Article Header */}
      <section style={{
        padding: '80px 20px 40px',
        background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link
            href="/blog"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem'
            }}
          >
            ← Back to Blog
          </Link>
          
          <span style={{
            display: 'inline-block',
            background: 'rgba(102, 126, 234, 0.1)',
            padding: '6px 14px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#667eea',
            marginBottom: '1.5rem'
          }}>
            {post.category}
          </span>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            lineHeight: 1.2,
            marginBottom: '1.5rem'
          }}>
            {post.title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            color: '#666'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem'
              }}>
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{post.author}</div>
                <div style={{ fontSize: '0.85rem' }}>{post.authorRole}</div>
              </div>
            </div>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article style={{
        padding: '40px 20px 100px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: '1.1rem' }}>
          {renderContent(post.content)}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid #e9ecef'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '2.5rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Ready to Protect Your AI Data?
            </h3>
            <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              See how ZeroShare Gateway can help your organization use AI safely.
            </p>
            <Link
              href="/contact-us"
              style={{
                display: 'inline-block',
                background: 'white',
                color: '#667eea',
                padding: '14px 32px',
                borderRadius: '12px',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              Get a Free Demo →
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
