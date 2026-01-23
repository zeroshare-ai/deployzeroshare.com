'use client';

import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import Link from 'next/link';

// Blog posts with real research-backed content
// Authors reflect natural team evolution - some consistent, some guest contributors, some departed
const blogPosts = [
  // January 2026
  {
    slug: 'prevent-pii-leaks-ai-chatbots',
    title: 'How to Prevent PII Leaks When Your Team Uses AI Chatbots',
    excerpt: 'New research shows 22% of files uploaded to AI tools contain sensitive data. Learn how to protect your organization from the growing threat of AI-enabled data leaks.',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'January 20, 2026',
    readTime: '12 min read',
    category: 'Security Best Practices',
    featured: true,
    image: '/images/blog/blog-pii-leaks.png',
  },
  {
    slug: 'ai-security-compliance-guide-2026',
    title: 'The Complete Guide to AI Security Compliance in 2026',
    excerpt: 'From HIPAA modernization to SEC AI disclosure requirements, navigate the new regulatory landscape with this comprehensive compliance guide.',
    author: 'Michael Rodriguez',
    authorRole: 'Compliance Director',
    date: 'January 18, 2026',
    readTime: '15 min read',
    category: 'Compliance',
    featured: true,
    image: '/images/blog/blog-compliance.png',
  },
  {
    slug: 'zero-trust-ai-architecture',
    title: 'Implementing Zero Trust Architecture for AI Applications',
    excerpt: 'Traditional perimeter security fails for AI. Learn how to apply zero trust principles to protect your organization while enabling AI productivity.',
    author: 'David Kim',
    authorRole: 'Solutions Architect',
    date: 'January 15, 2026',
    readTime: '14 min read',
    category: 'Architecture',
    featured: false,
    image: '/images/blog/blog-zero-trust.png',
  },
  {
    slug: 'secrets-detection-ai-code-assistants',
    title: 'Stop Secrets from Leaking to AI Code Assistants',
    excerpt: 'Researchers extracted 2,702 real credentials from GitHub Copilot. Your developers are at risk. Here\'s how to protect your secrets.',
    author: 'Emily Watson',
    authorRole: 'DevSecOps Engineer',
    date: 'January 12, 2026',
    readTime: '11 min read',
    category: 'DevSecOps',
    featured: false,
    image: '/images/blog/blog-secrets.png',
  },
  {
    slug: 'enterprise-ai-governance-framework',
    title: 'Building an Enterprise AI Governance Framework',
    excerpt: 'With 20% of breaches now involving shadow AI, governance isn\'t optional. Learn how to build a framework that enables innovation while managing risk.',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'January 8, 2026',
    readTime: '16 min read',
    category: 'Governance',
    featured: false,
    image: '/images/blog/blog-governance.png',
  },
  {
    slug: 'ai-proxy-gateway-explained',
    title: 'AI Proxy Gateways Explained: The Security Layer Your AI Stack Needs',
    excerpt: 'With 72.6% of sensitive AI prompts going to ChatGPT alone, you need a security layer that works across all AI tools. Here\'s how AI gateways work.',
    author: 'Michael Rodriguez',
    authorRole: 'Compliance Director',
    date: 'January 5, 2026',
    readTime: '13 min read',
    category: 'Technology',
    featured: false,
    image: '/images/blog/blog-gateway.png',
  },
  // December 2025
  {
    slug: 'shadow-ai-670k-breach-cost',
    title: 'Shadow AI: The $670K Hidden Cost in Every Data Breach',
    excerpt: '98% of organizations have employees using unsanctioned AI tools. New research reveals shadow AI increases breach costs by $670,000 on average.',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'December 28, 2025',
    readTime: '10 min read',
    category: 'Security Best Practices',
    featured: false,
    image: '/images/blog/blog-shadow-ai.png',
  },
  {
    slug: 'hipaa-ai-requirements-2026',
    title: 'HIPAA\'s New AI Requirements: What Healthcare Organizations Must Know',
    excerpt: 'The 2026 HIPAA Security Rule modernization introduces prescriptive AI requirements. Here\'s what healthcare CISOs need to prepare for.',
    author: 'Dr. Amanda Foster',
    authorRole: 'Healthcare Compliance Advisor',
    date: 'December 22, 2025',
    readTime: '14 min read',
    category: 'Compliance',
    featured: false,
    image: '/images/blog/blog-hipaa-2026.png',
  },
  {
    slug: 'ai-dlp-architecture-patterns',
    title: 'AI Data Loss Prevention: 5 Architecture Patterns That Work',
    excerpt: 'Not all AI DLP architectures are created equal. We compare proxy, endpoint, API, and hybrid approaches with real performance data.',
    author: 'David Kim',
    authorRole: 'Solutions Architect',
    date: 'December 18, 2025',
    readTime: '18 min read',
    category: 'Architecture',
    featured: false,
    image: '/images/blog/blog-dlp-patterns.png',
  },
  {
    slug: 'secure-cicd-ai-assistants',
    title: 'Securing Your CI/CD Pipeline When Developers Use AI Assistants',
    excerpt: 'AI coding assistants are transforming development workflows. Here\'s how to maintain security without killing productivity.',
    author: 'Emily Watson',
    authorRole: 'DevSecOps Engineer',
    date: 'December 15, 2025',
    readTime: '11 min read',
    category: 'DevSecOps',
    featured: false,
    image: '/images/blog/blog-cicd-security.png',
  },
  {
    slug: 'ai-acceptable-use-policy-template',
    title: 'The Enterprise AI Acceptable Use Policy Template You Can Actually Use',
    excerpt: 'Most AI policies are either too vague or too restrictive. Download our battle-tested template based on real enterprise deployments.',
    author: 'Michael Rodriguez',
    authorRole: 'Compliance Director',
    date: 'December 12, 2025',
    readTime: '9 min read',
    category: 'Governance',
    featured: false,
    image: '/images/blog/blog-policy-template.png',
  },
  {
    slug: 'llm-security-fundamentals',
    title: 'LLM Security Fundamentals Every Security Team Should Know',
    excerpt: 'From prompt injection to training data extraction, understand the unique security challenges of large language models.',
    author: 'James Park',
    authorRole: 'Security Researcher',
    date: 'December 8, 2025',
    readTime: '15 min read',
    category: 'Technology',
    featured: false,
    image: '/images/blog/blog-llm-fundamentals.png',
  },
  // November 2025
  {
    slug: 'chatgpt-enterprise-security-review',
    title: 'ChatGPT Enterprise Security: An Honest Assessment',
    excerpt: 'We put ChatGPT Enterprise through rigorous security testing. Here\'s what we found—good and bad.',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'November 28, 2025',
    readTime: '13 min read',
    category: 'Security Best Practices',
    featured: false,
    image: '/images/blog/blog-chatgpt-enterprise.png',
  },
  {
    slug: 'soc2-ai-controls-guide',
    title: 'SOC 2 Controls for AI: The Auditor\'s Perspective',
    excerpt: 'What do SOC 2 auditors actually look for when assessing AI controls? A former Big 4 auditor shares insights.',
    author: 'Rachel Thompson',
    authorRole: 'Guest Contributor',
    date: 'November 24, 2025',
    readTime: '12 min read',
    category: 'Compliance',
    featured: false,
    image: '/images/blog/blog-soc2-controls.png',
  },
  {
    slug: 'microservices-ai-gateway-integration',
    title: 'Integrating AI Gateways into Microservices Architecture',
    excerpt: 'Practical patterns for adding AI security controls to your microservices without creating bottlenecks.',
    author: 'David Kim',
    authorRole: 'Solutions Architect',
    date: 'November 20, 2025',
    readTime: '16 min read',
    category: 'Architecture',
    featured: false,
    image: '/images/blog/blog-microservices.png',
  },
  {
    slug: 'github-copilot-security-settings',
    title: 'Every GitHub Copilot Security Setting Explained',
    excerpt: 'A comprehensive walkthrough of GitHub Copilot\'s security configurations and what they actually do.',
    author: 'Emily Watson',
    authorRole: 'DevSecOps Engineer',
    date: 'November 15, 2025',
    readTime: '10 min read',
    category: 'DevSecOps',
    featured: false,
    image: '/images/blog/blog-copilot-settings.png',
  },
  {
    slug: 'ai-risk-register-template',
    title: 'Building Your AI Risk Register: A Practical Framework',
    excerpt: 'Risk registers for AI look different than traditional IT risks. Here\'s how to build one that actually helps.',
    author: 'Michael Rodriguez',
    authorRole: 'Compliance Director',
    date: 'November 10, 2025',
    readTime: '11 min read',
    category: 'Governance',
    featured: false,
    image: '/images/blog/blog-risk-register.png',
  },
  {
    slug: 'prompt-injection-attacks-explained',
    title: 'Prompt Injection Attacks: How They Work and How to Defend',
    excerpt: 'Prompt injection is the SQL injection of the AI era. Deep dive into attack vectors and defense strategies.',
    author: 'James Park',
    authorRole: 'Security Researcher',
    date: 'November 5, 2025',
    readTime: '14 min read',
    category: 'Technology',
    featured: false,
    image: '/images/blog/blog-prompt-injection.png',
  },
  // October 2025
  {
    slug: 'ai-security-budget-justification',
    title: 'How to Justify Your AI Security Budget to the Board',
    excerpt: 'Translate AI security risks into business impact with this framework for executive communication.',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'October 28, 2025',
    readTime: '9 min read',
    category: 'Security Best Practices',
    featured: false,
    image: '/images/blog/blog-budget-justification.png',
  },
  {
    slug: 'gdpr-ai-processing-requirements',
    title: 'GDPR and AI: Data Processing Requirements You\'re Probably Missing',
    excerpt: 'The EDPS released new AI guidance in October 2025. Here\'s what changed and what you need to do.',
    author: 'Dr. Amanda Foster',
    authorRole: 'Healthcare Compliance Advisor',
    date: 'October 24, 2025',
    readTime: '13 min read',
    category: 'Compliance',
    featured: false,
    image: '/images/blog/blog-gdpr-ai.png',
  },
  {
    slug: 'high-availability-ai-gateway',
    title: 'Designing High-Availability AI Security Gateways',
    excerpt: 'Your AI gateway is now critical infrastructure. Here\'s how to architect it for 99.99% uptime.',
    author: 'David Kim',
    authorRole: 'Solutions Architect',
    date: 'October 20, 2025',
    readTime: '15 min read',
    category: 'Architecture',
    featured: false,
    image: '/images/blog/blog-high-availability.png',
  },
  {
    slug: 'pre-commit-hooks-ai-secrets',
    title: 'Pre-Commit Hooks for AI: Catching Secrets Before They Leak',
    excerpt: 'Shift left on AI security with pre-commit hooks that catch sensitive data before it reaches your AI tools.',
    author: 'Marcus Chen',
    authorRole: 'Senior DevOps Engineer',
    date: 'October 15, 2025',
    readTime: '8 min read',
    category: 'DevSecOps',
    featured: false,
    image: '/images/blog/blog-pre-commit.png',
  },
  {
    slug: 'ai-vendor-assessment-checklist',
    title: 'The AI Vendor Security Assessment Checklist',
    excerpt: '47 questions to ask before approving any AI vendor. Includes red flags and deal breakers.',
    author: 'Michael Rodriguez',
    authorRole: 'Compliance Director',
    date: 'October 10, 2025',
    readTime: '12 min read',
    category: 'Governance',
    featured: false,
    image: '/images/blog/blog-vendor-checklist.png',
  },
  {
    slug: 'vector-database-security',
    title: 'Vector Database Security: The New Attack Surface',
    excerpt: 'As RAG architectures proliferate, vector databases become attractive targets. Here\'s how to secure them.',
    author: 'James Park',
    authorRole: 'Security Researcher',
    date: 'October 5, 2025',
    readTime: '11 min read',
    category: 'Technology',
    featured: false,
    image: '/images/blog/blog-vector-database.png',
  },
  // September 2025
  {
    slug: 'executive-ai-security-briefing',
    title: 'The 10-Minute AI Security Briefing for Executives',
    excerpt: 'Need to brief your CEO on AI risks? Here\'s everything they need to know in a digestible format.',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'September 28, 2025',
    readTime: '10 min read',
    category: 'Security Best Practices',
    featured: false,
    image: '/images/blog/blog-executive-briefing.png',
  },
  {
    slug: 'eu-ai-act-compliance-timeline',
    title: 'EU AI Act Compliance: Your 2025-2026 Timeline',
    excerpt: 'With fines up to 6% of global revenue, EU AI Act compliance isn\'t optional. Here\'s your month-by-month roadmap.',
    author: 'Michael Rodriguez',
    authorRole: 'Compliance Director',
    date: 'September 22, 2025',
    readTime: '14 min read',
    category: 'Compliance',
    featured: false,
    image: '/images/blog/blog-eu-ai-act.png',
  },
  {
    slug: 'kubernetes-ai-gateway-deployment',
    title: 'Deploying AI Security Gateways on Kubernetes',
    excerpt: 'Helm charts, resource limits, and scaling strategies for production AI gateway deployments.',
    author: 'David Kim',
    authorRole: 'Solutions Architect',
    date: 'September 18, 2025',
    readTime: '17 min read',
    category: 'Architecture',
    featured: false,
    image: '/images/blog/blog-kubernetes.png',
  },
  {
    slug: 'terraform-ai-security-modules',
    title: 'Terraform Modules for AI Security Infrastructure',
    excerpt: 'Infrastructure as code templates for deploying AI security controls across AWS, Azure, and GCP.',
    author: 'Marcus Chen',
    authorRole: 'Senior DevOps Engineer',
    date: 'September 12, 2025',
    readTime: '13 min read',
    category: 'DevSecOps',
    featured: false,
    image: '/images/blog/blog-terraform.png',
  },
  {
    slug: 'ai-incident-response-playbook',
    title: 'AI Incident Response: When Sensitive Data Reaches the LLM',
    excerpt: 'Your employee just pasted customer SSNs into ChatGPT. Here\'s your incident response playbook.',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'September 8, 2025',
    readTime: '11 min read',
    category: 'Governance',
    featured: false,
    image: '/images/blog/blog-incident-response.png',
  },
  {
    slug: 'openai-api-security-best-practices',
    title: 'OpenAI API Security: Configuration Best Practices',
    excerpt: 'Rate limiting, key rotation, and monitoring strategies for secure OpenAI API consumption.',
    author: 'James Park',
    authorRole: 'Security Researcher',
    date: 'September 2, 2025',
    readTime: '10 min read',
    category: 'Technology',
    featured: false,
    image: '/images/blog/blog-openai-security.png',
  },
  // August 2025
  {
    slug: 'ai-phishing-detection-evasion',
    title: 'How Attackers Use AI to Evade Phishing Detection',
    excerpt: 'AI-generated phishing emails are defeating traditional filters. Here\'s what security teams need to know.',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'August 25, 2025',
    readTime: '12 min read',
    category: 'Security Best Practices',
    featured: false,
    image: '/images/blog/blog-ai-phishing.png',
  },
  {
    slug: 'financial-services-ai-regulations',
    title: 'Financial Services AI Regulations: SEC, OCC, and State Requirements',
    excerpt: 'A comprehensive overview of AI regulatory requirements for banks, investment firms, and fintechs.',
    author: 'Rachel Thompson',
    authorRole: 'Guest Contributor',
    date: 'August 20, 2025',
    readTime: '16 min read',
    category: 'Compliance',
    featured: false,
    image: '/images/blog/blog-financial-regulations.png',
  },
  {
    slug: 'multi-tenant-ai-gateway-design',
    title: 'Multi-Tenant AI Gateway Design for SaaS Providers',
    excerpt: 'How to build AI security controls that scale across thousands of tenants without breaking the bank.',
    author: 'David Kim',
    authorRole: 'Solutions Architect',
    date: 'August 15, 2025',
    readTime: '14 min read',
    category: 'Architecture',
    featured: false,
    image: '/images/blog/blog-multi-tenant.png',
  },
  {
    slug: 'cursor-ide-security-configuration',
    title: 'Securing Cursor IDE: A DevSecOps Guide',
    excerpt: 'Cursor is gaining popularity fast. Here\'s how to configure it securely for your development team.',
    author: 'Emily Watson',
    authorRole: 'DevSecOps Engineer',
    date: 'August 10, 2025',
    readTime: '9 min read',
    category: 'DevSecOps',
    featured: false,
    image: '/images/blog/blog-cursor-security.png',
  },
  {
    slug: 'ai-third-party-risk-management',
    title: 'Third-Party AI Risk: Assessing Your Vendors\' AI Usage',
    excerpt: 'Your vendors are using AI too. Here\'s how to assess and manage the downstream risks.',
    author: 'Michael Rodriguez',
    authorRole: 'Compliance Director',
    date: 'August 5, 2025',
    readTime: '11 min read',
    category: 'Governance',
    featured: false,
    image: '/images/blog/blog-third-party-risk.png',
  },
  // July 2025
  {
    slug: 'anthropic-claude-enterprise-security',
    title: 'Anthropic Claude Enterprise Security Features Reviewed',
    excerpt: 'We tested Claude\'s enterprise security controls against our standard assessment framework.',
    author: 'James Park',
    authorRole: 'Security Researcher',
    date: 'July 28, 2025',
    readTime: '13 min read',
    category: 'Technology',
    featured: false,
    image: '/images/blog/blog-claude-enterprise.png',
  },
  {
    slug: 'ai-red-team-exercises',
    title: 'Running AI Red Team Exercises: A Practical Guide',
    excerpt: 'How to test your AI defenses before the attackers do. Includes exercise scenarios and scoring rubrics.',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'July 22, 2025',
    readTime: '15 min read',
    category: 'Security Best Practices',
    featured: false,
    image: '/images/blog/blog-ai-red-team.png',
  },
  {
    slug: 'state-privacy-laws-ai-implications',
    title: 'State Privacy Laws and AI: California, Virginia, Colorado, and Beyond',
    excerpt: 'US states are increasingly regulating AI. Here\'s a state-by-state breakdown of what applies to you.',
    author: 'Michael Rodriguez',
    authorRole: 'Compliance Director',
    date: 'July 15, 2025',
    readTime: '18 min read',
    category: 'Compliance',
    featured: false,
    image: '/images/blog/blog-state-privacy.png',
  },
  {
    slug: 'edge-ai-security-considerations',
    title: 'Edge AI Security: When the Model Runs on Device',
    excerpt: 'On-device AI models present unique security challenges. Here\'s how to address them.',
    author: 'David Kim',
    authorRole: 'Solutions Architect',
    date: 'July 10, 2025',
    readTime: '12 min read',
    category: 'Architecture',
    featured: false,
    image: '/images/blog/blog-edge-ai.png',
  },
  {
    slug: 'aws-bedrock-security-guide',
    title: 'AWS Bedrock Security: IAM, VPC, and Logging Best Practices',
    excerpt: 'A deep dive into securing Amazon Bedrock deployments with proper AWS configurations.',
    author: 'Marcus Chen',
    authorRole: 'Senior DevOps Engineer',
    date: 'July 5, 2025',
    readTime: '14 min read',
    category: 'DevSecOps',
    featured: false,
    image: '/images/blog/blog-bedrock-security.png',
  },
];

