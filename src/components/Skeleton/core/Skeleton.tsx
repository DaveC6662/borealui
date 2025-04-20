import React from "react";
import "./Skeleton.scss";
import SkeletonLoaderBase from "../SkeletonBase";
import { SkeletonLoaderProps } from "../Skeleton.types";
import { combineClassNames } from "../../../utils/classNames";

/**
 * Core SkeletonLoader for React apps with plain SCSS (non-module).
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = (props) => {
  return (
    <SkeletonLoaderBase
      {...props}
      className={combineClassNames("skeletonLoader", props.className)}
    />
  );
};

export default SkeletonLoader;
