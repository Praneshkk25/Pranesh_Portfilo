import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';

describe('ThemeContext', () => {
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {};
    globalThis.Storage.prototype.getItem = vi.fn((key: string) => localStorageMock[key] || null);
    globalThis.Storage.prototype.setItem = vi.fn((key: string, value: string) => {
      localStorageMock[key] = value;
    });
    globalThis.Storage.prototype.removeItem = vi.fn((key: string) => {
      delete localStorageMock[key];
    });
    globalThis.Storage.prototype.clear = vi.fn(() => {
      localStorageMock = {};
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.documentElement.removeAttribute('data-theme');
    document.body.className = '';
  });

  describe('ThemeProvider', () => {
    it('should render children correctly', () => {
      render(
        <ThemeProvider>
          <div>Test Content</div>
        </ThemeProvider>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should initialize with light theme by default', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.theme).toBe('light');
    });

    it('should initialize with provided default theme', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
        ),
      });

      expect(result.current.theme).toBe('dark');
    });

    it('should load theme from localStorage if available', () => {
      localStorageMock['portfolio-theme'] = 'dark';

      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.theme).toBe('dark');
    });

    it('should set data-theme attribute on document root', () => {
      renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should add theme class to document body', () => {
      renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(document.body.classList.contains('theme-light')).toBe(true);
    });

    it('should set CSS custom properties for colors', () => {
      renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      const root = document.documentElement;
      expect(root.style.getPropertyValue('--color-primary')).toBeTruthy();
      expect(root.style.getPropertyValue('--color-background')).toBeTruthy();
    });

    it('should set CSS custom properties for gradients', () => {
      renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      const root = document.documentElement;
      expect(root.style.getPropertyValue('--gradient-primary')).toBeTruthy();
      expect(root.style.getPropertyValue('--gradient-hero')).toBeTruthy();
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from light to dark theme', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('dark');
    });

    it('should toggle from dark to light theme', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
        ),
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
    });

    it('should persist theme to localStorage when toggled', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(localStorage.setItem).toHaveBeenCalledWith('portfolio-theme', 'dark');
    });

    it('should update data-theme attribute when toggled', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should update body class when toggled', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(document.body.classList.contains('theme-dark')).toBe(true);
      expect(document.body.classList.contains('theme-light')).toBe(false);
    });

    it('should update CSS custom properties when toggled', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      const root = document.documentElement;
      const lightPrimary = root.style.getPropertyValue('--color-primary');

      act(() => {
        result.current.toggleTheme();
      });

      const darkPrimary = root.style.getPropertyValue('--color-primary');
      expect(darkPrimary).not.toBe(lightPrimary);
    });
  });

  describe('setTheme', () => {
    it('should set theme to light', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
        ),
      });

      act(() => {
        result.current.setTheme('light');
      });

      expect(result.current.theme).toBe('light');
    });

    it('should set theme to dark', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
    });

    it('should persist theme to localStorage when set', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.setTheme('dark');
      });

      expect(localStorage.setItem).toHaveBeenCalledWith('portfolio-theme', 'dark');
    });
  });

  describe('themeConfig', () => {
    it('should provide correct theme configuration for light mode', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.themeConfig).toBeDefined();
      expect(result.current.themeConfig.colors).toBeDefined();
      expect(result.current.themeConfig.gradients).toBeDefined();
      expect(result.current.themeConfig.colors.primary).toBe('#2563eb');
    });

    it('should provide correct theme configuration for dark mode', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
        ),
      });

      expect(result.current.themeConfig.colors.primary).toBe('#3b82f6');
      expect(result.current.themeConfig.colors.background).toBe('#0f172a');
    });

    it('should update theme configuration when theme changes', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      const lightConfig = result.current.themeConfig;

      act(() => {
        result.current.toggleTheme();
      });

      const darkConfig = result.current.themeConfig;
      expect(darkConfig).not.toEqual(lightConfig);
    });
  });

  describe('useTheme hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => { });

      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within a ThemeProvider');

      consoleError.mockRestore();
    });

    it('should return theme context when used within ThemeProvider', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current).toBeDefined();
      expect(result.current.theme).toBeDefined();
      expect(result.current.toggleTheme).toBeDefined();
      expect(result.current.setTheme).toBeDefined();
      expect(result.current.themeConfig).toBeDefined();
    });
  });

  describe('System theme preference', () => {
    it('should detect dark mode system preference', () => {
      // Clear localStorage to ensure system preference is used
      localStorageMock = {};

      const matchMediaMock = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      window.matchMedia = matchMediaMock;

      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      // Should use system preference when no stored theme
      expect(result.current.theme).toBe('dark');
    });

    it('should prefer stored theme over system preference', () => {
      localStorageMock['portfolio-theme'] = 'light';

      const matchMediaMock = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      window.matchMedia = matchMediaMock;

      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.theme).toBe('light');
    });
  });

  describe('Theme persistence', () => {
    it('should persist theme across re-renders', () => {
      const { result, rerender } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.setTheme('dark');
      });

      rerender();

      expect(result.current.theme).toBe('dark');
    });

    it('should maintain theme after multiple toggles', async () => {
      // Clear localStorage to start fresh
      localStorageMock = {};

      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      const initialTheme = result.current.theme;

      await act(async () => {
        result.current.toggleTheme();
      });

      const firstToggle = result.current.theme;
      expect(firstToggle).not.toBe(initialTheme);

      await act(async () => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe(initialTheme);

      await act(async () => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe(firstToggle);
    });
  });
});
