import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - ZeroShare Gateway | DeployZeroShare.com',
  description: 'Get support for ZeroShare Gateway. Submit a support case, access documentation, or contact our team. We respond within 2 business days.',
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
