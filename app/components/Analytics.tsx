'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// Google Analytics Measurement ID - Replace with your actual ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// LinkedIn Insight Tag Partner ID - From LinkedIn Campaign Manager
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || '519048716';

function AnalyticsTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && typeof window !== 'undefined') {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      // Google Analytics page view
      if ((window as unknown as { gtag?: Function }).gtag) {
        (window as unknown as { gtag: Function }).gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }
      
      // LinkedIn page view tracking
      if ((window as unknown as { lintrk?: Function }).lintrk) {
        (window as unknown as { lintrk: Function }).lintrk('track', { conversion_id: 'page_view' });
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  // Don't load analytics in development unless explicitly enabled
  if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_ENABLE_ANALYTICS) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            cookie_flags: 'SameSite=None;Secure',
          });

          // Enhanced ecommerce tracking for funnel analysis
          gtag('config', '${GA_MEASUREMENT_ID}', {
            'custom_map': {
              'dimension1': 'user_type',
              'dimension2': 'team_size',
              'metric1': 'form_completions'
            }
          });
        `}
      </Script>

      {/* Microsoft Clarity - Heatmaps & Session Recording */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID || 'XXXXXXXXXX'}");
        `}
      </Script>

      {/* LinkedIn Insight Tag - For LinkedIn Ads Conversion Tracking */}
      <Script id="linkedin-insight-tag" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `}
      </Script>
      <Script id="linkedin-insight-loader" strategy="afterInteractive">
        {`
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lm-sdk-web.js?" + (new Date()).getTime();
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `}
      </Script>
      {/* LinkedIn noscript fallback */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }} 
          alt="" 
          src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`} 
        />
      </noscript>

      <Suspense fallback={null}>
        <AnalyticsTracking />
      </Suspense>
    </>
  );
}

// Helper functions for tracking events
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag('event', eventName, parameters);
  }
};

export const trackFormStart = (formName: string) => {
  trackEvent('form_start', { form_name: formName });
};

export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent('form_submit', { 
    form_name: formName,
    success: success,
  });
  // Also track on LinkedIn for conversion attribution
  if (success) {
    trackLinkedInConversion('form_submit');
  }
};

export const trackCTAClick = (ctaName: string, ctaLocation: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
};

export const trackPageScroll = (percentage: number) => {
  trackEvent('scroll_depth', { percentage });
};

// LinkedIn-specific conversion tracking
// Conversion IDs should be set up in LinkedIn Campaign Manager
export const trackLinkedInConversion = (conversionType: 'aws_marketplace_click' | 'contact_form_submit' | 'demo_request' | 'pricing_view' | 'form_submit') => {
  if (typeof window !== 'undefined' && (window as unknown as { lintrk?: Function }).lintrk) {
    // Track the conversion event
    (window as unknown as { lintrk: Function }).lintrk('track', { conversion_id: conversionType });
  }
};

// Track AWS Marketplace button clicks (high-intent conversion)
export const trackMarketplaceClick = () => {
  trackEvent('aws_marketplace_click', { location: 'cta_button' });
  trackLinkedInConversion('aws_marketplace_click');
};

// Track demo/contact form submissions
export const trackDemoRequest = (teamSize?: string, company?: string) => {
  trackEvent('demo_request', { 
    team_size: teamSize,
    company: company,
  });
  trackLinkedInConversion('demo_request');
};

// Track pricing page views (indicates buying intent)
export const trackPricingView = () => {
  trackEvent('pricing_page_view', {});
  trackLinkedInConversion('pricing_view');
};

// Track newsletter subscription
export const trackNewsletterSubscribe = (email: string, source: string = 'blog') => {
  trackEvent('newsletter_subscribe', {
    source: source,
    email_domain: email.split('@')[1] || 'unknown',
  });
};

// Track blog engagement
export const trackBlogView = (slug: string, category: string) => {
  trackEvent('blog_view', {
    article_slug: slug,
    category: category,
  });
};

// Track documentation views
export const trackDocsView = (section: string) => {
  trackEvent('docs_view', {
    section: section,
  });
};

// Track FAQ interactions
export const trackFAQExpand = (question: string, category: string) => {
  trackEvent('faq_expand', {
    question: question.substring(0, 100), // Truncate for analytics
    category: category,
  });
};

// Track chatbot interactions
export const trackChatbotInteraction = (type: 'open' | 'message' | 'close') => {
  trackEvent('chatbot_interaction', {
    interaction_type: type,
  });
};

// Track file downloads (for llms.txt, documentation PDFs, etc.)
export const trackFileDownload = (filename: string, filetype: string) => {
  trackEvent('file_download', {
    filename: filename,
    filetype: filetype,
  });
};

// Track search queries (for AI search optimization insights)
export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: query.substring(0, 100),
    results_count: resultsCount,
  });
};
