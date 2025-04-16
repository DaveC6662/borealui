import React from "react";
import "./Spinner.scss";
import { SpinnerProps } from "../Spinner.types";

/**
 * Spinner is a loading indicator used to show the user that content is being loaded.
 * It can be customized in size and theme, and it supports accessibility features
 * such as an aria-live region and an optional label for screen readers.
 *
 * @param {SpinnerProps} props - The props that define the spinner's appearance and behavior.
 * @returns {JSX.Element} A spinner element.
 */
const Spinner: React.FC<SpinnerProps> = ({
  theme = "primary",
  size = 50,
  className = "",
  "data-testid": testId = "spinner",
  label = "Loading",
}) => {
  const strokeWidth = `${Math.max(2, Math.floor(size / 12))}px`;

  return (
    <div
      className={`${`spinner`} ${theme} ${className}`}
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

export default Spinner;
