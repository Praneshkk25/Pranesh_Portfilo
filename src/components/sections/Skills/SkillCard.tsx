import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../../data/skills';
import { animationPresets } from '../../../utils/animations';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="skill-card"
      variants={animationPresets.hoverScale}
      whileHover="whileHover"
      whileTap="whileTap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="skill-card-inner">
        <div className="skill-icon" style={{ color: skill.color }}>
          {skill.icon}
        </div>
        
        <div className="skill-info">
          <h4 className="skill-name">{skill.name}</h4>
          <div className="skill-proficiency">
            <span className="proficiency-label">Proficiency:</span>
            <span className="proficiency-value" style={{ color: skill.color }}>
              {skill.proficiency}%
            </span>
          </div>
        </div>

        <motion.div
          className="skill-details"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? 'auto' : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <p className="skill-description">{skill.description}</p>
          <div className="skill-category-tag" style={{ backgroundColor: `${skill.color}20`, color: skill.color }}>
            {skill.category}
          </div>
        </motion.div>

        {/* Gradient overlay on hover */}
        <motion.div
          className="skill-card-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(135deg, ${skill.color}10, ${skill.color}05)`
          }}
        />
      </div>
    </motion.div>
  );
};

export default SkillCard;