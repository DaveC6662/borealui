"use client";

import React, { ChangeEvent, forwardRef } from "react";
import styles from "./Select.module.scss";
import { FaChevronDown } from "react-icons/fa";
import { ThemeType } from "@/types/types";

/**
 * Represents a single option in the Select component.
 */
interface Option {
  /** The value to be used for the option. */
  value: string | number;
  /** The display label for the option. */
  label: string;
}

/**
 * Props for the Select component.
 */
export interface SelectProps {
  /** Theme for styling (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** An array of options that will be rendered as dropdown choices. */
  options: Option[];
  /** The current selected value. */
  value: string | number;
  /**
   * Callback fired when the selected option changes.
   * Receives the new value as an argument.
   */
  onChange: (value: string | number) => void;
  /** Placeholder text to display when no option is selected. */
  placeholder?: string;
  /** Accessible label for the select element. */
  ariaLabel?: string;
  /** If true, the select element is disabled. */
  disabled?: boolean;
  /** Additional class name(s) for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * Select is a customizable dropdown component that allows users to choose from a list of options.
 * It supports theming, custom class names, disabling, and accessibility attributes.
 *
 * @param {SelectProps} props - Props for configuring the Select component.
 * @param {React.Ref<HTMLSelectElement>} ref - Ref forwarded to the underlying select element.
 * @returns {JSX.Element} A styled, accessible select element with a custom dropdown icon.
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      theme = "primary",
      options,
      value,
      onChange,
      placeholder = "Select an option",
      ariaLabel,
      disabled = false,
      className = "",
      "data-testid": testId = "select",
    },
    ref
  ) => {
    /**
     * Handles the change event on the select element.
     * Converts the value to a number if it is numeric.
     *
     * @param {ChangeEvent<HTMLSelectElement>} event - The change event triggered by the select input.
     */
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      // Convert to number if possible, otherwise keep string.
      onChange(isNaN(Number(selectedValue)) ? selectedValue : Number(selectedValue));
    };

    return (
      <div
        className={`${styles.selectMain} ${styles[theme]} ${className} ${
          disabled ? styles.disabled : ""
        }`}
        aria-live="polite"
        data-testid={testId}
      >
        <select
          ref={ref}
          value={value}
          onChange={handleChange}
          aria-label={ariaLabel || placeholder}
          disabled={disabled}
          className={`${styles.select} ${styles[theme]}`}
          aria-disabled={disabled}
          data-testid={`${testId}-input`}
        >
          {/* The placeholder is rendered as a hidden and disabled option */}
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              data-testid={`${testId}-option-${option.value}`}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div
          className={`${styles.selectIcon} ${styles[theme]} ${
            disabled ? styles.disabled : ""
          }`}
          aria-hidden="true"
          data-testid={`${testId}-icon`}
        >
          <FaChevronDown />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
