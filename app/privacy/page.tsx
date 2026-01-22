import { Navigation } from '../components/Navigation';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.95
          }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            1. Introduction
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            ZeroShare Gateway ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you use our website and 
            services. ZeroShare Gateway is designed with privacy and security as core principles, processing data 
            on-premise to minimize data exposure.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            2. Information We Collect
          </h2>
          <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>
            2.1 Information You Provide
          </h3>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            We collect information that you provide directly to us, including:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem', color: '#555' }}>
            <li>Contact information (name, email address, company name)</li>
            <li>Support requests and communications</li>
            <li>Account registration information</li>
            <li>Feedback and survey responses</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>
            2.2 Automatically Collected Information
          </h3>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            When you visit our website, we may automatically collect certain information, including:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem', color: '#555' }}>
            <li>IP address and location data</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Usage patterns and website interactions</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            3. How We Use Your Information
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            We use the information we collect to:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem', color: '#555' }}>
            <li>Provide, maintain, and improve our services</li>
            <li>Process and respond to your inquiries and support requests</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            4. Data Processing and Storage
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            <strong>On-Premise Processing:</strong> ZeroShare Gateway is designed to process sensitive data entirely 
            within your infrastructure. The Service acts as a transparent proxy that scans, redacts, or blocks 
            requests before they leave your network. We do not have access to the data processed through your 
            deployment of ZeroShare Gateway.
          </p>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            <strong>Website Data:</strong> Information collected through our website (deployzeroshare.com) is stored 
            securely and processed in accordance with this Privacy Policy.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            5. Information Sharing and Disclosure
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            We do not sell, trade, or rent your personal information to third parties. We may share your information 
            only in the following circumstances:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem', color: '#555' }}>
            <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in 
            operating our website and conducting our business</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
            <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our business</li>
            <li><strong>With Your Consent:</strong> When you have given us explicit consent to share your information</li>
          </ul>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            6. Your Rights and Choices
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem', color: '#555' }}>
            <li><strong>Access:</strong> Request access to your personal information</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Objection:</strong> Object to processing of your personal information</li>
            <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent for processing where applicable</li>
          </ul>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            To exercise these rights, please{' '}
            <a href="/support" style={{ color: '#667eea', textDecoration: 'underline' }}>
              contact us through our support form
            </a>.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            7. GDPR Compliance
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            If you are located in the European Economic Area (EEA), you have additional rights under the General Data 
            Protection Regulation (GDPR). We process your personal data based on:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem', color: '#555' }}>
            <li>Your consent</li>
            <li>Performance of a contract</li>
            <li>Compliance with legal obligations</li>
            <li>Legitimate business interests</li>
          </ul>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            8. Security Measures
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            We implement appropriate technical and organizational measures to protect your personal information, including:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem', color: '#555' }}>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and audits</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Employee training on data protection</li>
            <li>Incident response procedures</li>
          </ul>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            9. Cookies and Tracking Technologies
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            We use cookies and similar tracking technologies to track activity on our website and store certain 
            information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being 
            sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            10. Children's Privacy
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
            information from children. If you become aware that a child has provided us with personal information, 
            please contact us immediately.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            11. Changes to This Privacy Policy
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
            new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this 
            Privacy Policy periodically for any changes.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            12. Contact Us
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            If you have any questions about this Privacy Policy or our data practices, please{' '}
            <a href="/support" style={{ color: '#667eea', textDecoration: 'underline' }}>
              contact us through our support form
            </a>.
          </p>
        </div>
      </section>
    </main>
  );
}
