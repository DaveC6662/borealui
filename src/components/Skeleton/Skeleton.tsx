"use client";

import React from "react";
import styles from "./Skeleton.module.scss";

/**
 * Props for the SkeletonLoader component.
 */
interface SkeletonLoaderProps {
  /** Width of the skeleton loader (e.g., "100%", "200px", or a number representing pixels). */
  width?: string | number;
  /** Height of the skeleton loader (e.g., "100%", "50px", or a number representing pixels). */
  height?: string | number;
  /** Additional class name(s) for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * SkeletonLoader is a visual placeholder component used to indicate loading content.
 * It accepts customizable width and height properties and is designed with accessible
 * ARIA attributes to inform assistive technologies that content is being loaded.
 *
 * @param {SkeletonLoaderProps} props - Props for configuring the SkeletonLoader.
 * @returns {JSX.Element} A skeleton loader element.
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = "100%",
  className = "",
  "data-testid": testId = "skeleton-loader",
  ...rest
}) => {
  return (
    <div
      className={`${styles.skeletonLoader} ${className}`}
      style={{ width, height }}
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-testid={testId}
      {...rest}
    />
  );
};

export default SkeletonLoader;
