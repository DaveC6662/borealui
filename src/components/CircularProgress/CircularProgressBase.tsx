import React, { useEffect, useMemo, useState } from "react";
import type { CircularProgressProps } from "./CircularProgress.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "@/utils/capitalize";
import {
  defaultShadow,
  defaultSize,
  defaultTheme,
} from "@/config/boreal-style-config";

export interface CircularProgressBaseProps extends CircularProgressProps {
  classMap: Record<string, string>;
}

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
  shadow = defaultShadow,
  showRaw = false,
  size = defaultSize,
  theme = defaultTheme,
  state = "",
  className = "",
  classMap,
  "data-testid": testId = "circular-progress",
}) => {
  const clamped = Math.min(max, Math.max(min, rating));
  const percent = ((clamped - min) / (max - min)) * 100;

  const [displayPercent, setDisplayPercent] = useState(0);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const newAngle = Math.min(360, (percent / 100) * 360);
    setAngle(newAngle);
    setDisplayPercent(Math.round(percent));
  }, [percent]);

  const progressColor = getColor(percent);

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
    [shadow, className, classMap]
  );

  return (
    <div
      className={combinedClassName}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={clamped}
      aria-label={label}
      aria-describedby={`${testId}-desc`}
      data-testid={testId}
    >
      <div
        className={classMap.circle_border}
        style={{
          background: `conic-gradient(
            ${progressColor} 0deg,
            ${progressColor} ${angle}deg,
            transparent ${angle}deg 360deg
          )`,
        }}
      >
        <div className={classMap.inner_circle}>
          <span
            id={`${testId}-desc`}
            className={classMap.rating_text}
            aria-live="polite"
            aria-atomic="true"
          >
            {showRaw ? `${clamped}/${max}` : `${displayPercent}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBase;
