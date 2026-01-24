'use client';

import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import Link from 'next/link';

const whitepapers = [
  {
    slug: 'why-blocking-chatgpt-will-get-you-fired',
    title: 'Why Blocking ChatGPT Will Get You Fired',
    subtitle: 'The CISO\'s Guide to Enabling AI Without Losing Control',
    description: 'Learn why prohibition doesn\'t work for AI, and discover the "third way" that lets you enable productivity while maintaining security.',
    category: 'Strategy',
    readTime: '12 min read',
    hot: true,
  },
  {
    slug: 'shadow-ai-report-2026',
    title: 'The Shadow AI Report 2026',
    subtitle: 'What Your Employees Are Really Doing with AI',
    description: 'Original research on shadow AI usage across 500+ enterprises. Includes benchmarks, risk frameworks, and remediation strategies.',
    category: 'Research',
    readTime: '15 min read',
    hot: true,
  },
  {
    slug: 'ai-security-board-presentation',
    title: 'The $4.45M Gamble Your Board Doesn\'t Know About',
    subtitle: 'A Board-Ready Presentation on AI Security Risk',
    description: 'Quantify AI risk in terms your board understands. Includes ROI calculator, risk framework, and copy-paste board motion.',
    category: 'Executive',
    readTime: '10 min read',
    hot: false,
  },
];

export default function ResourcesPage() {
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
            Free Resources
          </div>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            marginBottom: '1.5rem',
            color: '#1a1a1a',
            lineHeight: 1.2
          }}>
            AI Security Research & Guides
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            In-depth whitepapers, research reports, and practical guides for security leaders navigating the AI revolution.
          </p>
        </div>
      </section>

      {/* Whitepapers Grid */}
      <section style={{
        padding: '40px 20px 100px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {whitepapers.map((wp) => (
            <Link
              key={wp.slug}
              href={`/resources/${wp.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block'
              }}
            >
              <article style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e9ecef',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                height: '100%',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
              }}
              >
                {wp.hot && (
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: '#ef4444',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    HOT
                  </span>
                )}
                
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  padding: '4px 12px',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '1rem'
                }}>
                  {wp.category}
                </div>

                <h2 style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: '#1a1a1a',
                  lineHeight: 1.3
                }}>
                  {wp.title}
                </h2>

                <p style={{
                  fontSize: '0.95rem',
                  color: '#667eea',
                  marginBottom: '1rem',
                  fontWeight: 500
                }}>
                  {wp.subtitle}
                </p>

                <p style={{
                  fontSize: '0.95rem',
                  color: '#666',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem'
                }}>
                  {wp.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #e9ecef',
                  paddingTop: '1rem',
                  marginTop: 'auto'
                }}>
                  <span style={{ fontSize: '0.85rem', color: '#888' }}>
                    {wp.readTime}
                  </span>
                  <span style={{
                    color: '#667eea',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}>
                    Download Free →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: '4rem',
          textAlign: 'center',
          padding: '3rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '24px',
          color: 'white'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            Ready to Enable AI Safely?
          </h2>
          <p style={{
            opacity: 0.9,
            marginBottom: '2rem',
            fontSize: '1.05rem'
          }}>
            Deploy ZeroShare Gateway and get complete visibility into AI usage—in minutes.
          </p>
          <Link
            href="/contact-us"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#667eea',
              padding: '16px 40px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem'
            }}
          >
            Get Started Free →
          </Link>
        </div>
      </section>
    </main>
  );
}
