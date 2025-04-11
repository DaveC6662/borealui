"use client";

import React, { forwardRef } from "react";
import styles from "./RadioButton.module.scss";
import { ThemeType } from "@/types/types";

/**
 * Props for the RadioButton component.
 */
interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** The label text displayed next to the radio button. */
  label: string;
  /** The value associated with this radio button. */
  value: string;
  /** Whether this radio button is currently checked. */
  checked: boolean;
  /** Callback triggered when the radio button's value changes. */
  onChange: (value: string) => void;
  /** Theme applied for styling (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Whether the radio button is disabled. */
  disabled?: boolean;
  /** Additional CSS class names for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

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
        className={`${styles.radioWrapper} ${styles[theme]} ${
          disabled ? styles.disabled : ""
        } ${className}`}
        data-testid={`${testId}-wrapper`}
      >
        <input
          ref={ref}
          type="radio"
          role="radio"
          aria-checked={checked}
          aria-disabled={disabled}
          className={styles.radioInput}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          data-testid={testId}
          {...props}
        />
        <span className={styles.radioCircle} data-testid={`${testId}-circle`} />
        <span className={styles.radioLabel} data-testid={`${testId}-label`}>
          {label}
        </span>
      </label>
    );
  }
);

RadioButton.displayName = "RadioButton";
export default RadioButton;
