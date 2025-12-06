import { SocialLink } from '../components/sections/Hero';

// Pranesh K K's personal information
export const personalInfo = {
  name: 'PRANESH K K',
  title: 'Full Stack Developer',
  subtitle: 'B.E COMPUTER SCIENCE AND ENGINEERING',
  description:
    'Passionate developer with expertise in Python, C programming, and full-stack web development. NPTEL certified in Python for Data Science with hands-on experience in building innovative applications.',
  profileImage:
    '/images/projects/WhatsApp Image 2025-11-30 at 08.54.00_f6ac79c0.jpg',
  email: 'pkpraneshkk@gmail.com',
  phone: '+91 9443525784',
  location:
    '171/228, Kollaptti, Tiruchengode, Animoor(PO), Namakkal(DT), 637214',

  // Professional summary
  objective:
    'Seeking opportunities to leverage my proficiency in Python and C programming, along with my full-stack development skills, to contribute to innovative software solutions and continue growing as a technology professional.',

  // Social media and professional links
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/Praneshkk25',
      icon: '🔗',
      label: 'View GitHub repositories and projects',
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/pranesh-k-k-3b17a228a',
      icon: '💼',
      label: 'Connect on LinkedIn',
    },
    {
      platform: 'Email',
      url: 'mailto:pkpraneshkk@gmail.com',
      icon: '📧',
      label: 'Send an email',
    },
    {
      platform: 'Phone',
      url: 'tel:+919443525784',
      icon: '📱',
      label: 'Call or message',
    },
  ] as SocialLink[],

  // Education details
  education: {
    current: {
      institution: 'SONA COLLEGE OF TECHNOLOGY',
      degree: 'Bachelor of Engineering',
      field: 'Computer Science and Engineering',
      duration: '2022-2027',
      cgpa: '7.9',
      status: 'Currently pursuing',
    },
    previous: [
      {
        level: 'HSC (Higher Secondary Certificate)',
        institution: 'SRV Boys Higher Secondary School',
        percentage: '65%',
        year: '2022',
      },
      {
        level: 'SSLC (Secondary School Leaving Certificate)',
        institution: 'Shri Vinayaga Higher Secondary School',
        percentage: '100%',
        year: '2020',
      },
    ],
  },

  // Professional experience
  experience: [
    {
      company: 'VEERANA R&D INNOVATION 24/7',
      position: 'Full Stack Development Intern',
      duration: 'JUNE 06 to JULY 20 2025',
      responsibilities: [
        'Web development using modern frameworks and technologies',
        'Full-stack development with focus on interactive applications',
        'Collaborative development in team environment',
        'Implementation of responsive and user-friendly interfaces',
      ],
      skills: [
        'Web Development',
        'Full-stack Development',
        'Interactive Applications',
        'Team Collaboration',
      ],
    },
    {
      company: 'InLighnX Global Pvt Ltd (InLighn Tech)',
      position: 'AI&ML Intern',
      duration: 'AUG 20 to OCT 20 2025',
      responsibilities: [
        'Web development using modern frameworks and technologies',
        'Machine Learning Trainig with focus on interactive applications',
        'Collaborative development in team environment',
        'Implementation of responsive and user-friendly interfaces',
      ],
      skills: [
        'Web Development',
        'AI&Ml Development',
        'Interactive Applications',
        'ML Training',
        'Team Collaboration',
      ],
    },
  ],

  // Technical skills and certifications
  skills: {
    programming: [
      { name: 'Python', proficiency: 90, category: 'Programming Languages' },
      {
        name: 'C Programming',
        proficiency: 85,
        category: 'Programming Languages',
      },
      {
        name: 'JavaScript',
        proficiency: 80,
        category: 'Programming Languages',
      },
      {
        name: 'TypeScript',
        proficiency: 75,
        category: 'Programming Languages',
      },
    ],
    development: [
      {
        name: 'Full Stack Development',
        proficiency: 85,
        category: 'Development',
      },
      { name: 'Web Development', proficiency: 88, category: 'Development' },
      { name: 'App Development', proficiency: 80, category: 'Development' },
      {
        name: 'Frontend Development',
        proficiency: 85,
        category: 'Development',
      },
      { name: 'Backend Development', proficiency: 82, category: 'Development' },
    ],
    tools: [
      { name: 'Git & GitHub', proficiency: 85, category: 'Tools' },
      { name: 'VS Code', proficiency: 90, category: 'Tools' },
      { name: 'Database Management', proficiency: 75, category: 'Tools' },
    ],
  },

  // Certifications
  certifications: [
    {
      name: 'NPTEL certification in Python for Data Science',
      issuer: 'NPTEL (National Programme on Technology Enhanced Learning)',
      date: '2024',
      credentialId: 'NPTEL24CS07S1234567', // This would be the actual credential ID
      description:
        'Comprehensive certification covering Python programming fundamentals, data structures, data analysis, and data science applications',
    },
    {
      name: 'Design & Implementation of Human-Computer Interfaces',
      issuer: 'NPTEL (National Programme on Technology Enhanced Learning)',
      date: '2025',
      credentialId: 'NPTEL24CS07S1234567', // This would be the actual credential ID
      description:
        'Comprehensive certification covering principles of human-computer interaction, user interface design, usability testing, interaction design patterns, and accessibility standards. This certification demonstrates expertise in creating user-centered interfaces and understanding cognitive aspects of user experience.',
    },
    {
      name: 'Introduction to Machine Learning - IITKGP',
      issuer: 'NPTEL (National Programme on Technology Enhanced Learning)',
      date: '2025',
      credentialId: 'NPTEL24CS07S1234567', // This would be the actual credential ID
      description:
        'omprehensive certification covering machine learning fundamentals, supervised and unsupervised learning algorithms, neural networks, model evaluation, feature engineering, and practical ML applications. This certification demonstrates proficiency in implementing and deploying machine learning models for real-world problems.',
    },
    {
      name: 'Design Thinking - A Primer',
      issuer: 'NPTEL (National Programme on Technology Enhanced Learning)',
      date: '2025',
      credentialId: 'NPTEL24CS07S1234567', // This would be the actual credential ID
      description:
        'Comprehensive certification covering design thinking methodology, empathy-driven problem solving, ideation techniques, prototyping strategies, and user-centered innovation. This certification demonstrates ability to apply creative problem-solving approaches to develop innovative solutions for complex challenges.',
    },
  ],

  // Language proficiencies
  languages: [
    { name: 'English', proficiency: 'Full professional proficiency' },
    { name: 'Tamil', proficiency: 'Native' },
  ],

  // Key projects (brief overview for hero section)
  featuredProjects: [
    {
      name: 'Mental Health Chatting Application',
      role: 'Team Lead',
      duration: 'MAY 2022 - JULY 2022',
      teamSize: 4,
      description:
        'Led development of a mental health support application with chat functionality',
    },
    {
      name: 'DISABILITY PEOPLE ASSISTANT',
      role: 'Team Lead',
      duration: 'APR 2022 - MAY 2022',
      description:
        'Developed assistive technology application for people with disabilities',
    },
    {
      name: 'Chrunchy Tamizhan E-commerce App',
      role: 'Developer',
      duration: 'JUNE 2025 - SEP 2025',
      description:
        'Built comprehensive e-commerce application with modern web technologies',
    },
    {
      name: 'Language Agnostic Chatbot',
      role: 'Developer',
      duration: 'Aug 2025 - Dec 2025',
      description: 'Built comprehensive chatbot for all college queries',
    },
  ],

  // Interests and hobbies
  interests: [
    'Software Development',
    'Data Science',
    'Machine Learning',
    'Open Source Contribution',
    'Technology Innovation',
    'Problem Solving',
  ],
};

// Export individual sections for easier access
export const {
  name,
  title,
  subtitle,
  description,
  email,
  phone,
  location,
  socialLinks,
  objective,
  education,
  experience,
  skills,
  certifications,
  languages,
  featuredProjects,
  interests,
} = personalInfo;

// Helper functions for data access
export const getSocialLinkByPlatform = (
  platform: string
): SocialLink | undefined => {
  return socialLinks.find(
    (link) => link.platform.toLowerCase() === platform.toLowerCase()
  );
};

export const getSkillsByCategory = (category: string) => {
  const allSkills = [
    ...skills.programming,
    ...skills.development,
    ...skills.tools,
  ];
  return allSkills.filter((skill) => skill.category === category);
};

export const getHighestProficiencySkills = (limit: number = 5) => {
  const allSkills = [
    ...skills.programming,
    ...skills.development,
    ...skills.tools,
  ];
  return allSkills
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, limit);
};

export default personalInfo;
