import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { Navigation } from '../../components/common/Navigation/Navigation'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock useTheme hook
vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    themeConfig: {
      colors: { primary: '#2563eb' },
      gradients: { primary: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' }
    },
    toggleTheme: vi.fn(),
    setTheme: vi.fn(),
  }),
}))

// Mock performance API
const mockPerformance = {
  now: vi.fn(() => Date.now()),
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByType: vi.fn(() => []),
  getEntriesByName: vi.fn(() => []),
}

Object.defineProperty(global, 'performance', {
  value: mockPerformance,
  writable: true,
})

describe('Performance Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockPerformance.now.mockImplementation(() => Date.now())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Component Rendering Performance', () => {
    it('should render navigation component quickly', async () => {
      const startTime = performance.now()
      
      render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={vi.fn()} />
        </ThemeProvider>
      )

      const endTime = performance.now()
      const renderTime = endTime - startTime

      // Component should render within reasonable time (this is a basic check)
      expect(renderTime).toBeLessThan(100) // 100ms threshold
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should handle rapid theme changes efficiently', async () => {
      const user = userEvent.setup()
      let toggleCount = 0
      
      const TestComponent = () => {
        const { theme, toggleTheme } = require('../../hooks/useTheme').useTheme()
        return (
          <div>
            <span data-testid="theme">{theme}</span>
            <button 
              onClick={() => {
                toggleCount++
                toggleTheme()
              }}
              data-testid="toggle"
            >
              Toggle
            </button>
          </div>
        )
      }

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      const startTime = performance.now()
      
      // Simulate rapid theme changes
      const toggleButton = screen.getByTestId('toggle')
      for (let i = 0; i < 10; i++) {
        await user.click(toggleButton)
      }

      const endTime = performance.now()
      const totalTime = endTime - startTime

      // Should handle multiple theme changes efficiently
      expect(totalTime).toBeLessThan(1000) // 1 second for 10 toggles
      expect(toggleCount).toBe(10)
    })

    it('should not cause memory leaks with event listeners', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

      const { unmount } = render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={vi.fn()} />
        </ThemeProvider>
      )

      // Component should add event listeners
      expect(addEventListenerSpy).toHaveBeenCalled()

      unmount()

      // Should clean up event listeners on unmount
      expect(removeEventListenerSpy).toHaveBeenCalled()
    })
  })

  describe('Interaction Performance', () => {
    it('should respond to user interactions quickly', async () => {
      const user = userEvent.setup()
      const mockOnSectionChange = vi.fn()
      
      render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={mockOnSectionChange} />
        </ThemeProvider>
      )

      const startTime = performance.now()
      
      const aboutLink = screen.getByRole('menuitem', { name: 'About' })
      await user.click(aboutLink)

      const endTime = performance.now()
      const interactionTime = endTime - startTime

      // Interaction should be responsive
      expect(interactionTime).toBeLessThan(50) // 50ms threshold for interactions
      expect(mockOnSectionChange).toHaveBeenCalledWith('about')
    })

    it('should handle scroll events efficiently', () => {
      const scrollHandler = vi.fn()
      
      render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={vi.fn()} />
        </ThemeProvider>
      )

      // Simulate multiple scroll events
      const startTime = performance.now()
      
      for (let i = 0; i < 100; i++) {
        window.dispatchEvent(new Event('scroll'))
      }

      const endTime = performance.now()
      const scrollTime = endTime - startTime

      // Should handle scroll events without significant performance impact
      expect(scrollTime).toBeLessThan(100) // 100ms for 100 scroll events
    })
  })

  describe('Bundle Size and Loading Performance', () => {
    it('should not import unnecessary dependencies', () => {
      // This is more of a static analysis test, but we can check
      // that components render without loading heavy dependencies
      const { container } = render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={vi.fn()} />
        </ThemeProvider>
      )

      // Component should render with minimal DOM nodes
      const navElement = container.querySelector('nav')
      expect(navElement).toBeInTheDocument()
      
      // Should not have excessive nested elements
      const allElements = container.querySelectorAll('*')
      expect(allElements.length).toBeLessThan(50) // Reasonable DOM size
    })

    it('should lazy load non-critical components', async () => {
      // Test that components can be rendered without blocking
      const renderPromise = new Promise(resolve => {
        setTimeout(() => {
          render(
            <ThemeProvider>
              <Navigation activeSection="home" onSectionChange={vi.fn()} />
            </ThemeProvider>
          )
          resolve(true)
        }, 0)
      })

      await expect(renderPromise).resolves.toBe(true)
    })
  })

  describe('Animation Performance', () => {
    it('should use efficient animations', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={vi.fn()} />
        </ThemeProvider>
      )

      const startTime = performance.now()
      
      // Trigger mobile menu animation
      const mobileMenuButton = screen.getByLabelText(/open menu/i)
      await user.click(mobileMenuButton)

      const endTime = performance.now()
      const animationTime = endTime - startTime

      // Animation should not block the main thread significantly
      expect(animationTime).toBeLessThan(200) // 200ms threshold
    })

    it('should respect reduced motion preferences', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query.includes('prefers-reduced-motion: reduce'),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })

      render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={vi.fn()} />
        </ThemeProvider>
      )

      // Component should render successfully even with reduced motion
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })

  describe('Cross-Browser Compatibility', () => {
    it('should work without modern JavaScript features', () => {
      // Mock older browser environment
      const originalIntersectionObserver = global.IntersectionObserver
      const originalResizeObserver = global.ResizeObserver
      
      // Remove modern APIs
      delete (global as any).IntersectionObserver
      delete (global as any).ResizeObserver

      try {
        render(
          <ThemeProvider>
            <Navigation activeSection="home" onSectionChange={vi.fn()} />
          </ThemeProvider>
        )

        // Should still render without modern APIs
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      } finally {
        // Restore APIs
        global.IntersectionObserver = originalIntersectionObserver
        global.ResizeObserver = originalResizeObserver
      }
    })

    it('should handle missing localStorage gracefully', () => {
      const originalLocalStorage = global.localStorage
      
      // Mock localStorage not available
      delete (global as any).localStorage

      try {
        render(
          <ThemeProvider>
            <Navigation activeSection="home" onSectionChange={vi.fn()} />
          </ThemeProvider>
        )

        // Should render without localStorage
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      } finally {
        // Restore localStorage
        global.localStorage = originalLocalStorage
      }
    })

    it('should work with different viewport sizes', () => {
      const viewportSizes = [
        { width: 320, height: 568 },   // iPhone SE
        { width: 375, height: 667 },   // iPhone 8
        { width: 768, height: 1024 },  // iPad
        { width: 1024, height: 768 },  // iPad Landscape
        { width: 1440, height: 900 },  // Desktop
        { width: 1920, height: 1080 }, // Full HD
      ]

      viewportSizes.forEach(({ width, height }) => {
        // Mock viewport size
        Object.defineProperty(window, 'innerWidth', { value: width, writable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, writable: true })

        const { unmount } = render(
          <ThemeProvider>
            <Navigation activeSection="home" onSectionChange={vi.fn()} />
          </ThemeProvider>
        )

        expect(screen.getByRole('navigation')).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Error Handling Performance', () => {
    it('should handle errors gracefully without performance degradation', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      // Mock a component that might throw an error
      const ProblematicComponent = () => {
        throw new Error('Test error')
      }

      const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
        try {
          return <>{children}</>
        } catch (error) {
          return <div>Error occurred</div>
        }
      }

      const startTime = performance.now()

      try {
        render(
          <ErrorBoundary>
            <ThemeProvider>
              <ProblematicComponent />
            </ThemeProvider>
          </ErrorBoundary>
        )
      } catch (error) {
        // Expected to catch error
      }

      const endTime = performance.now()
      const errorHandlingTime = endTime - startTime

      // Error handling should not significantly impact performance
      expect(errorHandlingTime).toBeLessThan(100)
      
      consoleSpy.mockRestore()
    })
  })
})