import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../../data/personalInfo';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';
import styles from './Contact.module.scss';

export interface ContactProps {
  className?: string;
}

const sectionAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }
};

export const Contact: React.FC<ContactProps> = ({ className }) => {
  return (
    <section 
      className={`${styles.contact} ${className || ''}`} 
      id="contact"
    >
      <div className={styles.container}>
        {/* Section header */}
        <motion.div 
          className={styles.header}
          variants={sectionAnimations.item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>Get In Touch</span>
          </h2>
          <p className={styles.subtitle}>
            Let's connect and discuss opportunities, collaborations, or just have a chat about technology and innovation.
          </p>
        </motion.div>

        {/* Main content grid */}
        <motion.div 
          className={styles.contentGrid}
          variants={sectionAnimations.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Contact information */}
          <motion.div 
            className={styles.contactInfoSection}
            variants={sectionAnimations.item}
          >
            <ContactInfo 
              email={personalInfo.email}
              phone={personalInfo.phone}
              location={personalInfo.location}
              socialLinks={personalInfo.socialLinks}
            />
          </motion.div>

          {/* Contact form */}
          <motion.div 
            className={styles.contactFormSection}
            variants={sectionAnimations.item}
          >
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;