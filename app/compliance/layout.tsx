import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compliance & Security - ZeroShare Gateway | DeployZeroShare.com',
  description: 'ZeroShare Gateway compliance and security information. SOC 2, GDPR, HIPAA, PCI DSS, ISO 27001, and CCPA compliance details.',
};

export default function ComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
