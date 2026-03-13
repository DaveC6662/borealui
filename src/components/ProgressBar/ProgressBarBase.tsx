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
  value = 0,
  theme = getDefaultTheme(),
  state = "",
  size = getDefaultSize(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  animated = true,
  indeterminate = false,
  className = "",
  ariaLabel = "Progress",
  label,
  labelPosition = "top",
  "data-testid": testId = "progressbar",
  classMap,
}) => {
  const numeric = Number(value);
  const clamped = Number.isFinite(numeric)
    ? Math.min(100, Math.max(0, numeric))
    : 0;
  const progressValue = Math.round(clamped);

  const layoutClass = useMemo(() => {
    const posClass = classMap[`label${capitalize(labelPosition)}`];
    return combineClassNames(classMap.layout, Boolean(label) && posClass);
  }, [classMap, label, labelPosition]);

  const wrapperClass = useMemo(
    () =>
      combineClassNames(
        classMap.container,
        classMap[size],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        className,
      ),
    [classMap, size, shadow, rounding, className],
  );

  const barClass = useMemo(
    () =>
      combineClassNames(
        classMap.bar,
        classMap[theme],
        classMap[state],
        animated && classMap.animated,
        rounding && classMap[`round${capitalize(rounding)}`],
        indeterminate && classMap.indeterminate,
      ),
    [classMap, theme, state, rounding, indeterminate, animated],
  );

  const labelNode = label ? (
    <div className={classMap.label} data-testid={`${testId}-label`}>
      {label}
    </div>
  ) : null;

  return (
    <div className={layoutClass}>
      {(labelPosition === "top" || labelPosition === "left") && labelNode}

      <div
        className={wrapperClass}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : progressValue}
        aria-valuetext={
          indeterminate ? "Loading" : `${progressValue}% complete`
        }
        aria-busy={indeterminate || undefined}
        data-testid={testId}
      >
        <div
          className={barClass}
          style={{ width: indeterminate ? undefined : `${progressValue}%` }}
          data-testid={`${testId}-bar`}
        ></div>
      </div>

      {(labelPosition === "bottom" || labelPosition === "right") && labelNode}
    </div>
  );
};

BaseProgressBar.displayName = "BaseProgressBar";
export default BaseProgressBar;
