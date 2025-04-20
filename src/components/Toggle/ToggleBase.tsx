import { forwardRef, KeyboardEvent } from "react";
import { combineClassNames } from "../../utils/classNames";
import { ToggleProps } from "./Toggle.types";

/**
 * Internal props used only by the base component.
 */
export interface ToggleBaseProps extends ToggleProps {
  /** Object containing class names for each part of the component. */
  styles: Record<string, string>;
  /** Additional class names to apply to the outer container. */
  className?: string;
}

/**
 * ToggleBase is a reusable toggle switch component with framework-agnostic logic.
 * Framework-specific components should pass in style classes via the `styles` prop.
 *
 * @param {ToggleBaseProps} props - Props for configuring the toggle switch.
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref to the toggle button element.
 */
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

    return (
      <div className={containerClass} data-testid={`${testId}-wrapper`}>
        {label && (
          <span
            className={styles.label}
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
          <span className={styles.slider} data-testid={`${testId}-slider`} />
        </button>
      </div>
    );
  }
);

ToggleBase.displayName = "ToggleBase";

export default ToggleBase;
