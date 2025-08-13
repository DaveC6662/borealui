import React, { useMemo } from "react";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";
import { BaseProgressBarProps } from "./ProgressBar.types";

const BaseProgressBar: React.FC<BaseProgressBarProps> = ({
  progress = 0,
  theme = getDefaultTheme(),
  state = "",
  size = getDefaultSize(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  animated = true,
  indeterminate = false,
  className = "",
  ariaLabel = "Progress",
  "data-testid": testId = "progressbar",
  classMap,
}) => {
  const numeric = Number(progress);
  const clamped = Number.isFinite(numeric)
    ? Math.min(100, Math.max(0, numeric))
    : 0;
  const value = Math.round(clamped);

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
        animated && classMap.animated,
        rounding && classMap[`round${capitalize(rounding)}`],
        indeterminate && classMap.indeterminate
      ),
    [classMap, theme, state, rounding, indeterminate, animated]
  );

  return (
    <div
      className={wrapperClass}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuetext={indeterminate ? "Loading" : `${value}% complete`}
      aria-busy={indeterminate || undefined}
      data-testid={testId}
    >
      <div
        className={barClass}
        style={{ width: indeterminate ? undefined : `${value}%` }}
        data-testid={`${testId}-bar`}
      />
    </div>
  );
};

BaseProgressBar.displayName = "BaseProgressBar";
export default BaseProgressBar;
