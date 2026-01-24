'use client';

import { useState } from 'react';
import { Navigation } from '../../components/Navigation';
import Link from 'next/link';

interface Whitepaper {
  title: string;
  subtitle: string;
  hook: string;
  previewSections: { title: string; content: string }[];
  lockedSections: number;
  readTime: string;
}

interface WhitepaperClientProps {
  slug: string;
  whitepaper: Whitepaper | null;
}

export default function WhitepaperClient({ slug, whitepaper }: WhitepaperClientProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!whitepaper) {
    return (
      <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
        <Navigation />
        <div style={{ padding: '200px 20px', textAlign: 'center' }}>
          <h1>Whitepaper not found</h1>
          <Link href="/resources" style={{ color: '#667eea' }}>← Back to Resources</Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In production, this would submit to your lead capture API
      // For now, we'll simulate success and unlock the content
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Track the lead capture
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'whitepaper_download', {
          whitepaper_slug: slug,
          whitepaper_title: whitepaper.title
        });
      }

      setUnlocked(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
      <Navigation />

      {/* Header */}
      <section style={{
        padding: '100px 20px 40px',
        background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link href="/resources" style={{
            color: '#667eea',
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}>
            ← Back to Resources
          </Link>

          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            padding: '8px 20px',
            borderRadius: '50px',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#667eea',
            marginBottom: '1.5rem'
          }}>
            Whitepaper • {whitepaper.readTime}
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 900,
            marginBottom: '1rem',
            color: '#1a1a1a',
            lineHeight: 1.2
          }}>
            {whitepaper.title}
          </h1>

          <p style={{
            fontSize: '1.3rem',
            color: '#667eea',
            fontWeight: 500,
            marginBottom: '1.5rem'
          }}>
            {whitepaper.subtitle}
          </p>

          <blockquote style={{
            fontSize: '1.1rem',
            color: '#666',
            fontStyle: 'italic',
            borderLeft: '4px solid #667eea',
            paddingLeft: '1.5rem',
            margin: '2rem 0'
          }}>
            &quot;{whitepaper.hook}&quot;
          </blockquote>
        </div>
      </section>

      {/* Content */}
      <section style={{
        padding: '40px 20px 100px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Preview Sections */}
        {whitepaper.previewSections.map((section, i) => (
          <div key={i} style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#1a1a1a'
            }}>
              {section.title}
            </h2>
            <div style={{
              fontSize: '1.05rem',
              color: '#444',
              lineHeight: 1.8,
              whiteSpace: 'pre-line'
            }}>
              {section.content}
            </div>
          </div>
        ))}

        {/* Gate */}
        {!unlocked ? (
          <div style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #f8f9fa 30%)',
            padding: '4rem 2rem 3rem',
            borderRadius: '24px',
            textAlign: 'center',
            position: 'relative',
            marginTop: '-2rem'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(248,249,250,1) 100%)',
              pointerEvents: 'none'
            }} />

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2.5rem',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              maxWidth: '450px',
              margin: '0 auto'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '1.5rem'
              }}>
                🔒
              </div>

              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                color: '#1a1a1a'
              }}>
                Unlock the Full Report
              </h3>

              <p style={{
                color: '#666',
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
              }}>
                {whitepaper.lockedSections} more sections including implementation guides and templates.
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    marginBottom: '0.75rem',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    marginBottom: '0.75rem',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    marginBottom: '1rem',
                    fontSize: '1rem'
                  }}
                />

                {error && (
                  <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: loading ? 'wait' : 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Unlocking...' : 'Get Free Access →'}
                </button>
              </form>

              <p style={{
                color: '#888',
                fontSize: '0.8rem',
                marginTop: '1rem'
              }}>
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        ) : (
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #86efac',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ color: '#166534', marginBottom: '0.5rem' }}>
              Content Unlocked!
            </h3>
            <p style={{ color: '#166534', marginBottom: '1.5rem' }}>
              Check your email for the full PDF, or continue reading below.
            </p>
            <Link
              href={`/resources/${slug}.pdf`}
              style={{
                display: 'inline-block',
                background: '#166534',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Download PDF →
            </Link>
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: '4rem',
          padding: '2.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to Take Action?
          </h3>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>
            Deploy ZeroShare Gateway and start protecting your AI traffic today.
          </p>
          <Link
            href="/contact-us"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#667eea',
              padding: '14px 32px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 700
            }}
          >
            Get Started Free →
          </Link>
        </div>
      </section>
    </main>
  );
}
