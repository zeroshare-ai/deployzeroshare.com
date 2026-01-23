import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Security Blog - ZeroShare Gateway | Expert Insights & Best Practices',
  description: 'Expert articles on AI security, PII protection, compliance, and best practices. Stay ahead of AI data leak threats with actionable insights from security professionals.',
  keywords: 'AI security blog, PII protection articles, AI compliance guide, data leak prevention tips, enterprise AI security, ChatGPT security best practices, AI governance, zero trust AI',
  openGraph: {
    title: 'AI Security Insights - ZeroShare Gateway Blog',
    description: 'Expert articles on protecting your organization in the age of AI.',
    type: 'website',
  },
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'ZeroShare Security Blog RSS Feed' },
      ],
      'application/atom+xml': [
        { url: '/atom.xml', title: 'ZeroShare Security Blog Atom Feed' },
      ],
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
