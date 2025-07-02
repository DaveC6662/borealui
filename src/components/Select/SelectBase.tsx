import {
  forwardRef,
  ChangeEvent,
  useId,
  useMemo,
  useEffect,
  useState,
} from "react";
import { SelectProps } from "./Select.types";
import { ChevronDownIcon } from "@/Icons";
import { combineClassNames } from "@/utils/classNames";
import { capitalize } from "@/utils/capitalize";

interface BaseSelectProps extends SelectProps {
  classMap: Record<string, string>;
}

const BaseSelect = forwardRef<HTMLSelectElement, BaseSelectProps>(
  (
    {
      theme = "primary",
      state = "",
      outline = false,
      rounding = "medium",
      shadow = "light",
      options,
      value,
      onChange,
      placeholder = "Select an option",
      ariaLabel,
      ariaDescription,
      disabled = false,
      className = "",
      classMap,
      asyncOptions,
      pollInterval = 0,
      "data-testid": testId = "select",
    },
    ref
  ) => {
    const id = useId();
    const selectId = `${id}-select`;
    const descId = ariaDescription ? `${id}-desc` : undefined;

    const [internalOptions, setInternalOptions] = useState(options);

    useEffect(() => {
      if (!asyncOptions) return;

      let isMounted = true;

      const load = async () => {
        try {
          const fetched = await asyncOptions("");
          if (isMounted) setInternalOptions(fetched);
        } catch (err) {
          console.error("Failed to load options:", err);
        }
      };

      load();

      if (pollInterval > 0) {
        const intervalId = setInterval(load, pollInterval);
        return () => {
          clearInterval(intervalId);
          isMounted = false;
        };
      }

      return () => {
        isMounted = false;
      };
    }, [asyncOptions, pollInterval]);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    };

    const wrapperClasses = useMemo(
      () =>
        combineClassNames(
          classMap.wrapper,
          classMap[theme],
          classMap[state],
          className,
          shadow && classMap[`shadow${capitalize(shadow)}`],
          rounding && classMap[`round${capitalize(rounding)}`],
          outline ? classMap.outline : "",
          disabled ? classMap.disabled : ""
        ),
      [classMap, theme, state, className, shadow, rounding, outline, disabled]
    );

    const selectClasses = useMemo(
      () =>
        combineClassNames(
          classMap.select,
          classMap[theme],
          classMap[state],
          shadow && classMap[`shadow${capitalize(shadow)}`],
          rounding && classMap[`round${capitalize(rounding)}`],
          outline ? classMap.outline : ""
        ),
      [classMap, theme, state, outline]
    );

    return (
      <div className={wrapperClasses} data-testid={testId}>
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={handleChange}
          className={selectClasses}
          aria-label={ariaLabel || placeholder}
          aria-describedby={descId}
          aria-disabled={disabled}
          disabled={disabled}
          data-testid={`${testId}-input`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {(asyncOptions ? internalOptions : options).map((option) => (
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
