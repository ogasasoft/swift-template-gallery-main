/**
 * Performance Monitoring Utilities
 * Uses Web Vitals to track Core Web Vitals for monitoring
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

/**
 * Performance metric interface
 */
export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
}

/**
 * Measure and send Core Web Vitals
 * @param onPerfEntry - Optional callback function to handle performance metrics
 */
export function reportWebVitals(
  onPerfEntry?: (metric: { name: string; value: number; delta?: number }) => void
) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onINP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  } else {
    onCLS(console.log);
    onFCP(console.log);
    onINP(console.log);
    onLCP(console.log);
    onTTFB(console.log);
  }
}

/**
 * Convert raw performance metrics to standardized format
 */
export function convertMetricToStandard(metric: {
  name: string;
  value: number;
  delta?: number;
}): PerformanceMetric {
  const { name, value, delta } = metric;

  // Web Vitals thresholds
  const thresholds = {
    LCP: {
      good: 2500,
      poor: 4000,
    },
    INP: {
      good: 100,
      poor: 300,
    },
    CLS: {
      good: 0.1,
      poor: 0.25,
    },
    FCP: {
      good: 1.8,
      poor: 3.0,
    },
    TTFB: {
      good: 800,
      poor: 1800,
    },
  };

  const type = name.toLowerCase() as keyof typeof thresholds;
  const threshold = thresholds[type] || { good: 0, poor: Infinity };

  let rating: 'good' | 'needs-improvement' | 'poor' = 'good';

  if (value > threshold.poor) {
    rating = 'poor';
  } else if (value > threshold.good) {
    rating = 'needs-improvement';
  }

  return {
    name: metric.name,
    value,
    rating,
    delta,
  };
}

/**
 * Format performance metric for logging
 */
export function formatPerformanceMetric(metric: PerformanceMetric): string {
  return `[Performance] ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})${metric.delta ? ` (delta: ${metric.delta.toFixed(2)}ms)` : ''}`;
}

/**
 * Get performance recommendations based on metrics
 */
export function getPerformanceRecommendations(metrics: PerformanceMetric[]): string[] {
  const recommendations: string[] = [];

  metrics.forEach(metric => {
    if (metric.rating === 'poor') {
      switch (metric.name) {
        case 'LCP':
          recommendations.push(
            'LCP is poor - Consider optimizing images, removing render-blocking resources, or improving server response time.'
          );
          break;
        case 'FID':
          recommendations.push(
            'FID is poor - Consider reducing JavaScript execution time or using defer/non-blocking scripts.'
          );
          break;
        case 'CLS':
          recommendations.push(
            'CLS is poor - Reserve space for dynamic content or avoid layout shifts.'
          );
          break;
        case 'FCP':
          recommendations.push(
            'FCP is poor - Consider optimizing CSS, reducing JavaScript, or improving caching.'
          );
          break;
        case 'TTFB':
          recommendations.push(
            'TTFB is poor - Consider optimizing server response time, enabling compression, or using a CDN.'
          );
          break;
      }
    } else if (metric.rating === 'needs-improvement') {
      switch (metric.name) {
        case 'LCP':
          recommendations.push(
            'LCP could be improved - Small optimizations to images or resources could yield better results.'
          );
          break;
        case 'FID':
          recommendations.push(
            'FID could be improved - Consider deferring non-critical JavaScript.'
          );
          break;
        case 'CLS':
          recommendations.push(
            'CLS could be improved - Reserve space for dynamic content to prevent layout shifts.'
          );
          break;
        case 'FCP':
          recommendations.push(
            'FCP could be improved - Consider optimizing critical CSS and JavaScript.'
          );
          break;
        case 'TTFB':
          recommendations.push(
            'TTFB could be improved - Small server optimizations could yield better performance.'
          );
          break;
      }
    }
  });

  return recommendations;
}
