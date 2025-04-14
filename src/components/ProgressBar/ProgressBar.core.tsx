import React, { JSX } from "react";
import styles from "./Progressbar.module.scss";
import { ProgressBarProps } from "./ProgressBar.types";

/**
 * ProgressBar is a visual component used to indicate progress for a given task.
 * It supports both determinate and indeterminate modes and includes ARIA attributes
 * for improved accessibility.
 *
 * @param {ProgressBarProps} props - Props for configuring the progress bar.
 * @returns {JSX.Element} A styled progress bar component.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  theme = "primary",
  size = "medium",
  animated = true,
  indeterminate = false,
  className = "",
  "data-testid": testId = "progressbar",
}: ProgressBarProps): JSX.Element => {
  const ariaValue = indeterminate ? undefined : Math.round(progress);

  return (
    <div
      className={`${styles.progressContainer} ${styles[size]} ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaValue}
      aria-label="Progress"
      data-testid={testId}
    >
      <div
        className={`${styles.progressBar} ${styles[theme]} ${animated ? styles.animated : ""} ${
          indeterminate ? styles.indeterminate : ""
        }`}
        style={{ width: indeterminate ? "100%" : `${progress}%` }}
        data-testid={`${testId}-bar`}
      />
    </div>
  );
};

export default ProgressBar;
