export default function Home() {
  const awsMarketplaceUrl = "https://aws.amazon.com/marketplace/pp/prodview-0123456789"; // Replace with your actual listing URL

  return (
    <main style={{ minHeight: '100vh', background: '#ffffff', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '100px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 900,
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Secure Your AI, Unleash Your Innovation
          </h1>
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '2.5rem',
            opacity: 0.95,
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            fontWeight: 400
          }}>
            ZeroShare Gateway is your on-premise security solution to prevent data
            leaks to cloud AI services. Protect sensitive user data and developer
            secrets with confidence.
          </p>
          <a
            href={awsMarketplaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button cta-primary"
          >
            View on AWS Marketplace
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="solution" style={{
        padding: '80px 20px',
        background: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            textAlign: 'center',
            marginBottom: '4rem',
            color: '#1a1a1a',
            fontWeight: 700
          }}>
            A Simple, Powerful Security Layer
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}>
            <div 
              className="feature-card"
              style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e9ecef'
              }}
            >
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '1rem',
                color: '#667eea',
                fontWeight: 700
              }}>
                PII Redaction for Users
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#555',
                fontWeight: 400
              }}>
                Automatically finds and redacts sensitive user information like emails,
                phone numbers, and credit card details before they reach third-party
                AI models.
              </p>
            </div>
            <div 
              className="feature-card"
              style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e9ecef'
              }}
            >
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '1rem',
                color: '#764ba2',
                fontWeight: 700
              }}>
                Secret Blocking for Developers
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#555',
                fontWeight: 400
              }}>
                Prevents accidental leaks of developer secrets such as API keys,
                AWS credentials, and private tokens to AI coding assistants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        padding: '100px 20px',
        background: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            marginBottom: '2rem',
            color: '#1a1a1a',
            fontWeight: 700
          }}>
            Ready to Secure Your AI?
          </h2>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '3rem',
            color: '#555',
            lineHeight: '1.7',
            fontWeight: 400
          }}>
            Deploy ZeroShare Gateway from the AWS Marketplace today. It’s the
            fastest way to add a critical layer of data security and gain peace
            of mind.
          </p>
          <a
            href={awsMarketplaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button cta-gradient"
          >
            Get It On AWS Marketplace
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1a1a1a',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ marginBottom: '1rem', color: '#ccc', fontSize: '0.9rem', fontWeight: 400 }}>
            ZeroShare Gateway - On-Premise AI Security
          </p>
          <p style={{ color: '#888', fontSize: '0.8rem', fontWeight: 400 }}>
            © {new Date().getFullYear()} ZeroShare. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
