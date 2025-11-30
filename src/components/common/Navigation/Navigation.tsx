import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import styles from './Navigation.module.scss';

// Navigation item interface
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

// Navigation component props
export interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

// Navigation items configuration
const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'resume', label: 'Resume', href: '#resume' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// Animation variants
const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
};

const mobileMenuVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const mobileItemVariants = {
  closed: { x: 50, opacity: 0 },
  open: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
};

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSectionChange,
  className = ''
}) => {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navigation background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll to section
  const handleNavClick = (item: NavigationItem) => {
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      onSectionChange(item.id);
    }
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        className={`${styles.navigation} ${isScrolled ? styles.scrolled : ''} ${className}`}
        variants={navVariants}
        initial="hidden"
        animate="visible"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.navContainer}>
          {/* Logo/Brand */}
          <motion.div 
            className={styles.brand}
            variants={itemVariants}
          >
            <button
              onClick={() => handleNavClick({ id: 'home', label: 'Home', href: '#home' })}
              className={styles.brandButton}
              aria-label="Go to home section"
            >
              <span className={styles.brandText}>PK</span>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.ul 
            className={styles.navList}
            variants={itemVariants}
            role="menubar"
          >
            {navigationItems.map((item) => (
              <motion.li 
                key={item.id}
                className={styles.navItem}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => handleNavClick(item)}
                  className={`${styles.navLink} ${
                    activeSection === item.id ? styles.active : ''
                  }`}
                  role="menuitem"
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span className={styles.navLinkText}>{item.label}</span>
                  <span className={styles.navLinkIndicator} />
                </button>
              </motion.li>
            ))}
          </motion.ul>

          {/* Mobile Menu Button */}
          <motion.button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variants={itemVariants}
            whileTap={{ scale: 0.9 }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`} />
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`} />
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              className={styles.mobileMenu}
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className={styles.mobileMenuContent}>
                <motion.ul className={styles.mobileNavList}>
                  {navigationItems.map((item) => (
                    <motion.li 
                      key={item.id}
                      className={styles.mobileNavItem}
                      variants={mobileItemVariants}
                    >
                      <button
                        onClick={() => handleNavClick(item)}
                        className={`${styles.mobileNavLink} ${
                          activeSection === item.id ? styles.active : ''
                        }`}
                        role="menuitem"
                      >
                        <span className={styles.mobileNavLinkText}>{item.label}</span>
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;