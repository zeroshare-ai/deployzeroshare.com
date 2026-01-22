'use client';

export function MarketplaceButton({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('AWS Marketplace listing coming soon! We\'re working hard to make ZeroShare Gateway available on AWS Marketplace. Please check back soon or contact us at support@deployzeroshare.com for early access.');
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
