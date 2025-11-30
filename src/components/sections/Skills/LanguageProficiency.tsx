import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../../data/skills';

interface LanguageProficiencyProps {
  language: Language;
}

const LanguageProficiency: React.FC<LanguageProficiencyProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const getLanguageFlag = (languageName: string): string => {
    const flags: { [key: string]: string } = {
      'English': '🇺🇸',
      'Tamil': '🇮🇳',
      'Telugu': '🇮🇳'
    };
    return flags[languageName] || '🌐';
  };

  const getProficiencyColor = (level: number): string => {
    const colors = {
      5: '#10b981', // Native - Green
      4: '#3b82f6', // Full professional - Blue
      3: '#f59e0b', // Professional working - Amber
      2: '#ef4444', // Limited working - Red
      1: '#6b7280'  // Elementary - Gray
    };
    return colors[level as keyof typeof colors] || colors[1];
  };

  const getProficiencyDescription = (proficiency: string): string => {
    const descriptions: { [key: string]: string } = {
      'Native': 'Mother tongue with complete fluency',
      'Full professional proficiency': 'Fluent in professional and academic contexts',
      'Professional working proficiency': 'Effective in work environments',
      'Limited working proficiency': 'Basic professional communication',
      'Elementary proficiency': 'Basic conversational ability'
    };
    return descriptions[proficiency] || 'Language proficiency';
  };

  return (
    <motion.div
      className="language-proficiency"
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="language-header">
        <div className="language-flag">
          {getLanguageFlag(language.name)}
        </div>
        <div className="language-info">
          <h4 className="language-name">{language.name}</h4>
          <p className="language-proficiency-level">{language.proficiency}</p>
        </div>
      </div>

      {/* Proficiency Level Indicators */}
      <div className="proficiency-indicators">
        {[1, 2, 3, 4, 5].map((level) => (
          <motion.div
            key={level}
            className={`proficiency-dot ${language.level >= level ? 'active' : ''}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: level * 0.1,
              type: 'spring',
              stiffness: 300
            }}
            style={{
              backgroundColor: language.level >= level 
                ? getProficiencyColor(language.level) 
                : 'var(--color-border)'
            }}
          />
        ))}
      </div>

      {/* Proficiency Bar */}
      <div className="proficiency-bar">
        <div className="proficiency-track">
          <motion.div
            className="proficiency-fill"
            initial={{ width: '0%' }}
            animate={isVisible ? { width: `${(language.level / 5) * 100}%` } : { width: '0%' }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            style={{
              background: `linear-gradient(90deg, ${getProficiencyColor(language.level)}, ${getProficiencyColor(language.level)}80)`
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="proficiency-shimmer"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Description */}
      <motion.div
        className="language-description"
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p className="proficiency-description">
          {getProficiencyDescription(language.proficiency)}
        </p>
      </motion.div>

      {/* Special highlight for native languages */}
      {language.proficiency === 'Native' && (
        <motion.div
          className="native-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, delay: 1 }}
        >
          <span className="native-icon">⭐</span>
          <span className="native-text">Native Speaker</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LanguageProficiency;