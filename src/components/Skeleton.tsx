import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  children?: React.ReactNode;
}

export default function Skeleton({ className = '', variant = 'rect', children }: SkeletonProps) {
  const baseClass = 'animate-pulse bg-gray-250 dark:bg-[#2a2a2a]';
  
  let variantClass = '';
  if (variant === 'circle') {
    variantClass = 'rounded-full';
  } else if (variant === 'text') {
    variantClass = 'rounded h-4 w-full';
  } else {
    variantClass = 'rounded-lg';
  }

  return (
    <div
      className={`${baseClass} ${variantClass} ${className}`}
      role="status"
      aria-label="Loading placeholder"
    >
      {children}
    </div>
  );
}
