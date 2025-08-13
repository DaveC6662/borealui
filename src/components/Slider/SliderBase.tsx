import React, { useMemo, useId } from "react";
import { SliderProps } from "./Slider.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const SliderBase: React.FC<
  SliderProps & { classMap: Record<string, string> }
> = ({
  value,
  onChange,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  size = getDefaultSize(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  theme = getDefaultTheme(),
  state = "",
  showValue = true,
  className = "",
  "aria-label": ariaLabel,
  disabled = false,
  "data-testid": testId = "slider",
  classMap,
  ...rest
}) => {
  const uid = useId();
  const inputId = `${testId}-input-${uid}`;
  const labelId = label ? `${testId}-label-${uid}` : undefined;
  const valueId = showValue ? `${testId}-value-${uid}` : undefined;

  const safeMin = Number.isFinite(min) ? Number(min) : 0;
  const safeMax = Number.isFinite(max) ? Number(max) : 100;
  const safeStep = step > 0 ? step : 1;
  const clamped = Math.min(safeMax, Math.max(safeMin, Number(value)));

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
    [classMap, size, theme, state, className, shadow, rounding]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numeric = Number(e.target.value);
    onChange?.(e);
    onValueChange?.(numeric);
  };

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
          value={clamped}
          onChange={handleChange}
          min={safeMin}
          max={safeMax}
          step={safeStep}
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : ariaLabel || "Slider"}
          aria-describedby={valueId}
          disabled={disabled}
          data-testid={testId}
          {...rest}
        />
        {showValue && (
          <output
            id={valueId}
            className={classMap.value}
            htmlFor={inputId}
            data-testid={`${testId}-value`}
          >
            {clamped}
          </output>
        )}
      </div>
    </div>
  );
};

SliderBase.displayName = "SliderBase";
export default SliderBase;
