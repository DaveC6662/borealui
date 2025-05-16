import React from "react";
import "./Skeleton.scss";
import SkeletonBase from "../SkeletonBase";
import { SkeletonProps } from "../Skeleton.types";
import { combineClassNames } from "../../../utils/classNames";

const SkeletonLoader: React.FC<SkeletonProps> = (props) => {
  return (
    <SkeletonBase
      {...props}
      className={combineClassNames("skeleton_loader", props.className)}
    />
  );
};

export default SkeletonLoader;
