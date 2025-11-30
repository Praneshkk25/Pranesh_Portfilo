import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../../../data/blog';
import BlogListing from './BlogListing';
import BlogPostView from './BlogPostView';
import styles from './Blog.module.scss';

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleBackToListing = () => {
    setSelectedPost(null);
  };

  return (
    <section id="blog" className={styles.blogSection}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {selectedPost ? (
            <BlogPostView 
              post={selectedPost} 
              onBack={handleBackToListing}
            />
          ) : (
            <BlogListing onPostClick={handlePostClick} />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;