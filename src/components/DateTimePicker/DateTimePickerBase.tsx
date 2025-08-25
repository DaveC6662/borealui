import React, { useId, useMemo, useRef } from "react";
import { DateTimePickerBaseProps } from "./DateTimePicker.types";
import { combineClassNames } from "../../utils/classNames";
import { CalendarIcon } from "../../Icons";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const DateTimePickerBase: React.FC<DateTimePickerBaseProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  name,
  required = false,
  disabled = false,
  size = getDefaultSize(),
  outline,
  theme = getDefaultTheme(),
  state = "",
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
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

  const invalidRange = min && max ? min > max : false;
  const outOfBounds = value
    ? (min ? value < min : false) || (max ? value > max : false)
    : false;

  const openPicker = () => {
    const el = inputRef.current;
    if (!el) return;
    if (typeof el.showPicker === "function") el.showPicker();
    else el.focus();
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
    [
      classMap,
      theme,
      state,
      size,
      shadow,
      rounding,
      outline,
      disabled,
      className,
    ]
  );

  const describedBy =
    [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

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
          aria-invalid={
            Boolean(error) || invalidRange || outOfBounds || undefined
          }
          aria-describedby={describedBy}
          aria-errormessage={error ? errorId : undefined}
          aria-label={label || "Date and time"}
          data-testid={`${testId}-input`}
          autoComplete="off"
        />

        <button
          type="button"
          className={classMap.icon}
          onClick={openPicker}
          disabled={disabled}
          aria-label="Open date and time picker"
          data-testid={`${testId}-button`}
        >
          <CalendarIcon />
        </button>
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
DateTimePickerBase.displayName = "DateTimePickerBase";
export default DateTimePickerBase;
