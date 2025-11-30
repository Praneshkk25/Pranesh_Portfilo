import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import styles from './ResumeHeader.module.scss';

interface ResumeHeaderProps {
  summary: {
    title: string;
    highlights: string[];
  };
  objective: string;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ summary, objective }) => {
  const { theme } = useTheme();

  const highlightVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className={`${styles.resumeHeader} ${styles[theme]}`}>
      <div className={styles.summarySection}>
        <motion.h3 
          className={styles.summaryTitle}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {summary.title}
        </motion.h3>
        
        <motion.div 
          className={styles.highlights}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {summary.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className={styles.highlight}
              custom={index}
              variants={highlightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={styles.highlightIcon}>✓</span>
              <span className={styles.highlightText}>{highlight}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <motion.div 
        className={styles.objectiveSection}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h4 className={styles.objectiveTitle}>Career Objective</h4>
        <p className={styles.objectiveText}>{objective}</p>
      </motion.div>
    </div>
  );
};

export default ResumeHeader;