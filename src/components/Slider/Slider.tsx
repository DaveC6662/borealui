"use client";

import React from "react";
import styles from "./Slider.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { SizeType, ThemeType } from "@/types/types";

/**
 * Props for the Slider component.
 */
interface SliderProps {
  /** The current numeric value of the slider. */
  value: number;
  /**
   * Callback invoked when the slider value changes.
   * Receives the change event from the input element.
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** The minimum value of the slider (default: 0). */
  min?: number;
  /** The maximum value of the slider (default: 100). */
  max?: number;
  /** Increment step for the slider (default: 1). */
  step?: number;
  /** Optional label displayed above or beside the slider. */
  label?: string;
  /** If true, the current slider value is displayed alongside the slider (default: true). */
  showValue?: boolean;
  /** Size variant for the slider (e.g., "small", "medium", "large"). */
  size?: SizeType;
  /** Theme variant for styling (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Additional CSS class names for custom styling. */
  className?: string;
  /** Accessible label for the slider if label is not provided. */
  "aria-label"?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

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
        styles.sliderContainer,
        styles[size],
        styles[theme],
        className
      )}
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

export default Slider;
