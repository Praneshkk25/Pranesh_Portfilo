// Skills data for Pranesh K K
// Based on his technical expertise, NPTEL certification, and project experience

export interface Skill {
  id: string;
  name: string;
  category: 'Full Stack Development' | 'App Development' | 'Web Development' | 'Programming Languages' | 'Tools & Technologies';
  proficiency: number; // 0-100
  icon: string;
  description: string;
  color: string; // For category color coding
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  badgeUrl?: string;
  verificationUrl?: string;
}

export interface Language {
  name: string;
  proficiency: 'Native' | 'Full professional proficiency' | 'Professional working proficiency' | 'Limited working proficiency' | 'Elementary proficiency';
  level: number; // 1-5 scale for visual representation
}

// Pranesh's technical skills based on his background
export const skills: Skill[] = [
  // Programming Languages
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    proficiency: 90,
    icon: '🐍',
    description: 'Advanced proficiency with NPTEL certification in Python for Data Science. Experienced in data structures, algorithms, and data analysis.',
    color: '#3776ab'
  },
  {
    id: 'c-programming',
    name: 'C Programming',
    category: 'Programming Languages',
    proficiency: 85,
    icon: '⚡',
    description: 'Strong foundation in C programming with focus on system programming and algorithmic problem solving.',
    color: '#00599c'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming Languages',
    proficiency: 80,
    icon: '🟨',
    description: 'Proficient in modern JavaScript (ES6+) for both frontend and backend development.',
    color: '#f7df1e'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Programming Languages',
    proficiency: 75,
    icon: '🔷',
    description: 'Experience with TypeScript for type-safe development in large-scale applications.',
    color: '#3178c6'
  },

  // Full Stack Development
  {
    id: 'full-stack-dev',
    name: 'Full Stack Development',
    category: 'Full Stack Development',
    proficiency: 85,
    icon: '🔄',
    description: 'Comprehensive experience in both frontend and backend development, demonstrated through internship at VEERANA R&D INNOVATION 24/7.',
    color: '#61dafb'
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'Full Stack Development',
    proficiency: 82,
    icon: '⚛️',
    description: 'Building interactive user interfaces with React, including hooks, context, and modern patterns.',
    color: '#61dafb'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Full Stack Development',
    proficiency: 78,
    icon: '🟢',
    description: 'Server-side JavaScript development with Node.js for building scalable backend applications.',
    color: '#339933'
  },
  {
    id: 'database',
    name: 'Database Management',
    category: 'Full Stack Development',
    proficiency: 75,
    icon: '🗄️',
    description: 'Experience with SQL and NoSQL databases for data storage and retrieval in web applications.',
    color: '#336791'
  },

  // Web Development
  {
    id: 'web-development',
    name: 'Web Development',
    category: 'Web Development',
    proficiency: 88,
    icon: '🌐',
    description: 'Comprehensive web development skills including responsive design, modern frameworks, and best practices.',
    color: '#e34f26'
  },
  {
    id: 'html-css',
    name: 'HTML5 & CSS3',
    category: 'Web Development',
    proficiency: 90,
    icon: '🎨',
    description: 'Advanced HTML5 and CSS3 skills including Flexbox, Grid, animations, and responsive design.',
    color: '#e34f26'
  },
  {
    id: 'responsive-design',
    name: 'Responsive Design',
    category: 'Web Development',
    proficiency: 85,
    icon: '📱',
    description: 'Creating mobile-first, responsive web applications that work seamlessly across all devices.',
    color: '#38bdf8'
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    category: 'Web Development',
    proficiency: 70,
    icon: '🎯',
    description: 'Understanding of user interface and user experience design principles for creating intuitive applications.',
    color: '#ff6b6b'
  },

  // App Development
  {
    id: 'app-development',
    name: 'App Development',
    category: 'App Development',
    proficiency: 80,
    icon: '📱',
    description: 'Experience in developing mobile and desktop applications, including the Mental Health Chatting Application project.',
    color: '#a855f7'
  },
  {
    id: 'mobile-dev',
    name: 'Mobile Development',
    category: 'App Development',
    proficiency: 75,
    icon: '📲',
    description: 'Building cross-platform mobile applications with focus on user experience and performance.',
    color: '#06b6d4'
  },
  {
    id: 'interactive-apps',
    name: 'Interactive Applications',
    category: 'App Development',
    proficiency: 82,
    icon: '🎮',
    description: 'Developing interactive applications with engaging user interfaces, as demonstrated in internship projects.',
    color: '#8b5cf6'
  },

  // Tools & Technologies
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'Tools & Technologies',
    proficiency: 85,
    icon: '🔧',
    description: 'Version control with Git and collaborative development using GitHub for project management.',
    color: '#f05032'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Tools & Technologies',
    proficiency: 90,
    icon: '💻',
    description: 'Proficient use of Visual Studio Code with extensions and customizations for efficient development.',
    color: '#007acc'
  },
  {
    id: 'data-science',
    name: 'Data Science',
    category: 'Tools & Technologies',
    proficiency: 80,
    icon: '📊',
    description: 'Data analysis and data science techniques using Python, backed by NPTEL certification.',
    color: '#ff9500'
  }
];

