import { Navigation } from '../components/Navigation';

export default function TermsPage() {
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
            Terms of Service
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
            1. Acceptance of Terms
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            By accessing and using ZeroShare Gateway ("the Service"), you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            2. Description of Service
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            ZeroShare Gateway is an on-premise AI security solution that provides PII redaction and secrets blocking 
            capabilities. The Service is available through AWS Marketplace and is designed to protect organizations 
            from accidental data leaks when using public AI services.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            3. Use License
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            Permission is granted to temporarily access the materials on ZeroShare Gateway's website for personal, 
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and 
            under this license you may not:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem', color: '#555' }}>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            4. User Responsibilities
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            You are responsible for:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem', color: '#555' }}>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Ensuring compliance with all applicable laws and regulations</li>
            <li>Proper configuration and maintenance of the Service</li>
          </ul>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            5. Privacy and Data Protection
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            Your use of the Service is also governed by our Privacy Policy. ZeroShare Gateway is designed to process 
            data on-premise and does not transmit sensitive data to external services. However, you are responsible 
            for ensuring compliance with applicable data protection laws, including GDPR, HIPAA, and other regulations.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            6. Limitation of Liability
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            In no event shall ZeroShare Gateway or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to 
            use the materials on ZeroShare Gateway's website, even if ZeroShare Gateway or a ZeroShare Gateway authorized 
            representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            7. Warranty Disclaimer
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            The materials on ZeroShare Gateway's website are provided on an 'as is' basis. ZeroShare Gateway makes no 
            warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without 
            limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or 
            non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            8. Revisions and Errata
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            The materials appearing on ZeroShare Gateway's website could include technical, typographical, or photographic 
            errors. ZeroShare Gateway does not warrant that any of the materials on its website are accurate, complete, 
            or current. ZeroShare Gateway may make changes to the materials contained on its website at any time without 
            notice.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            9. Termination
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for 
            any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to 
            use the Service will cease immediately.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            10. Governing Law
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            These terms and conditions are governed by and construed in accordance with the laws of the United States 
            and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            11. Content Creation and Editorial Process
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            ZeroShare employs various tools and technologies in its content creation workflow, which may include 
            artificial intelligence, machine learning systems, research databases, and other digital tools to assist 
            our editorial team in research, drafting, fact-checking, and content optimization. All content published 
            on this website undergoes editorial review and is curated by our team to ensure accuracy, relevance, and 
            quality. The use of technology-assisted tools in content creation is standard industry practice and does 
            not diminish the expertise, research, or editorial judgment applied to our materials.
          </p>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            Statistics, data points, regulatory information, and technical guidance presented in our content are 
            sourced from publicly available research, government publications, industry reports, and established 
            authorities in the relevant fields. While we strive for accuracy, readers should verify critical 
            information with primary sources and consult appropriate professionals for specific compliance, legal, 
            or technical guidance applicable to their circumstances.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            12. Intellectual Property and Attribution
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            All content, including but not limited to text, graphics, logos, images, and software, is the property 
            of ZeroShare or its content suppliers and is protected by intellectual property laws. Author names and 
            bylines represent the editorial team members responsible for content curation, review, and publication, 
            and do not necessarily indicate sole authorship in the traditional sense. Our content creation process 
            is collaborative and may involve multiple contributors, reviewers, and technological tools.
          </p>

          <h2 style={{
            fontSize: '1.8rem',
            marginTop: '2rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#667eea'
          }}>
            13. Contact Information
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            If you have any questions about these Terms of Service, please{' '}
            <a href="/support" style={{ color: '#667eea', textDecoration: 'underline' }}>
              contact us through our support form
            </a>.
          </p>
        </div>
      </section>
    </main>
  );
}
