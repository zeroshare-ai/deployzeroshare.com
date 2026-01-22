import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from './components/Analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://deployzeroshare.com'),
  title: {
    default: 'ZeroShare Gateway - AI Security Gateway | Stop Data Leaks to AI',
    template: '%s | ZeroShare Gateway',
  },
  description: 'ZeroShare Gateway is the leading AI proxy security solution. Block PII leaks and secrets exposure to ChatGPT, Copilot, and other AI tools. On-premise deployment, SOC 2 compliant, GDPR ready. Trusted by enterprise security teams.',
  keywords: [
    'AI security gateway',
    'AI proxy',
    'PII redaction AI',
    'secrets blocking',
    'ChatGPT security',
    'Copilot security',
    'Claude security',
    'AI data leak prevention',
    'enterprise AI security',
    'on-premise AI gateway',
    'AI compliance',
    'SOC 2 AI',
    'GDPR AI',
    'HIPAA AI',
    'AI governance',
    'LLM security',
    'generative AI security',
    'AI DLP',
    'data loss prevention AI',
    'ZeroShare Gateway',
  ],
  authors: [{ name: 'ZeroShare' }],
  creator: 'ZeroShare',
  publisher: 'ZeroShare',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deployzeroshare.com',
    siteName: 'ZeroShare Gateway',
    title: 'ZeroShare Gateway - AI Security Gateway | Stop Data Leaks to AI',
    description: 'Block PII leaks and secrets from reaching ChatGPT, Copilot, and other AI tools. Enterprise-grade AI security deployed on-premise.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ZeroShare Gateway - AI Security',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeroShare Gateway - AI Security Gateway',
    description: 'Stop data leaks before they reach AI. Enterprise-grade security for ChatGPT, Copilot, and other AI tools.',
    images: ['/og-image.png'],
    creator: '@zeroshare',
  },
  alternates: {
    canonical: 'https://deployzeroshare.com',
  },
  category: 'technology',
};

// JSON-LD Schema for enhanced SEO and AI discoverability
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://deployzeroshare.com/#organization',
      name: 'ZeroShare',
      url: 'https://deployzeroshare.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://deployzeroshare.com/logo_150x150.png',
      },
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        url: 'https://deployzeroshare.com/contact-us',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://deployzeroshare.com/#website',
      url: 'https://deployzeroshare.com',
      name: 'ZeroShare Gateway',
      description: 'AI Security Gateway - Block PII and secrets from AI tools',
      publisher: {
        '@id': 'https://deployzeroshare.com/#organization',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://deployzeroshare.com/#software',
      name: 'ZeroShare Gateway',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Cloud, On-Premise',
      description: 'Enterprise AI security gateway that prevents PII leaks and secrets exposure when using ChatGPT, Copilot, Claude, and other generative AI tools. Deploy as a transparent proxy with zero code changes.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free tier available, Enterprise plans with custom pricing',
      },
      featureList: [
        'PII Detection and Redaction',
        'API Key and Secrets Blocking',
        'Audit Logging',
        'SOC 2 Compliance',
        'GDPR Compliance',
        'HIPAA Compliance',
        'On-Premise Deployment',
        'Zero Latency Impact',
        'Custom Rules Engine',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://deployzeroshare.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is an AI security gateway?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An AI security gateway is a proxy that sits between your users and AI services like ChatGPT or Copilot. It scans all requests for sensitive data like PII and secrets, blocking or redacting them before they reach external AI services.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does ZeroShare Gateway prevent data leaks to AI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ZeroShare Gateway uses advanced pattern recognition to detect 50+ types of PII (emails, SSNs, credit cards, etc.) and hundreds of secret patterns (API keys, credentials). It works as a transparent proxy requiring zero code changes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is ZeroShare Gateway compliant with GDPR, SOC 2, and HIPAA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. ZeroShare Gateway is designed for enterprise compliance with built-in audit logging, data residency controls, and features that support GDPR, SOC 2, HIPAA, and other regulatory requirements.',
          },
        },
      ],
    },
  ],
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
        
        {/* JSON-LD Schema for SEO and AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
