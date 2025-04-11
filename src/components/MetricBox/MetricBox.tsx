"use client";

import React from "react";
import styles from "./MetricBox.module.scss";
import { IconType } from "react-icons";
import { SizeType, ThemeType } from "@/types/types";

/**
 * Props for the MetricBox component.
 */
export interface MetricBoxProps {
  /** Title of the metric. */
  title: string;
  /** The primary value of the metric, e.g., a number or a string. */
  value: string | number;
  /** Optional icon to visually represent the metric (from react-icons, for example). */
  icon?: IconType;
  /** Optional subtext providing additional context for the metric. */
  subtext?: string;
  /** Theme to apply for styling (e.g., "primary", "secondary", etc.). */
  theme?: ThemeType;
  /** Size of the component (e.g., "small", "medium", "large"). */
  size?: SizeType;
  /** Text alignment for content: "left", "center", or "right". */
  align?: "left" | "center" | "right";
  /** Optional additional CSS class names for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * MetricBox is a compact, accessible component for displaying key performance indicators,
 * numbers, or other metrics along with an optional icon and supporting text.
 *
 * @param {MetricBoxProps} props - The props for the MetricBox component.
 * @returns {JSX.Element} A region displaying a metric with a title, value, and optional subtext.
 */
const MetricBox: React.FC<MetricBoxProps> = ({
  title,
  value,
  icon: Icon,
  subtext,
  theme = "primary",
  align = "center",
  size = "medium",
  className = "",
  "data-testid": testId = "metric-box",
}) => {
  const titleId = `${testId}-title`;
  const valueId = `${testId}-value`;

  return (
    <div
      className={`${styles.metricBox} ${styles[theme]} ${styles[align]} ${className} ${styles[size]}`}
      role="region"
      aria-labelledby={titleId}
      data-testid={testId}
    >
      {Icon && (
        <div className={styles.icon} data-testid={`${testId}-icon`}>
          <Icon aria-hidden="true" focusable="false" />
        </div>
      )}
      <div className={styles.content}>
        <div id={titleId} className={styles.title} data-testid={`${testId}-title`}>
          {title}
        </div>
        <div id={valueId} className={styles.value} data-testid={`${testId}-value`}>
          {value}
        </div>
        {subtext && (
          <div className={styles.subtext} data-testid={`${testId}-subtext`}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricBox;
