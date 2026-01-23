import { Navigation } from '../components/Navigation';

export default function CompliancePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#ffffff', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      <Navigation />
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px 60px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            marginBottom: '1rem'
          }}>
            Compliance & Security
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.95
          }}>
            ZeroShare Gateway is designed to help organizations meet their compliance and security requirements.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{
        padding: '60px 20px',
        maxWidth: '900px',
        margin: '0 auto',
        lineHeight: '1.8'
      }}>
        <div style={{
          background: '#f8f9fa',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            padding: '1rem 1.5rem',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: 0, color: '#856404', fontSize: '0.95rem' }}>
              <strong>Note:</strong> ZeroShare Gateway provides technical features designed to support your compliance efforts. 
              We are working toward formal certifications. Your organization remains responsible for overall compliance 
              with applicable regulations.
            </p>
          </div>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            Compliance Support
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            ZeroShare Gateway is designed with compliance requirements in mind. 
            Our on-premise architecture ensures that sensitive data remains within your control and infrastructure.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #e9ecef'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '0.75rem',
                fontWeight: 700,
                color: '#1a1a1a'
              }}>
                SOC 2 Ready
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
                ZeroShare Gateway is designed with SOC 2 Trust Service Criteria in mind. We are actively working 
                toward SOC 2 Type II certification. Our architecture includes audit logging, access controls, and 
                encryption aligned with SOC 2 requirements.
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #e9ecef'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛡️</div>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '0.75rem',
                fontWeight: 700,
                color: '#1a1a1a'
              }}>
                GDPR Support
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Designed to support GDPR requirements. ZeroShare Gateway includes EU PII patterns, data subject 
                rights support, and on-premise deployment ensuring personal data remains within your 
                infrastructure and control.
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #e9ecef'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚕️</div>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '0.75rem',
                fontWeight: 700,
                color: '#1a1a1a'
              }}>
                HIPAA Support
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Designed to support HIPAA requirements by detecting and protecting PHI before it reaches AI services. 
                On-premise deployment ensures data never leaves your controlled environment. BAA available upon request.
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #e9ecef'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏦</div>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '0.75rem',
                fontWeight: 700,
                color: '#1a1a1a'
              }}>
                PCI DSS Support
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Designed to help protect payment card data by detecting and blocking credit card numbers and other 
                sensitive financial information before exposure to external AI services.
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #e9ecef'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '0.75rem',
                fontWeight: 700,
                color: '#1a1a1a'
              }}>
                ISO 27001 Aligned
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Designed with ISO 27001 information security principles in mind. Our security controls and on-premise 
                architecture support your ISO 27001 compliance efforts.
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #e9ecef'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🇺🇸</div>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '0.75rem',
                fontWeight: 700,
                color: '#1a1a1a'
              }}>
                CCPA Support
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Designed to support California Consumer Privacy Act (CCPA) requirements by providing control over 
                personal information and preventing unauthorized data sharing to AI services.
              </p>
            </div>
          </div>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '3rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            Security Features
          </h2>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem', color: '#555' }}>
            <li><strong>On-Premise Deployment:</strong> All data processing occurs within your infrastructure</li>
            <li><strong>End-to-End Encryption:</strong> Data is encrypted in transit and at rest</li>
            <li><strong>Access Controls:</strong> Role-based access control and authentication mechanisms</li>
            <li><strong>Audit Logging:</strong> Comprehensive logging of all requests and actions</li>
            <li><strong>Regular Security Updates:</strong> Timely patches and security updates</li>
            <li><strong>Vulnerability Management:</strong> Regular security assessments and penetration testing</li>
          </ul>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            Data Residency
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            ZeroShare Gateway is designed with data residency in mind. Since the service operates entirely on-premise, 
            you maintain complete control over where your data is stored and processed. This is particularly important 
            for organizations subject to data residency requirements in various jurisdictions.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            Compliance Documentation
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            For detailed compliance documentation, security questionnaires, or compliance certifications, please{' '}
            <a href="/support" style={{ color: '#667eea', textDecoration: 'underline' }}>
              contact our compliance team through our support form
            </a>.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            Your Responsibilities
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            While ZeroShare Gateway provides security and compliance features, you are responsible for:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem', color: '#555' }}>
            <li>Proper configuration and deployment of the service</li>
            <li>Maintaining appropriate security controls in your infrastructure</li>
            <li>Regular security assessments and compliance audits</li>
            <li>Ensuring compliance with applicable laws and regulations</li>
            <li>Managing access controls and user permissions</li>
            <li>Monitoring and reviewing audit logs</li>
          </ul>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            Contact Compliance Team
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            For questions about compliance, security certifications, or to request compliance documentation, please{' '}
            <a href="/support" style={{ color: '#667eea', textDecoration: 'underline' }}>
              contact us through our support form
            </a>.
          </p>
        </div>
      </section>
    </main>
  );
}
