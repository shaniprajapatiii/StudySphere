import React from "react";

const SkeletonLoader = ({ className }) => {
  return (
    <div className={`animate-pulse theme-bg-surface-2 rounded-lg ${className}`}></div>
  );
};

export default SkeletonLoader;
