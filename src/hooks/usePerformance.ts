import { useEffect, useRef, useState } from 'react';
import { performanceMonitor, WebVitals, debounce } from '../utils/performance';

interface UsePerformanceOptions {
  reportInterval?: number;
  enableReporting?: boolean;
  onMetricsUpdate?: (metrics: WebVitals) => void;
}

/**
 * Custom hook for monitoring performance metrics
 */
export const usePerformance = (options: UsePerformanceOptions = {}) => {
  const {
    reportInterval = 5000,
    enableReporting = true,
    onMetricsUpdate
  } = options;

  const [metrics, setMetrics] = useState<WebVitals>({});
  const intervalRef = useRef<NodeJS.Timeout>();

  // Debounced metrics update function
  const debouncedUpdate = useRef(
    debounce((newMetrics: WebVitals) => {
      setMetrics(newMetrics);
      onMetricsUpdate?.(newMetrics);
    }, 1000)
  );

  useEffect(() => {
    if (!enableReporting) return;

    // Function to get and update metrics
    const updateMetrics = () => {
      const currentMetrics = performanceMonitor.getMetrics();
      debouncedUpdate.current(currentMetrics);
    };

    // Initial metrics update
    updateMetrics();

    // Set up interval for periodic updates
    intervalRef.current = setInterval(updateMetrics, reportInterval);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [reportInterval, enableReporting, onMetricsUpdate]);

  // Function to manually trigger metrics report
  const reportMetrics = () => {
    performanceMonitor.reportMetrics();
  };

  // Function to get current metrics
  const getCurrentMetrics = () => {
    return performanceMonitor.getMetrics();
  };

  return {
    metrics,
    reportMetrics,
    getCurrentMetrics
  };
};

/**
 * Hook for monitoring component render performance
 */
export const useRenderPerformance = (componentName: string) => {
  const renderStartTime = useRef<number>();
  const renderCount = useRef(0);
  const [averageRenderTime, setAverageRenderTime] = useState(0);

  useEffect(() => {
    renderStartTime.current = performance.now();
    renderCount.current += 1;

    return () => {
      if (renderStartTime.current) {
        const renderTime = performance.now() - renderStartTime.current;
        
        // Calculate running average
        const currentAverage = averageRenderTime;
        const newAverage = (currentAverage * (renderCount.current - 1) + renderTime) / renderCount.current;
        setAverageRenderTime(newAverage);

        // Log slow renders in development
        if (process.env.NODE_ENV === 'development' && renderTime > 16) {
          console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
        }
      }
    };
  });

  return {
    renderCount: renderCount.current,
    averageRenderTime
  };
};

/**
 * Hook for lazy loading with intersection observer
 */
export const useLazyLoading = (options: IntersectionObserverInit = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        setIsIntersecting(isCurrentlyIntersecting);
        
        if (isCurrentlyIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasIntersected, options]);

  return {
    elementRef,
    isIntersecting,
    hasIntersected
  };
};

/**
 * Hook for preloading resources
 */
export const usePreload = (resources: Array<{ href: string; as: string; type?: string }>) => {
  const [loadedResources, setLoadedResources] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadPromises = resources.map(resource => {
      return new Promise<string>((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;

        link.onload = () => {
          setLoadedResources(prev => new Set(prev).add(resource.href));
          resolve(resource.href);
        };
        
        link.onerror = () => reject(new Error(`Failed to preload ${resource.href}`));
        
        document.head.appendChild(link);
      });
    });

    Promise.allSettled(preloadPromises).then(results => {
      const failed = results
        .filter(result => result.status === 'rejected')
        .map((result, index) => resources[index].href);
      
      if (failed.length > 0) {
        console.warn('Failed to preload resources:', failed);
      }
    });

    // Cleanup function to remove preload links
    return () => {
      resources.forEach(resource => {
        const link = document.querySelector(`link[href="${resource.href}"][rel="preload"]`);
        if (link) {
          document.head.removeChild(link);
        }
      });
    };
  }, [resources]);

  return {
    loadedResources,
    isResourceLoaded: (href: string) => loadedResources.has(href),
    allResourcesLoaded: loadedResources.size === resources.length
  };
};

/**
 * Hook for measuring network performance
 */
export const useNetworkPerformance = () => {
  const [networkInfo, setNetworkInfo] = useState<{
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  }>({});

  useEffect(() => {
    // Check if Network Information API is available
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;

    if (connection) {
      const updateNetworkInfo = () => {
        setNetworkInfo({
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData
        });
      };

      // Initial update
      updateNetworkInfo();

      // Listen for changes
      connection.addEventListener('change', updateNetworkInfo);

      return () => {
        connection.removeEventListener('change', updateNetworkInfo);
      };
    }
  }, []);

  return networkInfo;
};

export default usePerformance;