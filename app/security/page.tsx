'use client';

import { Navigation } from '../components/Navigation';

export default function SecurityPage() {
  // Update this date when you make security updates
  const lastUpdated = 'January 2026';
  
  return (
    <main style={{ minHeight: '100vh', background: '#ffffff', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      <Navigation />
      
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: 'white',
        padding: '80px 20px 60px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(102, 126, 234, 0.3)',
            padding: '8px 20px',
            borderRadius: '50px',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            fontWeight: 600
          }}>
            Trust Center
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            marginBottom: '1rem'
          }}>
            Security & Trust
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.95
          }}>
            Transparency about how we protect your data
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{
        padding: '40px 20px',
        background: '#f8f9fa',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem 2rem',
            borderRadius: '12px',
            border: '2px solid #667eea',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              🔄
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#1a1a1a' }}>SOC 2 Type I</div>
              <div style={{ fontSize: '0.85rem', color: '#667eea', fontWeight: 600 }}>In Progress</div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem 2rem',
            borderRadius: '12px',
            border: '2px solid #28a745',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: '#28a745',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              ✓
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#1a1a1a' }}>AWS Partner</div>
              <div style={{ fontSize: '0.85rem', color: '#28a745', fontWeight: 600 }}>Verified</div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem 2rem',
            borderRadius: '12px',
            border: '2px solid #28a745',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: '#28a745',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              🔒
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#1a1a1a' }}>GDPR Ready</div>
              <div style={{ fontSize: '0.85rem', color: '#28a745', fontWeight: 600 }}>Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{
        padding: '60px 20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        
        {/* Security Architecture */}
        <div style={{
          background: '#f8f9fa',
          padding: '3rem',
          borderRadius: '20px',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            fontWeight: 700,
            color: '#1a1a1a'
          }}>
            Security Architecture
          </h2>
          <p style={{ marginBottom: '2rem', color: '#555', lineHeight: '1.8' }}>
            ZeroShare Gateway is designed with security-first principles. Our on-premise architecture 
            means your sensitive data never leaves your infrastructure.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                icon: '🏠',
                title: 'On-Premise Deployment',
                description: 'Runs entirely within your infrastructure. No data sent to external servers.',
                status: 'active'
              },
              {
                icon: '🔐',
                title: 'Encryption',
                description: 'TLS 1.2+ for data in transit. AES-256 encryption at rest.',
                status: 'active'
              },
              {
                icon: '🚫',
                title: 'Zero Data Retention',
                description: 'We do not store, log, or retain any of your sensitive data.',
                status: 'active'
              },
              {
                icon: '👤',
                title: 'Role-Based Access',
                description: 'Granular RBAC with admin, developer, and standard user roles.',
                status: 'active'
              },
              {
                icon: '📝',
                title: 'Audit Logging',
                description: 'Comprehensive logging of all requests for compliance and forensics.',
                status: 'active'
              },
              {
                icon: '🔍',
                title: 'Vulnerability Scanning',
                description: 'Automated dependency scanning and container security checks.',
                status: 'active'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {item.title}
                  <span style={{
                    fontSize: '0.7rem',
                    background: '#d4edda',
                    color: '#155724',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    Active
                  </span>
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Protection */}
        <div style={{
          background: '#f8f9fa',
          padding: '3rem',
          borderRadius: '20px',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            fontWeight: 700,
            color: '#1a1a1a'
          }}>
            Data Protection
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #667eea'
            }}>
              <h3 style={{ color: '#667eea', marginBottom: '1rem', fontWeight: 700 }}>
                PII Detection & Redaction
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Email addresses',
                  'Phone numbers',
                  'Social Security Numbers',
                  'Credit card numbers',
                  'Names and addresses',
                  'Custom PII patterns'
                ].map((item, i) => (
                  <li key={i} style={{
                    padding: '0.5rem 0',
                    borderBottom: i < 5 ? '1px solid #f0f0f0' : 'none',
                    color: '#555',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: '#28a745' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #764ba2'
            }}>
              <h3 style={{ color: '#764ba2', marginBottom: '1rem', fontWeight: 700 }}>
                Secrets Detection & Blocking
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'AWS Access Keys',
                  'OpenAI API Keys',
                  'Private Keys & Certificates',
                  'Database Credentials',
                  'OAuth Tokens',
                  'Custom secret patterns'
                ].map((item, i) => (
                  <li key={i} style={{
                    padding: '0.5rem 0',
                    borderBottom: i < 5 ? '1px solid #f0f0f0' : 'none',
                    color: '#555',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: '#28a745' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance Progress */}
        <div style={{
          background: '#f8f9fa',
          padding: '3rem',
          borderRadius: '20px',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            fontWeight: 700,
            color: '#1a1a1a'
          }}>
            Compliance Progress
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'SOC 2 Type I', status: 'in-progress', progress: 40, note: 'Evidence collection phase' },
              { name: 'AWS Partner Verification', status: 'complete', progress: 100, note: 'Verified' },
              { name: 'GDPR', status: 'complete', progress: 100, note: 'Self-attestation complete' },
              { name: 'SOC 2 Type II', status: 'planned', progress: 0, note: 'Planned after Type I' },
              { name: 'ISO 27001', status: 'planned', progress: 0, note: 'Future roadmap' }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{item.name}</span>
                  <span style={{
                    fontSize: '0.8rem',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: item.status === 'complete' ? '#d4edda' : 
                               item.status === 'in-progress' ? '#fff3cd' : '#f8f9fa',
                    color: item.status === 'complete' ? '#155724' : 
                           item.status === 'in-progress' ? '#856404' : '#6c757d',
                    fontWeight: 600
                  }}>
                    {item.status === 'complete' ? 'Complete' : 
                     item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                  </span>
                </div>
                <div style={{
                  background: '#e9ecef',
                  borderRadius: '10px',
                  height: '8px',
                  overflow: 'hidden',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    background: item.status === 'complete' ? '#28a745' : 
                               item.status === 'in-progress' ? '#667eea' : '#dee2e6',
                    width: `${item.progress}%`,
                    height: '100%',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>{item.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure */}
        <div style={{
          background: '#f8f9fa',
          padding: '3rem',
          borderRadius: '20px',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            fontWeight: 700,
            color: '#1a1a1a'
          }}>
            Infrastructure Security
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {[
              { label: 'Deployment', value: 'On-Premise / VPC' },
              { label: 'Container Security', value: 'Docker with security scanning' },
              { label: 'Network', value: 'Private subnet, no public exposure' },
              { label: 'Secrets Management', value: 'AWS Secrets Manager / Vault' },
              { label: 'Monitoring', value: 'CloudWatch / Prometheus' },
              { label: 'Updates', value: 'Regular security patches' }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>
                  {item.label}
                </div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '3rem',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            fontWeight: 700
          }}>
            Security Questions?
          </h2>
          <p style={{ marginBottom: '1.5rem', opacity: 0.95 }}>
            Need our security questionnaire responses, penetration test results, or compliance documentation?
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/support" style={{
              background: 'white',
              color: '#667eea',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600
            }}>
              Contact Security Team
            </a>
            <a href="/compliance" style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              border: '2px solid white'
            }}>
              View Compliance Details
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          Last updated: {lastUpdated}
        </div>
      </section>
    </main>
  );
}
