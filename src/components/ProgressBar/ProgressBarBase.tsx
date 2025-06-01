import React, { JSX } from "react";
import { ProgressBarProps } from "./ProgressBar.types";
import { combineClassNames } from "@/utils/classNames";

export interface BaseProgressBarProps extends ProgressBarProps {
  classMap: Record<string, string>;
}

const BaseProgressBar: React.FC<BaseProgressBarProps> = ({
  progress = 0,
  theme = "primary",
  state = "",
  size = "medium",
  animated = true,
  indeterminate = false,
  className = "",
  ariaLabel = "Progress",
  "data-testid": testId = "progressbar",
  classMap,
}: BaseProgressBarProps): JSX.Element => {
  const value = Math.round(progress);

  return (
    <div
      className={combineClassNames(classMap.container, classMap[size], className)}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={!indeterminate ? value : undefined}
      aria-valuetext={!indeterminate ? `${value}% complete` : "Loading"}
      aria-busy={indeterminate || undefined}
      data-testid={testId}
    >
      <div
        className={combineClassNames(
          classMap.bar,
          classMap[theme],
          classMap[state],
          animated ? classMap.animated : "",
          indeterminate ? classMap.indeterminate : "",
  )}
        style={{ width: indeterminate ? "100%" : `${value}%` }}
        data-testid={`${testId}-bar`}
      />
    </div>
  );
};

export default BaseProgressBar;
