import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  blogPosts, 
  blogCategories, 
  getBlogPostsByCategory, 
  BlogPost 
} from '../../../data/blog';
import BlogPostCard from './BlogPostCard';
import CategoryFilter from './CategoryFilter';
import styles from './BlogListing.module.scss';

interface BlogListingProps {
  onPostClick: (post: BlogPost) => void;
}

const BlogListing: React.FC<BlogListingProps> = ({ onPostClick }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter posts based on category and search term
  const filteredPosts = useMemo(() => {
    let posts = getBlogPostsByCategory(activeCategory);
    
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        post.category.toLowerCase().includes(searchLower)
      );
    }
    
    return posts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
  }, [activeCategory, searchTerm]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className={styles.blogListing}>
      {/* Header Section */}
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Blog & Insights</h2>
          <p className={styles.subtitle}>
            Sharing my journey in software development, technical insights, and lessons learned 
            from building innovative applications and working with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className={styles.searchContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.searchInputWrapper}>
            <svg 
              className={styles.searchIcon}
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search articles by title, content, or tags..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
              aria-label="Search blog posts"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className={styles.clearButton}
                aria-label="Clear search"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <CategoryFilter
          categories={blogCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </motion.div>

      {/* Results Summary */}
      <motion.div 
        className={styles.resultsInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <p>
          {searchTerm ? (
            <>
              Found <strong>{filteredPosts.length}</strong> article{filteredPosts.length !== 1 ? 's' : ''} 
              {searchTerm && ` matching "${searchTerm}"`}
              {activeCategory !== 'all' && ` in ${blogCategories.find(cat => cat.id === activeCategory)?.label}`}
            </>
          ) : (
            <>
              Showing <strong>{filteredPosts.length}</strong> article{filteredPosts.length !== 1 ? 's' : ''}
              {activeCategory !== 'all' && ` in ${blogCategories.find(cat => cat.id === activeCategory)?.label}`}
            </>
          )}
        </p>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className={styles.postsGrid}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <BlogPostCard
              key={post.id}
              post={post}
              onClick={onPostClick}
              index={index}
            />
          ))
        ) : (
          <motion.div 
            className={styles.noResults}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.noResultsIcon}>
              <svg 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h3>No articles found</h3>
            <p>
              {searchTerm ? (
                <>
                  No articles match your search for "<strong>{searchTerm}</strong>".
                  <br />
                  Try adjusting your search terms or browse different categories.
                </>
              ) : (
                <>
                  No articles available in this category yet.
                  <br />
                  Check back soon for new content!
                </>
              )}
            </p>
            {(searchTerm || activeCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className={styles.resetButton}
              >
                Show all articles
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogListing;