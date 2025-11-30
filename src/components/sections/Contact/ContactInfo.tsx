import React from 'react';
import { motion } from 'framer-motion';
import { SocialLink } from '../Hero/Hero';
import styles from './ContactInfo.module.scss';

export interface ContactInfoProps {
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
}

interface ContactMethod {
  type: 'email' | 'phone' | 'location';
  icon: string;
  label: string;
  value: string;
  href?: string;
  description: string;
}

const cardAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  card: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

export const ContactInfo: React.FC<ContactInfoProps> = ({
  email,
  phone,
  location,
  socialLinks
}) => {
  // Prepare contact methods data
  const contactMethods: ContactMethod[] = [
    {
      type: 'email',
      icon: '📧',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      description: 'Send me an email for professional inquiries'
    },
    {
      type: 'phone',
      icon: '📱',
      label: 'Phone',
      value: phone,
      href: `tel:${phone}`,
      description: 'Call or message for quick communication'
    },
    {
      type: 'location',
      icon: '📍',
      label: 'Location',
      value: location,
      description: 'Based in Tiruchirapalli, Tamil Nadu, India'
    }
  ];

  // Filter social links for professional platforms
  const professionalSocialLinks = socialLinks.filter(link => 
    ['GitHub', 'LinkedIn'].includes(link.platform)
  );

  return (
    <div className={styles.contactInfo}>
      {/* Contact methods */}
      <motion.div 
        className={styles.contactMethods}
        variants={cardAnimations.container}
        initial="hidden"
        animate="visible"
      >
        <h3 className={styles.sectionTitle}>Contact Information</h3>
        
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.type}
            className={styles.contactCard}
            variants={cardAnimations.card}
            whileHover="hover"
          >
            {method.href ? (
              <a 
                href={method.href}
                className={styles.contactLink}
                aria-label={`${method.label}: ${method.value}`}
              >
                <ContactMethodCard method={method} />
              </a>
            ) : (
              <ContactMethodCard method={method} />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Professional social links */}
      <motion.div 
        className={styles.socialSection}
        variants={cardAnimations.container}
        initial="hidden"
        animate="visible"
      >
        <h3 className={styles.sectionTitle}>Professional Links</h3>
        
        <div className={styles.socialGrid}>
          {professionalSocialLinks.map((link, index) => (
            <motion.a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCard}
              variants={cardAnimations.card}
              whileHover={cardAnimations.hover}
              aria-label={link.label}
            >
              <div className={styles.socialIcon}>
                {getSocialIcon(link.platform)}
              </div>
              <div className={styles.socialContent}>
                <h4 className={styles.socialTitle}>{link.platform}</h4>
                <p className={styles.socialDescription}>
                  {getSocialDescription(link.platform)}
                </p>
              </div>
              <div className={styles.socialArrow}>→</div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Additional contact note */}
      <motion.div 
        className={styles.contactNote}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className={styles.noteIcon}>💡</div>
        <p className={styles.noteText}>
          I'm always open to discussing new opportunities, innovative projects, 
          and collaborations in software development and technology.
        </p>
      </motion.div>
    </div>
  );
};

// Helper component for contact method cards
const ContactMethodCard: React.FC<{ method: ContactMethod }> = ({ method }) => (
  <div className={styles.cardContent}>
    <div className={styles.cardIcon}>
      <span className={styles.iconEmoji}>{method.icon}</span>
    </div>
    <div className={styles.cardInfo}>
      <h4 className={styles.cardTitle}>{method.label}</h4>
      <p className={styles.cardValue}>{method.value}</p>
      <p className={styles.cardDescription}>{method.description}</p>
    </div>
  </div>
);

// Helper functions for social links
const getSocialIcon = (platform: string): string => {
  switch (platform) {
    case 'GitHub':
      return '🔗';
    case 'LinkedIn':
      return '💼';
    default:
      return '🌐';
  }
};

const getSocialDescription = (platform: string): string => {
  switch (platform) {
    case 'GitHub':
      return 'View my repositories and open source contributions';
    case 'LinkedIn':
      return 'Connect with me professionally';
    default:
      return 'Visit my profile';
  }
};

export default ContactInfo;