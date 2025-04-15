import React, { useId } from "react";
import styles from "./DateTimePicker.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { DateTimePickerProps } from "../DateTimePicker.types";

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
