import { forwardRef, KeyboardEvent, useId, useMemo } from "react";
import { combineClassNames } from "../../utils/classNames";
import { ToggleBaseProps } from "./Toggle.types";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const ToggleBase = forwardRef<HTMLButtonElement, ToggleBaseProps>(
  (
    {
      checked,
      onChange,
      label,
      theme = getDefaultTheme(),
      rounding = getDefaultRounding(),
      shadow = getDefaultShadow(),
      state = "",
      size = getDefaultSize(),
      disabled = false,
      classMap,
      className,
      "data-testid": testId = "toggle",
    },
    ref
  ) => {
    const uid = useId();
    const buttonId = `${testId}-button-${uid}`;
    const labelId = label ? `${testId}-label-${uid}` : undefined;

    const setOn = (next: boolean) => {
      if (!disabled && next !== checked) onChange(next);
    };
    const toggle = () => setOn(!checked);

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      switch (e.key) {
        case " ":
        case "Enter":
          e.preventDefault();
          toggle();
          break;
        case "ArrowRight":
          e.preventDefault();
          setOn(true);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setOn(false);
          break;
      }
    };

    const containerClass = useMemo(
      () =>
        combineClassNames(
          classMap.container,
          classMap[theme],
          classMap[state],
          classMap[size],
          disabled && classMap.disabled,
          className
        ),
      [classMap, theme, state, size, disabled, className]
    );

    const toggleClass = useMemo(
      () =>
        combineClassNames(
          classMap.toggle,
          checked && classMap.active,
          shadow && classMap[`shadow${capitalize(shadow)}`],
          rounding && classMap[`round${capitalize(rounding)}`]
        ),
      [classMap, checked, shadow, rounding]
    );

    return (
      <div className={containerClass} data-testid={`${testId}-wrapper`}>
        <button
          ref={ref}
          id={buttonId}
          className={toggleClass}
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : "Toggle switch"}
          type="button"
          disabled={disabled}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          data-testid={testId}
        >
          <span
            className={classMap.slider}
            aria-hidden="true"
            data-testid={`${testId}-slider`}
          />
        </button>

        {label && (
          <label
            id={labelId}
            htmlFor={buttonId}
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
