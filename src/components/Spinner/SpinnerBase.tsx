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

  return (
    <div
      className={`${styles.spinner} ${styles[theme]} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: strokeWidth,
      }}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={label}
      data-testid={testId}
    />
  );
};

export default SpinnerBase;
