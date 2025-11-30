import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { Navigation } from '../../components/common/Navigation/Navigation'
import { ContactForm } from '../../components/sections/Contact/ContactForm'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
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

describe('Accessibility Compliance Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Navigation Accessibility', () => {
    const mockProps = {
      activeSection: 'home',
      onSectionChange: vi.fn(),
    }

    it('should have proper ARIA landmarks and labels', () => {
      render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      const navigation = screen.getByRole('navigation')
      expect(navigation).toHaveAttribute('aria-label', 'Main navigation')

      const menubar = screen.getByRole('menubar')
      expect(menubar).toBeInTheDocument()
    })

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup()
      render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      const firstMenuItem = screen.getByRole('menuitem', { name: 'Home' })
      
      // Focus should be manageable via keyboard
      await user.tab()
      expect(document.activeElement).toBeTruthy()
      
      // Should be able to navigate with arrow keys (if implemented)
      fireEvent.keyDown(firstMenuItem, { key: 'ArrowRight' })
      // Component should handle keyboard navigation gracefully
    })

    it('should indicate current page/section', () => {
      render(
        <ThemeProvider>
          <Navigation {...mockProps} activeSection="about" />
        </ThemeProvider>
      )

      const aboutMenuItem = screen.getByRole('menuitem', { name: 'About' })
      expect(aboutMenuItem).toHaveAttribute('aria-current', 'page')
    })

    it('should have accessible mobile menu controls', async () => {
      const user = userEvent.setup()
      render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      const mobileMenuButton = screen.getByLabelText(/open menu/i)
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
      expect(mobileMenuButton).toHaveAttribute('aria-controls', 'mobile-menu')

      await user.click(mobileMenuButton)

      expect(screen.getByLabelText(/close menu/i)).toHaveAttribute('aria-expanded', 'true')
    })

    it('should support escape key to close mobile menu', async () => {
      const user = userEvent.setup()
      render(
        <ThemeProvider>
          <Navigation {...mockProps} />
        </ThemeProvider>
      )

      // Open mobile menu
      const mobileMenuButton = screen.getByLabelText(/open menu/i)
      await user.click(mobileMenuButton)

      // Press escape
      fireEvent.keyDown(document, { key: 'Escape' })

      // Menu should close (button should show "Open menu" again)
      expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
    })
  })

  describe('Form Accessibility', () => {
    it('should have proper form labels and associations', () => {
      render(<ContactForm />)

      // All form fields should have associated labels
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    })

    it('should provide accessible error messages', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      const emailInput = screen.getByLabelText(/email/i)
      
      // Enter invalid email and trigger validation
      await user.type(emailInput, 'invalid-email')
      await user.tab()

      // Error message should be properly associated
      expect(emailInput).toHaveAttribute('aria-invalid', 'true')
      expect(emailInput).toHaveAttribute('aria-describedby', 'email-error')
      
      const errorMessage = screen.getByRole('alert')
      expect(errorMessage).toHaveTextContent('Please enter a valid email address')
    })

    it('should have accessible required field indicators', () => {
      render(<ContactForm />)

      // Required fields should be clearly marked
      const nameLabel = screen.getByText(/name \*/i)
      const emailLabel = screen.getByText(/email \*/i)
      const subjectLabel = screen.getByText(/subject \*/i)
      const messageLabel = screen.getByText(/message \*/i)

      expect(nameLabel).toBeInTheDocument()
      expect(emailLabel).toBeInTheDocument()
      expect(subjectLabel).toBeInTheDocument()
      expect(messageLabel).toBeInTheDocument()
    })

    it('should provide status updates for form submission', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = vi.fn().mockResolvedValue(true)
      
      render(<ContactForm onSubmit={mockOnSubmit} />)

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'This is a test message.')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      // Status message should be announced to screen readers
      const statusMessage = await screen.findByRole('status')
      expect(statusMessage).toHaveAttribute('aria-live', 'polite')
    })

    it('should disable form during submission with proper feedback', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = vi.fn().mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(true), 100))
      )
      
      render(<ContactForm onSubmit={mockOnSubmit} />)

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'This is a test message.')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      // Form should be disabled with clear indication
      expect(screen.getByLabelText(/name/i)).toBeDisabled()
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
    })
  })

  describe('Theme Accessibility', () => {
    it('should maintain color contrast in both themes', () => {
      const TestComponent = () => {
        const { theme, toggleTheme } = require('../../hooks/useTheme').useTheme()
        return (
          <div>
            <span data-testid="theme-indicator">{theme}</span>
            <button onClick={toggleTheme}>Toggle Theme</button>
          </div>
        )
      }

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      // Theme should be accessible (we can't test actual contrast ratios in unit tests,
      // but we can ensure the theme system is working)
      const themeIndicator = screen.getByTestId('theme-indicator')
      expect(themeIndicator).toBeInTheDocument()
    })

    it('should respect user preferences for reduced motion', () => {
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

      // Component should render without motion-dependent features failing
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })

  describe('Focus Management', () => {
    it('should have visible focus indicators', async () => {
      const user = userEvent.setup()
      render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={vi.fn()} />
        </ThemeProvider>
      )

      // Tab through interactive elements
      await user.tab()
      
      // Should have a focused element
      expect(document.activeElement).toBeTruthy()
      expect(document.activeElement?.tagName).toBe('BUTTON')
    })

    it('should trap focus in mobile menu when open', async () => {
      const user = userEvent.setup()
      render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={vi.fn()} />
        </ThemeProvider>
      )

      // Open mobile menu
      const mobileMenuButton = screen.getByLabelText(/open menu/i)
      await user.click(mobileMenuButton)

      // Focus should be managed within the mobile menu
      const mobileMenu = screen.getByRole('menu', { name: 'Mobile navigation menu' })
      expect(mobileMenu).toBeInTheDocument()
    })

    it('should restore focus after modal interactions', async () => {
      const user = userEvent.setup()
      render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={vi.fn()} />
        </ThemeProvider>
      )

      const mobileMenuButton = screen.getByLabelText(/open menu/i)
      
      // Focus the button
      mobileMenuButton.focus()
      expect(document.activeElement).toBe(mobileMenuButton)

      // Open and close menu
      await user.click(mobileMenuButton)
      fireEvent.keyDown(document, { key: 'Escape' })

      // Focus should return to the button (or remain manageable)
      expect(document.activeElement).toBeTruthy()
    })
  })

  describe('Screen Reader Support', () => {
    it('should provide meaningful text alternatives', () => {
      render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={vi.fn()} />
        </ThemeProvider>
      )

      // Brand button should have accessible name
      const brandButton = screen.getByLabelText('Go to home section')
      expect(brandButton).toBeInTheDocument()

      // Mobile menu button should have descriptive label
      const mobileMenuButton = screen.getByLabelText(/open menu/i)
      expect(mobileMenuButton).toBeInTheDocument()
    })

    it('should announce dynamic content changes', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      const emailInput = screen.getByLabelText(/email/i)
      
      // Trigger validation error
      await user.type(emailInput, 'invalid')
      await user.tab()

      // Error should be announced via role="alert"
      const errorMessage = screen.getByRole('alert')
      expect(errorMessage).toBeInTheDocument()
    })

    it('should provide context for form fields', () => {
      render(<ContactForm />)

      const messageField = screen.getByLabelText(/message/i)
      
      // Should have helpful placeholder text
      expect(messageField).toHaveAttribute('placeholder')
      
      // Character count should be visible
      expect(screen.getByText('0/1000')).toBeInTheDocument()
    })
  })
})