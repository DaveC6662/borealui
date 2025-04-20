import React from "react";
import { SliderProps } from "./Slider.types";

/**
 * SliderBase is a shared functional component used by both core and next versions.
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

  return (
    <div
      className={`${styles.sliderContainer} ${styles[size]} ${styles[theme]} ${className}`}
      data-testid={`${testId}-container`}
    >
      {label && (
        <label htmlFor={inputId} className={styles.sliderLabel}>
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
          aria-label={ariaLabel || label || "Slider input"}
          data-testid={testId}
        />
        {showValue && (
          <span className={styles.sliderValue} data-testid={`${testId}-value`}>
            {value}
          </span>
        )}
      </div>
    </div>
  );
};

export default SliderBase;
