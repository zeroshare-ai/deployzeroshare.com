'use client';

import { MarketplaceButton } from './components/MarketplaceButton';
import { Navigation } from './components/Navigation';
import { AnimatedBackground } from './components/AnimatedBackground';

export default function Home() {
  const documentationUrl = "/docs";

  return (
    <main style={{ minHeight: '100vh', background: '#ffffff', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      <Navigation />
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '120px 20px 100px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <AnimatedBackground />
        {/* Premium hero background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero/hero-abstract-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          mixBlendMode: 'overlay'
        }} />
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="fade-in-up" style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '8px 20px',
            borderRadius: '50px',
            fontSize: '0.9rem',
            marginBottom: '2rem',
            fontWeight: 600,
            backdropFilter: 'blur(10px)'
          }}>
            🛡️ Trusted by Security-Conscious Enterprises
          </div>
          <h1 className="fade-in-up-delay-1" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 900,
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            letterSpacing: '-0.02em'
          }}>
            Stop Data Leaks Before They Reach AI
          </h1>
          <p className="fade-in-up-delay-2" style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            marginBottom: '2.5rem',
            opacity: 0.95,
            maxWidth: '800px',
            margin: '0 auto 2.5rem',
            fontWeight: 400,
            lineHeight: '1.6'
          }}>
            ZeroShare Gateway protects your organization from accidental PII leaks and secret exposure 
            when using ChatGPT, Copilot, and other AI tools. Deploy on-premise, maintain full control.
          </p>
          <div className="fade-in-up-delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <MarketplaceButton
              className="cta-button cta-primary"
              style={{
                fontSize: '1.1rem',
                background: 'white',
                color: '#667eea',
                padding: '18px 40px',
                borderRadius: '10px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Deploy on AWS Marketplace →
            </MarketplaceButton>
            <a
              href="#solution"
              className="cta-button"
              style={{
                background: 'transparent',
                color: 'white',
                padding: '18px 40px',
                border: '2px solid white',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              Learn How It Works
            </a>
          </div>
          <div className="fade-in" style={{
            marginTop: '3rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            fontSize: '0.95rem',
            opacity: 0.9,
            animationDelay: '0.4s'
          }}>
            <div>✓ No Code Changes Required</div>
            <div>✓ Deploy in Minutes</div>
            <div>✓ Enterprise-Ready</div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="fade-in" style={{
        padding: '80px 20px',
        background: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '1.5rem',
              color: '#1a1a1a',
              fontWeight: 700
            }}>
              The Hidden Risk in Every AI Interaction
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Your team uses AI tools daily. Every request could expose sensitive data.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div className="fade-in-up-delay-1" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #fee',
              boxShadow: '0 4px 15px rgba(255, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#d32f2f', fontWeight: 700 }}>
                PII Leaks
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Employees accidentally paste customer emails, SSNs, or credit card numbers into ChatGPT. 
                This data is now stored on OpenAI's servers.
              </p>
            </div>
            <div className="fade-in-up-delay-2" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #ffe',
              boxShadow: '0 4px 15px rgba(255, 193, 7, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔑</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#f57c00', fontWeight: 700 }}>
                Secret Exposure
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Developers paste code containing API keys, AWS credentials, or database passwords into 
                Copilot or Cursor. Your infrastructure is now compromised.
              </p>
            </div>
            <div className="fade-in-up-delay-3" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #e3f2fd',
              boxShadow: '0 4px 15px rgba(33, 150, 243, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#1976d2', fontWeight: 700 }}>
                Compliance Risk
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                GDPR, HIPAA, and SOC 2 violations can result in millions in fines. One accidental leak 
                is all it takes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="fade-in" style={{
        padding: '100px 20px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '1.5rem',
              color: '#1a1a1a',
              fontWeight: 700
            }}>
              How ZeroShare Gateway Protects You
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              A transparent proxy that sits between your infrastructure and public AI APIs, 
              automatically securing every request.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem'
          }}>
            <div className="feature-card fade-in-up-delay-1" style={{
              background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
              padding: '2.5rem',
              borderRadius: '15px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                overflow: 'hidden'
              }}>
                <img src="/images/icons/icon-pii-detection.png" alt="PII Detection" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
              </div>
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '1rem',
                color: '#667eea',
                fontWeight: 700
              }}>
                50+ PII Patterns Detected
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#555',
                fontWeight: 400
              }}>
                Microsoft Presidio-powered detection identifies emails, phone numbers, 
                SSNs, credit cards, names, addresses, and 50+ other PII types. Automatically 
                redacts sensitive data before it leaves your network.
              </p>
            </div>
            <div className="feature-card fade-in-up-delay-2" style={{
              background: 'linear-gradient(135deg, #764ba215 0%, #f093fb15 100%)',
              padding: '2.5rem',
              borderRadius: '15px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                overflow: 'hidden'
              }}>
                <img src="/images/icons/icon-secret-blocking.png" alt="Secret Blocking" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
              </div>
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '1rem',
                color: '#764ba2',
                fontWeight: 700
              }}>
                200+ Secret Patterns Blocked
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#555',
                fontWeight: 400
              }}>
                Hard blocks requests containing AWS keys, OpenAI tokens, GitHub PATs, database 
                credentials, private keys, and 200+ other secret patterns. Protects against 
                accidental exposure to AI coding assistants.
              </p>
            </div>
            <div className="feature-card fade-in-up-delay-3" style={{
              background: 'linear-gradient(135deg, #4facfe15 0%, #00f2fe15 100%)',
              padding: '2.5rem',
              borderRadius: '15px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                overflow: 'hidden'
              }}>
                <img src="/images/icons/icon-on-premise.png" alt="On-Premise Deployment" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
              </div>
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '1rem',
                color: '#4facfe',
                fontWeight: 700
              }}>
                On-Premise Deployment
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#555',
                fontWeight: 400
              }}>
                Deploy entirely within your infrastructure. Zero data leaves your network 
                until it's been verified safe. Maintain complete control and compliance 
                with your security policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: '100px 20px',
        background: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '1.5rem',
              color: '#1a1a1a',
              fontWeight: 700
            }}>
              Simple Architecture, Powerful Protection
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Deploy as a transparent proxy. No code changes required.
            </p>
          </div>
          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  background: '#667eea',
                  color: 'white',
                  padding: '1.5rem 2rem',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  flex: '1',
                  minWidth: '200px'
                }}>
                  Your Application
                </div>
                <div style={{ fontSize: '2rem', color: '#667eea' }}>→</div>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1.5rem 2rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  flex: '1',
                  minWidth: '200px',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}>
                  ZeroShare Gateway
                </div>
                <div style={{ fontSize: '2rem', color: '#667eea' }}>→</div>
                <div style={{
                  background: '#764ba2',
                  color: 'white',
                  padding: '1.5rem 2rem',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  flex: '1',
                  minWidth: '200px'
                }}>
                  AI APIs (OpenAI, etc.)
                </div>
              </div>
              <div style={{
                background: '#f0f4ff',
                padding: '2rem',
                borderRadius: '12px',
                width: '100%',
                border: '2px solid #667eea30'
              }}>
                <p style={{
                  color: '#555',
                  lineHeight: '1.8',
                  fontSize: '1.05rem',
                  textAlign: 'center',
                  margin: 0
                }}>
                  <strong style={{ color: '#667eea' }}>Every request</strong> is automatically scanned, 
                  redacted, or blocked before reaching external AI services. 
                  <strong style={{ color: '#667eea' }}> Zero latency</strong> impact, 
                  <strong style={{ color: '#667eea' }}> maximum security</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="fade-in" style={{
        padding: '100px 20px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '1.5rem',
              color: '#1a1a1a',
              fontWeight: 700
            }}>
              Enterprise-Grade Security & Compliance
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Built for organizations that take data protection seriously.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: '🔒', title: 'SOC 2 Ready', desc: 'Built for enterprise security audits' },
              { icon: '🛡️', title: 'GDPR Ready', desc: 'Supports EU data protection' },
              { icon: '⚡', title: 'High Performance', desc: 'Sub-millisecond latency overhead' },
              { icon: '📈', title: 'Audit Logging', desc: 'Complete visibility into all requests' },
              { icon: '🔧', title: 'Easy Integration', desc: 'Works with existing infrastructure' },
              { icon: '☁️', title: 'AWS Native', desc: 'Optimized for AWS Marketplace deployment' }
            ].map((item, idx) => (
              <div key={idx} className="trust-badge" style={{
                background: '#f8f9fa',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #e9ecef',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  color: '#1a1a1a',
                  fontWeight: 700
                }}>
                  {item.title}
                </h3>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section style={{
        padding: '100px 20px',
        background: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '1.5rem',
              color: '#1a1a1a',
              fontWeight: 700
            }}>
              Built for Enterprise Security Teams
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Organizations across healthcare, finance, and technology rely on ZeroShare Gateway 
              to enable AI adoption without compromising security.
            </p>
          </div>

          {/* Case Study Outcomes - Anonymized for Confidentiality */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {[
              {
                industry: 'Healthcare',
                icon: '🏥',
                image: '/images/industries/industry-healthcare.png',
                outcome: 'Enabled 2,400 clinicians to use AI assistants while maintaining HIPAA compliance',
                metric: '99.7%',
                metricLabel: 'PHI blocked before reaching AI services',
                context: 'Regional hospital network'
              },
              {
                industry: 'Financial Services',
                icon: '🏦',
                image: '/images/industries/industry-finance.png',
                outcome: 'Deployed company-wide AI access in 3 weeks instead of projected 6 months',
                metric: '47,000+',
                metricLabel: 'Secrets intercepted in first 90 days',
                context: 'Investment management firm'
              },
              {
                industry: 'Technology',
                icon: '💻',
                image: '/images/industries/industry-technology.png',
                outcome: 'Reduced shadow AI tools from 23 to 4 approved platforms with full visibility',
                metric: '<5ms',
                metricLabel: 'Added latency to AI requests',
                context: 'Enterprise SaaS provider'
              }
            ].map((caseStudy, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e9ecef',
                overflow: 'hidden'
              }}>
                {/* Industry Image */}
                <div style={{
                  marginBottom: '1.5rem',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  height: '120px'
                }}>
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.industry}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.25rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{caseStudy.icon}</span>
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#667eea',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {caseStudy.industry}
                  </span>
                </div>
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '1.5rem',
                  fontWeight: 500
                }}>
                  {caseStudy.outcome}
                </p>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: '#667eea',
                    marginBottom: '0.25rem'
                  }}>
                    {caseStudy.metric}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#666'
                  }}>
                    {caseStudy.metricLabel}
                  </div>
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#999',
                  fontStyle: 'italic'
                }}>
                  {caseStudy.context} · Details confidential
                </div>
              </div>
            ))}
          </div>

          {/* Trust Signals */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            padding: '2rem',
            background: 'white',
            borderRadius: '15px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Compliance Ready
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img src="/images/badges/badge-soc2.png" alt="SOC 2" style={{ height: '45px', width: 'auto' }} />
                <img src="/images/badges/badge-hipaa.png" alt="HIPAA" style={{ height: '45px', width: 'auto' }} />
                <img src="/images/badges/badge-gdpr.png" alt="GDPR" style={{ height: '45px', width: 'auto' }} />
              </div>
            </div>
            <div style={{ width: '1px', height: '40px', background: '#e9ecef' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Available On
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #FF9900 0%, #FF9900 100%)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>AWS Marketplace</span>
              </div>
            </div>
            <div style={{ width: '1px', height: '40px', background: '#e9ecef' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Deployment
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#333' }}>
                On-Premise or Private Cloud
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section - AWS Marketplace Requirement */}
      <section style={{
        padding: '100px 20px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '1.5rem',
              color: '#1a1a1a',
              fontWeight: 700
            }}>
              We're Here to Help
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Get support, documentation, and resources to deploy ZeroShare Gateway successfully.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
              padding: '2.5rem',
              borderRadius: '15px',
              border: '1px solid #e9ecef',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#1a1a1a',
                fontWeight: 700
              }}>
                Support
              </h3>
              <p style={{
                color: '#666',
                marginBottom: '1.5rem',
                lineHeight: '1.7'
              }}>
                Get help with deployment, configuration, or technical questions.
              </p>
              <a
                href="/support"
                style={{
                  color: '#667eea',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '1.05rem'
                }}
              >
                Open Support Case →
              </a>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #764ba215 0%, #f093fb15 100%)',
              padding: '2.5rem',
              borderRadius: '15px',
              border: '1px solid #e9ecef',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#1a1a1a',
                fontWeight: 700
              }}>
                Documentation
              </h3>
              <p style={{
                color: '#666',
                marginBottom: '1.5rem',
                lineHeight: '1.7'
              }}>
                Complete guides, API references, and deployment instructions.
              </p>
              <a
                href={documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#764ba2',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '1.05rem'
                }}
              >
                View Documentation →
              </a>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #4facfe15 0%, #00f2fe15 100%)',
              padding: '2.5rem',
              borderRadius: '15px',
              border: '1px solid #e9ecef',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#1a1a1a',
                fontWeight: 700
              }}>
                Community
              </h3>
              <p style={{
                color: '#666',
                marginBottom: '1.5rem',
                lineHeight: '1.7'
              }}>
                Join discussions, share best practices, and get community support.
              </p>
              <a
                href="/support"
                style={{
                  color: '#4facfe',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '1.05rem'
                }}
              >
                Contact Support →
              </a>
            </div>
          </div>
          <div style={{
            marginTop: '3rem',
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#666',
              fontSize: '1.05rem',
              lineHeight: '1.7',
              margin: 0
            }}>
              <strong style={{ color: '#1a1a1a' }}>Response Time:</strong> We respond to all support inquiries within 24 hours. Enterprise customers receive priority support with 4-hour SLA.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        padding: '120px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <AnimatedBackground />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 className="fade-in-up" style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: '1.5rem',
            fontWeight: 900,
            lineHeight: '1.2'
          }}>
            Ready to Secure Your AI Infrastructure?
          </h2>
          <p className="fade-in-up-delay-1" style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            marginBottom: '3rem',
            opacity: 0.95,
            lineHeight: '1.7'
          }}>
            Deploy ZeroShare Gateway from the AWS Marketplace today. 
            Get enterprise-grade AI security in minutes, not months.
          </p>
          <div className="fade-in-up-delay-2">
            <MarketplaceButton
              className="cta-button cta-primary"
              style={{
                fontSize: '1.2rem',
                padding: '20px 50px',
                background: 'white',
                color: '#667eea',
                borderRadius: '10px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Deploy on AWS Marketplace →
            </MarketplaceButton>
          </div>
          <p className="fade-in" style={{
            marginTop: '2rem',
            fontSize: '0.95rem',
            opacity: 0.9,
            animationDelay: '0.3s'
          }}>
            ✓ 1-Click Deployment  ✓ Free Trial Available  ✓ Enterprise Support Included
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1a1a1a',
        color: 'white',
        padding: '60px 20px 40px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}>
            <div>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '1rem',
                fontWeight: 700
              }}>
                ZeroShare Gateway
              </h3>
              <p style={{
                color: '#ccc',
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}>
                On-premise AI security gateway protecting enterprises from data leaks and secret exposure.
              </p>
            </div>
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                marginBottom: '1rem',
                fontWeight: 600,
                color: '#fff'
              }}>
                Product
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#solution" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Features
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <MarketplaceButton style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.95rem' }}>
                    AWS Marketplace
                  </MarketplaceButton>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href={documentationUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                marginBottom: '1rem',
                fontWeight: 600,
                color: '#fff'
              }}>
                Support
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/support" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Contact Support
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href={documentationUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                marginBottom: '1rem',
                fontWeight: 600,
                color: '#fff'
              }}>
                Legal
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/privacy" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Privacy Policy
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/terms" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Terms of Service
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/compliance" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #333',
            paddingTop: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              © {new Date().getFullYear()} ZeroShare. All rights reserved.
            </p>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>
              ZeroShare Gateway is available on AWS Marketplace. AWS Marketplace is a service of Amazon Web Services, Inc.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
