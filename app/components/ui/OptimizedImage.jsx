'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width = 400, 
  height = 300,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onError = null,
  fallbackSrc = null,
  preload = false,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imageRef = useRef(null);

  // Default fallback image - use a reliable public path
  const defaultFallback = '/images/fallback.svg';

  // Preload important images
  useEffect(() => {
    if (preload && src && src.startsWith('http')) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      return () => {
        try {
          document.head.removeChild(link);
        } catch (e) {
          // Ignore if already removed
        }
      };
    }
  }, [src, preload]);

  // Reset error state when src changes
  useEffect(() => {
    if (src !== currentSrc) {
      setImageError(false);
      setIsLoading(true);
      setCurrentSrc(src);
    }
  }, [src]);
  
  // Optimized loader for faster image fetching
  const customLoader = ({ src, width, quality = 75 }) => {
    // If it's a local image or already processed, return as-is
    if (src.startsWith('/') || src.startsWith('data:') || src.includes('image-proxy')) {
      return src;
    }
    
    // For external images, use optimized proxy with better compression
    if (src.startsWith('http')) {
      try {
        const params = new URLSearchParams();
        params.set('url', src); // Don't encode here, let URLSearchParams handle it
        params.set('w', Math.min(width, 800).toString()); // Limit max width for faster loading
        params.set('q', Math.min(quality, 80).toString()); // Better compression
        params.set('f', 'webp'); // Request WebP format when possible
        
        return `/api/image-proxy?${params.toString()}`;
      } catch (error) {
        console.warn('Error creating proxy URL:', error);
        return src; // Fallback to original src
      }
    }
    
    return src;
  };

  const handleImageError = (e) => {
    console.warn('Image failed to load:', currentSrc, e?.target?.src);
    setImageError(true);
    setIsLoading(false);
    if (onError) onError(e);
  };

  const handleImageLoad = (e) => {
    setIsLoading(false);
    console.log('Image loaded successfully:', e?.target?.src);
  };

  // Use fallback image if there's an error or no src
  const finalImageSrc = imageError || !currentSrc ? (fallbackSrc || defaultFallback) : currentSrc;
  
  // Only use custom loader for external images that aren't already processed
  const shouldUseCustomLoader = finalImageSrc.startsWith('http') && !finalImageSrc.includes('image-proxy');

  return (
    <div className={`relative overflow-hidden`} style={{ width, height }}>
      {/* Optimized loading skeleton */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
      
      <Image
        ref={imageRef}
        {...(shouldUseCustomLoader ? { loader: customLoader } : {})}
        src={finalImageSrc}
        alt={alt || 'Product image'}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        quality={shouldUseCustomLoader ? 75 : 85} // Lower quality for external images for speed
        placeholder="empty" // Faster than blur for performance
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        unoptimized={!shouldUseCustomLoader && finalImageSrc.endsWith('.svg')} // Don't optimize SVGs
        {...props}
      />
      
      {/* Error indicator */}
      {imageError && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          ⚠️
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
