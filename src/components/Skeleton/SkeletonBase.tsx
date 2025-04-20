import React from "react";
import { SkeletonLoaderProps } from "./Skeleton.types";

/**
 * Base SkeletonLoader without styling dependencies.
 */
const SkeletonLoaderBase: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = "100%",
  className = "",
  "data-testid": testId = "skeleton-loader",
  ...rest
}) => {
  return (
    <div
      className={className}
      style={{ width, height }}
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-testid={testId}
      {...rest}
    />
  );
};

export default SkeletonLoaderBase;
