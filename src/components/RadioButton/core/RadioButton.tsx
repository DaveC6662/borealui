import React, { forwardRef } from "react";
import "./RadioButton.scss";
import { RadioButtonProps } from "../RadioButton.types";

/**
 * RadioButton is a customizable, accessible radio input component.
 * It wraps a native radio input with a label and supports theming,
 * custom styling, and disabled states.
 *
 * @param {RadioButtonProps} props - Props to configure the radio button.
 * @param {React.Ref<HTMLInputElement>} ref - Ref forwarded to the native input element.
 * @returns {JSX.Element} A styled, accessible radio button.
 */
const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
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
      ...props
    },
    ref
  ) => {
    /**
     * Handles changes to the radio button and passes the selected value to onChange.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange(e.target.value);
      }
    };

    return (
      <label
        className={`${`radioWrapper`} ${className}`}
        data-testid={`${testId}-wrapper`}
      >
        <input
          ref={ref}
          type="radio"
          role="radio"
          aria-checked={checked}
          aria-disabled={disabled}
          className={`radioInput`}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          data-testid={testId}
          {...props}
        />
        <span className={`radioCircle  ${theme} ${
          disabled ? `disabled` : ""
        }`} data-testid={`${testId}-circle`} />
        <span className={`radioLabel ${
          disabled ? `disabled` : ""
        }`} data-testid={`${testId}-label`}>
          {label}
        </span>
      </label>
    );
  }
);

RadioButton.displayName = "RadioButton";
export default RadioButton;
