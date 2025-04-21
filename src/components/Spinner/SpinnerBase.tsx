import React from "react";
import { SpinnerProps } from "./Spinner.types";

/**
 * SpinnerBase handles the shared logic for rendering a spinner with
 * dynamic size, theme, and accessibility features.
 */
const SpinnerBase: React.FC<
  SpinnerProps & { styles: Record<string, string> }
> = ({
  theme = "primary",
  size = 50,
  className = "",
  "data-testid": testId = "spinner",
  label = "Loading",
  styles,
}) => {
  const strokeWidth = `${Math.max(2, Math.floor(size / 12))}px`;
  const spinnerSize = `${size}px`;

  return (
    <div
      className={`${styles.spinnerWrapper} ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label || "Loading"}
    >
      <div
        className={`${styles.spinner} ${styles[theme]}`}
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderWidth: strokeWidth,
        }}
        data-testid={testId}
        aria-hidden="true"
      />
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
};

export default SpinnerBase;
