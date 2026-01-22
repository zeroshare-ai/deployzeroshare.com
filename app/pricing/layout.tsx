import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - ZeroShare Gateway | AI Security Plans for Every Team',
  description: 'Transparent pricing for ZeroShare Gateway AI security. Start free, scale as you grow. Protect your organization from AI data leaks with enterprise-grade security.',
  keywords: 'ZeroShare pricing, AI security cost, enterprise AI protection pricing, PII blocking software price, AI gateway pricing, data leak prevention cost',
  openGraph: {
    title: 'ZeroShare Gateway Pricing - AI Security for Every Team',
    description: 'Simple, transparent pricing. Start free and scale as you grow.',
    type: 'website',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
