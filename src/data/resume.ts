// Resume data for Pranesh K K
// Comprehensive resume information including education, experience, and achievements

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  duration: string;
  cgpa?: string;
  percentage?: string;
  status?: string;
  level: 'undergraduate' | 'hsc' | 'sslc';
  year?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
  skills: string[];
  type: 'internship' | 'fulltime' | 'parttime' | 'freelance';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'certification' | 'project' | 'academic' | 'leadership';
}

// Pranesh's education details
export const education: Education[] = [
  {
    id: 'scma-college',
    institution: 'SONA COLLEGE OF TECHNOLOGY',
    degree: 'Bachelor of Engineering',
    field: 'Computer Science and Engineering',
    duration: '2022-2027',
    cgpa: '7.9',
    status: 'Currently pursuing',
    level: 'undergraduate',
  },
  {
    id: 'hsc',
    institution: 'SRV Boys Higher Secondary School',
    degree: 'Higher Secondary Certificate (HSC)',
    duration: '2020-2022',
    percentage: '65%',
    year: '2022',
    level: 'hsc',
  },
  {
    id: 'sslc',
    institution: 'Shri Vinayaga Higher Secondary School',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    duration: '2019-2020',
    percentage: '100%',
    year: '2020',
    level: 'sslc',
  },
];

// Pranesh's professional experience
export const experience: Experience[] = [
  {
    id: 'veerana-internship',
    company: 'VEERANA R&D INNOVATION 24/7',
    position: 'Full Stack Development Intern',
    duration: 'JUNE 06 to JULY 20 2025',
    responsibilities: [
      'Web development using modern frameworks and technologies',
      'Full-stack development with focus on interactive applications',
      'Collaborative development in team environment',
      'Implementation of responsive and user-friendly interfaces',
      'Code review and quality assurance processes',
      'Integration of frontend and backend systems',
    ],
    skills: [
      'Web Development',
      'Full-stack Development',
      'Interactive Applications',
      'Team Collaboration',
      'React.js',
      'Node.js',
    ],
    type: 'internship',
  },
  {
    id: 'inlighnx-internship',
    company: 'InLighnX Global Pvt Ltd (InLighn Tech)',
    position: 'AI&ML Intern',
    duration: 'AUG 20 to OCT 20 2025',
    responsibilities: [
      'Web development using modern frameworks and technologies',
      'Machine Learning Training with focus on interactive applications',
      'Collaborative development in team environment',
      'Implementation of responsive and user-friendly interfaces',
      'Data preprocessing and model training',
      'Integration of AI/ML models into applications',
    ],
    skills: [
      'Web Development',
      'AI & ML Development',
      'Interactive Applications',
      'ML Training',
      'Team Collaboration',
      'Python',
      'Machine Learning',
    ],
    type: 'internship',
  },
];

// Pranesh's key achievements
export const achievements: Achievement[] = [
  {
    id: 'nptel-certification',
    title: 'NPTEL certification in Python for Data Science',
    description:
      'Comprehensive certification covering Python programming fundamentals, data structures, data analysis, and data science applications from National Programme on Technology Enhanced Learning',
    date: '2024',
    category: 'certification',
  },
  {
    id: 'mental-health-project',
    title: 'Mental Health Chatting Application - Team Lead',
    description:
      'Led a team of 4 members in developing an AI-powered mental health support application with conversational interface and mood tracking capabilities',
    date: 'MAY 2022 - JULY 2022',
    category: 'project',
  },
  {
    id: 'disability-assistant-project',
    title: 'Disability People Assistant - Team Lead',
    description:
      'Developed assistive technology application for people with disabilities featuring voice commands, adaptive interfaces, and accessibility-first design',
    date: 'APR 2022 - MAY 2022',
    category: 'project',
  },
  {
    id: 'ecommerce-project',
    title: 'Chrunchy Tamizhan E-commerce Platform',
    description:
      'Built comprehensive e-commerce platform for traditional Tamil food products using modern full-stack technologies including React, Node.js, and MongoDB',
    date: 'JUNE 2025 - SEP 2025',
    category: 'project',
  },
];

// Career objective
export const careerObjective =
  'Seeking opportunities to leverage my proficiency in Python and C programming, along with my full-stack development skills, to contribute to innovative software solutions and continue growing as a technology professional. Passionate about creating user-centric applications that solve real-world problems.';

// Resume summary
export const resumeSummary = {
  title: 'Full Stack Developer & Computer Science Student',
  highlights: [
    'B.E Computer Science and Engineering student with 7.9 CGPA',
    'NPTEL certified in Python for Data Science',
    'Proven leadership experience as Team Lead in multiple projects',
    'Full-stack development internship experience at VEERANA R&D INNOVATION 24/7',
    'Proficient in Python, C programming, and modern web technologies',
    'Experience in developing AI-powered applications and assistive technologies',
    'NPTEL certified in Design & Implementation of Human-Computer Interfaces',
    'NPTEL certified in Introduction to Machine Learning',
    'AI&ML Devlopment internship experience at InLighnX Global Pvt Ltd (InLighn Tech)'
  ],
};

// Helper functions
export const getEducationByLevel = (level: Education['level']): Education[] => {
  return education.filter((edu) => edu.level === level);
};

export const getExperienceByType = (type: Experience['type']): Experience[] => {
  return experience.filter((exp) => exp.type === type);
};

export const getAchievementsByCategory = (
  category: Achievement['category']
): Achievement[] => {
  return achievements.filter(
    (achievement) => achievement.category === category
  );
};

export const getCurrentEducation = (): Education | undefined => {
  return education.find((edu) => edu.status === 'Currently pursuing');
};

export const getLatestExperience = (): Experience | undefined => {
  return experience[0]; // Assuming the first item is the latest
};

// Export all resume data
export default {
  education,
  experience,
  achievements,
  careerObjective,
  resumeSummary,
  getEducationByLevel,
  getExperienceByType,
  getAchievementsByCategory,
  getCurrentEducation,
  getLatestExperience,
};
