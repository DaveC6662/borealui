import { forwardRef, KeyboardEvent, useMemo } from "react";
import { combineClassNames } from "../../utils/classNames";
import { ToggleProps } from "./Toggle.types";
import { capitalize } from "../../utils/capitalize";
import {
  defaultRounding,
  defaultShadow,
  defaultSize,
  defaultTheme,
} from "../../config/boreal-style-config";

export interface ToggleBaseProps extends ToggleProps {
  classMap: Record<string, string>;
}

const ToggleBase = forwardRef<HTMLButtonElement, ToggleBaseProps>(
  (
    {
      checked,
      onChange,
      label,
      theme = defaultTheme,
      rounding = defaultRounding,
      shadow = defaultShadow,
      state = "",
      size = defaultSize,
      disabled = false,
      classMap,
      className,
      "data-testid": testId = "toggle",
    },
    ref
  ) => {
    const handleToggle = () => {
      if (!disabled) onChange(!checked);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if ((e.key === "Enter" || e.key === " ") && !disabled) {
        e.preventDefault();
        handleToggle();
      }
    };

    const containerClass = useMemo(
      () =>
        combineClassNames(
          classMap.container,
          classMap[theme],
          classMap[state],
          classMap[size],
          rounding && classMap[`round${capitalize(rounding)}`],
          disabled && classMap.disabled,
          className
        ),
      [classMap, size, disabled, shadow, rounding, theme, state]
    );

    const toggleClass = useMemo(
      () =>
        combineClassNames(
          classMap.toggle,
          checked && classMap.active,
          shadow && classMap[`shadow${capitalize(shadow)}`],
          rounding && classMap[`round${capitalize(rounding)}`]
        ),
      [classMap, checked, rounding]
    );

    const labelId = label ? `${testId}-label` : undefined;

    return (
      <div className={containerClass} data-testid={`${testId}-wrapper`}>
        <button
          ref={ref}
          id={`${testId}-button`}
          className={toggleClass}
          role="switch"
          aria-checked={checked}
          aria-labelledby={labelId}
          aria-label={label ? undefined : "Toggle switch"}
          type="button"
          disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          data-testid={testId}
        >
          <span className={classMap.slider} data-testid={`${testId}-slider`} />
        </button>

        {label && (
          <label
            id={labelId}
            htmlFor={`${testId}-button`}
            className={classMap.label}
            data-testid={`${testId}-label`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

ToggleBase.displayName = "ToggleBase";
export default ToggleBase;
