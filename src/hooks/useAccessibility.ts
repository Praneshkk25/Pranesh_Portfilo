import { useEffect, useRef, useState, useCallback } from 'react';
import { 
  FocusTrap, 
  announceToScreenReader, 
  generateId, 
  prefersReducedMotion,
  KeyboardNavigationHandler
} from '../utils/accessibility';

/**
 * Hook for managing focus trap in modals and overlays
 */
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null);
  const focusTrapRef = useRef<FocusTrap | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isActive) {
      focusTrapRef.current = new FocusTrap(containerRef.current);
      focusTrapRef.current.activate();
    } else {
      focusTrapRef.current?.deactivate();
      focusTrapRef.current = null;
    }

    return () => {
      focusTrapRef.current?.deactivate();
    };
  }, [isActive]);

  return containerRef;
};

/**
 * Hook for managing ARIA expanded state
 */
export const useAriaExpanded = (initialExpanded: boolean = false) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const triggerId = useRef(generateId('trigger'));
  const targetId = useRef(generateId('target'));

  const toggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const expand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const collapse = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return {
    isExpanded,
    toggle,
    expand,
    collapse,
    triggerProps: {
      id: triggerId.current,
      'aria-expanded': isExpanded,
      'aria-controls': targetId.current
    },
    targetProps: {
      id: targetId.current,
      'aria-labelledby': triggerId.current,
      hidden: !isExpanded
    }
  };
};

/**
 * Hook for screen reader announcements
 */
export const useScreenReader = () => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announceToScreenReader(message, priority);
  }, []);

  return { announce };
};

/**
 * Hook for keyboard navigation in lists or grids
 */
export const useKeyboardNavigation = (
  elements: HTMLElement[],
  options: {
    loop?: boolean;
    orientation?: 'horizontal' | 'vertical' | 'both';
  } = {}
) => {
  const { loop = true, orientation = 'both' } = options;
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigationHandlerRef = useRef<KeyboardNavigationHandler | null>(null);

  useEffect(() => {
    if (elements.length === 0) return;

    navigationHandlerRef.current = new KeyboardNavigationHandler(elements);

    return () => {
      navigationHandlerRef.current = null;
    };
  }, [elements]);

  const focusElement = useCallback((index: number) => {
    if (index >= 0 && index < elements.length) {
      elements[index].focus();
      setCurrentIndex(index);
    }
  }, [elements]);

  const focusNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < elements.length) {
      focusElement(nextIndex);
    } else if (loop) {
      focusElement(0);
    }
  }, [currentIndex, elements.length, loop, focusElement]);

  const focusPrevious = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      focusElement(prevIndex);
    } else if (loop) {
      focusElement(elements.length - 1);
    }
  }, [currentIndex, elements.length, loop, focusElement]);

  const focusFirst = useCallback(() => {
    focusElement(0);
  }, [focusElement]);

  const focusLast = useCallback(() => {
    focusElement(elements.length - 1);
  }, [elements.length, focusElement]);

  return {
    currentIndex,
    focusElement,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast
  };
};

/**
 * Hook for managing reduced motion preferences
 */
export const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReduced;
};

/**
 * Hook for managing high contrast preferences
 */
export const useHighContrast = () => {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersHighContrast(event.matches);
    };

    // Set initial value
    setPrefersHighContrast(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersHighContrast;
};

/**
 * Hook for managing live regions for dynamic content
 */
export const useLiveRegion = (initialMessage: string = '') => {
  const [message, setMessage] = useState(initialMessage);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const updateMessage = useCallback((newMessage: string, priority: 'polite' | 'assertive' = 'polite') => {
    setMessage(newMessage);
    
    if (liveRegionRef.current) {
      liveRegionRef.current.setAttribute('aria-live', priority);
    }
  }, []);

  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);

  return {
    message,
    updateMessage,
    clearMessage,
    liveRegionProps: {
      ref: liveRegionRef,
      'aria-live': 'polite' as const,
      'aria-atomic': true,
      className: 'sr-only'
    }
  };
};

/**
 * Hook for managing skip links
 */
export const useSkipLinks = (links: Array<{ href: string; label: string }>) => {
  useEffect(() => {
    const skipLinksContainer = document.createElement('div');
    skipLinksContainer.className = 'skip-links';
    skipLinksContainer.setAttribute('aria-hidden', 'true');

    links.forEach(({ href, label }) => {
      const skipLink = document.createElement('a');
      skipLink.href = href;
      skipLink.textContent = label;
      skipLink.className = 'skip-link';
      skipLink.style.cssText = `
        background: #000;
        color: #fff;
        padding: 12px 20px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        white-space: nowrap;
      `;

      skipLink.addEventListener('focus', () => {
        skipLinksContainer.setAttribute('aria-hidden', 'false');
      });

      skipLink.addEventListener('blur', () => {
        skipLinksContainer.setAttribute('aria-hidden', 'true');
      });

      skipLinksContainer.appendChild(skipLink);
    });

    document.body.insertBefore(skipLinksContainer, document.body.firstChild);

    return () => {
      if (skipLinksContainer.parentNode) {
        skipLinksContainer.parentNode.removeChild(skipLinksContainer);
      }
    };
  }, [links]);
};

/**
 * Hook for managing form accessibility
 */
export const useFormAccessibility = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const errorIdPrefix = useRef(generateId('error'));

  const setFieldError = useCallback((fieldName: string, errorMessage: string) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }));
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const getFieldProps = useCallback((fieldName: string) => {
    const hasError = fieldName in errors;
    const errorId = `${errorIdPrefix.current}-${fieldName}`;

    return {
      'aria-invalid': hasError,
      'aria-describedby': hasError ? errorId : undefined,
      errorId: hasError ? errorId : undefined,
      errorMessage: errors[fieldName]
    };
  }, [errors]);

  return {
    errors,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    getFieldProps,
    hasErrors: Object.keys(errors).length > 0
  };
};

/**
 * Hook for managing color scheme preferences
 */
export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | 'no-preference'>('no-preference');

  useEffect(() => {
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)');
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateColorScheme = () => {
      if (darkQuery.matches) {
        setColorScheme('dark');
      } else if (lightQuery.matches) {
        setColorScheme('light');
      } else {
        setColorScheme('no-preference');
      }
    };

    // Set initial value
    updateColorScheme();

    // Listen for changes
    lightQuery.addEventListener('change', updateColorScheme);
    darkQuery.addEventListener('change', updateColorScheme);

    return () => {
      lightQuery.removeEventListener('change', updateColorScheme);
      darkQuery.removeEventListener('change', updateColorScheme);
    };
  }, []);

  return colorScheme;
};

export default {
  useFocusTrap,
  useAriaExpanded,
  useScreenReader,
  useKeyboardNavigation,
  useReducedMotion,
  useHighContrast,
  useLiveRegion,
  useSkipLinks,
  useFormAccessibility,
  useColorScheme
};