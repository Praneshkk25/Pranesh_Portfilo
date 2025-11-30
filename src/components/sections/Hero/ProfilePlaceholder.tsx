import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProfilePlaceholder.module.scss';

interface ProfilePlaceholderProps {
  name: string;
  className?: string;
}

export const ProfilePlaceholder: React.FC<ProfilePlaceholderProps> = ({ 
  name, 
  className 
}) => {
  // Get initials from name
  const getInitials = (fullName: string): string => {
    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(name);

  return (
    <motion.div 
      className={`${styles.placeholder} ${className || ''}`}
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className={styles.initialsContainer}>
        <span className={styles.initials}>{initials}</span>
      </div>
      <div className={styles.glow} />
    </motion.div>
  );
};

export default ProfilePlaceholder;