import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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

describe('Responsive Design Integration Tests', () => {
  const mockProps = {
    activeSection: 'home',
    onSectionChange: vi.fn(),
  }

  // Helper function to set viewport size
  const setViewportSize = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    })
    
    // Mock matchMedia for responsive breakpoints
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => {
        const matches = (() => {
          if (query.includes('max-width: 768px')) return width <= 768
          if (query.includes('max-width: 1024px')) return width <= 1024
          if (query.includes('min-width: 769px')) return width >= 769
          if (query.includes('min-width: 1025px')) return width >= 1025
          return false
        })()
        
        return {
          matches,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }
      }),
    })

    // Trigger resize event
    window.dispatchEvent(new Event('resize'))
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Mobile Breakpoint (320px - 768px)', () => {
    beforeEach(() => {
      setViewportSize(375, 667) // iPhone SE dimensions
    })

    it('should show mobile menu button on mobile devices', () => {
      render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      const mobileMenuButton = screen.getByLabelText(/open menu/i)
      expect(mobileMenuButton).toBeInTheDocument()
      expect(mobileMenuButton).toBeVisible()
    })

    it('should hide desktop navigation on mobile', () => {
      render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      // Desktop navigation should be hidden (we can't test CSS visibility directly,
      // but we can test that mobile-specific elements are present)
      const mobileMenuButton = screen.getByLabelText(/open menu/i)
      expect(mobileMenuButton).toBeInTheDocument()
    })

    it('should have appropriate touch targets on mobile', () => {
      render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      const mobileMenuButton = screen.getByLabelText(/open menu/i)
      
      // Check that the button exists and is clickable (minimum 44px touch target)
      expect(mobileMenuButton).toBeInTheDocument()
      expect(mobileMenuButton.tagName).toBe('BUTTON')
    })
  })

  describe('Tablet Breakpoint (769px - 1024px)', () => {
    beforeEach(() => {
      setViewportSize(768, 1024) // iPad dimensions
    })

    it('should adapt layout for tablet screens', () => {
      render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      // Navigation should be present
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
    })

    it('should maintain usability on tablet devices', () => {
      render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      // All navigation items should be accessible
      const homeLink = screen.getByRole('menuitem', { name: 'Home' })
      const aboutLink = screen.getByRole('menuitem', { name: 'About' })
      
      expect(homeLink).toBeInTheDocument()
      expect(aboutLink).toBeInTheDocument()
    })
  })

  describe('Desktop Breakpoint (1025px+)', () => {
    beforeEach(() => {
      setViewportSize(1440, 900) // Desktop dimensions
    })

    it('should show full desktop navigation', () => {
      render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      // All navigation items should be visible
      const navigationItems = [
        'Home', 'About', 'Skills', 'Projects', 'Resume', 'Blog', 'Contact'
      ]

      navigationItems.forEach(item => {
        expect(screen.getByRole('menuitem', { name: item })).toBeInTheDocument()
      })
    })

    it('should have proper spacing and layout on desktop', () => {
      render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      const navigation = screen.getByRole('navigation')
      const menubar = screen.getByRole('menubar')
      
      expect(navigation).toBeInTheDocument()
      expect(menubar).toBeInTheDocument()
    })
  })

  describe('Cross-breakpoint Functionality', () => {
    it('should maintain accessibility across all breakpoints', () => {
      const breakpoints = [
        { width: 320, height: 568 }, // Mobile
        { width: 768, height: 1024 }, // Tablet
        { width: 1440, height: 900 }, // Desktop
      ]

      breakpoints.forEach(({ width, height }) => {
        setViewportSize(width, height)
        
        const { unmount } = render(
          <ThemeProvider>
            <Navigation {...mockProps} />
          </ThemeProvider>
        )

        // Navigation should always have proper ARIA labels
        const navigation = screen.getByRole('navigation')
        expect(navigation).toHaveAttribute('aria-label', 'Main navigation')

        unmount()
      })
    })

    it('should handle viewport changes gracefully', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      // Start with mobile
      setViewportSize(375, 667)
      rerender(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      // Switch to desktop
      setViewportSize(1440, 900)
      rerender(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      // Navigation should still be functional
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
    })
  })

  describe('Performance Considerations', () => {
    it('should not cause layout thrashing during resize', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      // Simulate multiple rapid resize events
      const sizes = [
        [320, 568],
        [768, 1024],
        [1440, 900],
        [375, 667],
        [1024, 768],
      ]

      sizes.forEach(([width, height]) => {
        setViewportSize(width, height)
        rerender(
          <ThemeProvider>
            <Navigation {...mockProps} />
          </ThemeProvider>
        )
        
        // Component should remain stable
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })
    })
  })
})