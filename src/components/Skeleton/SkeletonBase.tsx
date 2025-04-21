import React from "react";
import { SkeletonLoaderProps } from "./Skeleton.types";

/**
 * Base SkeletonLoader without styling dependencies.
 * Includes accessibility enhancements for screen readers.
 */
const SkeletonLoaderBase: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = "100%",
  className = "",
  label = "Loading content...",
  "data-testid": testId = "skeleton-loader",
  ...rest
}) => {
  const descriptionId = `${testId}-desc`;

  return (
    <div
      className={className}
      style={{ width, height }}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-describedby={descriptionId}
      data-testid={testId}
      aria-label={label}
      {...rest}
    >
      <span
        id={descriptionId}
        className="sr-only"
        data-testid={`${testId}-description`}
      >
        {label}
      </span>
    </div>
  );
};

export default SkeletonLoaderBase;
