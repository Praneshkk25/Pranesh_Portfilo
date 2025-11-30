// Accessibility Utilities for WCAG 2.1 Compliance

// ============================================================================
// FOCUS MANAGEMENT
// ============================================================================

/**
 * Focus trap for modals and overlays
 */
export class FocusTrap {
  private element: HTMLElement;
  private focusableElements: HTMLElement[] = [];
  private firstFocusableElement: HTMLElement | null = null;
  private lastFocusableElement: HTMLElement | null = null;
  private previousActiveElement: Element | null = null;

  constructor(element: HTMLElement) {
    this.element = element;
    this.updateFocusableElements();
  }

  private updateFocusableElements(): void {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    this.focusableElements = Array.from(
      this.element.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];

    this.firstFocusableElement = this.focusableElements[0] || null;
    this.lastFocusableElement = 
      this.focusableElements[this.focusableElements.length - 1] || null;
  }

  public activate(): void {
    this.previousActiveElement = document.activeElement;
    this.element.addEventListener('keydown', this.handleKeyDown);
    
    // Focus the first focusable element
    if (this.firstFocusableElement) {
      this.firstFocusableElement.focus();
    }
  }

  public deactivate(): void {
    this.element.removeEventListener('keydown', this.handleKeyDown);
    
    // Restore focus to the previously active element
    if (this.previousActiveElement && 'focus' in this.previousActiveElement) {
      (this.previousActiveElement as HTMLElement).focus();
    }
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return;

    if (this.focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey) {
      // Shift + Tab (backward)
      if (document.activeElement === this.firstFocusableElement) {
        event.preventDefault();
        this.lastFocusableElement?.focus();
      }
    } else {
      // Tab (forward)
      if (document.activeElement === this.lastFocusableElement) {
        event.preventDefault();
        this.firstFocusableElement?.focus();
      }
    }
  };
}

/**
 * Skip link functionality for keyboard navigation
 */
export const createSkipLink = (targetId: string, text: string = 'Skip to main content'): HTMLElement => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link';
  
  // Style the skip link (initially hidden)
  Object.assign(skipLink.style, {
    position: 'absolute',
    top: '-40px',
    left: '6px',
    background: '#000',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: '500',
    zIndex: '9999',
    transition: 'top 0.3s ease'
  });

  // Show on focus
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  return skipLink;
};

// ============================================================================
// ARIA UTILITIES
// ============================================================================

/**
 * Generate unique IDs for ARIA relationships
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Announce content to screen readers
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  
  // Add screen reader only styles
  Object.assign(announcement.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0'
  });

  document.body.appendChild(announcement);
  
  // Announce the message
  announcement.textContent = message;
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Set up ARIA expanded state for collapsible elements
 */
export const setupAriaExpanded = (trigger: HTMLElement, target: HTMLElement): void => {
  const isExpanded = !target.hidden;
  trigger.setAttribute('aria-expanded', isExpanded.toString());
  trigger.setAttribute('aria-controls', target.id || generateId('target'));
  
  if (!target.id) {
    target.id = generateId('target');
  }
};

// ============================================================================
// KEYBOARD NAVIGATION
// ============================================================================

/**
 * Keyboard navigation handler for custom components
 */
export class KeyboardNavigationHandler {
  private elements: HTMLElement[] = [];
  private currentIndex: number = 0;

  constructor(elements: HTMLElement[]) {
    this.elements = elements;
    this.setupKeyboardListeners();
  }

  private setupKeyboardListeners(): void {
    this.elements.forEach((element, index) => {
      element.addEventListener('keydown', (event) => {
        this.handleKeyDown(event, index);
      });
    });
  }

  private handleKeyDown(event: KeyboardEvent, currentIndex: number): void {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentIndex + 1) % this.elements.length;
        break;
      
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex === 0 ? this.elements.length - 1 : currentIndex - 1;
        break;
      
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      
      case 'End':
        event.preventDefault();
        newIndex = this.elements.length - 1;
        break;
      
      default:
        return;
    }

    this.focusElement(newIndex);
  }

  private focusElement(index: number): void {
    this.currentIndex = index;
    this.elements[index].focus();
  }

  public updateElements(elements: HTMLElement[]): void {
    this.elements = elements;
    this.currentIndex = 0;
  }
}

// ============================================================================
// COLOR CONTRAST UTILITIES
// ============================================================================

/**
 * Calculate color contrast ratio
 */
export const calculateContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Calculate relative luminance
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Check if color combination meets WCAG contrast requirements
 */
export const meetsContrastRequirement = (
  foreground: string, 
  background: string, 
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean => {
  const ratio = calculateContrastRatio(foreground, background);
  
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  } else {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5;
  }
};

// ============================================================================
// MOTION PREFERENCES
// ============================================================================

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Respect user's motion preferences in animations
 */
export const respectMotionPreference = (
  normalAnimation: () => void,
  reducedAnimation?: () => void
): void => {
  if (prefersReducedMotion()) {
    reducedAnimation?.();
  } else {
    normalAnimation();
  }
};

