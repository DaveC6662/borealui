import React, { JSX } from "react";
import "./Skeleton.scss";
import { SkeletonLoaderProps } from "../Skeleton.types";

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
}: SkeletonLoaderProps): JSX.Element => {
  return (
    <div
      className={`${"skeletonLoader"} ${className}`}
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
