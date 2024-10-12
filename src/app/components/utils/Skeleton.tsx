import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = "100%", height = "100%", className }) => {
  return (
    <div
      className={`bg-[#363636] animate-pulse ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;
