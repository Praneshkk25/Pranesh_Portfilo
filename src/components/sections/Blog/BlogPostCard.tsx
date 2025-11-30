import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost, formatDate } from '../../../data/blog';
import styles from './BlogPostCard.module.scss';

interface BlogPostCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
  index?: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onClick, index = 0 }) => {
  const handleClick = () => {
    onClick(post);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(post);
    }
  };

  return (
    <motion.article
      className={`${styles.blogCard} ${post.featured ? styles.featured : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${post.title}`}
    >
      {post.coverImage && (
        <div className={styles.imageContainer}>
          <img 
            src={post.coverImage} 
            alt={post.title}
            className={styles.coverImage}
            loading="lazy"
          />
          {post.featured && (
            <div className={styles.featuredBadge}>
              <span>Featured</span>
            </div>
          )}
        </div>
      )}
      
      <div className={styles.content}>
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

        <h3 className={styles.title}>{post.title}</h3>
        
        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.tags}>
          {post.tags.slice(0, 3).map((tag, tagIndex) => (
            <span key={tagIndex} className={styles.tag}>
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className={styles.moreTagsIndicator}>
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.author}>
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className={styles.authorAvatar}
            />
            <span className={styles.authorName}>{post.author.name}</span>
          </div>
          
          <div className={styles.readMore}>
            <span>Read more</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPostCard;