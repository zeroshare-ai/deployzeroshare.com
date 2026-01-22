'use client';

export function MarketplaceButton({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert('AWS Marketplace listing coming soon! We\'re working hard to make ZeroShare Gateway available on AWS Marketplace. Please check back soon or visit /support to request early access.');
  };

  // Ensure we always have the base cta-button class
  const classes = className ? className : 'cta-button';
  
  return (
    <a
      href="#"
      onClick={handleClick}
      className={classes}
      style={style}
    >
      {children}
    </a>
  );
}
