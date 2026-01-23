'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { trackDemoRequest, trackFormStart } from '../components/Analytics';

export default function ContactSalesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formStarted, setFormStarted] = useState(false);
  
  // UTM parameters captured on client-side to avoid SSR issues with static export
  const [utmParams, setUtmParams] = useState({
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmContent: '',
    source: ''
  });
  
  // Capture UTM parameters on client-side after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setUtmParams({
        utmSource: params.get('utm_source') || '',
        utmMedium: params.get('utm_medium') || '',
        utmCampaign: params.get('utm_campaign') || '',
        utmContent: params.get('utm_content') || '',
        source: params.get('source') || ''
      });
    }
  }, []);

  const { utmSource, utmMedium, utmCampaign, utmContent, source } = utmParams;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Track form start on first interaction
    if (!formStarted) {
      trackFormStart('contact_sales');
      setFormStarted(true);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTeamSize = (size: string) => {
    if (!formStarted) {
      trackFormStart('contact_sales');
      setFormStarted(true);
    }
    setFormData({ ...formData, teamSize: size });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_SUPPORT_API_URL || 
        'https://obkptu26ug.execute-api.us-east-1.amazonaws.com/prod/support';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: `[SALES LEAD] ${formData.company || formData.name} - ${formData.teamSize} team`,
          priority: 'high',
          timestamp: new Date().toISOString(),
          // Include attribution data for tracking
          attribution: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_content: utmContent,
            source: source,
            referrer: typeof document !== 'undefined' ? document.referrer : '',
          },
        }),
      });

      if (!response.ok) throw new Error('Failed');
      
      // Track successful conversion for LinkedIn and GA
      trackDemoRequest(formData.teamSize, formData.company);
      
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const teamSizes = [
    { id: '1-10', label: '1-10', desc: 'Startup' },
    { id: '11-50', label: '11-50', desc: 'Growing' },
    { id: '51-200', label: '51-200', desc: 'Mid-size' },
    { id: '200+', label: '200+', desc: 'Enterprise' },
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
      <Navigation />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
        minHeight: 'calc(100vh - 70px)'
      }}>
        {/* Left Side - Value Proposition */}
        <section style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: 'clamp(3rem, 8vw, 6rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Hero illustration */}
          <div style={{
            position: 'absolute',
            bottom: '-50px',
            right: '-50px',
            width: '400px',
            height: '300px',
            opacity: 0.15,
            pointerEvents: 'none'
          }}>
            <img 
              src="/contact-hero.png" 
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{ maxWidth: '500px', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.15)',
              padding: '8px 16px',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '2rem'
            }}>
              🚀 Start protecting your AI data today
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              marginBottom: '1.5rem',
              lineHeight: 1.2
            }}>
              Let's Talk About Your AI Security Needs
            </h1>
            
            <p style={{
              fontSize: '1.15rem',
              opacity: 0.95,
              lineHeight: 1.7,
              marginBottom: '3rem'
            }}>
              Get a personalized demo and see how ZeroShare Gateway can protect your organization 
              from AI data leaks. No commitment required.
            </p>

            {/* Benefits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '⚡', text: 'Deploy in under 15 minutes' },
                { icon: '🔒', text: 'Block 100% of PII and secrets' },
                { icon: '📊', text: 'Full visibility with audit logs' },
                { icon: '🏢', text: 'Enterprise-grade compliance' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '1.05rem'
                }}>
                  <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.2)'
            }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>
                Trusted by security teams at
              </p>
              <div style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                opacity: 0.7,
                fontSize: '0.9rem',
                fontWeight: 600
              }}>
                <span>Fortune 500</span>
                <span>Healthcare</span>
                <span>Financial Services</span>
                <span>Government</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side - Form */}
        <section style={{
          padding: 'clamp(2rem, 5vw, 4rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafbfc'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '480px'
          }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2.5rem',
                  color: 'white'
                }}>✓</div>
                <h2 style={{
                  fontSize: '1.8rem',
                  marginBottom: '1rem',
                  color: '#1a1a1a',
                  fontWeight: 700
                }}>
                  Thanks for reaching out!
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  marginBottom: '2rem',
                  lineHeight: 1.7
                }}>
                  A member of our team will be in touch within 24 hours to schedule your personalized demo.
                </p>
                <a
                  href="/"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '14px 32px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  Back to Home
                </a>
              </div>
            ) : (
              <>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: '#1a1a1a'
                }}>
                  Get Your Free Demo
                </h2>
                <p style={{
                  color: '#666',
                  marginBottom: '2rem',
                  fontSize: '0.95rem'
                }}>
                  Fill out the form and we'll reach out to schedule a call.
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Team Size Selection */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.75rem',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      fontSize: '0.9rem'
                    }}>
                      Team Size
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '0.75rem'
                    }}>
                      {teamSizes.map((size) => (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => handleTeamSize(size.id)}
                          style={{
                            padding: '1rem 0.5rem',
                            borderRadius: '12px',
                            border: formData.teamSize === size.id 
                              ? '2px solid #667eea' 
                              : '2px solid #e5e7eb',
                            background: formData.teamSize === size.id 
                              ? 'rgba(102, 126, 234, 0.08)' 
                              : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: formData.teamSize === size.id ? '#667eea' : '#1a1a1a'
                          }}>
                            {size.label}
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#888',
                            marginTop: '2px'
                          }}>
                            {size.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 600,
                        color: '#1a1a1a',
                        fontSize: '0.9rem'
                      }}>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Jane Doe"
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 600,
                        color: '#1a1a1a',
                        fontSize: '0.9rem'
                      }}>Work Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@company.com"
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      fontSize: '0.9rem'
                    }}>Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder="Acme Inc."
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      fontSize: '0.9rem'
                    }}>
                      What are you looking to solve? <span style={{ color: '#999', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your AI security challenges..."
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                        resize: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  {status === 'error' && (
                    <div style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      padding: '1rem',
                      borderRadius: '12px',
                      marginBottom: '1.5rem',
                      fontSize: '0.9rem'
                    }}>
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '18px',
                      borderRadius: '14px',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      opacity: status === 'submitting' ? 0.7 : 1,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      if (status !== 'submitting') {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Get My Free Demo →'}
                  </button>

                  <p style={{
                    marginTop: '1rem',
                    fontSize: '0.8rem',
                    color: '#999',
                    textAlign: 'center'
                  }}>
                    No credit card required • 15-minute setup
                  </p>
                </form>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
