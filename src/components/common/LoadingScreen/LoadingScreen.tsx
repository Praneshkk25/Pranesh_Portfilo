import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingScreen.module.scss';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div 
      className={styles.loadingScreen}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        <motion.div
          className={styles.logo}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1>Pranesh K K</h1>
          <p>Full Stack Developer & Computer Science Engineer</p>
        </motion.div>
        
        <motion.div
          className={styles.spinner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </motion.div>
        
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          Loading portfolio...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;