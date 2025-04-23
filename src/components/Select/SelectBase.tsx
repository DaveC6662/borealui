import { forwardRef, ChangeEvent, useId } from "react";
import { SelectProps } from "./Select.types";
import { FaChevronDown } from "react-icons/fa";

interface BaseSelectProps extends SelectProps {
  classNames: {
    main: string;
    select: string;
    icon: string;
    themeClass: (theme: string) => string;
    disabled?: string;
  };
}

/**
 * BaseSelect is the unstyled core logic of the Select component.
 * It receives classNames and testIds from the consuming core/next wrapper.
 */
const BaseSelect = forwardRef<HTMLSelectElement, BaseSelectProps>(
  (
    {
      theme = "primary",
      options,
      value,
      onChange,
      placeholder = "Select an option",
      ariaLabel,
      ariaDescription,
      disabled = false,
      className = "",
      classNames,
      "data-testid": testId = "select",
    },
    ref
  ) => {
    const id = useId();
    const selectId = `${id}-select`;
    const descId = ariaDescription ? `${id}-desc` : undefined;

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    };

    return (
      <div
        className={`${classNames.main} ${classNames.themeClass(theme)} ${className} ${
          disabled && classNames.disabled ? classNames.disabled : ""
        }`}
        data-testid={testId}
      >
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={handleChange}
          className={`${classNames.select} ${classNames.themeClass(theme)}`}
          aria-label={ariaLabel || placeholder}
          aria-describedby={descId}
          aria-disabled={disabled}
          disabled={disabled}
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
          className={`${classNames.icon} ${classNames.themeClass(theme)} ${
            disabled && classNames.disabled ? classNames.disabled : ""
          }`}
          aria-hidden="true"
          data-testid={`${testId}-icon`}
        >
          <FaChevronDown />
        </div>

        {ariaDescription && (
          <span
            id={descId}
            className="sr-only"
            data-testid={`${testId}-description`}
          >
            {ariaDescription}
          </span>
        )}
      </div>
    );
  }
);

BaseSelect.displayName = "BaseSelect";
export default BaseSelect;
