import React from "react";

const SkeletonCard = () => {
  return (
    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg animate-pulse">
      
      {/* Poster Skeleton */}
      <div className="w-full aspect-[2/3] bg-zinc-800 rounded-xl mb-4"></div>

      {/* Title Skeleton */}
      <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2"></div>

      {/* Year Skeleton */}
      <div className="h-3 bg-zinc-700 rounded w-1/3 mb-2"></div>

      {/* Rating Skeleton */}
      <div className="h-3 bg-zinc-700 rounded w-1/4"></div>
    </div>
  );
};

export default SkeletonCard;