import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation - ZeroShare Gateway | DeployZeroShare.com',
  description: 'Complete documentation for ZeroShare Gateway. Learn how to deploy, configure, and use ZeroShare Gateway to protect your organization from AI data leaks.',
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
