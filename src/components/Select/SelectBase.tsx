import { forwardRef, ChangeEvent, useId } from "react";
import { SelectProps } from "./Select.types";
import { ChevronDownIcon } from "@/Icons";
import { combineClassNames } from "@/utils/classNames";

interface BaseSelectProps extends SelectProps {
  classMap: Record<string, string>;
}

/**
 * BaseSelect is the unstyled core logic of the Select component.
 * It receives classMap and testIds from the consuming core/next wrapper.
 */
const BaseSelect = forwardRef<HTMLSelectElement, BaseSelectProps>(
  (
    {
      theme = "primary",
      outline = false,
      options,
      value,
      onChange,
      placeholder = "Select an option",
      ariaLabel,
      ariaDescription,
      disabled = false,
      className = "",
      classMap,
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
        className={combineClassNames(
          classMap.wrapper,
          classMap[theme],
          className,
          outline ? classMap.outline : "",
          disabled ? classMap.disabled : ""
        )}
        data-testid={testId}
      >
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={handleChange}
          className={combineClassNames(
            classMap.select,
            classMap[theme],
            outline ? classMap.outline : ""
          )}
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
          className={`${classMap.icon} ${classMap[theme]} ${
            disabled && classMap.disabled ? classMap.disabled : ""
          }`}
          aria-hidden="true"
          data-testid={`${testId}-icon`}
        >
          <ChevronDownIcon />
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
