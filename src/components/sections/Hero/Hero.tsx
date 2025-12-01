import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { heroAnimations, parallaxElements } from '../../../utils/animations';
import { ProfilePlaceholder } from './ProfilePlaceholder';
import styles from './Hero.module.scss';

// Interface definitions
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface HeroProps {
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

// Typewriter component for animated text
const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ 
  text, 
  delay = 0 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100 + delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className={styles.typewriter}>
      {displayText}
      <span className={styles.cursor}>|</span>
    </span>
  );
};

// Parallax background element component
const ParallaxElement: React.FC<{
  className: string;
  animationType: 'slow' | 'medium' | 'fast';
}> = ({ className, animationType }) => {
  return (
    <motion.div
      className={`${styles.parallaxElement} ${className}`}
      variants={parallaxElements[animationType]}
      animate="animate"
    />
  );
};

// Main Hero component
export const Hero: React.FC<HeroProps> = ({
  name,
  title,
  subtitle,
  profileImage,
  socialLinks,
  email,
  phone,
  onContactClick,
  onResumeClick
}) => {
  const { scrollY } = useScroll();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Parallax transforms for different elements
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  const contentY = useTransform(scrollY, [0, 1000], [0, -100]);
  const imageY = useTransform(scrollY, [0, 1000], [0, -150]);

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      // Default behavior: scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleResumeClick = () => {
    if (onResumeClick) {
      onResumeClick();
    } else {
      // Default behavior: scroll to resume section
      const resumeSection = document.getElementById('resume');
      if (resumeSection) {
        resumeSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollClick = () => {
    const aboutSection = document.getElementById('about') || 
                         document.getElementById('skills');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      {/* Animated gradient background */}
      <motion.div 
        className={styles.gradientBackground}
        style={{ y: backgroundY }}
      />
      
      {/* Parallax background elements */}
      <div className={styles.parallaxContainer}>
        <ParallaxElement 
          className={styles.element1} 
          animationType="slow" 
        />
        <ParallaxElement 
          className={styles.element2} 
          animationType="medium" 
        />
        <ParallaxElement 
          className={styles.element3} 
          animationType="fast" 
        />
        <ParallaxElement 
          className={styles.element4} 
          animationType="slow" 
        />
      </div>

      {/* Main content container */}
      <motion.div 
        className={styles.container}
        variants={heroAnimations.container}
        initial="hidden"
        animate="visible"
        style={{ y: contentY }}
      >
        <div className={styles.content}>
          {/* Left side - Text content */}
          <div className={styles.textContent}>
            <motion.h1 
              className={styles.name}
              variants={heroAnimations.title}
            >
              <TypewriterText text={name} />
            </motion.h1>
            
            <motion.h2 
              className={styles.title}
              variants={heroAnimations.subtitle}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className={styles.subtitle}
              variants={heroAnimations.subtitle}
            >
              {subtitle}
            </motion.p>

            {/* Contact information */}
            <motion.div 
              className={styles.contactInfo}
              variants={heroAnimations.subtitle}
            >
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <a href={`mailto:${email}`} className={styles.contactLink}>
                  {email}
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <a href={`tel:${phone}`} className={styles.contactLink}>
                  {phone}
                </a>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div 
              className={styles.socialLinks}
              variants={heroAnimations.socialLinks}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  variants={heroAnimations.socialLink}
                  whileHover="hover"
                  aria-label={link.label}
                >
                  <span className={styles.socialIcon}>{link.icon}</span>
                  <span className={styles.socialLabel}>{link.platform}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Call-to-action buttons */}
            <motion.div 
              className={styles.ctaButtons}
              variants={heroAnimations.ctaButtons}
            >
              <motion.button
                className={`${styles.ctaButton} ${styles.primary}`}
                variants={heroAnimations.ctaButton}
                whileHover="hover"
                whileTap="tap"
                onClick={handleContactClick}
              >
                <span>Get In Touch</span>
                <span className={styles.buttonIcon}>💬</span>
              </motion.button>
              
              <motion.button
                className={`${styles.ctaButton} ${styles.secondary}`}
                variants={heroAnimations.ctaButton}
                whileHover="hover"
                whileTap="tap"
                onClick={handleResumeClick}
              >
                <span>View Resume</span>
                <span className={styles.buttonIcon}>📄</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right side - Profile image */}
          <motion.div 
            className={styles.imageContainer}
            style={{ y: imageY }}
          >
            <motion.div
              className={styles.profileImageWrapper}
              variants={heroAnimations.profileImage}
              whileHover="hover"
            >
              {profileImage ? (
                <>
                  <img 
                    src={profileImage} 
                    alt={`${name} - Profile`}
                    className={styles.profileImage}
                  />
                  <div className={styles.imageGlow} />
                </>
              ) : (
                <ProfilePlaceholder 
                  name={name}
                  className={styles.profilePlaceholder}
                />
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className={`${styles.scrollIndicator} ${!showScrollIndicator ? styles.hidden : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          onClick={handleScrollClick}
          role="button"
          tabIndex={0}
          aria-label="Scroll to next section"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleScrollClick();
            }
          }}
        >
          <motion.div 
            className={styles.scrollArrow}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
          <span className={styles.scrollText}>Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;