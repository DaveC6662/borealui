import React, { forwardRef, useMemo } from "react";
import { RadioButtonProps } from "./RadioButton.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  defaultRounding,
  defaultShadow,
  defaultTheme,
} from "../../config/boreal-style-config";

export interface BaseRadioButtonProps extends RadioButtonProps {
  classMap: Record<string, string>;
}

const BaseRadioButton = forwardRef<HTMLInputElement, BaseRadioButtonProps>(
  (
    {
      label,
      value,
      checked,
      onChange,
      theme = defaultTheme,
      rounding = defaultRounding,
      shadow = defaultShadow,
      state = "",
      disabled = false,
      className = "",
      "data-testid": testId = "radio-button",
      classMap,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange(e.target.value);
      }
    };

    const wrapperClasses = useMemo(
      () =>
        combineClassNames(
          classMap.wrapper,
          classMap[theme],
          classMap[state],
          disabled ? classMap.disabled : "",
          className
        ),
      [classMap, theme, state, disabled, className]
    );

    const radioClasses = useMemo(
      () =>
        combineClassNames(
          classMap.circle,
          shadow && classMap[`shadow${capitalize(shadow)}`],
          rounding && classMap[`round${capitalize(rounding)}`]
        ),
      [classMap, rounding, shadow]
    );

    const labelId = `${testId}-label`;

    return (
      <label className={wrapperClasses} data-testid={`${testId}-wrapper`}>
        <input
          ref={ref}
          type="radio"
          id={`${testId}-input`}
          className={classMap.input}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-labelledby={labelId}
          data-testid={testId}
          {...props}
        />
        <span
          className={radioClasses}
          aria-hidden="true"
          data-testid={`${testId}-circle`}
        />
        <span
          id={labelId}
          className={classMap.label}
          data-testid={`${testId}-label`}
        >
          {label}
        </span>
      </label>
    );
  }
);

BaseRadioButton.displayName = "BaseRadioButton";
export default BaseRadioButton;
