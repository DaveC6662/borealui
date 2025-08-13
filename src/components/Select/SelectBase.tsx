import {
  forwardRef,
  ChangeEvent,
  useId,
  useMemo,
  useEffect,
  useState,
} from "react";
import { ChevronDownIcon } from "../../Icons";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";
import { BaseSelectProps } from "./Select.types";

const BaseSelect = forwardRef<HTMLSelectElement, BaseSelectProps>(
  (
    {
      theme = getDefaultTheme(),
      state = "",
      outline = false,
      rounding = getDefaultRounding(),
      shadow = getDefaultShadow(),
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
      required,
      name,
      "data-testid": testId = "select",
    },
    ref
  ) => {
    const id = useId();
    const selectId = `${id}-select`;
    const descId = ariaDescription ? `${id}-desc` : undefined;

    const [internalOptions, setInternalOptions] = useState(options);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (!asyncOptions) return;

      let isMounted = true;

      const load = async () => {
        try {
          setLoading(true);
          const fetched = await asyncOptions("");
          if (isMounted) setInternalOptions(fetched);
        } catch (err) {
          console.error("Failed to load options:", err);
        } finally {
          if (isMounted) setLoading(false);
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
          outline && classMap.outline,
          disabled && classMap.disabled
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
          outline && classMap.outline
        ),
      [classMap, theme, state, shadow, rounding, outline]
    );

    const iconClasses = useMemo(
      () =>
        combineClassNames(
          classMap.icon,
          classMap[theme],
          disabled && classMap.disabled
        ),
      [classMap, theme, disabled]
    );

    const opts = asyncOptions ? internalOptions : options;

    return (
      <div className={wrapperClasses} data-testid={testId}>
        <select
          ref={ref}
          id={selectId}
          name={name}
          value={value ?? ""}
          onChange={handleChange}
          className={selectClasses}
          aria-label={ariaLabel || placeholder}
          aria-describedby={descId}
          aria-disabled={disabled || undefined}
          aria-invalid={state === "error" || undefined}
          disabled={disabled}
          required={required}
          data-testid={`${testId}-input`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {opts.map((option) => (
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
          className={iconClasses}
          aria-hidden="true"
          data-testid={`${testId}-icon`}
        >
          <ChevronDownIcon aria-hidden="true" focusable={false} />
        </div>

        {ariaDescription && (
          <span
            id={descId}
            className="sr_only"
            data-testid={`${testId}-description`}
          >
            {ariaDescription}
          </span>
        )}

        {loading && (
          <span className={classMap.loading} aria-live="polite">
            Loading options…
          </span>
        )}
      </div>
    );
  }
);

BaseSelect.displayName = "BaseSelect";
export default BaseSelect;
