import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import { Education } from '../../../data/resume';
import styles from './EducationTimeline.module.scss';

interface EducationTimelineProps {
  education: Education[];
}

const EducationTimeline: React.FC<EducationTimelineProps> = ({ education }) => {
  const { theme } = useTheme();

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getEducationIcon = (level: Education['level']) => {
    switch (level) {
      case 'undergraduate':
        return '🎓';
      case 'hsc':
        return '📚';
      case 'sslc':
        return '📖';
      default:
        return '🎓';
    }
  };

  const getEducationColor = (level: Education['level']) => {
    switch (level) {
      case 'undergraduate':
        return '#3b82f6';
      case 'hsc':
        return '#10b981';
      case 'sslc':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className={`${styles.educationTimeline} ${styles[theme]}`}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Education</h3>
        <p className={styles.sectionSubtitle}>Academic Background & Qualifications</p>
      </div>

      <motion.div
        className={styles.timeline}
        variants={timelineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className={styles.timelineLine}></div>
        
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            className={styles.timelineItem}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className={styles.timelineMarker}
              style={{ backgroundColor: getEducationColor(edu.level) }}
            >
              <span className={styles.timelineIcon}>
                {getEducationIcon(edu.level)}
              </span>
            </div>
            
            <div className={styles.timelineContent}>
              <div className={styles.timelineCard}>
                <div className={styles.cardHeader}>
                  <h4 className={styles.degree}>{edu.degree}</h4>
                  <span className={styles.duration}>{edu.duration}</span>
                </div>
                
                <div className={styles.cardBody}>
                  <h5 className={styles.institution}>{edu.institution}</h5>
                  {edu.field && (
                    <p className={styles.field}>{edu.field}</p>
                  )}
                  
                  <div className={styles.performance}>
                    {edu.cgpa && (
                      <div className={styles.grade}>
                        <span className={styles.gradeLabel}>CGPA:</span>
                        <span className={styles.gradeValue}>{edu.cgpa}</span>
                      </div>
                    )}
                    {edu.percentage && (
                      <div className={styles.grade}>
                        <span className={styles.gradeLabel}>Percentage:</span>
                        <span className={styles.gradeValue}>{edu.percentage}</span>
                      </div>
                    )}
                  </div>
                  
                  {edu.status && (
                    <div className={styles.status}>
                      <span className={styles.statusBadge}>{edu.status}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EducationTimeline;