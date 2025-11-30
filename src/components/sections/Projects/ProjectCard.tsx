import React from 'react';
import { motion } from 'framer-motion';
import { Project, getTechnologyColor } from '../../../data/projects';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: Project;
  index: number;
  onCardClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onCardClick }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#f59e0b';
      case 'planned': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'web': return '#3b82f6';
      case 'mobile': return '#10b981';
      case 'fullstack': return '#f59e0b';
      case 'ai': return '#ef4444';
      default: return '#6366f1';
    }
  };

  return (
    <motion.div
      className={styles.projectCard}
      variants={cardVariants}
      whileHover="hover"
      initial="hidden"
      animate="visible"
      onClick={() => onCardClick(project)}
    >
      <motion.div
        className={styles.cardContent}
        variants={hoverVariants}
      >
        {/* Project Image */}
        <div className={styles.imageContainer}>
          <img
            src={project.images[0] || '/images/projects/placeholder.jpg'}
            alt={project.title}
            className={styles.projectImage}
          />
          <div className={styles.imageOverlay}>
            <div className={styles.overlayContent}>
              <span className={styles.viewDetails}>View Details</span>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className={styles.projectInfo}>
          {/* Header */}
          <div className={styles.projectHeader}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <div className={styles.projectMeta}>
              <span
                className={styles.category}
                style={{ backgroundColor: getCategoryColor(project.category) }}
              >
                {project.category.toUpperCase()}
              </span>
              <span
                className={styles.status}
                style={{ color: getStatusColor(project.status) }}
              >
                {project.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className={styles.projectDescription}>
            {project.description.length > 120
              ? `${project.description.substring(0, 120)}...`
              : project.description
            }
          </p>

          {/* Project Details */}
          <div className={styles.projectDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Duration:</span>
              <span className={styles.detailValue}>{project.duration}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Role:</span>
              <span className={styles.detailValue}>{project.role}</span>
            </div>
            {project.teamSize && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Team Size:</span>
                <span className={styles.detailValue}>{project.teamSize} members</span>
              </div>
            )}
          </div>

          {/* Technologies */}
          <div className={styles.technologies}>
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className={styles.techTag}
                style={{
                  backgroundColor: `${getTechnologyColor(tech)}20`,
                  borderColor: getTechnologyColor(tech),
                  color: getTechnologyColor(tech)
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className={styles.techMore}>
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Action Links */}
          <div className={styles.projectActions}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionLink}
                onClick={(e) => e.stopPropagation()}
              >
                <span className={styles.linkIcon}>🔗</span>
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionLink}
                onClick={(e) => e.stopPropagation()}
              >
                <span className={styles.linkIcon}>📁</span>
                Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;