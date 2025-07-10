import React, { JSX, useMemo } from "react";
import { ProgressBarProps } from "./ProgressBar.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  defaultRounding,
  defaultShadow,
  defaultSize,
  defaultTheme,
} from "../../config/boreal-style-config";

export interface BaseProgressBarProps extends ProgressBarProps {
  classMap: Record<string, string>;
}

const BaseProgressBar: React.FC<BaseProgressBarProps> = ({
  progress = 0,
  theme = defaultTheme,
  state = "",
  size = defaultSize,
  rounding = defaultRounding,
  shadow = defaultShadow,
  animated = true,
  indeterminate = false,
  className = "",
  ariaLabel = "Progress",
  "data-testid": testId = "progressbar",
  classMap,
}: BaseProgressBarProps): JSX.Element => {
  const value = Math.round(progress);

  const wrapperClass = useMemo(
    () =>
      combineClassNames(
        classMap.container,
        classMap[size],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        className
      ),
    [classMap, size, shadow, rounding, className]
  );

  const barClass = useMemo(
    () =>
      combineClassNames(
        classMap.bar,
        classMap[theme],
        classMap[state],
        animated ? classMap.animated : "",
        rounding && classMap[`round${capitalize(rounding)}`],
        indeterminate ? classMap.indeterminate : ""
      ),
    [classMap, theme, state, rounding, indeterminate]
  );

  return (
    <div
      className={wrapperClass}
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
        className={barClass}
        style={{ width: indeterminate ? "100%" : `${value}%` }}
        data-testid={`${testId}-bar`}
      />
    </div>
  );
};

export default BaseProgressBar;
