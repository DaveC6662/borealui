import React, { JSX } from "react";
import { ProgressBarProps } from "./ProgressBar.types";

export interface BaseProgressBarProps extends ProgressBarProps {
  classNames: {
    container: string;
    bar: string;
    themeMap: Record<string, string>;
    sizeMap: Record<string, string>;
    animated: string;
    indeterminate: string;
  };
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
  classNames,
}: BaseProgressBarProps): JSX.Element => {
  const value = Math.round(progress);

  return (
    <div
      className={[
        classNames.container,
        classNames.sizeMap[size],
        className,
      ].join(" ")}
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
          classNames.bar,
          classNames.themeMap[theme],
          animated ? classNames.animated : "",
          indeterminate ? classNames.indeterminate : "",
        ].join(" ")}
        style={{ width: indeterminate ? "100%" : `${value}%` }}
        data-testid={`${testId}-bar`}
      />
    </div>
  );
};

export default BaseProgressBar;
