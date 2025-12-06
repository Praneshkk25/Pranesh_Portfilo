import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactForm.module.scss';

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<boolean>;
  className?: string;
}

const formAnimations = {
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
  field: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  },
  button: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }
};

export const ContactForm: React.FC<ContactFormProps> = ({ 
  onSubmit,
  className 
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return undefined;

      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        return undefined;

      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
        return undefined;

      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Event handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Real-time validation
    if (errors[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    const error = validateField(fieldName, value);
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      let success = false;
      
      if (onSubmit) {
        success = await onSubmit(formData);
      } else {
        // Default behavior: Open email client with pre-filled data
        const mailtoLink = `mailto:pkpraneshkk@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        
        window.location.href = mailtoLink;
        
        // Simulate success after opening email client
        await new Promise(resolve => setTimeout(resolve, 1000));
        success = true;
      }

      if (success) {
        setSubmitStatus('success');
        setSubmitMessage('Your email client has been opened. Please send the email to complete your message.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setSubmitStatus('idle');
    setSubmitMessage('');
  };

  return (
    <div className={`${styles.contactForm} ${className || ''}`}>
      <motion.div
        className={styles.formHeader}
        variants={formAnimations.field}
        initial="hidden"
        animate="visible"
      >
        <h3 className={styles.formTitle}>Send a Message</h3>
        <p className={styles.formDescription}>
          Fill out the form below and I'll respond as soon as possible.
        </p>
      </motion.div>

      <motion.form
        ref={formRef}
        className={styles.form}
        onSubmit={handleSubmit}
        variants={formAnimations.container}
        initial="hidden"
        animate="visible"
        noValidate
      >
        {/* Name field */}
        <motion.div 
          className={styles.fieldGroup}
          variants={formAnimations.field}
        >
          <label htmlFor="contact-name" className={styles.label}>
            Name *
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.name ? styles.error : ''}`}
            placeholder="Your full name"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.span
                id="name-error"
                className={styles.errorMessage}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                role="alert"
              >
                {errors.name}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Email field */}
        <motion.div 
          className={styles.fieldGroup}
          variants={formAnimations.field}
        >
          <label htmlFor="contact-email" className={styles.label}>
            Email *
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.email ? styles.error : ''}`}
            placeholder="your.email@example.com"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.span
                id="email-error"
                className={styles.errorMessage}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                role="alert"
              >
                {errors.email}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subject field */}
        <motion.div 
          className={styles.fieldGroup}
          variants={formAnimations.field}
        >
          <label htmlFor="contact-subject" className={styles.label}>
            Subject *
          </label>
          <input
            type="text"
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.subject ? styles.error : ''}`}
            placeholder="What would you like to discuss?"
            aria-describedby={errors.subject ? "subject-error" : undefined}
            aria-invalid={!!errors.subject}
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {errors.subject && (
              <motion.span
                id="subject-error"
                className={styles.errorMessage}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                role="alert"
              >
                {errors.subject}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Message field */}
        <motion.div 
          className={styles.fieldGroup}
          variants={formAnimations.field}
        >
          <label htmlFor="contact-message" className={styles.label}>
            Message *
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
            placeholder="Tell me about your project, opportunity, or just say hello..."
            rows={6}
            aria-describedby={errors.message ? "message-error" : undefined}
            aria-invalid={!!errors.message}
            disabled={isSubmitting}
          />
          <div className={styles.characterCount}>
            {formData.message.length}/1000
          </div>
          <AnimatePresence>
            {errors.message && (
              <motion.span
                id="message-error"
                className={styles.errorMessage}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                role="alert"
              >
                {errors.message}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit button */}
        <motion.div 
          className={styles.submitSection}
          variants={formAnimations.button}
        >
          <button
            type="submit"
            className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
            disabled={isSubmitting}
            aria-describedby="submit-status"
          >
            <span className={styles.buttonText}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </span>
            <span className={styles.buttonIcon}>
              {isSubmitting ? '⏳' : '📤'}
            </span>
          </button>
        </motion.div>

        {/* Submit status message */}
        <AnimatePresence>
          {submitStatus !== 'idle' && (
            <motion.div
              id="submit-status"
              className={`${styles.statusMessage} ${styles[submitStatus]}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              role="status"
              aria-live="polite"
            >
              <span className={styles.statusIcon}>
                {submitStatus === 'success' ? '✅' : '❌'}
              </span>
              <span className={styles.statusText}>{submitMessage}</span>
              {submitStatus === 'success' && (
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={resetForm}
                  aria-label="Send another message"
                >
                  Send Another
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
};

export default ContactForm;