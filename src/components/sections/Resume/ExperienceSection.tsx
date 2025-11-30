import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import { Experience } from '../../../data/resume';
import styles from './ExperienceSection.module.scss';

interface ExperienceSectionProps {
  experience: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  const { theme } = useTheme();

  const experienceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getExperienceIcon = (type: Experience['type']) => {
    switch (type) {
      case 'internship':
        return '🎯';
      case 'fulltime':
        return '💼';
      case 'parttime':
        return '⏰';
      case 'freelance':
        return '🚀';
      default:
        return '💼';
    }
  };

  const getExperienceColor = (type: Experience['type']) => {
    switch (type) {
      case 'internship':
        return '#3b82f6';
      case 'fulltime':
        return '#10b981';
      case 'parttime':
        return '#f59e0b';
      case 'freelance':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  if (!experience || experience.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.experienceSection} ${styles[theme]}`}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Professional Experience</h3>
        <p className={styles.sectionSubtitle}>Internships & Work Experience</p>
      </div>
      
      <motion.div
        className={styles.experienceList}
        variants={experienceVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            className={styles.experienceCard}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <div 
                  className={styles.experienceIcon}
                  style={{ backgroundColor: getExperienceColor(exp.type) }}
                >
                  {getExperienceIcon(exp.type)}
                </div>
                <div className={styles.headerInfo}>
                  <h4 className={styles.position}>{exp.position}</h4>
                  <h5 className={styles.company}>{exp.company}</h5>
                </div>
              </div>
              <div className={styles.headerRight}>
                <span className={styles.duration}>{exp.duration}</span>
                <span className={styles.type}>{exp.type}</span>
              </div>
            </div>
            
            <div className={styles.cardBody}>
              <div className={styles.responsibilities}>
                <h6 className={styles.responsibilitiesTitle}>Key Responsibilities:</h6>
                <ul className={styles.responsibilitiesList}>
                  {exp.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className={styles.responsibilityItem}>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
              
              {exp.skills && exp.skills.length > 0 && (
                <div className={styles.skills}>
                  <h6 className={styles.skillsTitle}>Technologies & Skills:</h6>
                  <div className={styles.skillsTags}>
                    {exp.skills.map((skill, idx) => (
                      <span key={idx} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExperienceSection;