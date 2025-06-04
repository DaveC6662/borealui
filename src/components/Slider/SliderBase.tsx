import React from "react";
import { SliderProps } from "./Slider.types";
import { combineClassNames } from "@/utils/classNames";

const SliderBase: React.FC<
  SliderProps & { classMap: Record<string, string> }
> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  size = "medium",
  theme = "primary",
  state = "",
  showValue = true,
  className = "",
  "aria-label": ariaLabel,
  "data-testid": testId = "slider",
  classMap,
}) => {
  const inputId = `${testId}-input`;
  const labelId = `${testId}-label`;
  const valueText = `${value}`;

  return (
    <div
      className={combineClassNames(classMap.container, classMap[size], classMap[theme], classMap[state], className)}
      data-testid={`${testId}-container`}
    >
      {label && (
        <label id={labelId} htmlFor={inputId} className={classMap.label}>
          {label}
        </label>
      )}

      <div className={classMap.wrapper}>
        <input
          id={inputId}
          type="range"
          className={classMap.slider}
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
            className={classMap.value}
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
