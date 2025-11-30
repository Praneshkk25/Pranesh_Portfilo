import React from 'react';
import styles from './SectionLoader.module.scss';

const SectionLoader: React.FC = () => {
  return (
    <div className={styles.sectionLoader}>
      <div className={styles.spinner}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};

export default SectionLoader;