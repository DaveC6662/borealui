import React from "react";
import "./Slider.scss";
import { combineClassNames } from "../../../utils/classNames";
import { SliderProps } from "../Slider.types";

/**
 * Slider is a customizable range input component that displays a label,
 * a slider control, and optionally the current value. It supports size,
 * theming, and is fully accessible via ARIA attributes.
 *
 * @param {SliderProps} props - Props to configure the Slider component.
 * @returns {JSX.Element} A styled slider with an optional label and value display.
 */
const Slider: React.FC<SliderProps> = ({
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
}) => {
  const inputId = `${testId}-input`;

  return (
    <div
      className={combineClassNames(
        `sliderContainer`,
        size,
        theme,
        className
      )}
      data-testid={`${testId}-container`}
    >
      {label && (
        <label htmlFor={inputId} className={`sliderLabel`}>
          {label}
        </label>
      )}

      <div className={`sliderWrapper`}>
        <input
          id={inputId}
          type="range"
          className={`slider`}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          aria-label={ariaLabel || label || "Slider input"}
          data-testid={testId}
        />
        {showValue && (
          <span className={`sliderValue`} data-testid={`${testId}-value`}>
            {value}
          </span>
        )}
      </div>
    </div>
  );
};

export default Slider;
