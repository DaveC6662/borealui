import React, { JSX } from "react";
import { ProgressBarProps } from "./ProgressBar.types";

export interface BaseProgressBarProps extends ProgressBarProps {
  classMap: Record<string, string>;
}

const BaseProgressBar: React.FC<BaseProgressBarProps> = ({
  progress = 0,
  theme = "primary",
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
      className={[classMap.container, classMap[size], className].join(" ")}
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
        className={[
          classMap.bar,
          classMap[theme],
          animated ? classMap.animated : "",
          indeterminate ? classMap.indeterminate : "",
        ].join(" ")}
        style={{ width: indeterminate ? "100%" : `${value}%` }}
        data-testid={`${testId}-bar`}
      />
    </div>
  );
};

export default BaseProgressBar;
