import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security & Trust Center | ZeroShare Gateway',
  description: 'Learn about ZeroShare Gateway security architecture, compliance certifications, and data protection measures. SOC 2 in progress, AWS Partner verified.',
  keywords: ['security', 'trust center', 'SOC 2', 'compliance', 'data protection', 'AI security'],
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
