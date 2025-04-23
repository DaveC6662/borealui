import React from "react";
import "./Skeleton.scss";
import SkeletonBase from "../SkeletonBase";
import { SkeletonProps } from "../Skeleton.types";
import { combineClassNames } from "../../../utils/classNames";

/**
 * Core SkeletonLoader for React apps with plain SCSS (non-module).
 */
const SkeletonLoader: React.FC<SkeletonProps> = (props) => {
  return (
    <SkeletonBase
      {...props}
      className={combineClassNames("skeletonLoader", props.className)}
    />
  );
};

export default SkeletonLoader;
