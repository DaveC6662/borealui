import { ChangeEvent, forwardRef } from "react";
import "./Select.scss";
import { FaChevronDown } from "react-icons/fa";
import { SelectProps } from "../Select.types";

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
     */
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      onChange(isNaN(Number(selectedValue)) ? selectedValue : Number(selectedValue));
    };

    return (
      <div
        className={`${"selectMain"} ${theme} ${className} ${
          disabled ? "disabled" : ""
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
          className={`${"select"} ${theme}`}
          aria-disabled={disabled}
          data-testid={`${testId}-input`}
        >
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
          className={`${"selectIcon"} ${theme} ${
            disabled ? "disabled" : ""
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
