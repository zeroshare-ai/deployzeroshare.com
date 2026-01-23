import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security & Trust Center | ZeroShare Gateway',
  description: 'Learn about ZeroShare Gateway security architecture, compliance features, and data protection measures. Designed for enterprise security requirements.',
  keywords: ['security', 'trust center', 'SOC 2', 'compliance', 'data protection', 'AI security'],
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
