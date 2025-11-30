# Hero Section Component

The Hero section is the main landing area of Pranesh K K's portfolio website, featuring gradient backgrounds, parallax effects, and comprehensive personal information display.

## Features

### ✨ Visual Design
- **Animated gradient background** transitioning from deep blue to soft purple
- **Parallax scrolling effects** with floating background elements
- **Typewriter animation** for the name display
- **Glassmorphism effects** on social links and buttons
- **Responsive design** optimized for all screen sizes

### 🎯 Content Display
- **Name and title** with gradient text effects
- **Professional subtitle** (B.E Computer Science and Engineering)
- **Contact information** (email and phone with click-to-action)
- **Social media links** (GitHub, LinkedIn, Email, Phone)
- **Call-to-action buttons** (Get In Touch, View Resume)
- **Profile image** with hover effects and fallback placeholder

### 🚀 Animations
- **Framer Motion** powered animations
- **Staggered entrance** animations for content elements
- **Hover effects** on interactive elements
- **Scroll-based parallax** for background elements
- **Typewriter effect** for name display
- **Floating animations** for profile image

## Components

### Hero.tsx
Main Hero component with all visual and interactive features.

```typescript
interface HeroProps {
  name: string;
  title: string;
  subtitle: string;
  profileImage?: string;
  socialLinks: SocialLink[];
  email: string;
  phone: string;
  onContactClick?: () => void;
  onResumeClick?: () => void;
}
```

### HeroContainer.tsx
Container component that integrates with Pranesh's personal data.

### ProfilePlaceholder.tsx
Fallback component when no profile image is provided, displays initials with gradient styling.

## Usage

### Basic Usage
```typescript
import { HeroContainer } from './components/sections/Hero';

function App() {
  return (
    <div>
      <HeroContainer />
    </div>
  );
}
```

### Custom Usage
```typescript
import { Hero } from './components/sections/Hero';

const customSocialLinks = [
  {
    platform: "GitHub",
    url: "https://github.com/praneshkk210/Sub-repositories",
    icon: "🔗",
    label: "View GitHub repositories"
  }
];

function CustomHero() {
  return (
    <Hero
      name="PRANESH K K"
      title="Full Stack Developer"
      subtitle="B.E COMPUTER SCIENCE AND ENGINEERING"
      socialLinks={customSocialLinks}
      email="praneshkk210@gmail.com"
      phone="+91 9443125734"
    />
  );
}
```

## Personal Information Integration

The Hero section displays Pranesh's specific information:

### 👤 Personal Details
- **Name**: PRANESH K K
- **Title**: Full Stack Developer
- **Education**: B.E Computer Science and Engineering
- **Email**: praneshkk210@gmail.com
- **Phone**: +91 9443125734

### 🔗 Social Links
- **GitHub**: https://github.com/praneshkk210/Sub-repositories
- **LinkedIn**: Professional networking profile
- **Email**: Direct email contact
- **Phone**: Call/message functionality

### 🎓 Professional Highlights
- NPTEL certification in Python for Data Science
- Full-stack development experience
- Internship at VEERANA R&D INNOVATION 24/7
- Team leadership experience in multiple projects

## Styling

### SCSS Modules
- `Hero.module.scss` - Main component styles
- `ProfilePlaceholder.module.scss` - Placeholder component styles

### Theme Integration
- Uses CSS custom properties from the theme system
- Supports light/dark mode switching
- Responsive breakpoints for mobile, tablet, desktop
- High contrast mode support
- Reduced motion preferences

### Key Style Features
- Gradient backgrounds with animation
- Glassmorphism effects
- Smooth transitions and hover effects
- Typography with gradient text
- Responsive grid layout

## Accessibility

### ♿ Accessibility Features
- **Semantic HTML** structure
- **ARIA labels** for interactive elements
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** mode support
- **Reduced motion** preferences
- **Focus indicators** for all interactive elements

### Performance
- **Optimized animations** with Framer Motion
- **Lazy loading** for images
- **Responsive images** with proper sizing
- **Efficient CSS** with CSS Modules
- **Minimal bundle size** impact

## Requirements Fulfilled

This Hero component fulfills the following requirements:

### ✅ Requirement 1.1, 1.3, 1.4, 1.5
- Gradient background (deep blue to soft purple)
- Name display with typewriter animation
- Professional title and subtitle
- Parallax scrolling effects

### ✅ Requirement 8.1, 8.3
- GitHub link integration
- LinkedIn profile integration
- Email and phone display
- Call-to-action buttons with gradient borders

## Browser Support

- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile browsers** (iOS Safari, Chrome Mobile)
- **Progressive enhancement** for older browsers
- **Fallbacks** for unsupported features

## Future Enhancements

- Profile image upload functionality
- Dynamic social media integration
- Blog post preview integration
- Advanced animation customization
- Multi-language support