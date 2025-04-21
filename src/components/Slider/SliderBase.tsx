import React from "react";
import { SliderProps } from "./Slider.types";

/**
 * SliderBase is a shared functional component used by both core and next versions.
 * This version includes improved accessibility features.
 */
const SliderBase: React.FC<
  SliderProps & { styles: Record<string, string> }
> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  size = "medium",
  theme = "primary",
  showValue = true,
  className = "",
  "aria-label": ariaLabel,
  "data-testid": testId = "slider",
  styles,
}) => {
  const inputId = `${testId}-input`;
  const labelId = `${testId}-label`;
  const valueText = `${value}`;

  return (
    <div
      className={`${styles.sliderContainer} ${styles[size]} ${styles[theme]} ${className}`}
      data-testid={`${testId}-container`}
    >
      {label && (
        <label id={labelId} htmlFor={inputId} className={styles.sliderLabel}>
          {label}
        </label>
      )}

      <div className={styles.sliderWrapper}>
        <input
          id={inputId}
          type="range"
          className={styles.slider}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={valueText}
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : ariaLabel || "Slider"}
          data-testid={testId}
        />
        {showValue && (
          <span
            className={styles.sliderValue}
            id={`${testId}-value`}
            aria-live="polite"
            data-testid={`${testId}-value`}
          >
            {value}
          </span>
        )}
      </div>
    </div>
  );
};

export default SliderBase;
