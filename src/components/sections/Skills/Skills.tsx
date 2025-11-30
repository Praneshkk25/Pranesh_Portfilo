import React from 'react';
import { motion } from 'framer-motion';
import { skills, certifications, languages, skillCategories, getSkillsByCategory } from '../../../data/skills';
import { animationPresets, createStaggerAnimation, viewportOptions } from '../../../utils/animations';
import SkillCard from './SkillCard';
import CertificationBadge from './CertificationBadge';
import LanguageProficiency from './LanguageProficiency';
import './Skills.scss';

const Skills: React.FC = () => {
  const categories = Object.keys(skillCategories) as Array<keyof typeof skillCategories>;

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.div
          className="skills-header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={animationPresets.slideUp}
        >
          <h2 className="section-title gradient-primary-text">
            Technical Expertise
          </h2>
          <p className="section-subtitle">
            Comprehensive skills in full-stack development, programming languages, and modern technologies
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="skills-categories">
          {categories.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category);
            const categoryInfo = skillCategories[category];
            
            return (
              <motion.div
                key={category}
                className="skill-category"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                variants={createStaggerAnimation(0.1, categoryIndex * 0.2)}
              >
                <div className="category-header">
                  <div className="category-icon" style={{ color: categoryInfo.color }}>
                    {categoryInfo.icon}
                  </div>
                  <div className="category-info">
                    <h3 className="category-title">{category}</h3>
                    <p className="category-description">{categoryInfo.description}</p>
                  </div>
                </div>

                <div className="category-skills">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      variants={animationPresets.slideUp}
                      custom={skillIndex}
                    >
                      <SkillCard skill={skill} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* NPTEL Certification Section */}
        <motion.div
          className="certifications-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={createStaggerAnimation(0.2, 0.5)}
        >
          <h3 className="subsection-title gradient-secondary-text">
            Professional Certifications
          </h3>
          <div className="certifications-grid">
            {certifications.map((certification, index) => (
              <motion.div
                key={certification.id}
                variants={animationPresets.scale}
                custom={index}
              >
                <CertificationBadge certification={certification} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Language Proficiencies */}
        <motion.div
          className="languages-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={createStaggerAnimation(0.15, 0.3)}
        >
          <h3 className="subsection-title gradient-accent-text">
            Language Proficiencies
          </h3>
          <div className="languages-grid">
            {languages.map((language, index) => (
              <motion.div
                key={language.name}
                variants={animationPresets.slideInLeft}
                custom={index}
              >
                <LanguageProficiency language={language} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Summary Stats */}
        <motion.div
          className="skills-stats"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={createStaggerAnimation(0.1, 0.4)}
        >
          <div className="stats-grid">
            <motion.div className="stat-card" variants={animationPresets.scale}>
              <div className="stat-number gradient-primary-text">{skills.length}</div>
              <div className="stat-label">Technical Skills</div>
            </motion.div>
            
            <motion.div className="stat-card" variants={animationPresets.scale}>
              <div className="stat-number gradient-secondary-text">{categories.length}</div>
              <div className="stat-label">Skill Categories</div>
            </motion.div>
            
            <motion.div className="stat-card" variants={animationPresets.scale}>
              <div className="stat-number gradient-accent-text">{certifications.length}</div>
              <div className="stat-label">Certifications</div>
            </motion.div>
            
            <motion.div className="stat-card" variants={animationPresets.scale}>
              <div className="stat-number gradient-hero-text">{languages.length}</div>
              <div className="stat-label">Languages</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;