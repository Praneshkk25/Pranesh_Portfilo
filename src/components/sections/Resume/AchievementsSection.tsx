import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import { Achievement } from '../../../data/resume';
import styles from './AchievementsSection.module.scss';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  const { theme } = useTheme();

  const achievementsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'certification':
        return '🏆';
      case 'project':
        return '🚀';
      case 'academic':
        return '🎓';
      case 'leadership':
        return '👑';
      default:
        return '⭐';
    }
  };

  const getCategoryColor = (category: Achievement['category']) => {
    switch (category) {
      case 'certification':
        return '#f59e0b';
      case 'project':
        return '#3b82f6';
      case 'academic':
        return '#10b981';
      case 'leadership':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getCategoryLabel = (category: Achievement['category']) => {
    switch (category) {
      case 'certification':
        return 'Certification';
      case 'project':
        return 'Project Leadership';
      case 'academic':
        return 'Academic Achievement';
      case 'leadership':
        return 'Leadership';
      default:
        return 'Achievement';
    }
  };

  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.achievementsSection} ${styles[theme]}`}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Key Achievements</h3>
        <p className={styles.sectionSubtitle}>Certifications, Projects & Leadership</p>
      </div>
      
      <motion.div
        className={styles.achievementsGrid}
        variants={achievementsVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className={styles.achievementCard}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.cardHeader}>
              <div 
                className={styles.categoryIcon}
                style={{ backgroundColor: getCategoryColor(achievement.category) }}
              >
                {getCategoryIcon(achievement.category)}
              </div>
              <div className={styles.categoryInfo}>
                <span className={styles.categoryLabel}>
                  {getCategoryLabel(achievement.category)}
                </span>
                <span className={styles.date}>{achievement.date}</span>
              </div>
            </div>
            
            <div className={styles.cardBody}>
              <h4 className={styles.title}>{achievement.title}</h4>
              <p className={styles.description}>{achievement.description}</p>
            </div>
            
            <div className={styles.cardFooter}>
              <div 
                className={styles.categoryBadge}
                style={{ backgroundColor: getCategoryColor(achievement.category) }}
              >
                {getCategoryLabel(achievement.category)}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AchievementsSection;