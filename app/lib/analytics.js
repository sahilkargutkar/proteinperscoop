'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics tracking functions
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track deal clicks
export const trackDealClick = (dealTitle, dealCategory, dealPrice) => {
  event({
    action: 'deal_click',
    category: 'engagement',
    label: `${dealCategory} - ${dealTitle}`,
    value: dealPrice ? parseInt(dealPrice.replace(/[^0-9]/g, '')) : undefined,
  });
};

// Track category views
export const trackCategoryView = (category) => {
  event({
    action: 'category_view',
    category: 'navigation',
    label: category,
  });
};

// Track search events
export const trackSearch = (searchTerm, resultsCount) => {
  event({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
    value: resultsCount,
  });
};

// Component to handle automatic page tracking
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (GA_TRACKING_ID) {
      const url = pathname + searchParams.toString();
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}
