"use client";

import React, { useEffect, useState } from "react";
import styles from "./CircularProgress.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { SizeType } from "@/types/types";

/**
 * Props for the CircularProgress component.
 */
interface CircularProgressProps {
  /** Current rating value to be visualized (e.g., 75). */
  rating: number;
  /** Minimum value for the range (default: 0). */
  min?: number;
  /** Maximum value for the range (default: 100). */
  max?: number;
  /** Accessible label and tooltip title for the component. */
  label?: string;
  /** Whether to show raw rating (e.g., "75/100") instead of percent. */
  showRaw?: boolean;
  /** Size of the component ("small", "medium", "large"). */
  size?: SizeType;
  /** Optional class name for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * Returns the CSS color value based on the normalized percentage.
 * @param normalized - Percentage (0–100).
 * @returns CSS variable color string.
 */
const getColor = (normalized: number): string => {
  if (normalized <= 0) return "var(--background-color)";
  if (normalized <= 40) return "var(--error-color)";
  if (normalized <= 70) return "var(--warning-color)";
  return "var(--success-color)";
};

/**
 * CircularProgress is a radial progress indicator that visualizes a numeric rating.
 * It uses a conic gradient and displays either a percentage or a raw value.
 *
 * @param {CircularProgressProps} props - Props to configure the circular progress bar.
 * @returns {JSX.Element} A styled circular progress display.
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
  // Clamp the rating between min and max
  const clamped = Math.min(max, Math.max(min, rating));
  // Convert to percentage
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
