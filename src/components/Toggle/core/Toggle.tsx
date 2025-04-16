import { forwardRef, KeyboardEvent } from "react";
import "./Toggle.scss";
import { combineClassNames } from "../../../utils/classNames";
import { ToggleProps } from "../Toggle.types";

/**
 * Toggle is an accessible switch component that displays a toggled button,
 * with optional label, theme, and size customization. It handles both
 * mouse and keyboard interactions to change its state.
 */
const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(({
  checked,
  onChange,
  label,
  theme = "primary",
  size = "medium",
  disabled = false,
  className = "",
  "data-testid": testId = "toggle",
}, ref) => {
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
    `toggleContainer`,
    theme,
    size && size,
    disabled && `disabled`,
    className
  );

  const toggleClass = combineClassNames(
    `toggle`,
    checked && `active`
  );

  return (
    <div className={containerClass} data-testid={`${testId}-wrapper`}>
      {label && (
        <span
          className={`label`}
          id={`${testId}-label`}
          data-testid={`${testId}-label`}
        >
          {label}
        </span>
      )}
      <button
        ref={ref}
        className={toggleClass}
        role="switch"
        aria-checked={checked}
        aria-labelledby={label ? `${testId}-label` : undefined}
        aria-label={label ? undefined : "Toggle switch"}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        data-testid={testId}
      >
        <span className={`slider`} data-testid={`${testId}-slider`} />
      </button>
    </div>
  );
});

Toggle.displayName = "Toggle";

export default Toggle;
