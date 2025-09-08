'use client';

import { event } from '../lib/analytics';

// Custom hook for common tracking events
export const useAnalytics = () => {
  const trackDonateClick = (amount = null) => {
    event({
      action: 'donate_click',
      category: 'engagement',
      label: 'donate_button',
      value: amount,
    });
  };

  const trackSearchUsage = (searchTerm, resultsCount) => {
    event({
      action: 'search',
      category: 'engagement',
      label: searchTerm,
      value: resultsCount,
    });
  };

  const trackErrorOccurred = (errorType, errorMessage) => {
    event({
      action: 'error',
      category: 'technical',
      label: `${errorType}: ${errorMessage}`,
    });
  };

  const trackUserEngagement = (action, detail = '') => {
    event({
      action: action,
      category: 'user_engagement',
      label: detail,
    });
  };

  const trackPerformance = (metric, value) => {
    event({
      action: 'performance_metric',
      category: 'technical',
      label: metric,
      value: value,
    });
  };

  return {
    trackDonateClick,
    trackSearchUsage,
    trackErrorOccurred,
    trackUserEngagement,
    trackPerformance,
  };
};

// HOC for automatic event tracking
export const withAnalytics = (WrappedComponent, eventConfig) => {
  return function WithAnalyticsComponent(props) {
    const analytics = useAnalytics();

    const handleClick = () => {
      if (eventConfig && eventConfig.onClick) {
        analytics.trackUserEngagement(eventConfig.onClick, eventConfig.detail);
      }
      if (props.onClick) {
        props.onClick();
      }
    };

    return <WrappedComponent {...props} onClick={handleClick} />;
  };
};
