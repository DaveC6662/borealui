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
  "data-testid": testId = "progressbar",
  classNames,
}: BaseProgressBarProps): JSX.Element => {
  const ariaValue = indeterminate ? undefined : Math.round(progress);

  return (
    <div
      className={[
        classNames.container,
        classNames.sizeMap[size],
        className,
      ].join(" ")}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaValue}
      aria-label="Progress"
      data-testid={testId}
    >
      <div
        className={[
          classNames.bar,
          classNames.themeMap[theme],
          animated ? classNames.animated : "",
          indeterminate ? classNames.indeterminate : "",
        ].join(" ")}
        style={{ width: indeterminate ? "100%" : `${progress}%` }}
        data-testid={`${testId}-bar`}
      />
    </div>
  );
};

export default BaseProgressBar;
