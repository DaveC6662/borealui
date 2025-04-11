"use client";

import React from "react";
import styles from "./Spinner.module.scss";
import { ThemeType } from "@/types/types";

/**
 * Props for the Spinner component.
 */
interface SpinnerProps {
  /** The theme color of the spinner (e.g., primary, secondary). */
  theme?: ThemeType;
  /** The size of the spinner (in pixels). */
  size?: number;
  /** Additional class names for styling customization. */
  className?: string;
  /** Test ID for testing frameworks (e.g., for use with Jest or Cypress). */
  "data-testid"?: string;
  /** Optional label for screen readers. Describes the loading state. */
  label?: string;
}

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

export default Spinner;
