"use client";

import React, { JSX } from "react";
import styles from "./MetricBox.module.scss";
import { MetricBoxProps } from "./MetricBox.types";

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
}: MetricBoxProps): JSX.Element => {
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
