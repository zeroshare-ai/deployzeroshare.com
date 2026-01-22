import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - ZeroShare Gateway | DeployZeroShare.com',
  description: 'Privacy Policy for ZeroShare Gateway. Learn how we collect, use, and protect your information when using our services.',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
