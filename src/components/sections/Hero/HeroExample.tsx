import React from 'react';
import { HeroContainer } from './HeroContainer';

/**
 * Example usage of the Hero component with Pranesh's information
 * This component can be imported and used in the main App component
 */
export const HeroExample: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Pranesh's Information */}
      <HeroContainer />
      
      {/* Additional sections would go here */}
      {/* <AboutSection /> */}
      {/* <SkillsSection /> */}
      {/* <ProjectsSection /> */}
      {/* <ResumeSection /> */}
      {/* <BlogSection /> */}
      {/* <ContactSection /> */}
    </div>
  );
};

export default HeroExample;