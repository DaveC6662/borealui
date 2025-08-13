import React, { useMemo } from "react";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
} from "../../config/boreal-style-config";
import { ExtraProps, SkeletonBaseProps } from "./Skeleton.types";

const SkeletonBase: React.FC<SkeletonBaseProps & ExtraProps> = ({
  width = "100%",
  height = "100%",
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  className = "",
  label = "Loading content…",
  announce = true,
  animate = true,
  as: Tag = "div",
  "data-testid": testId = "skeleton-loader",
  classMap,
  ...rest
}) => {
  const descriptionId = `${testId}-desc`;

  const skeletonClasses = useMemo(
    () =>
      combineClassNames(
        classMap.skeleton,
        animate && classMap.animated,
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        className
      ),
    [classMap, animate, shadow, rounding, className, announce]
  );

  const ariaProps = announce
    ? {
        role: "status" as const,
        "aria-busy": true,
        "aria-live": "polite" as const,
        "aria-relevant": "additions text" as const,
        "aria-describedby": descriptionId,
      }
    : { "aria-hidden": true as const };

  return (
    <Tag
      className={skeletonClasses}
      style={{ width, height }}
      data-testid={testId}
      {...ariaProps}
      {...rest}
    >
      {announce && (
        <span
          id={descriptionId}
          className="sr_only"
          data-testid={`${testId}-description`}
        >
          {label}
        </span>
      )}
    </Tag>
  );
};

SkeletonBase.displayName = "SkeletonBase";
export default SkeletonBase;
