# Testing Suite Documentation

## Overview

This testing suite provides comprehensive coverage for the portfolio website, including unit tests, integration tests, and accessibility compliance tests.

## Test Structure

### Unit Tests
- **ThemeContext Tests**: `src/contexts/__tests__/ThemeContext.test.tsx`
  - Theme switching functionality
  - localStorage persistence
  - CSS custom properties updates
  - Error handling

- **ContactForm Tests**: `src/components/sections/Contact/__tests__/ContactForm.test.tsx`
  - Form validation (email, required fields, length limits)
  - Form submission handling
  - Accessibility attributes
  - Error message display

- **Navigation Tests**: `src/components/common/Navigation/__tests__/Navigation.test.tsx`
  - Navigation functionality
  - Mobile menu behavior
  - Keyboard navigation
  - Accessibility compliance

### Integration Tests
- **Basic Integration Tests**: `src/test/integration/basic-integration.test.tsx`
  - Theme integration across components
  - Responsive behavior testing
  - Accessibility integration
  - Performance testing
  - Cross-browser compatibility
  - Error handling

### Additional Test Files
- **Responsive Tests**: `src/test/integration/responsive.test.tsx`
- **Accessibility Tests**: `src/test/integration/accessibility.test.tsx`
- **Performance Tests**: `src/test/integration/performance.test.tsx`

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test Files
```bash
# Theme context tests
npm test -- src/contexts/__tests__/ThemeContext.test.tsx

# Integration tests
npm test -- src/test/integration/basic-integration.test.tsx

# Contact form tests (requires SASS fixes)
npm test -- src/components/sections/Contact/__tests__/ContactForm.test.tsx
```

### With Coverage
```bash
npm run test:coverage
```

## Test Configuration

- **Framework**: Vitest
- **Testing Library**: @testing-library/react
- **Environment**: jsdom
- **Coverage**: v8 provider
- **Setup**: `src/test/setup.ts`

## Coverage Thresholds

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Known Issues

Some tests may fail due to SASS compilation issues with missing mixins in the existing codebase. The core functionality tests (ThemeContext and basic integration) work correctly.

## Test Features Covered

### Functionality
- ✅ Theme switching and persistence
- ✅ Form validation and submission
- ✅ Navigation behavior
- ✅ Component integration

### Accessibility
- ✅ ARIA attributes and roles
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management

### Performance
- ✅ Render performance
- ✅ Interaction responsiveness
- ✅ Memory leak prevention
- ✅ Animation efficiency

### Responsive Design
- ✅ Multiple viewport sizes
- ✅ Media query handling
- ✅ Touch target sizing
- ✅ Cross-device compatibility

### Error Handling
- ✅ Graceful degradation
- ✅ Component error boundaries
- ✅ Network error handling
- ✅ Browser compatibility