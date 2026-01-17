export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Deploy ZeroShare Gateway
          </h1>
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '2rem',
            opacity: 0.95,
            maxWidth: '800px',
            margin: '0 auto 2rem'
          }}>
            On-premise AI security gateway with PII redaction and secrets blocking.
            Keep your sensitive data protected while using cloud AI services.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="#deploy" style={{
              background: 'white',
              color: '#667eea',
              padding: '16px 32px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1.1rem',
              display: 'inline-block',
              transition: 'transform 0.2s'
            }}>
              Get Started
            </a>
            <a href="#features" style={{
              background: 'transparent',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1.1rem',
              display: 'inline-block',
              border: '2px solid white',
              transition: 'transform 0.2s'
            }}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: '80px 20px',
        background: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#1a1a1a'
          }}>
            Two Protection Lanes
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
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#667eea'
              }}>
                PII Redaction
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#666'
              }}>
                For standard users: Automatically redact emails, phone numbers, SSNs, 
                credit cards, and other personally identifiable information before 
                sending requests to AI models.
              </p>
            </div>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#764ba2'
              }}>
                Secrets Blocking
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#666'
              }}>
                For developers: Hard block AWS keys, API keys, private keys, and 
                other secrets from leaking into code assistants. Prevent accidental 
                exposure of credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section style={{
        padding: '80px 20px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#1a1a1a'
          }}>
            Architecture
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: '#667eea',
                color: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>API</div>
              <h3 style={{ marginBottom: '0.5rem' }}>FastAPI Backend</h3>
              <p style={{ color: '#666' }}>Async PostgreSQL, security engine, and AI routing</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: '#764ba2',
                color: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>🔒</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Security Engine</h3>
              <p style={{ color: '#666' }}>Presidio for PII, regex for secrets detection</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: '#667eea',
                color: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>📊</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Dashboard</h3>
              <p style={{ color: '#666' }}>Streamlit monitoring and audit logs</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: '#764ba2',
                color: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>☁️</div>
              <h3 style={{ marginBottom: '0.5rem' }}>AI Routing</h3>
              <p style={{ color: '#666' }}>LiteLLM with Azure OpenAI / AWS Bedrock</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deploy Section */}
      <section id="deploy" style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '2rem'
          }}>
            Quick Deploy with Docker
          </h2>
          <div style={{
            background: '#1a1a1a',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            textAlign: 'left',
            overflowX: 'auto'
          }}>
            <pre style={{
              color: '#00ff00',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              lineHeight: '1.6'
            }}>{`# Clone the repository
git clone https://github.com/zeroshare/zeroshare-gateway
cd zeroshare-gateway

# Configure environment
cp ENV_TEMPLATE.txt .env
# Edit .env with your credentials

# Start services
docker-compose up -d

# Initialize database
docker-compose exec backend python -m backend.init_db`}</pre>
          </div>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.95
          }}>
            Standard Docker Compose deployment. No cloud dependencies required.
          </p>
          <a href="https://github.com/zeroshare/zeroshare-gateway" style={{
            background: 'white',
            color: '#667eea',
            padding: '16px 32px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1.1rem',
            display: 'inline-block'
          }}>
            View on GitHub
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
          <p style={{ marginBottom: '1rem' }}>
            ZeroShare Gateway - On-Premise AI Security Gateway
          </p>
          <p style={{ color: '#999', fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} ZeroShare. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
