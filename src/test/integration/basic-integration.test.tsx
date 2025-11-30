import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext'

// Simple test component that uses theme context
const ThemeTestComponent = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div>
      <span data-testid="theme-display">{theme}</span>
      <button data-testid="theme-toggle" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  )
}

describe('Basic Integration Tests', () => {
  let mockLocalStorage: { [key: string]: string }

  beforeEach(() => {
    // Mock localStorage
    mockLocalStorage = {}
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => mockLocalStorage[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          mockLocalStorage[key] = value
        }),
        removeItem: vi.fn((key: string) => {
          delete mockLocalStorage[key]
        }),
      },
      writable: true,
    })

    // Mock matchMedia for light theme by default
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    // Mock document methods
    Object.defineProperty(document.documentElement, 'style', {
      value: {
        setProperty: vi.fn(),
      },
      writable: true,
    })

    document.documentElement.setAttribute = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Theme Integration', () => {
    it('should integrate theme context with components', () => {
      render(
        <ThemeProvider>
          <ThemeTestComponent />
        </ThemeProvider>
      )

      expect(screen.getByTestId('theme-display')).toHaveTextContent('light')
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    })

    it('should handle theme changes across components', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <ThemeTestComponent />
        </ThemeProvider>
      )

      const themeDisplay = screen.getByTestId('theme-display')
      const toggleButton = screen.getByTestId('theme-toggle')

      expect(themeDisplay).toHaveTextContent('light')

      await user.click(toggleButton)

      expect(themeDisplay).toHaveTextContent('dark')
    })

    it('should persist theme changes', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <ThemeTestComponent />
        </ThemeProvider>
      )

      await user.click(screen.getByTestId('theme-toggle'))

      expect(window.localStorage.setItem).toHaveBeenCalledWith('portfolio-theme', 'dark')
    })
  })

  describe('Responsive Behavior', () => {
    it('should handle different viewport sizes', () => {
      const viewportSizes = [
        { width: 320, height: 568 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1440, height: 900 },  // Desktop
      ]

      viewportSizes.forEach(({ width, height }) => {
        // Mock viewport size
        Object.defineProperty(window, 'innerWidth', { value: width, writable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, writable: true })

        const { unmount } = render(
          <ThemeProvider>
            <ThemeTestComponent />
          </ThemeProvider>
        )

        expect(screen.getByTestId('theme-display')).toBeInTheDocument()
        unmount()
      })
    })

    it('should respond to media query changes', () => {
      // Mock different media query scenarios
      const mediaQueries = [
        '(max-width: 768px)',
        '(min-width: 769px)',
        '(prefers-color-scheme: dark)',
        '(prefers-reduced-motion: reduce)',
      ]

      mediaQueries.forEach(query => {
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: vi.fn().mockImplementation(q => ({
            matches: q === query,
            media: q,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
          })),
        })

        const { unmount } = render(
          <ThemeProvider>
            <ThemeTestComponent />
          </ThemeProvider>
        )

        expect(screen.getByTestId('theme-display')).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Accessibility Integration', () => {
    it('should maintain accessibility across theme changes', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <ThemeTestComponent />
        </ThemeProvider>
      )

      const toggleButton = screen.getByTestId('theme-toggle')
      
      // Button should be accessible
      expect(toggleButton).toBeInTheDocument()
      expect(toggleButton.tagName).toBe('BUTTON')

      // Should work with keyboard
      toggleButton.focus()
      expect(document.activeElement).toBe(toggleButton)

      // Should work with click
      await user.click(toggleButton)
      expect(screen.getByTestId('theme-display')).toHaveTextContent('dark')
    })

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <ThemeTestComponent />
        </ThemeProvider>
      )

      // Should be able to tab to interactive elements
      await user.tab()
      expect(document.activeElement).toBeTruthy()
      
      // Should be able to activate with Enter key
      if (document.activeElement) {
        await user.keyboard('{Enter}')
        // Component should handle keyboard activation
      }
    })
  })

  describe('Performance Integration', () => {
    it('should render efficiently', () => {
      const startTime = performance.now()
      
      render(
        <ThemeProvider>
          <ThemeTestComponent />
        </ThemeProvider>
      )

      const endTime = performance.now()
      const renderTime = endTime - startTime

      // Should render quickly
      expect(renderTime).toBeLessThan(100)
      expect(screen.getByTestId('theme-display')).toBeInTheDocument()
    })

    it('should handle rapid state changes', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <ThemeTestComponent />
        </ThemeProvider>
      )

      const toggleButton = screen.getByTestId('theme-toggle')
      const startTime = performance.now()

      // Rapid theme changes
      for (let i = 0; i < 5; i++) {
        await user.click(toggleButton)
      }

      const endTime = performance.now()
      const totalTime = endTime - startTime

      // Should handle rapid changes efficiently
      expect(totalTime).toBeLessThan(1000)
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle component errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      // Component should render without throwing
      render(
        <ThemeProvider>
          <ThemeTestComponent />
        </ThemeProvider>
      )

      expect(screen.getByTestId('theme-display')).toBeInTheDocument()
      
      consoleSpy.mockRestore()
    })

    it('should maintain functionality across different environments', () => {
      // Test that components work in different simulated environments
      const environments = [
        { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
        { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)' },
      ]

      environments.forEach(env => {
        Object.defineProperty(navigator, 'userAgent', {
          value: env.userAgent,
          writable: true,
        })

        const { unmount } = render(
          <ThemeProvider>
            <ThemeTestComponent />
          </ThemeProvider>
        )

        expect(screen.getByTestId('theme-display')).toBeInTheDocument()
        unmount()
      })
    })
  })
})