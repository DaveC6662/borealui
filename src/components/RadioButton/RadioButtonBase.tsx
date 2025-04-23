import React, { forwardRef } from "react";
import { RadioButtonProps } from "./RadioButton.types";

export interface BaseRadioButtonProps extends RadioButtonProps {
  classNames: {
    wrapper: string;
    input: string;
    circle: string;
    label: string;
    themeMap: Record<string, string>;
    disabled?: string;
  };
}

const BaseRadioButton = forwardRef<HTMLInputElement, BaseRadioButtonProps>(
  (
    {
      label,
      value,
      checked,
      onChange,
      theme = "primary",
      disabled = false,
      className = "",
      "data-testid": testId = "radio-button",
      classNames,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange(e.target.value);
      }
    };

    const wrapperClasses = [
      classNames.wrapper,
      classNames.themeMap[theme],
      disabled ? classNames.disabled : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const labelId = `${testId}-label`;

    return (
      <label className={wrapperClasses} data-testid={`${testId}-wrapper`}>
        <input
          ref={ref}
          type="radio"
          id={`${testId}-input`}
          className={classNames.input}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-labelledby={labelId}
          data-testid={testId}
          {...props}
        />
        <span
          className={classNames.circle}
          aria-hidden="true"
          data-testid={`${testId}-circle`}
        />
        <span
          id={labelId}
          className={classNames.label}
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
