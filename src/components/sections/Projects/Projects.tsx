import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projects, projectCategories, Project } from '../../../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.scss';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTechnology, setSelectedTechnology] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techs = Array.from(new Set(projects.flatMap(p => p.technologies)));
    return [{ id: 'all', label: 'All Technologies' }, ...techs.map(tech => ({ id: tech, label: tech }))];
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    
    if (selectedTechnology !== 'all') {
      filtered = filtered.filter(project => 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(selectedTechnology.toLowerCase())
        )
      );
    }
    
    return filtered;
  }, [selectedCategory, selectedTechnology]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 className={styles.sectionTitle} variants={titleVariants}>
            Featured Projects
          </motion.h2>
          <motion.p className={styles.sectionSubtitle} variants={titleVariants}>
            Showcasing innovative solutions and technical expertise across various domains
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className={styles.filterSection}
          variants={filterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className={styles.filterGroup}>
            <h4 className={styles.filterTitle}>Category</h4>
            <div className={styles.categoryFilter}>
              {projectCategories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.filterButton} ${
                    selectedCategory === category.id ? styles.active : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    '--category-color': category.color
                  } as React.CSSProperties}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.filterGroup}>
            <h4 className={styles.filterTitle}>Technology</h4>
            <div className={styles.technologyFilter}>
              <select
                value={selectedTechnology}
                onChange={(e) => setSelectedTechnology(e.target.value)}
                className={styles.technologySelect}
              >
                {allTechnologies.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className={styles.projectsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onCardClick={handleProjectClick}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>No projects found</h3>
            <p>Try selecting a different category to see more projects.</p>
          </motion.div>
        )}

        {/* Project Stats */}
        <motion.div
          className={styles.projectStats}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{projects.length}</span>
            <span className={styles.statLabel}>Total Projects</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              {projects.reduce((acc, project) => acc + (project.teamSize || 1), 0)}
            </span>
            <span className={styles.statLabel}>Team Members Collaborated</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              {Array.from(new Set(projects.flatMap(p => p.technologies))).length}
            </span>
            <span className={styles.statLabel}>Technologies Used</span>
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Projects;