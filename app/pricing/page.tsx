'use client';

import { Navigation } from '../components/Navigation';
import { MarketplaceButton } from '../components/MarketplaceButton';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: 'Startup',
      description: 'Perfect for small teams getting started with AI security',
      price: 'Free',
      priceDetail: 'for up to 5 users',
      features: [
        'Up to 5 users',
        'Basic PII detection',
        'Email support',
        'Community access',
        '1,000 requests/day',
      ],
      cta: 'Get Started Free',
      ctaLink: '/contact-us',
      highlighted: false,
    },
    {
      name: 'Professional',
      description: 'For growing teams that need advanced protection',
      price: '$299',
      priceDetail: 'per month',
      features: [
        'Up to 50 users',
        'Advanced PII & secret detection',
        'Priority email support',
        'Custom rules engine',
        '50,000 requests/day',
        'Audit logging',
        'SSO integration',
      ],
      cta: 'Start Free Trial',
      ctaLink: '/contact-us',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with compliance requirements',
      price: 'Custom',
      priceDetail: 'contact us for pricing',
      features: [
        'Unlimited users',
        'Full PII, secret & custom detection',
        '24/7 phone & email support',
        'Dedicated success manager',
        'Unlimited requests',
        'Advanced audit & compliance',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment option',
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact-us',
      highlighted: false,
    },
  ];

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
            Simple, Transparent Pricing
          </div>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            marginBottom: '1.5rem',
            color: '#1a1a1a',
            lineHeight: 1.2
          }}>
            Protect Your AI Data at Any Scale
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Start free and scale as you grow. All plans include core security features 
            to keep your sensitive data safe from AI leaks.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{
        padding: '40px 20px 100px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              style={{
                background: plan.highlighted 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'white',
                borderRadius: '24px',
                padding: '2.5rem',
                boxShadow: plan.highlighted
                  ? '0 25px 60px rgba(102, 126, 234, 0.4)'
                  : '0 10px 40px rgba(0, 0, 0, 0.08)',
                border: plan.highlighted ? 'none' : '1px solid #e9ecef',
                position: 'relative',
                transform: plan.highlighted ? 'scale(1.05)' : 'none',
                color: plan.highlighted ? 'white' : '#1a1a1a'
              }}
            >
              {plan.highlighted && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#10b981',
                  color: 'white',
                  padding: '6px 20px',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}>
                  MOST POPULAR
                </div>
              )}

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                {plan.name}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                opacity: plan.highlighted ? 0.9 : 0.7,
                marginBottom: '1.5rem',
                minHeight: '44px'
              }}>
                {plan.description}
              </p>

              <div style={{ marginBottom: '2rem' }}>
                <span style={{
                  fontSize: '3rem',
                  fontWeight: 900,
                  lineHeight: 1
                }}>
                  {plan.price}
                </span>
                <span style={{
                  fontSize: '0.95rem',
                  opacity: 0.8,
                  display: 'block',
                  marginTop: '0.25rem'
                }}>
                  {plan.priceDetail}
                </span>
              </div>

              <Link
                href={plan.ctaLink}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  background: plan.highlighted 
                    ? 'white' 
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: plan.highlighted ? '#667eea' : 'white',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                {plan.cta}
              </Link>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '2rem 0 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.95rem'
                  }}>
                    <span style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: plan.highlighted 
                        ? 'rgba(255,255,255,0.2)' 
                        : 'rgba(102, 126, 234, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      color: plan.highlighted ? 'white' : '#667eea',
                      flexShrink: 0
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Teaser */}
        <div style={{
          marginTop: '5rem',
          textAlign: 'center',
          padding: '3rem',
          background: '#f8f9fa',
          borderRadius: '24px'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#1a1a1a'
          }}>
            Questions? We're Here to Help
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '2rem',
            fontSize: '1.05rem'
          }}>
            Not sure which plan is right for you? Our team can help you choose 
            the best solution for your needs.
          </p>
          <Link
            href="/contact-us"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '16px 40px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
            }}
          >
            Talk to Sales →
          </Link>
        </div>

        {/* Trust Section */}
        <div style={{
          marginTop: '4rem',
          textAlign: 'center',
          color: '#888'
        }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            All plans include
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            fontSize: '0.95rem'
          }}>
            <span>🔒 SOC 2 Compliant</span>
            <span>🛡️ GDPR Ready</span>
            <span>⚡ 99.9% Uptime SLA</span>
            <span>🔄 Cancel Anytime</span>
          </div>
        </div>
      </section>
    </main>
  );
}
