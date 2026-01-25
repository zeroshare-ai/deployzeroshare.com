import { MarketplaceButton } from '../components/MarketplaceButton';

interface ComicCTAProps {
  headline?: string;
  body?: string;
  pricing?: string;
  buttonText?: string;
}

export function ComicCTA({ 
  headline = "Protect your team like Alex and Jordan.",
  body = "ZeroShare Gateway blocks PII and secrets automatically.",
  pricing = "Free for 5 users · $499/mo for 25 · 14-day free trial",
  buttonText = "Start Free Trial → AWS Marketplace"
}: ComicCTAProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      borderRadius: '12px',
      textAlign: 'center',
      margin: '2rem 0'
    }}>
      <h3 style={{
        color: 'white',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        fontWeight: 700
      }}>
        {headline}
      </h3>
      <p style={{
        color: 'rgba(255,255,255,0.9)',
        marginBottom: '0.5rem',
        fontSize: '1.1rem'
      }}>
        {body}
      </p>
      <p style={{
        color: 'rgba(255,255,255,0.8)',
        marginBottom: '1.5rem',
        fontSize: '0.95rem'
      }}>
        {pricing}
      </p>
      <MarketplaceButton style={{
        background: 'white',
        color: '#667eea',
        padding: '14px 36px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '1.1rem',
        display: 'inline-block',
        transition: 'transform 0.2s ease'
      }}>
        {buttonText}
      </MarketplaceButton>
    </div>
  );
}
