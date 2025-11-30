// Performance Optimization Utilities

// ============================================================================
// IMAGE OPTIMIZATION
// ============================================================================

/**
 * Lazy loading image component props
 */
export interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Create optimized image URL with WebP support
 */
export const createOptimizedImageUrl = (
  src: string,
  width?: number,
  height?: number,
  quality: number = 85
): string => {
  // Check if browser supports WebP
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();

  // For now, return the original src
  // In a real implementation, you'd integrate with an image optimization service
  return src;
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Intersection Observer for lazy loading
 */
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Web Vitals metrics
 */
export interface WebVitals {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

/**
 * Performance observer for Core Web Vitals
 */
export class PerformanceMonitor {
  private metrics: WebVitals = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers(): void {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.metrics.LCP = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.metrics.FID = entry.processingStart - entry.startTime;
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.CLS = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }
    }

    // First Contentful Paint
    if ('performance' in window && 'getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.FCP = fcpEntry.startTime;
      }
    }
  }

  public getMetrics(): WebVitals {
    return { ...this.metrics };
  }

  public reportMetrics(): void {
    console.log('Web Vitals:', this.metrics);
    
    // In a real application, you would send these metrics to an analytics service
    // Example: analytics.track('web-vitals', this.metrics);
  }

  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// ============================================================================
// RESOURCE OPTIMIZATION
// ============================================================================

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Request idle callback wrapper
 */
export const requestIdleCallback = (
  callback: () => void,
  options?: { timeout?: number }
): void => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, options);
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(callback, 1);
  }
};

/**
 * Preload critical resources
 */
export const preloadResource = (href: string, as: string, type?: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
};

/**
 * Prefetch non-critical resources
 */
export const prefetchResource = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

// ============================================================================
// MEMORY OPTIMIZATION
// ============================================================================

/**
 * Cleanup function for removing event listeners and observers
 */
export class CleanupManager {
  private cleanupFunctions: (() => void)[] = [];

  public add(cleanupFn: () => void): void {
    this.cleanupFunctions.push(cleanupFn);
  }

  public cleanup(): void {
    this.cleanupFunctions.forEach(fn => {
      try {
        fn();
      } catch (error) {
        console.warn('Cleanup function failed:', error);
      }
    });
    this.cleanupFunctions = [];
  }
}

/**
 * Weak reference cache for preventing memory leaks
 */
export class WeakCache<K extends object, V> {
  private cache = new WeakMap<K, V>();

  public get(key: K): V | undefined {
    return this.cache.get(key);
  }

  public set(key: K, value: V): void {
    this.cache.set(key, value);
  }

  public has(key: K): boolean {
    return this.cache.has(key);
  }

  public delete(key: K): boolean {
    return this.cache.delete(key);
  }
}

// ============================================================================
// BUNDLE OPTIMIZATION
// ============================================================================

/**
 * Dynamic import wrapper with error handling
 */
export const dynamicImport = async <T>(
  importFn: () => Promise<T>
): Promise<T | null> => {
  try {
    return await importFn();
  } catch (error) {
    console.error('Dynamic import failed:', error);
    return null;
  }
};

/**
 * Code splitting helper for lazy loading components
 */
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) => {
  return React.lazy(importFn);
};

// Export performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Initialize performance monitoring on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Report metrics after page load
    setTimeout(() => {
      performanceMonitor.reportMetrics();
    }, 1000);
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    performanceMonitor.cleanup();
  });
}