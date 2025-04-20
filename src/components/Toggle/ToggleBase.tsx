import { forwardRef, KeyboardEvent } from "react";
import { combineClassNames } from "../../utils/classNames";
import { ToggleProps } from "./Toggle.types";

export interface ToggleBaseProps extends ToggleProps {
  styles: Record<string, string>;
  className?: string;
}

const ToggleBase = forwardRef<HTMLButtonElement, ToggleBaseProps>(
  (
    {
      checked,
      onChange,
      label,
      theme = "primary",
      size = "medium",
      disabled = false,
      className = "",
      styles,
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

    const containerClass = combineClassNames(
      styles.toggleContainer,
      styles[theme],
      styles[size],
      disabled && styles.disabled,
      className
    );

    const toggleClass = combineClassNames(
      styles.toggle,
      checked && styles.active
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
          <span className={styles.slider} data-testid={`${testId}-slider`} />
        </button>

        {label && (
          <label
            id={labelId}
            htmlFor={`${testId}-button`}
            className={styles.label}
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
