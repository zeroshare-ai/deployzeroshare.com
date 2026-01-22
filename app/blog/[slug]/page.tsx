'use client';

import { Navigation } from '../../components/Navigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// In production, this would come from a CMS
const blogContent: Record<string, {
  title: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}> = {
  'prevent-pii-leaks-ai-chatbots': {
    title: 'How to Prevent PII Leaks When Your Team Uses AI Chatbots',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'January 20, 2026',
    readTime: '8 min read',
    category: 'Security Best Practices',
    content: `
The rise of AI chatbots like ChatGPT, Claude, and Copilot has revolutionized workplace productivity. But with great power comes great responsibility—and significant security risks.

## The Hidden Danger in Every AI Conversation

Every day, your employees are having thousands of conversations with AI assistants. They're asking for help with emails, code reviews, data analysis, and customer communications. The problem? They're often sharing sensitive information without realizing it.

Consider these common scenarios:

- A customer service rep asks ChatGPT to "help me respond to this angry customer" and pastes the entire email thread—including the customer's email, phone number, and account details.
- A developer asks Copilot to "fix this bug in my database query" and inadvertently shares database credentials embedded in the code.
- A sales rep asks for help writing a proposal and includes confidential pricing information.

## The Scale of the Problem

According to recent studies, **65% of employees have shared sensitive data with AI tools** without proper authorization. This includes:

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

## The ZeroShare Approach

ZeroShare Gateway provides comprehensive protection through:

**Intelligent Detection**: Our ML-powered detection identifies 50+ types of PII and hundreds of secret patterns with 99.9% accuracy.

**Transparent Protection**: Works as a proxy with zero code changes required—deploy in minutes, not months.

**Compliance Ready**: Built-in audit logging meets SOC 2, GDPR, HIPAA, and other compliance requirements.

## Conclusion

AI tools are here to stay, and trying to ban them entirely is neither practical nor advisable. The key is enabling your team to use these powerful tools safely. With the right security measures in place, you can have the best of both worlds: AI-powered productivity without the data leak risks.

Ready to protect your organization? [Contact us for a demo](/contact-us) and see how ZeroShare Gateway can help.
    `
  },
  'ai-security-compliance-guide-2026': {
    title: 'The Complete Guide to AI Security Compliance in 2026',
    author: 'Michael Rodriguez',
    authorRole: 'Compliance Director',
    date: 'January 18, 2026',
    readTime: '12 min read',
    category: 'Compliance',
    content: `
As organizations rapidly adopt generative AI tools, compliance requirements are evolving just as quickly. This guide covers everything you need to know about meeting regulatory requirements while leveraging AI.

## The Evolving Regulatory Landscape

2026 has brought significant changes to AI governance worldwide. Key developments include:

- **EU AI Act**: Now in full enforcement, requiring risk assessments for AI systems
- **Updated GDPR Guidance**: New interpretations specifically addressing AI and automated decision-making
- **State Privacy Laws**: California, Virginia, and Colorado have all updated their privacy laws with AI-specific provisions
- **SEC Guidance**: New requirements for disclosing AI-related risks to investors

## Core Compliance Frameworks

### GDPR and AI

The General Data Protection Regulation has specific implications for AI:

**Lawful Basis**: You need a valid legal basis for processing personal data through AI systems.

**Data Minimization**: Only process the minimum data necessary for your AI use case.

**Right to Explanation**: Users have the right to understand how AI decisions affecting them are made.

**Data Protection Impact Assessment**: Required for AI systems that pose high risks to individuals.

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

### Step 4: Establish Governance

Create a formal AI governance structure:
- AI steering committee
- Clear roles and responsibilities
- Policy review and update procedures
- Training programs

## How ZeroShare Gateway Supports Compliance

ZeroShare Gateway is designed with compliance in mind:

**Audit Logging**: Every request is logged with full detail for compliance reporting.

**Data Residency**: On-premise deployment keeps your data within your infrastructure.

**Policy Engine**: Customizable rules to enforce your organization's specific compliance requirements.

**Reporting**: Pre-built compliance reports for SOC 2, GDPR, and HIPAA audits.

## Looking Ahead

AI regulation will continue to evolve. Organizations that build strong AI governance foundations now will be better positioned to adapt to new requirements.

[Contact us](/contact-us) to learn how ZeroShare Gateway can help you achieve and maintain AI compliance.
    `
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogContent[slug];

  if (!post) {
    return (
      <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
        <Navigation />
        <section style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Article Not Found</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            This article doesn't exist or has been moved.
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
    const elements: JSX.Element[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} style={{ marginLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
            {listItems.map((item, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={i} style={{
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
          <h3 key={i} style={{
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
        inList = true;
        listItems.push(trimmed.slice(2));
      } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        flushList();
        elements.push(
          <p key={i} style={{
            fontWeight: 700,
            marginTop: '1rem',
            marginBottom: '0.5rem'
          }}>
            {trimmed.slice(2, -2)}
          </p>
        );
      } else if (trimmed === '') {
        flushList();
      } else {
        flushList();
        // Handle inline formatting
        const formatted = trimmed
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #667eea; text-decoration: underline;">$1</a>');
        
        elements.push(
          <p key={i} style={{
            marginBottom: '1.5rem',
            lineHeight: 1.8,
            color: '#444'
          }} dangerouslySetInnerHTML={{ __html: formatted }} />
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

        {/* Share & CTA */}
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
