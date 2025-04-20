import React, { useEffect, useState } from "react";
import type { CircularProgressProps } from "./CircularProgress.types";
import { combineClassNames } from "@/utils/classNames";

export interface CircularProgressBaseProps extends CircularProgressProps {
  classMap: Record<string, string>;
}

/**
 * Computes the CSS variable color based on progress percent.
 */
const getColor = (percent: number): string => {
  if (percent <= 0) return "var(--background-color)";
  if (percent <= 40) return "var(--error-color)";
  if (percent <= 70) return "var(--warning-color)";
  return "var(--success-color)";
};

/**
 * A base circular progress indicator component for reuse across environments.
 */
const CircularProgressBase: React.FC<CircularProgressBaseProps> = ({
  rating,
  min = 0,
  max = 100,
  label = "Progress",
  showRaw = false,
  size = "medium",
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

  return (
    <div
      className={combineClassNames(
        classMap.circularProgress,
        classMap[size],
        className
      )}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={clamped}
      aria-label={label}
      title={label}
      data-testid={testId}
    >
      <div
        className={classMap.circleBorder}
        style={{
          background: `conic-gradient(
            ${progressColor} 0deg,
            ${progressColor} ${angle}deg,
            transparent ${angle}deg 360deg
          )`,
        }}
      >
        <div className={classMap.innerCircle}>
          <span className={classMap.ratingText}>
            {showRaw ? `${clamped}/${max}` : `${displayPercent}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBase;
