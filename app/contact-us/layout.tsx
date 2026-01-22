import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Sales - ZeroShare Gateway | Enterprise AI Security Demo',
  description: 'Schedule a free demo of ZeroShare Gateway. See how enterprise teams protect sensitive data from AI leaks. Personalized walkthrough, no commitment required.',
  keywords: 'AI security demo, enterprise AI protection, PII blocking demo, contact sales, ZeroShare Gateway demo, AI data leak prevention consultation',
  openGraph: {
    title: 'Get a Free ZeroShare Gateway Demo',
    description: 'Schedule a personalized demo and see how ZeroShare Gateway can protect your organization from AI data leaks.',
    type: 'website',
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
