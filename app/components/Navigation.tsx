'use client';

import Link from 'next/link';
import { MarketplaceButton } from './MarketplaceButton';

export function Navigation() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e9ecef',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo/Brand */}
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🛡️ ZeroShare Gateway
        </Link>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          <Link href="/#solution" style={{
            color: '#1a1a1a',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#667eea'}
          onMouseOut={(e) => e.currentTarget.style.color = '#1a1a1a'}
          >
            Features
          </Link>
          <Link href="/docs" style={{
            color: '#1a1a1a',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#667eea'}
          onMouseOut={(e) => e.currentTarget.style.color = '#1a1a1a'}
          >
            Documentation
          </Link>
          <Link href="/support" style={{
            color: '#1a1a1a',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#667eea'}
          onMouseOut={(e) => e.currentTarget.style.color = '#1a1a1a'}
          >
            Support
          </Link>
          <MarketplaceButton
            className="cta-button"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Deploy on AWS Marketplace
          </MarketplaceButton>
        </div>
      </div>
    </nav>
  );
}
