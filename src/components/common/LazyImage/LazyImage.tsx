import React, { useState, useRef, useEffect } from 'react';
import { createIntersectionObserver, LazyImageProps } from '../../../utils/performance';
import styles from './LazyImage.module.scss';

interface LazyImageComponentProps extends LazyImageProps {
  placeholderColor?: string;
  blurDataURL?: string;
  priority?: boolean;
  sizes?: string;
}

export const LazyImage: React.FC<LazyImageComponentProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  placeholderColor = '#f3f4f6',
  blurDataURL,
  priority = false,
  sizes,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image enters viewport
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const aspectRatio = width && height ? (height / width) * 100 : undefined;

  return (
    <div
      ref={containerRef}
      className={`${styles.lazyImageContainer} ${className}`}
      style={{
        paddingBottom: aspectRatio ? `${aspectRatio}%` : undefined,
        backgroundColor: placeholderColor
      }}
    >
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className={styles.placeholder}>
          {blurDataURL ? (
            <img
              src={blurDataURL}
              alt=""
              className={styles.blurPlaceholder}
              aria-hidden="true"
            />
          ) : placeholder ? (
            <img
              src={placeholder}
              alt=""
              className={styles.placeholderImage}
              aria-hidden="true"
            />
          ) : (
            <div className={styles.defaultPlaceholder}>
              <svg
                className={styles.placeholderIcon}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className={styles.errorState}>
          <svg
            className={styles.errorIcon}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className={styles.errorText}>Failed to load image</span>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}

      {/* Loading indicator */}
      {isInView && !isLoaded && !hasError && (
        <div className={styles.loadingIndicator}>
          <div className={styles.spinner} />
        </div>
      )}
    </div>
  );
};

export default LazyImage;