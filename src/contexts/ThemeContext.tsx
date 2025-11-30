import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Theme type definitions
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
}

export interface ThemeGradients {
  primary: string;
  secondary: string;
  accent: string;
  hero: string;
}

export interface Theme {
  colors: ThemeColors;
  gradients: ThemeGradients;
}

export interface ThemeConfig {
  light: Theme;
  dark: Theme;
}

// Theme configuration with color schemes and gradients
const themeConfig: ThemeConfig = {
  light: {
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      accent: '#06b6d4',
      border: '#e2e8f0',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      accent: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      hero: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #be185d 100%)',
    },
  },
  dark: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      accent: '#06b6d4',
      border: '#334155',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      accent: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      hero: 'linear-gradient(135deg, #1e3a8a 0%, #7c2d12 50%, #be123c 100%)',
    },
  },
};

// Theme context interface
export interface ThemeContextType {
  theme: ThemeMode;
  themeConfig: Theme;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

// Local storage key for theme persistence
const THEME_STORAGE_KEY = 'portfolio-theme';

// Get system theme preference
const getSystemTheme = (): ThemeMode => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// Get stored theme or system preference
const getInitialTheme = (defaultTheme?: ThemeMode): ThemeMode => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
      return storedTheme;
    }
  }
  return defaultTheme || getSystemTheme();
};

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme 
}) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => 
    getInitialTheme(defaultTheme)
  );

  // Update CSS custom properties when theme changes
  useEffect(() => {
    const currentTheme = themeConfig[theme];
    const root = document.documentElement;

    // Set color custom properties
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Set gradient custom properties
    Object.entries(currentTheme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });

    // Set theme mode for CSS
    root.setAttribute('data-theme', theme);
    
    // Update document class for theme-specific styling
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  // Persist theme to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        // Only update if no theme is stored (user hasn't made a choice)
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (!storedTheme) {
          setThemeState(e.matches ? 'dark' : 'light');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const toggleTheme = () => {
    setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const contextValue: ThemeContextType = {
    theme,
    themeConfig: themeConfig[theme],
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export theme configuration for external use
export { themeConfig };