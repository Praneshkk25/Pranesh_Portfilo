import React from 'react';
import { motion } from 'framer-motion';
import { BlogCategory } from '../../../data/blog';
import styles from './CategoryFilter.module.scss';

interface CategoryFilterProps {
  categories: BlogCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterTitle}>Categories</h3>
      <div className={styles.categoryList}>
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            className={`${styles.categoryButton} ${
              activeCategory === category.id ? styles.active : ''
            }`}
            onClick={() => onCategoryChange(category.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              '--category-color': category.color
            } as React.CSSProperties}
            aria-pressed={activeCategory === category.id}
          >
            <span 
              className={styles.categoryIndicator}
              style={{ backgroundColor: category.color }}
            />
            <span className={styles.categoryLabel}>{category.label}</span>
            <span className={styles.categoryDescription}>{category.description}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;