import React, { useId } from "react";
import { DateTimePickerProps } from "./DateTimePicker.types";
import { combineClassNames } from "@/utils/classNames";

export interface DateTimePickerBaseProps extends DateTimePickerProps {
  styles: Record<string, string>;
  error?: string;
  description?: string;
  id?: string;
}

const DateTimePickerBase: React.FC<DateTimePickerBaseProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  name,
  required = false,
  disabled = false,
  size = "medium",
  outline,
  theme = "primary",
  className = "",
  "data-testid": testId = "datetime-picker",
  styles,
  error,
  description,
  id,
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

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
          {label} {required && <span aria-hidden="true">*</span>}
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
          aria-invalid={!!error}
          aria-describedby={
            [descriptionId, errorId].filter(Boolean).join(" ") || undefined
          }
          aria-errormessage={errorId || undefined}
          aria-label={label || "Date and time"}
          data-testid={`${testId}-input`}
        />
      </div>

      {description && !error && (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default DateTimePickerBase;
