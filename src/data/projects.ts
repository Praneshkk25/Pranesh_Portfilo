export interface Project {
  id: string;
  title: string;
  description: string;
  duration: string;
  role: string;
  teamSize?: number;
  technologies: string[];
  features: string[];
  category: 'web' | 'mobile' | 'fullstack' | 'ai';
  status: 'completed' | 'in-progress' | 'planned';
  liveUrl?: string;
  githubUrl?: string;
  images: string[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: 'mental-health-chatbot',
    title: 'Mental Health Chatting Application',
    description: 'A comprehensive mental health support application designed to provide users with accessible counseling and emotional support through an intelligent chatting interface.',
    duration: 'MAY 2022 - JULY 2022',
    role: 'Team Lead',
    teamSize: 4,
    technologies: ['Python', 'Natural Language Processing', 'Machine Learning', 'Flask', 'SQLite', 'HTML/CSS', 'JavaScript'],
    features: [
      'AI-powered conversational interface',
      'Mood tracking and analysis',
      'Crisis intervention protocols',
      'User authentication and privacy protection',
      'Resource recommendations',
      'Progress tracking dashboard'
    ],
    category: 'ai',
    status: 'completed',
    images: ['/images/projects/mental-health-app-1.jpg', '/images/projects/mental-health-app-2.jpg'],
    highlights: [
      'Led a team of 4 developers in creating an innovative mental health solution',
      'Implemented NLP algorithms for sentiment analysis and response generation',
      'Designed user-centric interface focusing on accessibility and privacy',
      'Integrated crisis intervention features for user safety'
    ]
  },
  {
    id: 'disability-assistant',
    title: 'DISABILITY PEOPLE ASSISTANT',
    description: 'An assistive technology application designed to help people with disabilities navigate daily tasks and access resources more easily through voice commands and adaptive interfaces.',
    duration: 'APR 2022 - MAY 2022',
    role: 'Team Lead',
    teamSize: 2,
    technologies: ['Python', 'Speech Recognition', 'Text-to-Speech', 'Computer Vision', 'OpenCV', 'Tkinter', 'APIs'],
    features: [
      'Voice command recognition and processing',
      'Text-to-speech functionality',
      'Visual assistance through computer vision',
      'Adaptive user interface design',
      'Emergency contact integration',
      'Daily task reminders and assistance'
    ],
    category: 'ai',
    status: 'completed',
    images: ['/images/projects/disability-assistant-1.jpg', '/images/projects/disability-assistant-2.jpg'],
    highlights: [
      'Developed accessibility-first application for people with disabilities',
      'Implemented voice recognition for hands-free interaction',
      'Created adaptive UI that adjusts to different disability needs',
      'Integrated computer vision for visual assistance features'
    ]
  },
  {
    id: 'chrunchy-tamizhan',
    title: 'Chrunchy Tamizhan',
    description: 'A comprehensive e-commerce platform specializing in traditional Tamil food products, featuring modern web technologies and seamless user experience for online food ordering and delivery.',
    duration: 'JUNE 2025 - SEP 2025',
    role: 'Full Stack Developer',
    teamSize: 3,
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'Stripe API', 'JWT', 'Cloudinary', 'Material-UI'],
    features: [
      'Product catalog with search and filtering',
      'Shopping cart and checkout system',
      'Payment integration with Stripe',
      'User authentication and profiles',
      'Order tracking and management',
      'Admin dashboard for inventory management',
      'Responsive design for mobile and desktop',
      'Image optimization and CDN integration'
    ],
    category: 'fullstack',
    status: 'completed',
    liveUrl: 'https://chrunchy-tamizhan.vercel.app',
    githubUrl: 'https://github.com/praneshkk210/chrunchy-tamizhan',
    images: ['/images/projects/chrunchy-tamizhan-1.jpg', '/images/projects/chrunchy-tamizhan-2.jpg', '/images/projects/chrunchy-tamizhan-3.jpg'],
    highlights: [
      'Built full-stack e-commerce platform with modern web technologies',
      'Implemented secure payment processing with Stripe integration',
      'Designed responsive UI/UX for optimal user experience',
      'Developed admin dashboard for comprehensive store management',
      'Optimized performance with image CDN and lazy loading'
    ]
  }
];

export const projectCategories = [
  { id: 'all', label: 'All Projects', color: '#6366f1' },
  { id: 'web', label: 'Web Development', color: '#3b82f6' },
  { id: 'mobile', label: 'Mobile Apps', color: '#10b981' },
  { id: 'fullstack', label: 'Full Stack', color: '#f59e0b' },
  { id: 'ai', label: 'AI/ML', color: '#ef4444' }
];

export const getTechnologyColor = (tech: string): string => {
  const techColors: { [key: string]: string } = {
    'Python': '#3776ab',
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'React': '#61dafb',
    'Node.js': '#339933',
    'Express.js': '#000000',
    'MongoDB': '#47a248',
    'Flask': '#000000',
    'SQLite': '#003b57',
    'HTML/CSS': '#e34f26',
    'Machine Learning': '#ff6f00',
    'Natural Language Processing': '#ff9800',
    'Computer Vision': '#2196f3',
    'OpenCV': '#5c3ee8',
    'Stripe API': '#635bff',
    'JWT': '#000000',
    'Material-UI': '#0081cb',
    'Cloudinary': '#3448c5',
    'Speech Recognition': '#4caf50',
    'Text-to-Speech': '#9c27b0',
    'Tkinter': '#306998'
  };
  
  return techColors[tech] || '#6b7280';
};