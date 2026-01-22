import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZeroShare Gateway - On-Premise AI Security | AWS Marketplace',
  description: 'Stop data leaks before they reach AI. ZeroShare Gateway protects your organization from accidental PII leaks and secret exposure when using ChatGPT, Copilot, and other AI tools. Deploy on-premise, maintain full control.',
  keywords: 'AI security, PII redaction, secrets blocking, on-premise AI gateway, ZeroShare, AWS Marketplace, ChatGPT security, Copilot security, data leak prevention, enterprise AI security, SOC 2, GDPR compliance',
  openGraph: {
    title: 'ZeroShare Gateway - On-Premise AI Security',
    description: 'Stop data leaks before they reach AI. Enterprise-grade security for ChatGPT, Copilot, and other AI tools.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeroShare Gateway - On-Premise AI Security',
    description: 'Stop data leaks before they reach AI. Enterprise-grade security for ChatGPT, Copilot, and other AI tools.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
