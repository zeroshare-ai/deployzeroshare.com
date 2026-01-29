'use client';

import { trackMarketplaceClick } from './Analytics';

// AWS Marketplace listing - COMING SOON
// Product ID: prod-p7etizzvknoge (ready but account restricted)
const AWS_MARKETPLACE_ENABLED = false;

export function MarketplaceButton({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the click for LinkedIn and Google Analytics conversion tracking
    trackMarketplaceClick();
    
    // Show coming soon modal and redirect to contact for early access
    e.preventDefault();
    if (confirm('AWS Marketplace listing coming soon!\n\nClick OK to request a private early access trial.')) {
      window.location.href = '/contact-us?source=marketplace_early_access';
    }
  };

  // Ensure we always have the base cta-button class
  const classes = className ? className : 'cta-button';
  
  return (
    <a
      href="/contact-us?source=marketplace_cta"
      onClick={handleClick}
      className={classes}
      style={style}
    >
      {children}
    </a>
  );
}
