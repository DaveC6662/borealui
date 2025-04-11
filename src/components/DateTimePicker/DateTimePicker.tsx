"use client";

import React, { useId } from "react";
import styles from "./DateTimePicker.module.scss";
import { SizeType, ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the DateTimePicker component.
 */
interface DateTimePickerProps {
  /** Optional label displayed above the input. */
  label?: string;
  /** Current value in ISO 8601 format (e.g., "2025-04-10T12:00"). */
  value?: string;
  /** Callback triggered when the date/time value changes. */
  onChange?: (newValue: string) => void;
  /** Minimum allowed date/time (ISO 8601 format). */
  min?: string;
  /** Maximum allowed date/time (ISO 8601 format). */
  max?: string;
  /** Name attribute for form submission. */
  name?: string;
  /** Additional class name for custom styling. */
  className?: string;
  /** Whether the input is required for form validation. */
  required?: boolean;
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** Thematic style (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Size of the component ("small", "medium", "large"). */
  size?: SizeType;
  /** Whether to use outlined styling. */
  outline?: boolean;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * A styled `datetime-local` input with optional label, theming, sizing,
 * and accessibility support.
 *
 * @param {DateTimePickerProps} props - Props for configuring the date/time picker.
 * @returns {JSX.Element} A datetime input field with optional label.
 */
const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  name,
  className = "",
  required = false,
  disabled = false,
  size = "medium",
  outline,
  theme = "primary",
  "data-testid": testId,
}) => {
  const inputId = useId();

  return (
    <div
      className={combineClassNames(
        styles.wrapper,
        styles[theme],
        styles[size],
        outline && styles.outline,
        disabled && styles.disabled,
        className
      )}
      data-testid={testId}
    >
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          type="datetime-local"
          className={styles.input}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          min={min}
          max={max}
          name={name}
          required={required}
          disabled={disabled}
          aria-required={required}
          aria-disabled={disabled}
          aria-label={label || "Date and time"}
          data-testid={testId ? `${testId}-input` : undefined}
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
