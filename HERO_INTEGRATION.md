# Hero Section Integration Guide

## Quick Start

To integrate the Hero section into your main App component:

### 1. Import the HeroContainer
```typescript
// src/App.tsx
import React from 'react';
import { HeroContainer } from './components/sections/Hero';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeroContainer />
      {/* Other sections will go here */}
    </div>
  );
}

export default App;
```

### 2. Ensure Theme Provider is Wrapped
```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
```

### 3. Add Profile Image (Optional)
Place a profile image at `public/images/pranesh-profile.jpg` or update the path in `HeroContainer.tsx`:

```typescript
// In HeroContainer.tsx, update this line:
const profileImageUrl = '/images/your-profile-image.jpg';
```

## What's Included

### ✅ Completed Features
- **Gradient background** with deep blue to soft purple transition
- **Typewriter animation** for "PRANESH K K" name display
- **Professional subtitle** showing "B.E COMPUTER SCIENCE AND ENGINEERING"
- **Parallax scrolling** background elements
- **Profile image** with hover effects (or initials placeholder)
- **Social links** including:
  - GitHub: https://github.com/praneshkk210/Sub-repositories
  - LinkedIn integration
  - Email: praneshkk210@gmail.com
  - Phone: +91 9443125734
- **Call-to-action buttons** with gradient borders:
  - "Get In Touch" (scrolls to contact section)
  - "View Resume" (scrolls to resume section)
- **Responsive design** for all screen sizes
- **Theme support** (light/dark mode)
- **Accessibility features** (WCAG 2.1 compliant)

### 🎨 Visual Effects
- Animated gradient backgrounds
- Floating parallax elements
- Glassmorphism effects on social links
- Smooth hover animations
- Typewriter text animation
- Profile image glow effects
- Scroll indicator with animation

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Proper spacing and typography scaling

## File Structure Created

```
src/
├── components/sections/Hero/
│   ├── Hero.tsx                 # Main Hero component
│   ├── Hero.module.scss         # Hero styles
│   ├── HeroContainer.tsx        # Container with Pranesh's data
│   ├── ProfilePlaceholder.tsx   # Fallback for profile image
│   ├── ProfilePlaceholder.module.scss
│   ├── HeroExample.tsx          # Usage example
│   ├── README.md               # Component documentation
│   └── index.ts                # Exports
├── data/
│   └── personalInfo.ts         # Pranesh's personal information
└── utils/
    └── animations.ts           # Animation presets and utilities
```

## Customization

### Update Personal Information
Edit `src/data/personalInfo.ts` to modify:
- Contact details
- Social media links
- Professional information
- Skills and certifications

### Modify Styling
Edit the SCSS modules to customize:
- Colors and gradients
- Animation timings
- Layout and spacing
- Typography

### Add Profile Image
1. Add image to `public/images/` folder
2. Update `profileImageUrl` in `HeroContainer.tsx`
3. Ensure image is optimized (recommended: 400x400px, WebP format)

## Next Steps

After integrating the Hero section, you can continue with other sections:
1. About section
2. Skills section  
3. Projects section
4. Resume section
5. Blog section
6. Contact section

Each section should follow similar patterns established in the Hero component for consistency.