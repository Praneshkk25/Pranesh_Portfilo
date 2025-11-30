import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, getTechnologyColor } from '../../../data/projects';
import styles from './ProjectModal.module.scss';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

interface GitHubStats {
  stars: number;
  forks: number;
  language: string;
  lastUpdated: string;
  openIssues: number;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract GitHub repo info from URL
  const getGitHubRepoInfo = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    return match ? { owner: match[1], repo: match[2] } : null;
  };

  // Fetch GitHub repository stats
  useEffect(() => {
    if (project.githubUrl) {
      const repoInfo = getGitHubRepoInfo(project.githubUrl);
      if (repoInfo) {
        setIsLoadingStats(true);
        fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`)
          .then(response => response.json())
          .then(data => {
            if (!data.message) { // No error
              setGithubStats({
                stars: data.stargazers_count || 0,
                forks: data.forks_count || 0,
                language: data.language || 'Unknown',
                lastUpdated: new Date(data.updated_at).toLocaleDateString(),
                openIssues: data.open_issues_count || 0
              });
            }
          })
          .catch(error => {
            console.log('GitHub API error:', error);
          })
          .finally(() => {
            setIsLoadingStats(false);
          });
      }
    }
  }, [project.githubUrl]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={handleOverlayClick}
      >
        <motion.div
          className={styles.modalContent}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
          
          {/* Image Carousel */}
          {project.images.length > 0 && (
            <div className={styles.imageCarousel}>
              <div className={styles.imageContainer}>
                <img 
                  src={project.images[currentImageIndex] || '/images/projects/placeholder.jpg'} 
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className={styles.carouselImage}
                />
                {project.images.length > 1 && (
                  <>
                    <button 
                      className={`${styles.carouselButton} ${styles.prevButton}`}
                      onClick={prevImage}
                    >
                      ‹
                    </button>
                    <button 
                      className={`${styles.carouselButton} ${styles.nextButton}`}
                      onClick={nextImage}
                    >
                      ›
                    </button>
                    <div className={styles.imageIndicators}>
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          className={`${styles.indicator} ${
                            index === currentImageIndex ? styles.active : ''
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          <div className={styles.modalHeader}>
            <h2 className={styles.projectTitle}>{project.title}</h2>
            <p className={styles.projectDescription}>{project.description}</p>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.projectDetails}>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Duration:</span>
                  <span className={styles.value}>{project.duration}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Role:</span>
                  <span className={styles.value}>{project.role}</span>
                </div>
                {project.teamSize && (
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Team Size:</span>
                    <span className={styles.value}>{project.teamSize} members</span>
                  </div>
                )}
                <div className={styles.detailItem}>
                  <span className={styles.label}>Status:</span>
                  <span className={styles.value}>{project.status.replace('-', ' ')}</span>
                </div>
              </div>
            </div>

            <div className={styles.technologies}>
              <h3>Technologies Used</h3>
              <div className={styles.techGrid}>
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
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
              </div>
            </div>

            <div className={styles.features}>
              <h3>Key Features</h3>
              <ul className={styles.featureList}>
                {project.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.highlights}>
              <h3>Project Highlights</h3>
              <ul className={styles.highlightList}>
                {project.highlights.map((highlight, index) => (
                  <li key={index} className={styles.highlightItem}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* GitHub Repository Stats */}
            {project.githubUrl && (
              <div className={styles.githubStats}>
                <h3>Repository Statistics</h3>
                {isLoadingStats ? (
                  <div className={styles.loadingStats}>
                    <div className={styles.spinner}></div>
                    <span>Loading repository stats...</span>
                  </div>
                ) : githubStats ? (
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <span className={styles.statIcon}>⭐</span>
                      <div className={styles.statInfo}>
                        <span className={styles.statValue}>{githubStats.stars}</span>
                        <span className={styles.statLabel}>Stars</span>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statIcon}>🍴</span>
                      <div className={styles.statInfo}>
                        <span className={styles.statValue}>{githubStats.forks}</span>
                        <span className={styles.statLabel}>Forks</span>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statIcon}>💻</span>
                      <div className={styles.statInfo}>
                        <span className={styles.statValue}>{githubStats.language}</span>
                        <span className={styles.statLabel}>Language</span>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statIcon}>🐛</span>
                      <div className={styles.statInfo}>
                        <span className={styles.statValue}>{githubStats.openIssues}</span>
                        <span className={styles.statLabel}>Issues</span>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statIcon}>📅</span>
                      <div className={styles.statInfo}>
                        <span className={styles.statValue}>{githubStats.lastUpdated}</span>
                        <span className={styles.statLabel}>Last Updated</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.statsError}>
                    <span>Unable to load repository statistics</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.modalFooter}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                🔗 Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                📁 Source Code
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;