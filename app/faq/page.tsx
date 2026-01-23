import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description: 'Answers to common questions about ZeroShare Gateway AI security. Learn about PII detection, secrets blocking, compliance, pricing, and deployment options.',
  keywords: [
    'AI security FAQ',
    'ZeroShare Gateway questions',
    'AI data protection FAQ',
    'enterprise AI security questions',
    'PII detection FAQ',
    'ChatGPT security questions',
  ],
  openGraph: {
    title: 'ZeroShare Gateway FAQ - AI Security Questions Answered',
    description: 'Find answers to common questions about AI security, data protection, compliance, and enterprise deployment.',
  },
  alternates: {
    canonical: 'https://deployzeroshare.com/faq',
  },
};

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Product Overview
  {
    category: 'Product Overview',
    question: 'What is ZeroShare Gateway?',
    answer: 'ZeroShare Gateway is an enterprise AI security gateway that prevents sensitive data leakage when your organization uses AI services like ChatGPT, GitHub Copilot, Claude, and other generative AI tools. It works as a transparent proxy that scans all traffic for PII (Personally Identifiable Information) and secrets, blocking or redacting them before they reach external AI services.',
  },
  {
    category: 'Product Overview',
    question: 'How does ZeroShare Gateway protect against AI data leaks?',
    answer: 'ZeroShare Gateway sits between your users and AI services as a transparent proxy. It uses advanced pattern recognition and machine learning to detect 50+ types of PII (emails, SSNs, credit cards, etc.) and 100+ secret patterns (API keys, passwords, credentials). When sensitive data is detected, it can be blocked, redacted, or flagged for review before reaching the AI service.',
  },
  {
    category: 'Product Overview',
    question: 'What AI services does ZeroShare Gateway support?',
    answer: 'ZeroShare Gateway supports all major AI services including OpenAI ChatGPT and GPT-4, Anthropic Claude, Google Bard and Gemini, Microsoft Copilot, GitHub Copilot, Amazon Bedrock, Cohere, and any custom or self-hosted AI models accessible via HTTP/HTTPS.',
  },
  {
    category: 'Product Overview',
    question: 'Does ZeroShare Gateway work with on-premise AI models?',
    answer: 'Yes. ZeroShare Gateway can be configured to inspect traffic to any HTTP/HTTPS endpoint, including self-hosted LLMs like Llama, Mistral, or private ChatGPT deployments. This is useful for organizations that want to protect data even when using internal AI services.',
  },

  // Technical
  {
    category: 'Technical',
    question: 'Does ZeroShare Gateway slow down AI responses?',
    answer: 'No. ZeroShare Gateway adds minimal latency, averaging less than 5 milliseconds overhead. The gateway uses streaming pass-through technology, so users see AI responses in real-time without noticeable delay. Performance is optimized for high-throughput enterprise deployments.',
  },
  {
    category: 'Technical',
    question: 'How is ZeroShare Gateway deployed?',
    answer: 'ZeroShare Gateway offers three deployment options: 1) On-Premise using Docker containers or Kubernetes, 2) Private Cloud deployment on AWS, Azure, or GCP with customer-controlled infrastructure, and 3) AWS Marketplace for one-click deployment. All options support high availability configurations.',
  },
  {
    category: 'Technical',
    question: 'Do I need to modify my applications to use ZeroShare Gateway?',
    answer: 'No. ZeroShare Gateway is a transparent proxy requiring zero code changes to your applications. Simply configure your network to route AI traffic through the gateway using standard proxy settings (HTTP_PROXY/HTTPS_PROXY environment variables), browser extensions, or network-level routing.',
  },
  {
    category: 'Technical',
    question: 'Can users bypass the ZeroShare Gateway?',
    answer: 'When properly deployed with network controls (firewall rules, PAC files, or DNS configuration), bypassing the gateway is not possible. Enterprise tier includes bypass detection alerting that notifies security teams if users attempt to access AI services directly.',
  },
  {
    category: 'Technical',
    question: 'Is ZeroShare Gateway a single point of failure?',
    answer: 'No. ZeroShare Gateway is designed for high availability with active-active clustering. Multiple gateway instances can run simultaneously with automatic failover. The Enterprise tier includes a 99.9% uptime SLA guarantee.',
  },

  // Security & Privacy
  {
    category: 'Security & Privacy',
    question: 'Does ZeroShare Gateway store or read the data it inspects?',
    answer: 'No. ZeroShare Gateway is a pass-through proxy that inspects data in memory only. Your data is never stored on the gateway. Only metadata (blocked/allowed status, detection type, timestamp) is logged for audit purposes. This design ensures your sensitive data never leaves your control.',
  },
  {
    category: 'Security & Privacy',
    question: 'What types of PII can ZeroShare Gateway detect?',
    answer: 'ZeroShare Gateway detects 50+ types of PII including: email addresses, phone numbers (international formats), Social Security Numbers (SSN), credit card numbers, bank account numbers, passport numbers, driver license numbers, IP addresses, physical addresses, medical record numbers, dates of birth, national ID numbers, and tax identification numbers.',
  },
  {
    category: 'Security & Privacy',
    question: 'What secrets and credentials does ZeroShare Gateway detect?',
    answer: 'ZeroShare Gateway detects 100+ secret patterns including: AWS access keys and secret keys, Google Cloud service account keys, Azure connection strings, GitHub tokens, Slack tokens, Stripe API keys, database connection strings (PostgreSQL, MySQL, MongoDB), JWT tokens, SSH private keys, OAuth tokens, and generic API key patterns.',
  },
  {
    category: 'Security & Privacy',
    question: 'What happens when sensitive data is detected?',
    answer: 'When sensitive data is detected, you can configure multiple actions: block the entire request, automatically redact the sensitive portions, send an alert to your security team, log the incident for audit purposes, or allow the request with a warning. Actions can be configured per data type, user, or group.',
  },

  // Compliance
  {
    category: 'Compliance',
    question: 'Is ZeroShare Gateway SOC 2 certified?',
    answer: 'ZeroShare Gateway is designed with SOC 2 requirements in mind and we are actively working toward SOC 2 Type II certification. Our architecture includes comprehensive audit logging, access controls, encryption, and security monitoring aligned with SOC 2 Trust Service Criteria. Contact us for our current security documentation and certification timeline.',
  },
  {
    category: 'Compliance',
    question: 'Does ZeroShare Gateway support GDPR compliance?',
    answer: 'ZeroShare Gateway includes features designed to support GDPR compliance: PII detection for EU data patterns, support for data subject rights (access, erasure), data minimization by design (configurable data retention), and complete audit trails. Note: Your organization is responsible for overall GDPR compliance; we provide tools to help.',
  },
  {
    category: 'Compliance',
    question: 'Does ZeroShare Gateway support HIPAA compliance?',
    answer: 'ZeroShare Gateway includes features designed to support HIPAA compliance: PHI detection and protection, comprehensive audit logging with configurable retention, encryption at rest and in transit. We can provide Business Associate Agreements (BAA) for healthcare customers. Note: Your organization is responsible for overall HIPAA compliance; we provide technical safeguards to help.',
  },
  {
    category: 'Compliance',
    question: 'Does ZeroShare Gateway help with PCI DSS compliance?',
    answer: 'ZeroShare Gateway helps protect cardholder data by detecting and blocking credit card numbers, CVVs, and other payment data before it reaches AI services. We provide audit trails for compliance reporting. Note: PCI DSS compliance is your organization\'s responsibility; we provide technical controls to prevent accidental data exposure.',
  },

  // Pricing
  {
    category: 'Pricing',
    question: 'How much does ZeroShare Gateway cost?',
    answer: 'ZeroShare Gateway offers three tiers: Starter (Free) with up to 1,000 requests/day for individuals and small teams; Professional ($499/month) with up to 100,000 requests/day for growing organizations; and Enterprise (custom pricing) with unlimited requests, advanced features, and dedicated support for large organizations.',
  },
  {
    category: 'Pricing',
    question: 'Is there a free trial or free tier?',
    answer: 'Yes. The Starter tier is completely free and includes up to 1,000 requests per day, basic PII detection, 7-day audit log retention, and community support. No credit card required to start. Upgrade to Professional or Enterprise when you need more capacity or features.',
  },
  {
    category: 'Pricing',
    question: 'What payment options are available?',
    answer: 'ZeroShare Gateway accepts credit cards for monthly subscriptions, ACH/wire transfer for annual contracts, and is available through AWS Marketplace with consolidated AWS billing. Enterprise customers can negotiate custom payment terms.',
  },

  // Getting Started
  {
    category: 'Getting Started',
    question: 'How do I get started with ZeroShare Gateway?',
    answer: 'Getting started is easy: 1) Visit deployzeroshare.com/pricing to choose a plan, 2) Deploy via AWS Marketplace (one-click) or download for on-premise installation, 3) Configure your network to route AI traffic through the gateway, 4) Access the dashboard to monitor activity and customize rules.',
  },
  {
    category: 'Getting Started',
    question: 'How long does deployment take?',
    answer: 'AWS Marketplace deployment takes approximately 15 minutes for a basic setup. On-premise deployment with Kubernetes typically takes 1-2 hours including configuration. Enterprise deployments with custom integrations are typically completed within 1-2 weeks with dedicated support.',
  },
  {
    category: 'Getting Started',
    question: 'Is training or onboarding provided?',
    answer: 'Yes. All customers receive access to comprehensive documentation and video tutorials. Professional tier includes email-based onboarding support. Enterprise tier includes dedicated onboarding sessions, custom training for security teams, and ongoing customer success management.',
  },

  // Support
  {
    category: 'Support',
    question: 'What support options are available?',
    answer: 'Support varies by tier: Starter tier has community support via documentation and forums; Professional tier includes email support with 24-hour response time; Enterprise tier includes dedicated support with 4-hour response SLA, phone support, and a dedicated customer success manager.',
  },
  {
    category: 'Support',
    question: 'How do I contact support?',
    answer: 'You can reach support through: the support portal at deployzeroshare.com/support, email at support@deployzeroshare.com, or for Enterprise customers, direct phone line and Slack channel access. Documentation is available at docs.deployzeroshare.com.',
  },
];

