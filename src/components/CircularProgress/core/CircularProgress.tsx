import React, { useEffect, useState } from "react";
import styles from "./CircularProgress.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { CircularProgressProps } from "../CircularProgress.types";

/**
 * Returns a color variable based on normalized percent value.
 *
 * @param normalized - Value between 0 and 100
 * @returns CSS variable for color
 */
const getColor = (normalized: number): string => {
  if (normalized <= 0) return "var(--background-color)";
  if (normalized <= 40) return "var(--error-color)";
  if (normalized <= 70) return "var(--warning-color)";
  return "var(--success-color)";
};

/**
 * CircularProgress is a radial visual indicator to represent numeric progress or ratings.
 * It animates a conic-gradient fill and optionally displays a percentage or raw score.
 *
 * @example
 * ```tsx
 * <CircularProgress rating={85} label="Course Score" />
 * ```
 */
const CircularProgress: React.FC<CircularProgressProps> = ({
  rating,
  min = 0,
  max = 100,
  label = "Progress",
  showRaw = false,
  size = "medium",
  className = "",
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
      className={combineClassNames(styles.circularProgress, styles[size], className)}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={clamped}
      aria-label={label}
      title={label}
      data-testid={testId}
    >
      <div
        className={styles.circleBorder}
        style={{
          background: `conic-gradient(
            ${progressColor} 0deg,
            ${progressColor} ${angle}deg,
            transparent ${angle}deg 360deg
          )`,
        }}
      >
        <div className={styles.innerCircle}>
          <span className={styles.ratingText}>
            {showRaw ? `${clamped}/${max}` : `${displayPercent}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