// ============================================================================
// FORM ACCESSIBILITY
// ============================================================================

/**
 * Enhanced form validation with accessibility features
 */
export class AccessibleFormValidator {
  private form: HTMLFormElement;
  private errorContainer: HTMLElement;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.errorContainer = this.createErrorContainer();
    this.setupFormValidation();
  }

  private createErrorContainer(): HTMLElement {
    const container = document.createElement('div');
    container.id = generateId('form-errors');
    container.setAttribute('role', 'alert');
    container.setAttribute('aria-live', 'assertive');
    container.className = 'form-errors';
    
    // Insert at the beginning of the form
    this.form.insertBefore(container, this.form.firstChild);
    
    return container;
  }

  private setupFormValidation(): void {
    this.form.addEventListener('submit', this.handleSubmit);
    
    // Add real-time validation for better UX
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input as HTMLInputElement));
      input.addEventListener('input', () => this.clearFieldError(input as HTMLInputElement));
    });
  }

  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    
    const errors = this.validateForm();
    
    if (errors.length > 0) {
      this.displayErrors(errors);
      this.focusFirstErrorField();
    } else {
      this.clearErrors();
      // Form is valid, proceed with submission
      announceToScreenReader('Form submitted successfully');
    }
  };

  private validateForm(): Array<{ field: string; message: string; element: HTMLInputElement }> {
    const errors: Array<{ field: string; message: string; element: HTMLInputElement }> = [];
    const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      const element = input as HTMLInputElement;
      const fieldErrors = this.validateField(element);
      errors.push(...fieldErrors);
    });
    
    return errors;
  }

  private validateField(element: HTMLInputElement): Array<{ field: string; message: string; element: HTMLInputElement }> {
    const errors: Array<{ field: string; message: string; element: HTMLInputElement }> = [];
    const fieldName = element.getAttribute('aria-label') || element.name || 'Field';
    
    // Required field validation
    if (element.hasAttribute('required') && !element.value.trim()) {
      errors.push({
        field: element.name,
        message: `${fieldName} is required`,
        element
      });
    }
    
    // Email validation
    if (element.type === 'email' && element.value && !this.isValidEmail(element.value)) {
      errors.push({
        field: element.name,
        message: `Please enter a valid email address`,
        element
      });
    }
    
    return errors;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private displayErrors(errors: Array<{ field: string; message: string; element: HTMLInputElement }>): void {
    // Clear previous errors
    this.clearErrors();
    
    // Create error list
    const errorList = document.createElement('ul');
    errorList.className = 'error-list';
    
    errors.forEach(error => {
      const listItem = document.createElement('li');
      listItem.textContent = error.message;
      errorList.appendChild(listItem);
      
      // Mark field as invalid
      error.element.setAttribute('aria-invalid', 'true');
      error.element.classList.add('error');
    });
    
    // Add heading and list to error container
    const heading = document.createElement('h3');
    heading.textContent = `Please correct the following ${errors.length} error${errors.length > 1 ? 's' : ''}:`;
    
    this.errorContainer.appendChild(heading);
    this.errorContainer.appendChild(errorList);
    this.errorContainer.style.display = 'block';
    
    // Announce errors to screen readers
    announceToScreenReader(`Form has ${errors.length} error${errors.length > 1 ? 's' : ''}. Please review and correct.`, 'assertive');
  }

  private clearErrors(): void {
    this.errorContainer.innerHTML = '';
    this.errorContainer.style.display = 'none';
    
    // Clear field error states
    const errorFields = this.form.querySelectorAll('[aria-invalid="true"]');
    errorFields.forEach(field => {
      field.removeAttribute('aria-invalid');
      field.classList.remove('error');
    });
  }

  private clearFieldError(element: HTMLInputElement): void {
    element.removeAttribute('aria-invalid');
    element.classList.remove('error');
  }

  private focusFirstErrorField(): void {
    const firstErrorField = this.form.querySelector('[aria-invalid="true"]') as HTMLElement;
    if (firstErrorField) {
      firstErrorField.focus();
    }
  }
}

// ============================================================================
// SCREEN READER UTILITIES
// ============================================================================

/**
 * Create screen reader only text
 */
export const createScreenReaderText = (text: string): HTMLElement => {
  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'sr-only';
  
  // Apply screen reader only styles
  Object.assign(span.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0'
  });
  
  return span;
};

/**
 * Update page title for screen readers
 */
export const updatePageTitle = (title: string, siteName: string = 'Portfolio'): void => {
  document.title = `${title} | ${siteName}`;
  
  // Also announce the page change to screen readers
  announceToScreenReader(`Navigated to ${title} page`);
};

// Export utilities
export default {
  FocusTrap,
  KeyboardNavigationHandler,
  AccessibleFormValidator,
  createSkipLink,
  generateId,
  announceToScreenReader,
  setupAriaExpanded,
  calculateContrastRatio,
  meetsContrastRequirement,
  prefersReducedMotion,
  respectMotionPreference,
  createScreenReaderText,
  updatePageTitle
};