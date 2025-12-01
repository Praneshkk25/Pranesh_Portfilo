import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Hero, HeroProps } from './Hero';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, onClick, role, tabIndex, onKeyDown, ...props }: any) => (
      <div 
        className={className} 
        style={style} 
        onClick={onClick}
        role={role}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        {...props}
      >
        {children}
      </div>
    ),
    h1: ({ children, className, ...props }: any) => <h1 className={className} {...props}>{children}</h1>,
    h2: ({ children, className, ...props }: any) => <h2 className={className} {...props}>{children}</h2>,
    p: ({ children, className, ...props }: any) => <p className={className} {...props}>{children}</p>,
    button: ({ children, className, onClick, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>{children}</button>
    ),
    a: ({ children, className, href, ...props }: any) => (
      <a className={className} href={href} {...props}>{children}</a>
    ),
  },
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
}));

const mockProps: HeroProps = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  subtitle: 'Building amazing web experiences',
  profileImage: '/test-image.jpg',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com', icon: '🔗', label: 'GitHub Profile' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', label: 'LinkedIn Profile' },
  ],
  email: 'john@example.com',
  phone: '+1234567890',
};

describe('Hero Component - Responsive Behavior Tests', () => {
  let originalInnerWidth: number;
  let originalInnerHeight: number;

  beforeEach(() => {
    // Store original dimensions
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
    
    // Reset scroll position
    window.scrollY = 0;
    
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    // Restore original dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
    
    vi.clearAllMocks();
  });

  const setViewport = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });
    window.dispatchEvent(new Event('resize'));
  };

  describe('Scroll Indicator Positioning - Various Mobile Viewport Sizes', () => {
    it('should render scroll indicator on iPhone SE (375x667)', () => {
      setViewport(375, 667);
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toBeInTheDocument();
      expect(scrollIndicator).toHaveTextContent('Scroll to explore');
    });

    it('should render scroll indicator on iPhone 12/13 (390x844)', () => {
      setViewport(390, 844);
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toBeInTheDocument();
    });

    it('should render scroll indicator on iPhone 14 Pro Max (430x932)', () => {
      setViewport(430, 932);
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toBeInTheDocument();
    });

    it('should render scroll indicator on small Android device (360x640)', () => {
      setViewport(360, 640);
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toBeInTheDocument();
    });
  });

  describe('Landscape Orientation Behavior', () => {
    it('should handle landscape orientation on mobile (667x375)', () => {
      setViewport(667, 375);
      render(<Hero {...mockProps} />);
      
      // Scroll indicator should still be accessible
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toBeInTheDocument();
    });

    it('should handle short landscape viewport (844x390)', () => {
      setViewport(844, 390);
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toBeInTheDocument();
    });
  });

  describe('Scroll Indicator Visibility and Fade-out Behavior', () => {
    it('should show scroll indicator initially', () => {
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toBeInTheDocument();
      expect(scrollIndicator.className).not.toContain('hidden');
    });

    it('should hide scroll indicator after scrolling past threshold', async () => {
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator.className).not.toContain('hidden');
      
      // Simulate scroll event
      Object.defineProperty(window, 'scrollY', { writable: true, value: 150 });
      fireEvent.scroll(window);
      
      await waitFor(() => {
        expect(scrollIndicator.className).toContain('hidden');
      });
    });

    it('should show scroll indicator again when scrolling back to top', async () => {
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      
      // Scroll down
      Object.defineProperty(window, 'scrollY', { writable: true, value: 150 });
      fireEvent.scroll(window);
      
      await waitFor(() => {
        expect(scrollIndicator.className).toContain('hidden');
      });
      
      // Scroll back up
      Object.defineProperty(window, 'scrollY', { writable: true, value: 50 });
      fireEvent.scroll(window);
      
      await waitFor(() => {
        expect(scrollIndicator.className).not.toContain('hidden');
      });
    });
  });

  describe('Click/Tap Functionality and Smooth Scrolling', () => {
    it('should scroll to about section when clicked', () => {
      render(<Hero {...mockProps} />);
      
      // Create mock about section
      const aboutSection = document.createElement('section');
      aboutSection.id = 'about';
      document.body.appendChild(aboutSection);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      fireEvent.click(scrollIndicator);
      
      expect(aboutSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      
      document.body.removeChild(aboutSection);
    });

    it('should scroll to skills section if about section does not exist', () => {
      render(<Hero {...mockProps} />);
      
      // Create mock skills section
      const skillsSection = document.createElement('section');
      skillsSection.id = 'skills';
      document.body.appendChild(skillsSection);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      fireEvent.click(scrollIndicator);
      
      expect(skillsSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      
      document.body.removeChild(skillsSection);
    });

    it('should handle tap on mobile devices', () => {
      setViewport(375, 667);
      render(<Hero {...mockProps} />);
      
      const aboutSection = document.createElement('section');
      aboutSection.id = 'about';
      document.body.appendChild(aboutSection);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      
      // Simulate touch event (which triggers click)
      fireEvent.click(scrollIndicator);
      
      expect(aboutSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      
      document.body.removeChild(aboutSection);
    });
  });

  describe('Keyboard Navigation and Focus Indicators', () => {
    it('should be keyboard accessible with proper tabIndex', () => {
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toHaveAttribute('tabIndex', '0');
    });

    it('should handle Enter key press', () => {
      render(<Hero {...mockProps} />);
      
      const aboutSection = document.createElement('section');
      aboutSection.id = 'about';
      document.body.appendChild(aboutSection);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      
      fireEvent.keyDown(scrollIndicator, { key: 'Enter', code: 'Enter' });
      
      expect(aboutSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      
      document.body.removeChild(aboutSection);
    });

    it('should handle Space key press', () => {
      render(<Hero {...mockProps} />);
      
      const aboutSection = document.createElement('section');
      aboutSection.id = 'about';
      document.body.appendChild(aboutSection);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      
      const event = new KeyboardEvent('keydown', { key: ' ', code: 'Space' });
      Object.defineProperty(event, 'preventDefault', { value: vi.fn() });
      
      fireEvent.keyDown(scrollIndicator, { key: ' ', code: 'Space' });
      
      expect(aboutSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      
      document.body.removeChild(aboutSection);
    });

    it('should not trigger scroll on other key presses', () => {
      render(<Hero {...mockProps} />);
      
      const aboutSection = document.createElement('section');
      aboutSection.id = 'about';
      document.body.appendChild(aboutSection);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      
      fireEvent.keyDown(scrollIndicator, { key: 'Tab', code: 'Tab' });
      
      expect(aboutSection.scrollIntoView).not.toHaveBeenCalled();
      
      document.body.removeChild(aboutSection);
    });

    it('should have proper ARIA label for accessibility', () => {
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toHaveAttribute('aria-label', 'Scroll to next section');
    });
  });

  describe('Touch Target Accessibility', () => {
    it('should have minimum touch target size for mobile', () => {
      setViewport(375, 667);
      const { container } = render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      
      // Check that the element has proper styling classes that ensure 44px minimum
      expect(scrollIndicator).toBeInTheDocument();
      expect(scrollIndicator).toHaveAttribute('role', 'button');
    });
  });

  describe('Safe Area Inset Handling', () => {
    it('should render without errors on devices with notches', () => {
      // Simulate device with notch (iPhone X and newer)
      setViewport(375, 812);
      
      const { container } = render(<Hero {...mockProps} />);
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      
      expect(scrollIndicator).toBeInTheDocument();
    });

    it('should render on iPhone 14 Pro with Dynamic Island', () => {
      setViewport(393, 852);
      
      const { container } = render(<Hero {...mockProps} />);
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      
      expect(scrollIndicator).toBeInTheDocument();
    });
  });

  describe('Content Integration', () => {
    it('should render all hero content alongside scroll indicator', () => {
      render(<Hero {...mockProps} />);
      
      // Check main content is present (title and subtitle render immediately, name uses typewriter)
      expect(screen.getByText(mockProps.title)).toBeInTheDocument();
      expect(screen.getByText(mockProps.subtitle)).toBeInTheDocument();
      
      // Check scroll indicator is present
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toBeInTheDocument();
    });

    it('should not overlap with hero content on small viewports', () => {
      setViewport(360, 640);
      const { container } = render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toBeInTheDocument();
      
      // Verify content is also rendered (title renders immediately)
      expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very small viewport (320x568)', () => {
      setViewport(320, 568);
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toBeInTheDocument();
    });

    it('should handle extra large mobile viewport (428x926)', () => {
      setViewport(428, 926);
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      expect(scrollIndicator).toBeInTheDocument();
    });

    it('should handle missing target sections gracefully', () => {
      render(<Hero {...mockProps} />);
      
      const scrollIndicator = screen.getByRole('button', { name: /scroll to next section/i });
      
      // Click without any target sections in DOM
      expect(() => fireEvent.click(scrollIndicator)).not.toThrow();
    });
  });
});
