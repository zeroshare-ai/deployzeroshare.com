import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - ZeroShare Gateway | DeployZeroShare.com',
  description: 'Terms of Service for ZeroShare Gateway. Read our terms and conditions for using ZeroShare Gateway and our services.',
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
