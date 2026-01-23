'use client';

import { trackMarketplaceClick } from './Analytics';

// AWS Marketplace listing URL - Update when live
const AWS_MARKETPLACE_URL = process.env.NEXT_PUBLIC_AWS_MARKETPLACE_URL || '';

export function MarketplaceButton({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the click for LinkedIn and Google Analytics conversion tracking
    trackMarketplaceClick();
    
    // If AWS Marketplace URL is set, navigate there
    if (AWS_MARKETPLACE_URL) {
      // Let the link work normally
      return;
    }
    
    // Otherwise show coming soon message and redirect to contact
    e.preventDefault();
    if (confirm('AWS Marketplace listing coming soon! Would you like to request early access?')) {
      window.location.href = '/contact-us?source=marketplace_cta';
    }
  };

  // Ensure we always have the base cta-button class
  const classes = className ? className : 'cta-button';
  
  return (
    <a
      href={AWS_MARKETPLACE_URL || '/contact-us?source=marketplace_cta'}
      onClick={handleClick}
      className={classes}
      style={style}
      target={AWS_MARKETPLACE_URL ? '_blank' : undefined}
      rel={AWS_MARKETPLACE_URL ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}
