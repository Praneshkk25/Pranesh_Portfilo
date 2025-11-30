import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import styles from './ThemeToggle.module.scss';

// Theme toggle component props
export interface ThemeToggleProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

// Animation variants for the toggle button
const buttonVariants = {
  light: {
    backgroundColor: '#fbbf24',
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  },
  dark: {
    backgroundColor: '#1e293b',
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 35
    }
  }
};

// Sun icon animation variants
const sunVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: {
    scale: 0,
    rotate: 180,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

// Moon icon animation variants
const moonVariants = {
  hidden: {
    scale: 0,
    rotate: 180,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: {
    scale: 0,
    rotate: -180,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

// Sun rays animation
const raysVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
    rotate: -45
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.1
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    rotate: 45,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

// Stars animation for moon
const starsVariants = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

const starVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  }
};

// Sun Icon Component
const SunIcon: React.FC<{ size: number }> = ({ size }) => (
  <motion.div
    className={styles.iconContainer}
    variants={sunVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {/* Sun rays */}
    <motion.div
      className={styles.sunRays}
      variants={raysVariants}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={styles.sunRay}
          style={{
            transform: `rotate(${i * 45}deg)`,
            width: size * 0.15,
            height: size * 0.05,
          }}
        />
      ))}
    </motion.div>
    
    {/* Sun circle */}
    <motion.div
      className={styles.sunCircle}
      style={{
        width: size * 0.6,
        height: size * 0.6,
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  </motion.div>
);

// Moon Icon Component
const MoonIcon: React.FC<{ size: number }> = ({ size }) => (
  <motion.div
    className={styles.iconContainer}
    variants={moonVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {/* Stars */}
    <motion.div
      className={styles.stars}
      variants={starsVariants}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className={styles.star}
          variants={starVariants}
          style={{
            width: size * 0.08,
            height: size * 0.08,
            top: `${20 + i * 15}%`,
            left: `${15 + i * 20}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </motion.div>
    
    {/* Moon crescent */}
    <motion.div
      className={styles.moonCrescent}
      style={{
        width: size * 0.6,
        height: size * 0.6,
      }}
    />
  </motion.div>
);

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'medium',
  showLabel = false
}) => {
  const { theme, toggleTheme } = useTheme();
  
  // Size mapping
  const sizeMap = {
    small: 32,
    medium: 40,
    large: 48
  };
  
  const buttonSize = sizeMap[size];
  
  const handleToggle = () => {
    toggleTheme();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={`${styles.themeToggleWrapper} ${className}`}>
      {showLabel && (
        <span className={styles.label}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
      
      <motion.button
        className={`${styles.themeToggle} ${styles[size]}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        variants={buttonVariants}
        initial={theme}
        animate={theme}
        whileHover="hover"
        whileTap="tap"
        style={{
          width: buttonSize,
          height: buttonSize,
        }}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        aria-pressed={theme === 'dark'}
        role="switch"
      >
        <AnimatePresence mode="wait">
          {theme === 'light' ? (
            <SunIcon key="sun" size={buttonSize} />
          ) : (
            <MoonIcon key="moon" size={buttonSize} />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ThemeToggle;