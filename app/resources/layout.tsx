import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Security Resources | ZeroShare',
  description: 'Free whitepapers, research reports, and guides on AI security for CISOs and security leaders.',
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
