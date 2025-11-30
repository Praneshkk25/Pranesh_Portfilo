// SEO Optimization Utilities

// ============================================================================
// META TAG MANAGEMENT
// ============================================================================

export interface SEOMetaData {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  robots?: string;
  viewport?: string;
  themeColor?: string;
  
  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  ogSiteName?: string;
  
  // Twitter Card
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  
  // Additional meta tags
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

/**
 * Update document meta tags for SEO
 */
export const updateMetaTags = (metaData: SEOMetaData): void => {
  const {
    title,
    description,
    keywords,
    author,
    canonical,
    robots = 'index, follow',
    viewport = 'width=device-width, initial-scale=1',
    themeColor,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType = 'website',
    ogSiteName,
    twitterCard = 'summary_large_image',
    twitterSite,
    twitterCreator,
    twitterTitle,
    twitterDescription,
    twitterImage,
    additionalMeta = []
  } = metaData;

  // Update title
  if (title) {
    document.title = title;
  }

  // Helper function to set meta tag
  const setMetaTag = (selector: string, content: string) => {
    let meta = document.querySelector(selector) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      if (selector.includes('property=')) {
        meta.setAttribute('property', selector.match(/property="([^"]*)"/)![1]);
      } else if (selector.includes('name=')) {
        meta.setAttribute('name', selector.match(/name="([^"]*)"/)![1]);
      }
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  // Helper function to set link tag
  const setLinkTag = (rel: string, href: string) => {
    let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }
    link.href = href;
  };

  // Basic meta tags
  if (description) setMetaTag('meta[name="description"]', description);
  if (keywords) setMetaTag('meta[name="keywords"]', keywords.join(', '));
  if (author) setMetaTag('meta[name="author"]', author);
  setMetaTag('meta[name="robots"]', robots);
  setMetaTag('meta[name="viewport"]', viewport);
  if (themeColor) setMetaTag('meta[name="theme-color"]', themeColor);

  // Canonical URL
  if (canonical) setLinkTag('canonical', canonical);

  // Open Graph tags
  if (ogTitle) setMetaTag('meta[property="og:title"]', ogTitle);
  if (ogDescription) setMetaTag('meta[property="og:description"]', ogDescription);
  if (ogImage) setMetaTag('meta[property="og:image"]', ogImage);
  if (ogUrl) setMetaTag('meta[property="og:url"]', ogUrl);
  setMetaTag('meta[property="og:type"]', ogType);
  if (ogSiteName) setMetaTag('meta[property="og:site_name"]', ogSiteName);

  // Twitter Card tags
  setMetaTag('meta[name="twitter:card"]', twitterCard);
  if (twitterSite) setMetaTag('meta[name="twitter:site"]', twitterSite);
  if (twitterCreator) setMetaTag('meta[name="twitter:creator"]', twitterCreator);
  if (twitterTitle) setMetaTag('meta[name="twitter:title"]', twitterTitle);
  if (twitterDescription) setMetaTag('meta[name="twitter:description"]', twitterDescription);
  if (twitterImage) setMetaTag('meta[name="twitter:image"]', twitterImage);

  // Additional meta tags
  additionalMeta.forEach(({ name, property, content }) => {
    if (name) {
      setMetaTag(`meta[name="${name}"]`, content);
    } else if (property) {
      setMetaTag(`meta[property="${property}"]`, content);
    }
  });
};

// ============================================================================
// STRUCTURED DATA (JSON-LD)
// ============================================================================

export interface PersonStructuredData {
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  description?: string;
  url?: string;
  image?: string;
  email?: string;
  telephone?: string;
  address?: {
    '@type': 'PostalAddress';
    addressLocality?: string;
    addressRegion?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
  alumniOf?: Array<{
    '@type': 'EducationalOrganization';
    name: string;
    url?: string;
  }>;
  worksFor?: Array<{
    '@type': 'Organization';
    name: string;
    url?: string;
  }>;
  knowsAbout?: string[];
}

export interface WebsiteStructuredData {
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  author?: PersonStructuredData;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface BlogPostStructuredData {
  '@type': 'BlogPosting';
  headline: string;
  description?: string;
  image?: string;
  author: PersonStructuredData;
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage?: string;
  wordCount?: number;
  keywords?: string[];
}

/**
 * Add structured data to the page
 */
export const addStructuredData = (data: any): void => {
  const structuredData = {
    '@context': 'https://schema.org',
    ...data
  };

  // Remove existing structured data script
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData, null, 2);
  document.head.appendChild(script);
};

// ============================================================================
// SITEMAP GENERATION
// ============================================================================

export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate sitemap XML content
 */
export const generateSitemap = (entries: SitemapEntry[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urls = entries.map(entry => {
    const { url, lastModified, changeFrequency, priority } = entry;
    
    let urlXml = `  <url>\n    <loc>${url}</loc>`;
    
    if (lastModified) {
      urlXml += `\n    <lastmod>${lastModified.toISOString().split('T')[0]}</lastmod>`;
    }
    
    if (changeFrequency) {
      urlXml += `\n    <changefreq>${changeFrequency}</changefreq>`;
    }
    
    if (priority !== undefined) {
      urlXml += `\n    <priority>${priority.toFixed(1)}</priority>`;
    }
    
    urlXml += '\n  </url>';
    return urlXml;
  }).join('\n');

  return `${xmlHeader}\n${urlsetOpen}\n${urls}\n${urlsetClose}`;
};

// ============================================================================
// ROBOTS.TXT GENERATION
// ============================================================================

export interface RobotsConfig {
  userAgent?: string;
  allow?: string[];
  disallow?: string[];
  crawlDelay?: number;
  sitemap?: string;
}

/**
 * Generate robots.txt content
 */
export const generateRobotsTxt = (configs: RobotsConfig[]): string => {
  return configs.map(config => {
    const { userAgent = '*', allow = [], disallow = [], crawlDelay, sitemap } = config;
    
    let robotsTxt = `User-agent: ${userAgent}\n`;
    
    allow.forEach(path => {
      robotsTxt += `Allow: ${path}\n`;
    });
    
    disallow.forEach(path => {
      robotsTxt += `Disallow: ${path}\n`;
    });
    
    if (crawlDelay) {
      robotsTxt += `Crawl-delay: ${crawlDelay}\n`;
    }
    
    if (sitemap) {
      robotsTxt += `Sitemap: ${sitemap}\n`;
    }
    
    return robotsTxt;
  }).join('\n');
};

// ============================================================================
// SEO ANALYSIS
// ============================================================================

export interface SEOAnalysis {
  title: {
    present: boolean;
    length: number;
    optimal: boolean;
  };
  description: {
    present: boolean;
    length: number;
    optimal: boolean;
  };
  headings: {
    h1Count: number;
    h1Present: boolean;
    hierarchyValid: boolean;
  };
  images: {
    total: number;
    withAlt: number;
    missingAlt: number;
  };
  links: {
    internal: number;
    external: number;
    nofollow: number;
  };
  performance: {
    loadTime?: number;
    imageOptimization: boolean;
  };
}

/**
 * Analyze page SEO
 */
export const analyzeSEO = (): SEOAnalysis => {
  const title = document.title;
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  
  // Analyze headings
  const h1Elements = document.querySelectorAll('h1');
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  // Check heading hierarchy
  let hierarchyValid = true;
  let lastLevel = 0;
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1));
    if (level > lastLevel + 1) {
      hierarchyValid = false;
    }
    lastLevel = level;
  });
  
  // Analyze images
  const images = document.querySelectorAll('img');
  const imagesWithAlt = document.querySelectorAll('img[alt]');
  
  // Analyze links
  const allLinks = document.querySelectorAll('a[href]');
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  const nofollowLinks = document.querySelectorAll('a[rel*="nofollow"]');
  
  return {
    title: {
      present: title.length > 0,
      length: title.length,
      optimal: title.length >= 30 && title.length <= 60
    },
    description: {
      present: metaDescription.length > 0,
      length: metaDescription.length,
      optimal: metaDescription.length >= 120 && metaDescription.length <= 160
    },
    headings: {
      h1Count: h1Elements.length,
      h1Present: h1Elements.length > 0,
      hierarchyValid
    },
    images: {
      total: images.length,
      withAlt: imagesWithAlt.length,
      missingAlt: images.length - imagesWithAlt.length
    },
    links: {
      internal: allLinks.length - externalLinks.length,
      external: externalLinks.length,
      nofollow: nofollowLinks.length
    },
    performance: {
      imageOptimization: Array.from(images).every(img => 
        img.loading === 'lazy' || img.closest('[data-priority="true"]')
      )
    }
  };
};

