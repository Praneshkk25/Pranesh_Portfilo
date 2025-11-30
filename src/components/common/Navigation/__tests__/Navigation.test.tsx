import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation, NavigationProps } from '../Navigation';
import { ThemeProvider } from '../../../../contexts/ThemeContext';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const renderNavigation = (props: Partial<NavigationProps> = {}) => {
  const defaultProps: NavigationProps = {
    activeSection: 'home',
    onSectionChange: vi.fn(),
    ...props,
  };

  return render(
    <ThemeProvider>
      <Navigation {...defaultProps} />
    </ThemeProvider>
  );
};

describe('Navigation', () => {
  let scrollIntoViewMock: any;

  beforeEach(() => {
    // Mock scrollIntoView
    scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    // Mock querySelector to return an element
    document.querySelector = vi.fn((selector: string) => {
      const mockElement = document.createElement('div');
      mockElement.scrollIntoView = scrollIntoViewMock;
      return mockElement;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = 'unset';
  });

  describe('Rendering', () => {
    it('should render navigation component', () => {
      renderNavigation();
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should render all navigation items', () => {
      renderNavigation();
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Resume')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should render brand logo', () => {
      renderNavigation();
      const brandButton = screen.getByLabelText('Go to home section');
      expect(brandButton).toBeInTheDocument();
      expect(screen.getByText('PK')).toBeInTheDocument();
    });

    it('should render mobile menu button', () => {
      renderNavigation();
      const mobileButton = screen.getByLabelText('Open menu');
      expect(mobileButton).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      renderNavigation({ className: 'custom-class' });
      const nav = screen.getByRole('navigation');
      expect(nav.className).toContain('custom-class');
    });
  });

  describe('Active Section Highlighting', () => {
    it('should highlight active section', () => {
      renderNavigation({ activeSection: 'skills' });
      
      const menuItems = screen.getAllByRole('menuitem');
      const skillsItem = menuItems.find(item => item.textContent === 'Skills');
      
      expect(skillsItem).toHaveAttribute('aria-current', 'page');
    });

    it('should not highlight inactive sections', () => {
      renderNavigation({ activeSection: 'home' });
      
      const menuItems = screen.getAllByRole('menuitem');
      const aboutItem = menuItems.find(item => item.textContent === 'About');
      
      expect(aboutItem).not.toHaveAttribute('aria-current');
    });

    it('should update active section when changed', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Navigation activeSection="home" onSectionChange={vi.fn()} />
        </ThemeProvider>
      );

      let menuItems = screen.getAllByRole('menuitem');
      let homeItem = menuItems.find(item => item.textContent === 'Home');
      expect(homeItem).toHaveAttribute('aria-current', 'page');

      rerender(
        <ThemeProvider>
          <Navigation activeSection="about" onSectionChange={vi.fn()} />
        </ThemeProvider>
      );

      menuItems = screen.getAllByRole('menuitem');
      const aboutItem = menuItems.find(item => item.textContent === 'About');
      expect(aboutItem).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Navigation Click Behavior', () => {
    it('should call onSectionChange when navigation item is clicked', async () => {
      const user = userEvent.setup();
      const onSectionChange = vi.fn();
      renderNavigation({ onSectionChange });

      const menuItems = screen.getAllByRole('menuitem');
      const aboutItem = menuItems.find(item => item.textContent === 'About');
      
      if (aboutItem) {
        await user.click(aboutItem);
        expect(onSectionChange).toHaveBeenCalledWith('about');
      }
    });

    it('should scroll to section when navigation item is clicked', async () => {
      const user = userEvent.setup();
      renderNavigation();

      const menuItems = screen.getAllByRole('menuitem');
      const skillsItem = menuItems.find(item => item.textContent === 'Skills');
      
      if (skillsItem) {
        await user.click(skillsItem);
        expect(scrollIntoViewMock).toHaveBeenCalledWith({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });

    it('should navigate to home when brand is clicked', async () => {
      const user = userEvent.setup();
      const onSectionChange = vi.fn();
      renderNavigation({ onSectionChange });

      const brandButton = screen.getByLabelText('Go to home section');
      await user.click(brandButton);

      expect(onSectionChange).toHaveBeenCalledWith('home');
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });

  describe('Scroll Behavior', () => {
    it('should add scrolled class when scrolled past threshold', async () => {
      renderNavigation();
      const nav = screen.getByRole('navigation');

      // Simulate scroll event
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));

      await waitFor(() => {
        expect(nav.className).toContain('scrolled');
      });
    });

    it('should not add scrolled class when not scrolled', () => {
      renderNavigation();
      const nav = screen.getByRole('navigation');

      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      window.dispatchEvent(new Event('scroll'));

      expect(nav.className).not.toContain('scrolled');
    });

    it('should remove scroll listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderNavigation();

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });

  describe('Mobile Menu', () => {
    it('should open mobile menu when hamburger is clicked', async () => {
      const user = userEvent.setup();
      renderNavigation();

      const mobileButton = screen.getByLabelText('Open menu');
      await user.click(mobileButton);

      await waitFor(() => {
        expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      });
    });

    it('should close mobile menu when hamburger is clicked again', async () => {
      const user = userEvent.setup();
      renderNavigation();

      const openButton = screen.getByLabelText('Open menu');
      await user.click(openButton);

      await waitFor(() => {
        expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText('Close menu');
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
      });
    });

    it('should close mobile menu when navigation item is clicked', async () => {
      const user = userEvent.setup();
      renderNavigation();

      // Open mobile menu
      const mobileButton = screen.getByLabelText('Open menu');
      await user.click(mobileButton);

      await waitFor(() => {
        expect(screen.getByRole('menu', { name: 'Mobile navigation menu' })).toBeInTheDocument();
      });

      // Click a navigation item in mobile menu
      const mobileMenu = screen.getByRole('menu', { name: 'Mobile navigation menu' });
      const menuItems = mobileMenu.querySelectorAll('button');
      
      if (menuItems.length > 0) {
        await user.click(menuItems[0]);

        await waitFor(() => {
          expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
        });
      }
    });

    it('should close mobile menu on Escape key', async () => {
      const user = userEvent.setup();
      renderNavigation();

      // Open mobile menu
      const mobileButton = screen.getByLabelText('Open menu');
      await user.click(mobileButton);

      await waitFor(() => {
        expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      });

      // Press Escape
      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
      });
    });

    it('should prevent body scroll when mobile menu is open', async () => {
      const user = userEvent.setup();
      renderNavigation();

      const mobileButton = screen.getByLabelText('Open menu');
      await user.click(mobileButton);

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });
    });

    it('should restore body scroll when mobile menu is closed', async () => {
      const user = userEvent.setup();
      renderNavigation();

      // Open menu
      const openButton = screen.getByLabelText('Open menu');
      await user.click(openButton);

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });

      // Close menu
      const closeButton = screen.getByLabelText('Close menu');
      await user.click(closeButton);

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('unset');
      });
    });

    it('should update aria-expanded attribute', async () => {
      const user = userEvent.setup();
      renderNavigation();

      const mobileButton = screen.getByLabelText('Open menu');
      expect(mobileButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(mobileButton);

      await waitFor(() => {
        const closeButton = screen.getByLabelText('Close menu');
        expect(closeButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderNavigation();

      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation');
      expect(screen.getByRole('menubar')).toBeInTheDocument();
    });

    it('should have proper role attributes for menu items', () => {
      renderNavigation();

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThan(0);
    });

    it('should have keyboard accessible navigation items', async () => {
      const user = userEvent.setup();
      const onSectionChange = vi.fn();
      renderNavigation({ onSectionChange });

      const menuItems = screen.getAllByRole('menuitem');
      const firstItem = menuItems[0];

      // Focus and press Enter
      firstItem.focus();
      await user.keyboard('{Enter}');

      expect(onSectionChange).toHaveBeenCalled();
    });

    it('should have proper aria-controls for mobile menu button', () => {
      renderNavigation();

      const mobileButton = screen.getByLabelText('Open menu');
      expect(mobileButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing section element gracefully', async () => {
      const user = userEvent.setup();
      document.querySelector = vi.fn(() => null);

      const onSectionChange = vi.fn();
      renderNavigation({ onSectionChange });

      const menuItems = screen.getAllByRole('menuitem');
      await user.click(menuItems[0]);

      // Should not throw error
      expect(onSectionChange).not.toHaveBeenCalled();
    });

    it('should handle rapid clicks on navigation items', async () => {
      const user = userEvent.setup();
      const onSectionChange = vi.fn();
      renderNavigation({ onSectionChange });

      const menuItems = screen.getAllByRole('menuitem');
      const firstItem = menuItems[0];

      // Click multiple times rapidly
      await user.click(firstItem);
      await user.click(firstItem);
      await user.click(firstItem);

      expect(onSectionChange).toHaveBeenCalledTimes(3);
    });

    it('should handle empty activeSection prop', () => {
      renderNavigation({ activeSection: '' });

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });
  });
});
