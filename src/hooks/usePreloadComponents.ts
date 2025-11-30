import { useEffect } from 'react';

export const usePreloadComponents = () => {
  useEffect(() => {
    // Preload non-critical components after initial render
    const preloadComponents = async () => {
      // Use requestIdleCallback if available, otherwise setTimeout
      const schedulePreload = (callback: () => void) => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(callback);
        } else {
          setTimeout(callback, 100);
        }
      };

      schedulePreload(() => {
        // Preload About component
        import('../components/sections/About');
      });

      schedulePreload(() => {
        // Preload Skills component
        import('../components/sections/Skills');
      });

      schedulePreload(() => {
        // Preload Projects component
        import('../components/sections/Projects');
      });

      schedulePreload(() => {
        // Preload Resume component
        import('../components/sections/Resume');
      });

      schedulePreload(() => {
        // Preload Blog component
        import('../components/sections/Blog');
      });

      schedulePreload(() => {
        // Preload Contact component
        import('../components/sections/Contact');
      });

      // Preload global styles after critical components
      schedulePreload(() => {
        import('../styles/globals.scss');
      });
    };

    preloadComponents();
  }, []);
};