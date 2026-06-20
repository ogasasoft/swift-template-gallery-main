/**
 * Performance Banner Component
 * Displays Core Web Vitals metrics on the page
 */

'use client';

import { useEffect, useState } from 'react';
import {
  convertMetricToStandard,
  getPerformanceRecommendations,
  type PerformanceMetric,
} from '@/utils/performance';

export default function PerformanceBanner() {
  // @ts-expect-error - thresholds will be used after testing web-vitals v4 API
  const _thresholds = {
    LCP: { good: 2500, poor: 4000 },
    INP: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1.8, poor: 3.0 },
    TTFB: { good: 800, poor: 1800 },
  };
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if developer mode is enabled (localStorage)
    const devModeEnabled = localStorage.getItem('enableDevMode') === 'true';

    if (!devModeEnabled) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMetric = (metric: { name: string; value: number; delta?: number }) => {
      const standardized = convertMetricToStandard(metric);
      setMetrics(prev => {
        // Only keep the latest value for each metric type
        const filtered = prev.filter(m => m.name !== metric.name);
        return [...filtered, standardized];
      });
    };

    // Import web-vitals dynamically to avoid SSR issues
    import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      onCLS(handleMetric);
      onFCP(handleMetric);
      onINP(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);
    });

    // Cleanup
    return () => {
      setMetrics([]);
    };
  }, []);

  const ratings = {
    good: 'text-green-600 bg-green-50 border-green-200',
    'needs-improvement': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    poor: 'text-red-600 bg-red-50 border-red-200',
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border-2 p-4 max-w-sm animate-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Performance Metrics</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {metrics.map(metric => (
            <div
              key={metric.name}
              className={`text-xs p-2 rounded border ${ratings[metric.rating]} flex items-center justify-between`}
            >
              <span className="font-medium">{metric.name}</span>
              <span className="font-bold">{metric.value.toFixed(2)}ms</span>
            </div>
          ))}
        </div>

        {metrics.length > 0 && (
          <div className="border-t pt-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Recommendations:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {getPerformanceRecommendations(metrics).map((rec, idx) => (
                <li key={idx}>• {rec}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => localStorage.setItem('enableDevMode', 'false')}
          className="mt-4 w-full py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          Disable Performance Monitoring
        </button>
      </div>
    </div>
  );
}
