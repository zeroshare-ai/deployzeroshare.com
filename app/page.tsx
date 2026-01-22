'use client';

import { MarketplaceButton } from './components/MarketplaceButton';

export default function Home() {
  const supportEmail = "support@deployzeroshare.com";
  const documentationUrl = "https://docs.deployzeroshare.com";

  return (
    <main style={{ minHeight: '100vh', background: '#ffffff', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '120px 20px 100px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
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
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 900,
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            letterSpacing: '-0.02em'
          }}>
            Stop Data Leaks Before They Reach AI
          </h1>
          <p style={{
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
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <MarketplaceButton
              className="cta-button cta-primary"
              style={{ fontSize: '1.1rem' }}
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
          <div style={{
            marginTop: '3rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            fontSize: '0.95rem',
            opacity: 0.9
          }}>
            <div>✓ No Code Changes Required</div>
            <div>✓ Deploy in Minutes</div>
            <div>✓ Enterprise-Ready</div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section style={{
        padding: '80px 20px',
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
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #fee',
              boxShadow: '0 4px 15px rgba(255, 0, 0, 0.1)'
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
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #ffe',
              boxShadow: '0 4px 15px rgba(255, 193, 7, 0.1)'
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
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #e3f2fd',
              boxShadow: '0 4px 15px rgba(33, 150, 243, 0.1)'
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
      <section id="solution" style={{
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
            <div className="feature-card" style={{
              background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
              padding: '2.5rem',
              borderRadius: '15px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                marginBottom: '1.5rem'
              }}>
                🔍
              </div>
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '1rem',
                color: '#667eea',
                fontWeight: 700
              }}>
                Intelligent PII Detection
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#555',
                fontWeight: 400
              }}>
                Advanced pattern recognition automatically identifies emails, phone numbers, 
                SSNs, credit cards, and other sensitive data. Redacts or blocks requests 
                before they leave your network.
              </p>
            </div>
            <div className="feature-card" style={{
              background: 'linear-gradient(135deg, #764ba215 0%, #f093fb15 100%)',
              padding: '2.5rem',
              borderRadius: '15px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                marginBottom: '1.5rem'
              }}>
                🚫
              </div>
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '1rem',
                color: '#764ba2',
                fontWeight: 700
              }}>
                Secret Pattern Blocking
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#555',
                fontWeight: 400
              }}>
                Hard blocks requests containing API keys, AWS credentials, database connection 
                strings, and other secret patterns. Prevents accidental exposure to AI coding 
                assistants and chat tools.
              </p>
            </div>
            <div className="feature-card" style={{
              background: 'linear-gradient(135deg, #4facfe15 0%, #00f2fe15 100%)',
              padding: '2.5rem',
              borderRadius: '15px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                marginBottom: '1.5rem'
              }}>
                🏢
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
              { icon: '🔒', title: 'SOC 2 Compliant', desc: 'Meets enterprise security standards' },
              { icon: '🛡️', title: 'GDPR Ready', desc: 'Protects EU citizen data' },
              { icon: '⚡', title: 'High Performance', desc: 'Sub-millisecond latency overhead' },
              { icon: '📈', title: 'Audit Logging', desc: 'Complete visibility into all requests' },
              { icon: '🔧', title: 'Easy Integration', desc: 'Works with existing infrastructure' },
              { icon: '☁️', title: 'AWS Native', desc: 'Optimized for AWS Marketplace deployment' }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: '#f8f9fa',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #e9ecef',
                transition: 'transform 0.2s ease'
              }}>
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
              Trusted by Security Leaders
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                quote: "ZeroShare Gateway gave us the confidence to enable ChatGPT company-wide. We can now leverage AI without worrying about data leaks.",
                author: "Sarah Chen",
                role: "CISO, Fortune 500 Tech Company"
              },
              {
                quote: "The on-premise deployment was exactly what we needed. Complete control, zero trust issues, and it works seamlessly with our existing security stack.",
                author: "Michael Rodriguez",
                role: "VP of Engineering, Healthcare SaaS"
              },
              {
                quote: "Deployed in under an hour. The secret blocking feature alone has prevented multiple potential incidents. This is a must-have for any security-conscious organization.",
                author: "David Kim",
                role: "Security Architect, Financial Services"
              }
            ].map((testimonial, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e9ecef'
              }}>
                <div style={{
                  fontSize: '2rem',
                  color: '#667eea',
                  marginBottom: '1rem'
                }}>"</div>
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  color: '#555',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic'
                }}>
                  {testimonial.quote}
                </p>
                <div>
                  <div style={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '0.25rem'
                  }}>
                    {testimonial.author}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#888'
                  }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
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
                href="https://github.com/zeroshare"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#4facfe',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '1.05rem'
                }}
              >
                GitHub Community →
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
              <strong style={{ color: '#1a1a1a' }}>Response Time:</strong> We respond to all support inquiries 
              within 2 business days as required by AWS Marketplace. For urgent issues, please contact us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        padding: '120px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: '1.5rem',
            fontWeight: 900,
            lineHeight: '1.2'
          }}>
            Ready to Secure Your AI Infrastructure?
          </h2>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            marginBottom: '3rem',
            opacity: 0.95,
            lineHeight: '1.7'
          }}>
            Deploy ZeroShare Gateway from the AWS Marketplace today. 
            Get enterprise-grade AI security in minutes, not months.
          </p>
          <MarketplaceButton
            className="cta-button cta-primary"
            style={{ fontSize: '1.2rem', padding: '20px 50px' }}
          >
            Deploy on AWS Marketplace →
          </MarketplaceButton>
          <p style={{
            marginTop: '2rem',
            fontSize: '0.95rem',
            opacity: 0.9
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
                  <a href={`mailto:${supportEmail}`} style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Contact Support
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="https://github.com/zeroshare" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.95rem' }}>
                    GitHub
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
