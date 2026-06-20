/**
 * Performance Monitor Hook
 * Provides performance metrics to components
 */

'use client';

import { useEffect, useState } from 'react';
import {
  convertMetricToStandard,
  getPerformanceRecommendations,
  type PerformanceMetric,
} from '@/utils/performance';

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);

  useEffect(() => {
    const handleMetric = (metric: { name: string; value: number; delta?: number }) => {
      const standardized = convertMetricToStandard(metric);
      setMetrics(prev => {
        // Only keep the latest value for each metric type
        const filtered = prev.filter(m => m.name !== metric.name);
        return [...filtered, standardized];
      });
    };

    // Import web-vitals dynamically
    import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      onCLS(handleMetric);
      onFCP(handleMetric);
      onINP(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);
    });

    return () => setMetrics([]);
  }, []);

  const recommendations = metrics.length > 0 ? getPerformanceRecommendations(metrics) : [];

  return {
    metrics,
    recommendations,
    isLoading: metrics.length === 0,
  };
}

export function useWebVitals() {
  const [webVitals, setWebVitals] = useState<Record<string, number>>({});

  const [timestamp, setTimestamp] = useState<number>(0);

  useEffect(() => {
    // Set initial timestamp on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimestamp(Date.now());

    const handleMetric = (metric: { name: string; value: number; delta?: number }) => {
      setWebVitals(prev => ({ ...prev, [metric.name]: metric.value }));
      setTimestamp(Date.now());
    };

    import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      onCLS(handleMetric);
      onFCP(handleMetric);
      onINP(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);
    });

    return () => setWebVitals({});
  }, []);

  return { webVitals, timestamp };
}