// Group FAQs by category
const groupedFaqs = faqs.reduce((acc, faq) => {
  if (!acc[faq.category]) {
    acc[faq.category] = [];
  }
  acc[faq.category].push(faq);
  return acc;
}, {} as Record<string, FAQItem[]>);

const categoryOrder = ['Product Overview', 'Technical', 'Security & Privacy', 'Compliance', 'Pricing', 'Getting Started', 'Support'];

// JSON-LD for FAQ Page (for search engines and AI)
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff' }}>
        {/* Navigation */}
        <nav style={{
          padding: '1rem 2rem',
          borderBottom: '1px solid #222',
          position: 'sticky',
          top: 0,
          backgroundColor: '#0a0a0a',
          zIndex: 100,
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', textDecoration: 'none' }}>
              ZeroShare<span style={{ color: '#00d4ff' }}>Gateway</span>
            </Link>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link href="/pricing" style={{ color: '#ccc', textDecoration: 'none' }}>Pricing</Link>
              <Link href="/docs" style={{ color: '#ccc', textDecoration: 'none' }}>Docs</Link>
              <Link href="/blog" style={{ color: '#ccc', textDecoration: 'none' }}>Blog</Link>
              <Link href="/contact-us" style={{ color: '#ccc', textDecoration: 'none' }}>Contact</Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ padding: '4rem 2rem', textAlign: 'center', borderBottom: '1px solid #222' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Frequently Asked Questions
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#888', marginBottom: '2rem' }}>
              Everything you need to know about ZeroShare Gateway AI security
            </p>
            
            {/* Quick Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {categoryOrder.map(category => (
                <a
                  key={category}
                  href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '20px',
                    color: '#ccc',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                  }}
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <main style={{ padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {categoryOrder.map(category => (
              <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} style={{ marginBottom: '4rem' }}>
                <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 'bold', 
                  marginBottom: '2rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '2px solid #00d4ff',
                  display: 'inline-block',
                }}>
                  {category}
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {groupedFaqs[category]?.map((faq, index) => (
                    <article 
                      key={index}
                      style={{
                        backgroundColor: '#111',
                        border: '1px solid #222',
                        borderRadius: '8px',
                        padding: '1.5rem',
                      }}
                    >
                      <h3 style={{ 
                        fontSize: '1.125rem', 
                        fontWeight: '600', 
                        marginBottom: '1rem',
                        color: '#fff',
                      }}>
                        {faq.question}
                      </h3>
                      <p style={{ 
                        color: '#aaa', 
                        lineHeight: '1.7',
                        margin: 0,
                      }}>
                        {faq.answer}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>

        {/* CTA Section */}
        <section style={{ 
          padding: '4rem 2rem', 
          backgroundColor: '#111',
          borderTop: '1px solid #222',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Still have questions?
            </h2>
            <p style={{ color: '#888', marginBottom: '2rem' }}>
              Our team is here to help you understand how ZeroShare Gateway can protect your organization.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link 
                href="/contact-us"
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#00d4ff',
                  color: '#000',
                  fontWeight: '600',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                Contact Sales
              </Link>
              <Link 
                href="/support"
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: 'transparent',
                  color: '#00d4ff',
                  fontWeight: '600',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '1px solid #00d4ff',
                }}
              >
                Get Support
              </Link>
              <Link 
                href="/docs"
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: 'transparent',
                  color: '#ccc',
                  fontWeight: '600',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '1px solid #333',
                }}
              >
                Read Docs
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '2rem', borderTop: '1px solid #222', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} ZeroShare. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
