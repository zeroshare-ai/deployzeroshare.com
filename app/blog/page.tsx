'use client';

import { Navigation } from '../components/Navigation';
import Link from 'next/link';

// Blog posts with real research-backed content
// Note: Images should be generated using prompts from IMAGE_PROMPTS.md
const blogPosts = [
  {
    slug: 'prevent-pii-leaks-ai-chatbots',
    title: 'How to Prevent PII Leaks When Your Team Uses AI Chatbots',
    excerpt: 'New research shows 22% of files uploaded to AI tools contain sensitive data. Learn how to protect your organization from the growing threat of AI-enabled data leaks.',
    author: 'Sarah Chen',
    authorRole: 'Security Research Lead',
    date: 'January 20, 2026',
    readTime: '12 min read',
    category: 'Security Best Practices',
    image: '/images/blog/blog-pii-leaks.png', // Generate with IMAGE_PROMPTS.md section 5A
    featured: true,
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
    image: '/images/blog/blog-compliance.png', // Generate with IMAGE_PROMPTS.md section 5B
    featured: true,
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
    image: '/images/blog/blog-zero-trust.png', // Generate with IMAGE_PROMPTS.md section 5C
    featured: false,
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
    image: '/images/blog/blog-secrets.png', // Generate with IMAGE_PROMPTS.md section 5D
    featured: false,
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
    image: '/images/blog/blog-governance.png', // Generate with IMAGE_PROMPTS.md section 5E
    featured: false,
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
    image: '/images/blog/blog-gateway.png', // Generate with IMAGE_PROMPTS.md section 5F
    featured: false,
  },
];

const categories = ['All', 'Security Best Practices', 'Compliance', 'Architecture', 'DevSecOps', 'Governance', 'Technology'];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

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
          {categories.map((cat, i) => (
            <button
              key={cat}
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                border: 'none',
                background: i === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f1f3f5',
                color: i === 0 ? 'white' : '#666',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
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
          Latest Articles
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {regularPosts.map((post) => (
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
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
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
              placeholder="Enter your email"
              style={{
                flex: '1',
                minWidth: '250px',
                padding: '16px 20px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button style={{
              padding: '16px 32px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Subscribe
            </button>
          </div>
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
    </main>
  );
}
