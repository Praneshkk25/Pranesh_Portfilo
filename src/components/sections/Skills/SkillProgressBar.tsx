import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../../data/skills';

interface SkillProgressBarProps {
  skill: Skill;
  delay?: number;
}

const SkillProgressBar: React.FC<SkillProgressBarProps> = ({ skill, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="skill-progress-container">
      <div className="skill-progress-header">
        <div className="skill-progress-info">
          <span className="skill-progress-icon" style={{ color: skill.color }}>
            {skill.icon}
          </span>
          <span className="skill-progress-name">{skill.name}</span>
        </div>
        <motion.span
          className="skill-progress-percentage"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: delay }}
          style={{ color: skill.color, fontWeight: 600, fontSize: '1.1rem' }}
        >
          {skill.proficiency}%
        </motion.span>
      </div>
    </div>
  );
};

export default SkillProgressBar;