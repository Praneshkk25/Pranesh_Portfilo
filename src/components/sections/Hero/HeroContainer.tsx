import React from 'react';
import { Hero } from './Hero';
import { personalInfo } from '../../../data/personalInfo';

// Profile image placeholder - this would be replaced with actual image
const profileImageUrl = '/images/pranesh-profile.jpg'; // This would be the actual image path

export const HeroContainer: React.FC = () => {
  // Handle contact button click
  const handleContactClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle resume button click
  const handleResumeClick = () => {
    // Scroll to resume section
    const resumeSection = document.getElementById('resume');
    if (resumeSection) {
      resumeSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Enhanced social links with proper icons and labels
  const enhancedSocialLinks = [
    {
      platform: "GitHub",
      url: "https://github.com/praneshkk25",
      icon: "🔗",
      label: "View my repositories and projects on GitHub"
    },
    {
      platform: "LinkedIn", 
      url: "www.linkedin.com/in/pranesh-k-k-3b17a228a", // This should be updated with actual LinkedIn URL
      icon: "💼",
      label: "Connect with me on LinkedIn"
    },
    {
      platform: "Email",
      url: `pkpraneshkk@gmail.com`,
      icon: "📧", 
      label: "Send me an email"
    },
    {
      platform: "Phone",
      url: `9443525784`,
      icon: "📱",
      label: "Call or message me"
    }
  ];

  return (
    <Hero
      name={personalInfo.name}
      title={personalInfo.title}
      subtitle={personalInfo.subtitle}
      profileImage={profileImageUrl}
      socialLinks={enhancedSocialLinks}
      email={personalInfo.email}
      phone={personalInfo.phone}
      onContactClick={handleContactClick}
      onResumeClick={handleResumeClick}
    />
  );
};

export default HeroContainer;