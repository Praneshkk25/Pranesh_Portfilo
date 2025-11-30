import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Certification } from '../../../data/skills';
import { animationPresets } from '../../../utils/animations';

interface CertificationBadgeProps {
  certification: Certification;
}

const CertificationBadge: React.FC<CertificationBadgeProps> = ({ certification }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className="certification-badge"
      variants={animationPresets.hoverScale}
      whileHover="whileHover"
      whileTap="whileTap"
      onClick={handleToggleExpand}
    >
      <div className="certification-badge-inner">
        {/* Badge Header */}
        <div className="certification-header">
          <div className="certification-icon">
            <motion.div
              className="badge-icon"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              🏆
            </motion.div>
          </div>
          
          <div className="certification-title-section">
            <h4 className="certification-name">{certification.name}</h4>
            <div className="certification-meta">
              <span className="certification-issuer">{certification.issuer}</span>
              <span className="certification-date">{certification.date}</span>
            </div>
          </div>

          <motion.div
            className="expand-indicator"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▼
          </motion.div>
        </div>

        {/* Gradient overlay */}
        <div className="certification-gradient-overlay" />

        {/* Expanded Details */}
        <motion.div
          className="certification-details"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="certification-description">
            <p>{certification.description}</p>
          </div>

          {certification.credentialId && (
            <div className="certification-credential">
              <span className="credential-label">Credential ID:</span>
              <span className="credential-id">{certification.credentialId}</span>
            </div>
          )}

          <div className="certification-actions">
            {certification.verificationUrl && (
              <motion.a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-verify"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="btn-icon">🔗</span>
                Verify Certificate
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* NPTEL Special Highlight */}
        {certification.id === 'nptel-python' && (
          <motion.div
            className="nptel-highlight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="highlight-badge">
              <span className="highlight-icon">🐍</span>
              <span className="highlight-text">Python Data Science</span>
            </div>
          </motion.div>
        )}

        {/* Floating particles effect */}
        <div className="certification-particles">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              className="particle"
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut'
              }}
              style={{
                left: `${10 + index * 15}%`,
                top: `${20 + Math.random() * 60}%`
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationBadge;