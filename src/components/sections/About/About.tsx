import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../../data/personalInfo';
import styles from './About.module.scss';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
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
      ease: 'easeOut'
    }
  }
};

const About: React.FC = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div className={styles.header} variants={itemVariants}>
            <h2 id="about-heading" className={styles.title}>
              About Me
            </h2>
            <div className={styles.titleUnderline} />
          </motion.div>

          {/* Main Content Grid */}
          <div className={styles.grid}>
            {/* Left Column - Description and Objective */}
            <motion.div className={styles.leftColumn} variants={itemVariants}>
              <div className={styles.description}>
                <h3 className={styles.sectionTitle}>Who I Am</h3>
                <p className={styles.text}>
                  {personalInfo.description}
                </p>
                <p className={styles.text}>
                  {personalInfo.objective}
                </p>
              </div>

              {/* Education Highlight */}
              <div className={styles.educationHighlight}>
                <h3 className={styles.sectionTitle}>Current Education</h3>
                <div className={styles.educationCard}>
                  <div className={styles.educationHeader}>
                    <h4 className={styles.degree}>
                      {personalInfo.education.current.degree}
                    </h4>
                    <span className={styles.duration}>
                      {personalInfo.education.current.duration}
                    </span>
                  </div>
                  <p className={styles.institution}>
                    {personalInfo.education.current.institution}
                  </p>
                  <p className={styles.field}>
                    {personalInfo.education.current.field}
                  </p>
                  <div className={styles.cgpa}>
                    <span>CGPA: {personalInfo.education.current.cgpa}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Experience and Certifications */}
            <motion.div className={styles.rightColumn} variants={itemVariants}>
              {/* Experience */}
              <div className={styles.experience}>
                <h3 className={styles.sectionTitle}>Professional Experience</h3>
                <div className={styles.experienceCard}>
                  <div className={styles.experienceHeader}>
                    <h4 className={styles.position}>
                      {personalInfo.experience.internship.position}
                    </h4>
                    <span className={styles.duration}>
                      {personalInfo.experience.internship.duration}
                    </span>
                  </div>
                  <p className={styles.company}>
                    {personalInfo.experience.internship.company}
                  </p>
                  <ul className={styles.responsibilities}>
                    {personalInfo.experience.internship.responsibilities.map((responsibility, index) => (
                      <li key={index} className={styles.responsibility}>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Certifications */}
              <div className={styles.certifications}>
                <h3 className={styles.sectionTitle}>Certifications</h3>
                {personalInfo.certifications.map((cert, index) => (
                  <div key={index} className={styles.certificationCard}>
                    <h4 className={styles.certName}>{cert.name}</h4>
                    <p className={styles.certIssuer}>{cert.issuer}</p>
                    <p className={styles.certDate}>{cert.date}</p>
                    <p className={styles.certDescription}>{cert.description}</p>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className={styles.languages}>
                <h3 className={styles.sectionTitle}>Languages</h3>
                <div className={styles.languageList}>
                  {personalInfo.languages.map((language, index) => (
                    <div key={index} className={styles.languageItem}>
                      <span className={styles.languageName}>{language.name}</span>
                      <span className={styles.languageProficiency}>
                        {language.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interests Section */}
          <motion.div className={styles.interests} variants={itemVariants}>
            <h3 className={styles.sectionTitle}>Interests & Passions</h3>
            <div className={styles.interestTags}>
              {personalInfo.interests.map((interest, index) => (
                <motion.span
                  key={index}
                  className={styles.interestTag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div className={styles.contactInfo} variants={itemVariants}>
            <h3 className={styles.sectionTitle}>Get In Touch</h3>
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Email</span>
                  <a href={`mailto:${personalInfo.email}`} className={styles.contactValue}>
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Phone</span>
                  <a href={`tel:${personalInfo.phone}`} className={styles.contactValue}>
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Location</span>
                  <span className={styles.contactValue}>
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;