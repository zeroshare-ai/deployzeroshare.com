import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from './components/Analytics';
import { Chatbot } from './components/Chatbot';

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
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'ZeroShare Security Blog RSS Feed' },
      ],
      'application/atom+xml': [
        { url: '/atom.xml', title: 'ZeroShare Security Blog Atom Feed' },
      ],
    },
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
        width: 150,
        height: 150,
      },
      sameAs: [
        'https://www.linkedin.com/company/zeroshare',
        'https://twitter.com/zeroshare',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          url: 'https://deployzeroshare.com/contact-us',
          availableLanguage: 'English',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          url: 'https://deployzeroshare.com/support',
          availableLanguage: 'English',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
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
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://deployzeroshare.com/blog?search={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://deployzeroshare.com/#software',
      name: 'ZeroShare Gateway',
      applicationCategory: 'SecurityApplication',
      applicationSubCategory: 'AI Security',
      operatingSystem: 'Cloud, On-Premise, AWS, Azure, GCP',
      description: 'Enterprise AI security gateway that prevents PII leaks and secrets exposure when using ChatGPT, Copilot, Claude, and other generative AI tools. Deploy as a transparent proxy with zero code changes.',
      releaseNotes: 'https://docs.deployzeroshare.com/changelog',
      softwareVersion: '2.1.0',
      offers: [
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier - up to 1,000 requests/day',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Professional',
          price: '499',
          priceCurrency: 'USD',
          priceValidUntil: '2026-12-31',
          description: 'Up to 100,000 requests/day',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Enterprise',
          description: 'Custom pricing for unlimited usage',
          availability: 'https://schema.org/InStock',
        },
      ],
      featureList: [
        'PII Detection and Redaction (50+ types)',
        'API Key and Secrets Blocking (100+ patterns)',
        'Real-time Audit Logging',
        'SOC 2 Type II Compliance',
        'GDPR Compliance',
        'HIPAA Compliance',
        'On-Premise Deployment Option',
        'Zero Latency Impact (<5ms)',
        'Custom Rules Engine',
        'SSO Integration (SAML, OIDC)',
        'Role-Based Access Control',
      ],
      screenshot: 'https://deployzeroshare.com/images/dashboard-screenshot.png',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '127',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'Product',
      '@id': 'https://deployzeroshare.com/#product',
      name: 'ZeroShare Gateway',
      description: 'Enterprise AI security gateway for preventing data leaks to ChatGPT, Copilot, and other AI tools',
      brand: {
        '@type': 'Brand',
        name: 'ZeroShare',
      },
      category: 'Security Software',
      image: 'https://deployzeroshare.com/og-image.png',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
        bestRating: '5',
      },
      review: [
        {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
          author: {
            '@type': 'Organization',
            name: 'Healthcare Enterprise',
          },
          reviewBody: 'Enabled our clinical staff to use AI assistants while maintaining HIPAA compliance. Zero data breaches since deployment.',
        },
        {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
          author: {
            '@type': 'Organization',
            name: 'Financial Services Company',
          },
          reviewBody: 'Blocked thousands of potential PII exposures in the first month. Essential for our compliance program.',
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': 'https://deployzeroshare.com/#howto',
      name: 'How to Protect Your Organization from AI Data Leaks',
      description: 'Step-by-step guide to deploying ZeroShare Gateway for AI security',
      totalTime: 'PT30M',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Choose a deployment option',
          text: 'Select from AWS Marketplace (one-click), on-premise Docker/Kubernetes, or private cloud deployment.',
          position: 1,
        },
        {
          '@type': 'HowToStep',
          name: 'Configure network routing',
          text: 'Set up your network to route AI service traffic through ZeroShare Gateway using proxy settings or firewall rules.',
          position: 2,
        },
        {
          '@type': 'HowToStep',
          name: 'Customize detection rules',
          text: 'Configure which types of PII and secrets to detect, and set actions (block, redact, or alert).',
          position: 3,
        },
        {
          '@type': 'HowToStep',
          name: 'Enable audit logging',
          text: 'Turn on audit logging to track all AI interactions for compliance and security review.',
          position: 4,
        },
        {
          '@type': 'HowToStep',
          name: 'Monitor dashboard',
          text: 'Use the real-time dashboard to monitor detections, review blocked requests, and generate compliance reports.',
          position: 5,
        },
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
        {
          '@type': 'Question',
          name: 'How much does ZeroShare Gateway cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ZeroShare Gateway offers a free Starter tier (1,000 requests/day), Professional at $499/month (100,000 requests/day), and Enterprise with custom pricing for unlimited usage.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does ZeroShare Gateway slow down AI responses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. ZeroShare Gateway adds minimal latency, averaging less than 5 milliseconds. The gateway uses streaming pass-through so users see AI responses in real-time.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://deployzeroshare.com/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deployzeroshare.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Pricing',
          item: 'https://deployzeroshare.com/pricing',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Documentation',
          item: 'https://deployzeroshare.com/docs',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Blog',
          item: 'https://deployzeroshare.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'FAQ',
          item: 'https://deployzeroshare.com/faq',
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
        <Chatbot />
        <Analytics />
      </body>
    </html>
  );
}
