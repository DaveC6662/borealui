"use client";

import React from "react";
import styles from "./Skeleton.module.scss";
import SkeletonLoaderBase from "../SkeletonBase";
import { SkeletonLoaderProps } from "../Skeleton.types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Next.js SkeletonLoader with scoped styles and client directive.
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = (props) => {
  return (
    <SkeletonLoaderBase
      {...props}
      className={combineClassNames(styles.skeletonLoader, props.className)}
    />
  );
};

export default SkeletonLoader;
