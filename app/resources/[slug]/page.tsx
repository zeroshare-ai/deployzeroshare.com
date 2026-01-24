import WhitepaperClient from './WhitepaperClient';

// Whitepaper data (in production, this would come from a CMS or markdown files)
const whitepapers: Record<string, {
  title: string;
  subtitle: string;
  hook: string;
  previewSections: { title: string; content: string }[];
  lockedSections: number;
  readTime: string;
}> = {
  'why-blocking-chatgpt-will-get-you-fired': {
    title: 'Why Blocking ChatGPT Will Get You Fired',
    subtitle: 'The CISO\'s Guide to Enabling AI Without Losing Control',
    hook: 'Prohibition didn\'t work for alcohol. It won\'t work for AI.',
    previewSections: [
      {
        title: 'The Prohibition Problem',
        content: `In 2024, 78% of enterprises attempted to block ChatGPT. By 2025, 94% of those same enterprises had employees actively circumventing the blocks.

The pattern is predictable:

1. Security blocks ChatGPT on corporate network
2. Employees use personal phones on cellular data
3. Employees use personal laptops on home WiFi
4. Shadow AI usage explodes—now with ZERO visibility

You haven't reduced risk. You've eliminated your ability to manage it.`
      },
      {
        title: 'The Talent Exodus',
        content: `Your best engineers are getting job offers every week. When they interview, the first question they ask: "Can I use AI coding tools?"

Companies that block AI tools are seeing:
• 34% longer time-to-fill for engineering roles
• 23% higher turnover among senior developers
• 2.3x more declined offers citing "outdated tooling"

The message is clear: Block AI and lose your best people to competitors who don't.`
      }
    ],
    lockedSections: 2,
    readTime: '12 min read'
  },
  'shadow-ai-report-2026': {
    title: 'The Shadow AI Report 2026',
    subtitle: 'What Your Employees Are Really Doing with AI (And What It\'s Costing You)',
    hook: '98% of organizations have shadow AI. Most don\'t know it.',
    previewSections: [
      {
        title: 'Executive Summary',
        content: `Shadow AI—the use of unsanctioned AI tools by employees—has reached epidemic proportions.

Key findings:
• 98% of organizations have employees using unapproved AI tools
• Average enterprise has 47 different AI tools in use (only 12 approved)
• 65% of employees have shared sensitive data with AI without authorization
• Shadow AI increases average breach cost by $670,000`
      }
    ],
    lockedSections: 3,
    readTime: '15 min read'
  },
  'ai-security-board-presentation': {
    title: 'The $4.45M Gamble Your Board Doesn\'t Know About',
    subtitle: 'A Board-Ready Presentation on AI Security Risk',
    hook: 'Every prompt is a potential breach. Is your board aware?',
    previewSections: [
      {
        title: 'The Board Question',
        content: `At your next board meeting, someone will ask:

"What is our exposure from employee AI usage?"

This whitepaper gives you the answer—with data, frameworks, and recommendations your board will understand.`
      },
      {
        title: 'Quantifying the Risk',
        content: `Direct costs:
• Average data breach: $4.45M (IBM, 2023)
• AI-related breaches: 23% higher than average
• Regulatory fines: Up to 4% of global revenue (GDPR)

Indirect costs:
• Customer churn from breach: 3.4% average
• Stock price impact: -7.5% average (public companies)
• Executive liability: Personal fines and termination`
      }
    ],
    lockedSections: 2,
    readTime: '10 min read'
  }
};

// Generate static params for all whitepapers (required for static export)
export function generateStaticParams() {
  return Object.keys(whitepapers).map((slug) => ({
    slug,
  }));
}

// Server component that passes data to client component
export default function WhitepaperPage({ params }: { params: { slug: string } }) {
  const whitepaper = whitepapers[params.slug] || null;
  
  return <WhitepaperClient slug={params.slug} whitepaper={whitepaper} />;
}
