import React, { useId, useMemo, useRef } from "react";
import { DateTimePickerProps } from "./DateTimePicker.types";
import { combineClassNames } from "@/utils/classNames";
import { CalendarIcon } from "@/Icons";
import { capitalize } from "@/utils/capitalize";
import {
  defaultRounding,
  defaultShadow,
  defaultSize,
  defaultTheme,
} from "@/config/boreal-style-config";

export interface DateTimePickerBaseProps extends DateTimePickerProps {
  classMap: Record<string, string>;
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
  size = defaultSize,
  outline,
  theme = defaultTheme,
  state = "",
  rounding = defaultRounding,
  shadow = defaultShadow,
  className = "",
  "data-testid": testId = "datetime-picker",
  classMap,
  error,
  description,
  id,
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const openPicker = () => {
    inputRef.current?.showPicker?.();
  };

  const pickerClass = useMemo(
    () =>
      combineClassNames(
        classMap.wrapper,
        classMap[theme],
        classMap[state],
        classMap[size],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        outline && classMap.outline,
        disabled && classMap.disabled,
        className
      ),
    [classMap, theme, state, size, outline, disabled, className]
  );

  return (
    <div className={pickerClass} data-testid={testId}>
      {label && (
        <label htmlFor={inputId} className={classMap.label}>
          {label} {required && <span aria-hidden="true">*</span>}
        </label>
      )}

      <div className={classMap.inputWrapper}>
        <input
          id={inputId}
          type="datetime-local"
          className={classMap.input}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          min={min}
          max={max}
          name={name}
          ref={inputRef}
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
        <span
          className={classMap.icon}
          onClick={openPicker}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && openPicker()
          }
          aria-hidden="true"
          role="button"
          tabIndex={0}
        >
          <CalendarIcon />
        </span>
      </div>

      {description && !error && (
        <p id={descriptionId} className={classMap.description}>
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className={classMap.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default DateTimePickerBase;
