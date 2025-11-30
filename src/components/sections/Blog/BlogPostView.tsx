import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogPost, formatDate } from '../../../data/blog';
import SocialShare from './SocialShare';
import styles from './BlogPostView.module.scss';

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack }) => {
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post.id]);

  const handleBackClick = () => {
    onBack();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onBack();
    }
  };

  // Format content with proper line breaks and structure
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        const trimmedLine = line.trim();
        
        // Handle headers
        if (trimmedLine.startsWith('# ')) {
          return (
            <h1 key={index} className={styles.contentH1}>
              {trimmedLine.substring(2)}
            </h1>
          );
        }
        if (trimmedLine.startsWith('## ')) {
          return (
            <h2 key={index} className={styles.contentH2}>
              {trimmedLine.substring(3)}
            </h2>
          );
        }
        if (trimmedLine.startsWith('### ')) {
          return (
            <h3 key={index} className={styles.contentH3}>
              {trimmedLine.substring(4)}
            </h3>
          );
        }
        
        // Handle bold text
        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
          return (
            <p key={index} className={styles.contentBold}>
              {trimmedLine.slice(2, -2)}
            </p>
          );
        }
        
        // Handle numbered lists
        if (/^\d+\./.test(trimmedLine)) {
          return (
            <li key={index} className={styles.contentListItem}>
              {trimmedLine.replace(/^\d+\.\s*/, '')}
            </li>
          );
        }
        
        // Handle bullet points
        if (trimmedLine.startsWith('- ')) {
          return (
            <li key={index} className={styles.contentListItem}>
              {trimmedLine.substring(2)}
            </li>
          );
        }
        
        // Handle empty lines
        if (trimmedLine === '') {
          return <br key={index} />;
        }
        
        // Regular paragraphs
        return (
          <p key={index} className={styles.contentParagraph}>
            {trimmedLine}
          </p>
        );
      });
  };

  return (
    <motion.article 
      className={styles.blogPostView}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Back Navigation */}
      <motion.div 
        className={styles.backNavigation}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <button 
          onClick={handleBackClick}
          className={styles.backButton}
          aria-label="Back to blog listing"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span>Back to Blog</span>
        </button>
      </motion.div>

      {/* Article Header */}
      <motion.header 
        className={styles.articleHeader}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {post.coverImage && (
          <div className={styles.coverImageContainer}>
            <img 
              src={post.coverImage} 
              alt={post.title}
              className={styles.coverImage}
            />
            {post.featured && (
              <div className={styles.featuredBadge}>
                <span>Featured Article</span>
              </div>
            )}
          </div>
        )}

        <div className={styles.headerContent}>
          <div className={styles.metadata}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.date}>{formatDate(post.publishDate)}</span>
            <span className={styles.readingTime}>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              {post.readingTime} min read
            </span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.authorInfo}>
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className={styles.authorAvatar}
            />
            <div className={styles.authorDetails}>
              <span className={styles.authorName}>{post.author.name}</span>
              <span className={styles.publishInfo}>
                Published on {formatDate(post.publishDate)}
              </span>
            </div>
          </div>

          <div className={styles.tags}>
            {post.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Social Share */}
      <motion.div
        className={styles.socialShareContainer}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <SocialShare 
          title={post.title}
          url={`${window.location.origin}/blog/${post.id}`}
          excerpt={post.excerpt}
        />
      </motion.div>

      {/* Article Content */}
      <motion.div 
        className={styles.articleContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className={styles.content}>
          {formatContent(post.content)}
        </div>
      </motion.div>

      {/* Article Footer */}
      <motion.footer 
        className={styles.articleFooter}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className={styles.footerContent}>
          <div className={styles.shareSection}>
            <h3>Share this article</h3>
            <SocialShare 
              title={post.title}
              url={`${window.location.origin}/blog/${post.id}`}
              excerpt={post.excerpt}
              variant="horizontal"
            />
          </div>

          <div className={styles.authorSection}>
            <div className={styles.authorCard}>
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className={styles.authorCardAvatar}
              />
              <div className={styles.authorCardContent}>
                <h4>{post.author.name}</h4>
                <p>
                  Computer Science Engineering student passionate about full-stack development, 
                  Python programming, and building innovative applications that solve real-world problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.article>
  );
};

export default BlogPostView;