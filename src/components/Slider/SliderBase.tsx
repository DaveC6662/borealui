import React, { useMemo } from "react";
import { SliderProps } from "./Slider.types";
import { combineClassNames } from "@/utils/classNames";
import { capitalize } from "@/utils/capitalize";

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
  rounding = "medium",
  shadow = "none",
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

  const containerClasses = useMemo(
    () =>
      combineClassNames(
        classMap.container,
        classMap[size],
        classMap[theme],
        classMap[state],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        className
      ),
    [classMap, size, theme, state, className]
  );

  return (
    <div className={containerClasses} data-testid={`${testId}-container`}>
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
