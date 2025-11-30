import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../Navigation';
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../../hooks/useTheme';
import styles from './Layout.module.scss';

// Layout component props
export interface LayoutProps {
  children: ReactNode;
  className?: string;
}

// Error boundary state
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Loading states
type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

// Section intersection observer hook
const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = 80; // Navigation height offset

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${navHeight}px 0px -50% 0px`,
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return activeSection;
};

// Loading component
const LoadingSpinner: React.FC = () => (
  <motion.div
    className={styles.loadingContainer}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className={styles.spinner} />
    <p className={styles.loadingText}>Loading...</p>
  </motion.div>
);

// Error fallback component
const ErrorFallback: React.FC<{ error: Error; onRetry: () => void }> = ({ 
  error, 
  onRetry 
}) => (
  <motion.div
    className={styles.errorContainer}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <div className={styles.errorContent}>
      <h2 className={styles.errorTitle}>Oops! Something went wrong</h2>
      <p className={styles.errorMessage}>
        {error.message || 'An unexpected error occurred'}
      </p>
      <button 
        className={styles.retryButton}
        onClick={onRetry}
      >
        Try Again
      </button>
    </div>
  </motion.div>
);

// Layout animations
const layoutVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
};

const contentVariants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className = '' 
}) => {
  const { theme } = useTheme();
  const activeSection = useActiveSection();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [errorState, setErrorState] = useState<ErrorBoundaryState>({
    hasError: false,
  });

  // Handle section change from navigation
  const handleSectionChange = useCallback((section: string) => {
    // This will be handled by the smooth scroll in Navigation component
    // We could add additional logic here if needed
  }, []);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('loaded');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Error boundary functionality
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      setErrorState({
        hasError: true,
        error: new Error(error.message),
      });
      setLoadingState('error');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setErrorState({
        hasError: true,
        error: new Error(event.reason?.message || 'Promise rejection'),
      });
      setLoadingState('error');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Handle retry after error
  const handleRetry = useCallback(() => {
    setErrorState({ hasError: false });
    setLoadingState('loading');
    
    // Simulate retry loading
    setTimeout(() => {
      setLoadingState('loaded');
    }, 1000);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            // Could open command palette or search
            break;
          case '/':
            e.preventDefault();
            // Could focus search input
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Skip to main content for accessibility
  const skipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`${styles.layout} ${className}`} data-theme={theme}>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className={styles.skipLink}
        onClick={(e) => {
          e.preventDefault();
          skipToMain();
        }}
      >
        Skip to main content
      </a>

      <AnimatePresence mode="wait">
        {loadingState === 'loading' && (
          <LoadingSpinner key="loading" />
        )}
        
        {loadingState === 'error' && errorState.hasError && errorState.error && (
          <ErrorFallback 
            key="error" 
            error={errorState.error} 
            onRetry={handleRetry} 
          />
        )}
        
        {loadingState === 'loaded' && !errorState.hasError && (
          <motion.div
            key="content"
            className={styles.layoutContent}
            variants={layoutVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Navigation */}
            <Navigation
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />

            {/* Theme Toggle - Positioned separately */}
            <div className={styles.themeToggleContainer}>
              <ThemeToggle size="medium" />
            </div>

            {/* Main Content */}
            <motion.main
              id="main-content"
              className={styles.mainContent}
              variants={contentVariants}
              tabIndex={-1}
            >
              {children}
            </motion.main>

            {/* Footer */}
            <motion.footer 
              className={styles.footer}
              variants={contentVariants}
            >
              <div className={styles.footerContent}>
                <p className={styles.footerText}>
                  © {new Date().getFullYear()} Pranesh K K. All rights reserved.
                </p>
                <div className={styles.footerLinks}>
                  <a 
                    href="https://github.com/praneshkk210/Sub-repositories" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                  >
                    GitHub
                  </a>
                  <a 
                    href="mailto:praneshkk210@gmail.com" 
                    className={styles.footerLink}
                  >
                    Email
                  </a>
                </div>
              </div>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background gradient overlay */}
      <div className={styles.backgroundGradient} />
    </div>
  );
};

export default Layout;