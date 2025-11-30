import { useEffect } from 'react';
import { updateMetaTags, addStructuredData, SEOMetaData, defaultSEOConfig } from '../utils/seo';

interface UseSEOOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  structuredData?: any;
  noIndex?: boolean;
}

/**
 * Custom hook for managing SEO meta tags and structured data
 */
export const useSEO = (options: UseSEOOptions = {}) => {
  const {
    title,
    description,
    keywords,
    canonical,
    ogImage,
    structuredData,
    noIndex = false
  } = options;

  useEffect(() => {
    // Prepare meta data
    const metaData: SEOMetaData = {
      ...defaultSEOConfig,
      title: title ? `${title} | ${defaultSEOConfig.title}` : defaultSEOConfig.title,
      description: description || defaultSEOConfig.description,
      keywords: keywords || defaultSEOConfig.keywords,
      canonical: canonical || window.location.href,
      robots: noIndex ? 'noindex, nofollow' : 'index, follow',
      
      // Open Graph
      ogTitle: title || defaultSEOConfig.title,
      ogDescription: description || defaultSEOConfig.description,
      ogImage: ogImage,
      ogUrl: canonical || window.location.href,
      
      // Twitter Card
      twitterTitle: title || defaultSEOConfig.title,
      twitterDescription: description || defaultSEOConfig.description,
      twitterImage: ogImage
    };

    // Update meta tags
    updateMetaTags(metaData);

    // Add structured data if provided
    if (structuredData) {
      addStructuredData(structuredData);
    }

    // Cleanup function to reset title on unmount
    return () => {
      document.title = defaultSEOConfig.title || 'Pranesh K K Portfolio';
    };
  }, [title, description, keywords, canonical, ogImage, structuredData, noIndex]);
};

export default useSEO;