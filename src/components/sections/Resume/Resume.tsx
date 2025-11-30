import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import { education, experience, achievements, careerObjective, resumeSummary } from '../../../data/resume';
import EducationTimeline from './EducationTimeline';
import ExperienceSection from './ExperienceSection';
import AchievementsSection from './AchievementsSection';
import ResumeHeader from './ResumeHeader';
import styles from './Resume.module.scss';

const Resume: React.FC = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
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

  return (
    <section id="resume" className={`${styles.resume} ${styles[theme]}`}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div className={styles.header} variants={sectionVariants}>
            <h2 className={styles.title}>Resume</h2>
            <p className={styles.subtitle}>
              Professional Background & Academic Journey
            </p>
          </motion.div>

          {/* Resume Header with Summary */}
          <motion.div variants={sectionVariants}>
            <ResumeHeader 
              summary={resumeSummary}
              objective={careerObjective}
            />
          </motion.div>

          {/* Education Timeline */}
          <motion.div variants={sectionVariants}>
            <EducationTimeline education={education} />
          </motion.div>

          {/* Experience Section */}
          <motion.div variants={sectionVariants}>
            <ExperienceSection experience={experience} />
          </motion.div>

          {/* Achievements Section */}
          <motion.div variants={sectionVariants}>
            <AchievementsSection achievements={achievements} />
          </motion.div>

          {/* Download Resume Button */}
          <motion.div 
            className={styles.downloadSection}
            variants={sectionVariants}
          >
            <button 
              className={styles.downloadButton}
              onClick={async () => {
                try {
                  const { generateResumePDF } = await import('../../../utils/pdfGenerator');
                  generateResumePDF();
                } catch (error) {
                  console.error('Error generating PDF:', error);
                  alert('Sorry, there was an error generating the PDF. Please try again.');
                }
              }}
            >
              <span className={styles.downloadIcon}>📄</span>
              Download PDF Resume
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;