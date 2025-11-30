import { Variants } from 'framer-motion';

// Animation presets for consistent motion design
export const animationPresets = {
  // Fade in animation
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  // Slide up animation
  slideUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 60 },
    transition: { duration: 0.8, ease: 'easeOut' }
  },

  // Slide in from left
  slideInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
    transition: { duration: 0.8, ease: 'easeOut' }
  },

  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
    transition: { duration: 0.8, ease: 'easeOut' }
  },

  // Scale animation
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  // Stagger children animation
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  },

  // Parallax scroll animation
  parallax: (offset: number = 0.5) => ({
    initial: { y: 0 },
    animate: { y: offset * -100 },
    transition: { ease: 'linear' }
  }),

  // Typewriter animation variants
  typewriter: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5
      }
    }
  },

  // Individual character animation for typewriter
  typewriterChar: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  },

  // Floating animation
  floating: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },

  // Hover scale animation
  hoverScale: {
    whileHover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    whileTap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },

  // Gradient shift animation
  gradientShift: {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }
};

// Easing functions
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: { type: 'spring', stiffness: 300, damping: 30 }
};

// Duration constants
export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8
};

// Viewport animation options
export const viewportOptions = {
  once: true,
  margin: '-100px',
  amount: 0.3
};

// Scroll-triggered animation variants
export const scrollAnimations: Variants = {
  hidden: {
    opacity: 0,
    y: 75
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

// Hero-specific animations
export const heroAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  },
  
  title: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  },
  
  subtitle: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.3
      }
    }
  },
  
  profileImage: {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
        delay: 0.6
      }
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  },
  
  socialLinks: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.9,
        staggerChildren: 0.1
      }
    }
  },
  
  socialLink: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    hover: {
      scale: 1.2,
      y: -5,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  },
  
  ctaButtons: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 1.2,
        staggerChildren: 0.2
      }
    }
  },
  
  ctaButton: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  }
};

// Parallax background elements animation
export const parallaxElements = {
  slow: {
    animate: {
      y: [0, -50, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  },
  
  medium: {
    animate: {
      y: [0, -30, 0],
      x: [0, 10, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  },
  
  fast: {
    animate: {
      y: [0, -20, 0],
      rotate: [0, -3, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }
};

// Utility function to create staggered animations
export const createStaggerAnimation = (
  staggerDelay: number = 0.1,
  childDelay: number = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childDelay
    }
  }
});

// Utility function for scroll-triggered animations
export const createScrollAnimation = (
  delay: number = 0,
  duration: number = 0.8
): Variants => ({
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: 'easeOut',
      delay
    }
  }
});