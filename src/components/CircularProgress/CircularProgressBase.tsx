import React, { useEffect, useMemo, useState } from "react";
import type { CircularProgressBaseProps } from "./CircularProgress.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const getColor = (percent: number): string => {
  if (percent <= 0) return "var(--background-color)";
  if (percent <= 40) return "var(--error-color)";
  if (percent <= 70) return "var(--warning-color)";
  return "var(--success-color)";
};

const CircularProgressBase: React.FC<CircularProgressBaseProps> = ({
  rating,
  min = 0,
  max = 100,
  label = "Progress",
  shadow = getDefaultShadow(),
  showRaw = false,
  size = getDefaultSize(),
  theme = getDefaultTheme(),
  state = "",
  className = "",
  classMap,
  "data-testid": testId = "circular-progress",
}) => {
  const range = Math.max(0, max - min);
  const clamped = Math.min(max, Math.max(min, rating));
  const percent = range === 0 ? 0 : ((clamped - min) / range) * 100;

  const [displayPercent, setDisplayPercent] = useState(0);
  useEffect(() => {
    setDisplayPercent(Math.round(percent));
  }, [percent]);

  const progressColor =
    state && classMap[state] ? undefined : getColor(percent);

  const angle = Math.min(360, (percent / 100) * 360);

  const combinedClassName = useMemo(
    () =>
      combineClassNames(
        classMap.circular_progress,
        classMap[theme],
        classMap[size],
        classMap[state],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        className
      ),
    [classMap, theme, size, state, shadow, className]
  );

  const valueText = showRaw ? `${clamped}/${max}` : `${displayPercent}%`;

  return (
    <div
      className={combinedClassName}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={clamped}
      aria-valuetext={valueText}
      aria-label={label}
      data-testid={testId}
    >
      <div
        className={combineClassNames(
          classMap.circle_border,
          state && classMap[`state_${state}`]
        )}
        style={
          progressColor
            ? {
                background: `conic-gradient(
                  ${progressColor} 0deg,
                  ${progressColor} ${angle}deg,
                  transparent ${angle}deg 360deg
                )`,
              }
            : undefined
        }
      >
        <div className={classMap.inner_circle}>
          <span
            className={classMap.rating_text}
            aria-live="polite"
            aria-atomic="true"
          >
            {valueText}
          </span>
        </div>
      </div>
    </div>
  );
};

CircularProgressBase.displayName = "CircularProgressBase";
export default CircularProgressBase;