const categories = ['All', 'Security Best Practices', 'Compliance', 'Architecture', 'DevSecOps', 'Governance', 'Technology'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(p => p.category === activeCategory);
  
  const featuredPosts = filteredPosts.filter(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  return (
    <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
      <Navigation />

      {/* Header */}
      <section style={{
        padding: '100px 20px 60px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 900,
            marginBottom: '1rem',
            color: '#1a1a1a'
          }}>
            AI Security Insights
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            lineHeight: 1.7
          }}>
            Expert articles on protecting your organization in the age of AI. 
            Stay ahead of threats with actionable security strategies.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{
        padding: '0 20px 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                border: 'none',
                background: activeCategory === cat 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : '#f1f3f5',
                color: activeCategory === cat ? 'white' : '#666',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
              {activeCategory !== 'All' && cat === activeCategory && (
                <span style={{ marginLeft: '8px', opacity: 0.8 }}>
                  ({filteredPosts.length})
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Posts - Only show when "All" is selected */}
      {activeCategory === 'All' && featuredPosts.length > 0 && (
        <section style={{
          padding: '0 20px 60px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            color: '#1a1a1a'
          }}>
            Featured Articles
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
            gap: '2rem'
          }}>
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block'
                }}
              >
                <article style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  {post.image && (
                    <div style={{
                      height: '200px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <img 
                        src={post.image} 
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0.9
                        }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '2.5rem' }}>
                    <span style={{
                      display: 'inline-block',
                      background: 'rgba(255,255,255,0.2)',
                      padding: '6px 14px',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'white',
                      marginBottom: '1rem'
                    }}>
                      {post.category}
                    </span>
                    <h3 style={{
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: 'white',
                      marginBottom: '1rem',
                      lineHeight: 1.3
                    }}>
                      {post.title}
                    </h3>
                    <p style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem'
                    }}>
                      {post.excerpt}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.9rem'
                    }}>
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section style={{
        padding: '0 20px 100px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#1a1a1a'
        }}>
          {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
          {activeCategory !== 'All' && (
            <span style={{ fontWeight: 400, color: '#888', marginLeft: '0.5rem' }}>
              ({filteredPosts.length} articles)
            </span>
          )}
        </h2>
        
        {regularPosts.length === 0 && activeCategory !== 'All' ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#666'
          }}>
            <p>No articles found in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              style={{
                marginTop: '1rem',
                padding: '10px 20px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              View All Articles
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {(activeCategory === 'All' ? regularPosts : filteredPosts).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block'
                }}
              >
                <article style={{
                  background: 'white',
                  borderRadius: '20px',
                  border: '1px solid #e9ecef',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  {post.image && (
                    <div style={{
                      height: '160px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <img 
                        src={post.image} 
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '2rem' }}>
                    <span style={{
                      display: 'inline-block',
                      background: 'rgba(102, 126, 234, 0.1)',
                      padding: '6px 14px',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#667eea',
                      marginBottom: '1rem'
                    }}>
                      {post.category}
                    </span>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      marginBottom: '0.75rem',
                      lineHeight: 1.3
                    }}>
                      {post.title}
                    </h3>
                    <p style={{
                      color: '#666',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem'
                    }}>
                      {post.excerpt}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#888',
                      fontSize: '0.85rem'
                    }}>
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <NewsletterSubscribe />
    </main>
  );
}

