import React, { useId } from "react";
import { DateTimePickerProps } from "./DateTimePicker.types";
import { combineClassNames } from "@/utils/classNames";

export interface DateTimePickerBaseProps extends DateTimePickerProps {
  styles: Record<string, string>;
}

const DateTimePickerBase: React.FC<DateTimePickerBaseProps> = ({
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
  styles,
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

export default DateTimePickerBase;
