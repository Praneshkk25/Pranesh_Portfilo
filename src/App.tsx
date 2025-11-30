import React, { useEffect, useState, Suspense, lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/common/Navigation';
import Hero from './components/sections/Hero';
import LoadingScreen from './components/common/LoadingScreen';
import SectionLoader from './components/common/SectionLoader';
import { useSEO } from './hooks/useSEO';
import { usePerformance } from './hooks/usePerformance';
import { useSkipLinks } from './hooks/useAccessibility';
import { usePreloadComponents } from './hooks/usePreloadComponents';
import { defaultSEOConfig, defaultPersonStructuredData } from './utils/seo';
import { personalInfo } from './data/personalInfo';
import './styles/critical.scss';
import './App.css';

// Lazy load non-critical components
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects').then(module => ({ default: module.Projects })));
const Resume = lazy(() => import('./components/sections/Resume'));
const Blog = lazy(() => import('./components/sections/Blog').then(module => ({ default: module.Blog })));
const Contact = lazy(() => import('./components/sections/Contact').then(module => ({ default: module.Contact })));

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // SEO optimization
  useSEO({
    title: 'Home',
    description: defaultSEOConfig.description,
    keywords: defaultSEOConfig.keywords,
    structuredData: defaultPersonStructuredData
  });

  // Performance monitoring
  const { metrics } = usePerformance({
    enableReporting: import.meta.env.PROD,
    onMetricsUpdate: (metrics) => {
      // In production, you could send these to analytics
      if (import.meta.env.DEV) {
        console.log('Performance metrics:', metrics);
      }
    }
  });

  // Skip links for accessibility
  useSkipLinks([
    { href: '#main-content', label: 'Skip to main content' },
    { href: '#hero', label: 'Skip to hero section' },
    { href: '#about', label: 'Skip to about section' },
    { href: '#skills', label: 'Skip to skills section' },
    { href: '#projects', label: 'Skip to projects section' },
    { href: '#resume', label: 'Skip to resume section' },
    { href: '#blog', label: 'Skip to blog section' },
    { href: '#contact', label: 'Skip to contact section' }
  ]);

  // Preload components for better performance
  usePreloadComponents();

  // Handle section changes for navigation
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // Intersection Observer for active section detection
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'resume', 'blog', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            setActiveSection(sectionId);
          }
        }
      });
    }, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Add structured data and meta tags
  useEffect(() => {
    // Add viewport meta tag for mobile optimization
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
      document.head.appendChild(meta);
    }

    // Add language attribute to html element
    document.documentElement.lang = 'en';

    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
    fontPreload.as = 'style';
    fontPreload.onload = () => {
      fontPreload.rel = 'stylesheet';
    };
    document.head.appendChild(fontPreload);

    // Hide loading screen after critical resources are ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider>
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="App">
        {/* Screen reader only heading for page structure */}
        <h1 className="sr-only">Pranesh K K - Full Stack Developer Portfolio</h1>
        
        {/* Navigation */}
        <Navigation 
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        
        {/* Main content with proper semantic structure */}
        <main id="main-content" role="main" tabIndex={-1}>
          {/* Hero Section - Load immediately */}
          <Hero
            name={personalInfo.name}
            title={personalInfo.title}
            subtitle={personalInfo.subtitle}
            profileImage={personalInfo.profileImage}
            socialLinks={personalInfo.socialLinks}
            email={personalInfo.email}
            phone={personalInfo.phone}
            onContactClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              setActiveSection('contact');
            }}
            onResumeClick={() => {
              document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' });
              setActiveSection('resume');
            }}
          />
          
          {/* Lazy loaded sections */}
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Resume />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Blog />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>

        {/* Performance metrics display in development */}
        {import.meta.env.DEV && (
          <div 
            style={{ 
              position: 'fixed', 
              bottom: '20px', 
              left: '20px', 
              background: 'rgba(0,0,0,0.8)', 
              color: 'white', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              zIndex: 9999
            }}
          >
            <div>FCP: {metrics.FCP?.toFixed(2)}ms</div>
            <div>LCP: {metrics.LCP?.toFixed(2)}ms</div>
            <div>FID: {metrics.FID?.toFixed(2)}ms</div>
            <div>CLS: {metrics.CLS?.toFixed(4)}</div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;