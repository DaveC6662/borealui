import React, { forwardRef, useMemo, useId } from "react";
import { BaseRadioButtonProps } from "./RadioButton.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const BaseRadioButton = forwardRef<HTMLInputElement, BaseRadioButtonProps>(
  (
    {
      label,
      value,
      checked,
      onChange,
      name,
      theme = getDefaultTheme(),
      rounding = getDefaultRounding(),
      shadow = getDefaultShadow(),
      state = "",
      disabled = false,
      className = "",
      id,
      "data-testid": testId = "radio-button",
      classMap,
      ...props
    },
    ref
  ) => {
    const uid = useId();
    const inputId = id ?? `${testId}-input-${uid}`;
    const labelId = `${testId}-label-${uid}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (e.target.checked) onChange(e.target.value);
    };

    const wrapperClasses = useMemo(
      () =>
        combineClassNames(
          classMap.wrapper,
          classMap[theme],
          classMap[state],
          disabled && classMap.disabled,
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

    return (
      <label
        className={wrapperClasses}
        data-testid={`${testId}-wrapper`}
        htmlFor={inputId}
      >
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={name}
          className={classMap.input}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-labelledby={label ? labelId : undefined}
          data-testid={testId}
          {...props}
        />
        <span
          className={radioClasses}
          aria-hidden="true"
          data-testid={`${testId}-circle`}
        />
        {label && (
          <span
            id={labelId}
            className={classMap.label}
            data-testid={`${testId}-label`}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

BaseRadioButton.displayName = "BaseRadioButton";
export default BaseRadioButton;
