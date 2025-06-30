import React from "react";
import { SkeletonProps } from "./Skeleton.types";
import { combineClassNames } from "@/utils/classNames";
import { capitalize } from "@/utils/capitalize";

export interface SkeletonBaseProps extends SkeletonProps {
  classMap: Record<string, string>;
}

const SkeletonBase: React.FC<SkeletonBaseProps> = ({
  width = "100%",
  height = "100%",
  rounding = "small",
  shadow = "none",
  className = "",
  label = "Loading content...",
  "data-testid": testId = "skeleton-loader",
  classMap,
  ...rest
}) => {
  const descriptionId = `${testId}-desc`;

  const skeletonClasses = combineClassNames(
    shadow && classMap[`shadow${capitalize(shadow)}`],
    rounding && classMap[`round${capitalize(rounding)}`],
    className
  );

  return (
    <div
      className={skeletonClasses}
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
        className="sr_only"
        data-testid={`${testId}-description`}
      >
        {label}
      </span>
    </div>
  );
};

export default SkeletonBase;