// ============================================================================
// DEFAULT SEO CONFIGURATIONS
// ============================================================================

export const defaultSEOConfig: SEOMetaData = {
  title: 'Pranesh K K - Full Stack Developer & Computer Science Engineer',
  description: 'Portfolio of Pranesh K K, a skilled Full Stack Developer and Computer Science Engineering student with expertise in Python, C programming, and web development. NPTEL certified in Python for Data Science.',
  keywords: [
    'Pranesh K K',
    'Full Stack Developer',
    'Computer Science Engineer',
    'Python Developer',
    'Web Developer',
    'NPTEL Certification',
    'Portfolio',
    'React Developer',
    'Frontend Developer',
    'Backend Developer'
  ],
  author: 'Pranesh K K',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
  
  // Open Graph
  ogType: 'website',
  ogSiteName: 'Pranesh K K Portfolio',
  
  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterCreator: '@praneshkk210'
};

export const defaultPersonStructuredData: PersonStructuredData = {
  '@type': 'Person',
  name: 'Pranesh K K',
  jobTitle: 'Full Stack Developer & Computer Science Engineering Student',
  description: 'Skilled Full Stack Developer with expertise in Python, C programming, and web development. NPTEL certified in Python for Data Science.',
  email: 'praneshkk210@gmail.com',
  telephone: '+91 9443125734',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tiruchirapalli',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'India'
  },
  sameAs: [
    'https://github.com/praneshkk210/Sub-repositories',
    'https://linkedin.com/in/praneshkk210'
  ],
  alumniOf: [{
    '@type': 'EducationalOrganization',
    name: 'SCMA COLLEGE OF TECHNOLOGY'
  }],
  knowsAbout: [
    'Python Programming',
    'C Programming',
    'Full Stack Development',
    'Web Development',
    'React.js',
    'Node.js',
    'Data Science',
    'Software Engineering'
  ]
};

// Export all utilities
export default {
  updateMetaTags,
  addStructuredData,
  generateSitemap,
  generateRobotsTxt,
  analyzeSEO,
  defaultSEOConfig,
  defaultPersonStructuredData
};