// Newsletter Subscribe Component
function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL || 
        'https://jaqw7kgt6f.execute-api.us-east-1.amazonaws.com/prod/subscribe';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          source: 'blog',
          timestamp: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <section style={{
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'white',
          marginBottom: '1rem'
        }}>
          Stay Ahead of AI Security Threats
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.1rem',
          marginBottom: '2rem',
          lineHeight: 1.7
        }}>
          Get weekly insights on AI security, compliance updates, and best practices 
          delivered to your inbox.
        </p>
        
        {status === 'success' ? (
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
            <p style={{ color: 'white', fontWeight: 600 }}>{message}</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Check your inbox for a welcome email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'flex',
              gap: '1rem',
              maxWidth: '450px',
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === 'loading'}
                style={{
                  flex: '1',
                  minWidth: '250px',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: status === 'error' ? '2px solid #ff6b6b' : 'none',
                  fontSize: '1rem',
                  outline: 'none',
                  opacity: status === 'loading' ? 0.7 : 1
                }}
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                style={{
                  padding: '16px 32px',
                  background: 'white',
                  color: '#667eea',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  transition: 'transform 0.2s ease',
                  opacity: status === 'loading' ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (status !== 'loading') e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            
            {status === 'error' && (
              <p style={{
                color: '#ffcccb',
                fontSize: '0.9rem',
                marginTop: '0.75rem'
              }}>
                {message}
              </p>
            )}
          </form>
        )}
        
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.85rem',
          marginTop: '1rem'
        }}>
          No spam. Unsubscribe anytime.
        </p>
        
        {/* RSS/Atom Feed Links */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <a 
            href="/feed.xml" 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"/>
            </svg>
            RSS Feed
          </a>
          <a 
            href="/atom.xml" 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"/>
            </svg>
            Atom Feed
          </a>
          <a 
            href="/feed.json" 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m3.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7 15v2h2v-2H7m4 0v2h6v-2h-6m0-4v2h6v-2h-6Z"/>
            </svg>
            JSON Feed
          </a>
        </div>
      </div>
    </section>
  );
}