// Pranesh's certifications
export const certifications: Certification[] = [
  {
    id: 'nptel-python',
    name: 'NPTEL certification in Python for Data Science',
    issuer: 'NPTEL (National Programme on Technology Enhanced Learning)',
    date: '2024',
    credentialId: 'NPTEL24CS07S1234567', // This would be the actual credential ID
    description: 'Comprehensive certification covering Python programming fundamentals, data structures, data analysis, pandas, numpy, matplotlib, and data science applications. This certification demonstrates proficiency in using Python for data manipulation, analysis, and visualization.',
    badgeUrl: '/assets/nptel-badge.png', // Path to badge image
    verificationUrl: 'https://nptel.ac.in/verify' // Verification URL
  }
];

// Pranesh's language proficiencies
export const languages: Language[] = [
  {
    name: 'English',
    proficiency: 'Full professional proficiency',
    level: 4
  },
  {
    name: 'Tamil',
    proficiency: 'Native',
    level: 5
  },
  {
    name: 'Telugu',
    proficiency: 'Native',
    level: 5
  }
];

// Skill categories with colors and descriptions
export const skillCategories = {
  'Full Stack Development': {
    color: '#61dafb',
    description: 'End-to-end web application development',
    icon: '🔄'
  },
  'App Development': {
    color: '#a855f7',
    description: 'Mobile and desktop application development',
    icon: '📱'
  },
  'Web Development': {
    color: '#e34f26',
    description: 'Frontend web technologies and responsive design',
    icon: '🌐'
  },
  'Programming Languages': {
    color: '#3776ab',
    description: 'Core programming languages and paradigms',
    icon: '💻'
  },
  'Tools & Technologies': {
    color: '#f05032',
    description: 'Development tools and supporting technologies',
    icon: '🔧'
  }
};

// Helper functions
export const getSkillsByCategory = (category: string): Skill[] => {
  return skills.filter(skill => skill.category === category);
};

export const getTopSkills = (limit: number = 5): Skill[] => {
  return skills
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, limit);
};

export const getSkillById = (id: string): Skill | undefined => {
  return skills.find(skill => skill.id === id);
};

export const getCertificationById = (id: string): Certification | undefined => {
  return certifications.find(cert => cert.id === id);
};

export const getLanguageLevel = (proficiency: string): number => {
  const levels = {
    'Native': 5,
    'Full professional proficiency': 4,
    'Professional working proficiency': 3,
    'Limited working proficiency': 2,
    'Elementary proficiency': 1
  };
  return levels[proficiency as keyof typeof levels] || 1;
};

// Export all data
export default {
  skills,
  certifications,
  languages,
  skillCategories,
  getSkillsByCategory,
  getTopSkills,
  getSkillById,
  getCertificationById,
  getLanguageLevel
};