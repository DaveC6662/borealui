"use client";

import React, { forwardRef, KeyboardEvent } from "react";
import styles from "./Toggle.module.scss";
import { SizeType, ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the Toggle component.
 */
interface ToggleProps {
  /** Indicates whether the toggle is in the "on" (true) or "off" (false) state. */
  checked: boolean;
  /**
   * Callback that is invoked when the toggle's state changes.
   * Receives the new boolean state as an argument.
   */
  onChange: (checked: boolean) => void;
  /** Optional label to be displayed next to the toggle switch. */
  label?: string;
  /** Theme used for styling the toggle (e.g., "primary", "secondary"). Defaults to "primary". */
  theme?: ThemeType;
  /** Size variant for the toggle (e.g., "small", "medium", "large"). Defaults to "medium". */
  size?: SizeType;
  /** If true, disables user interaction with the toggle. */
  disabled?: boolean;
  /** Additional CSS class names for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. Defaults to "toggle". */
  "data-testid"?: string;
}

/**
 * Toggle is an accessible switch component that displays a toggled button,
 * with an optional label, theme, and size customization. It handles both
 * mouse and keyboard interactions to change its state.
 *
 * @param {ToggleProps} props - The properties to configure the toggle.
 * @param {React.Ref<HTMLButtonElement>} ref - A forwarded ref pointing to the underlying button.
 * @returns {JSX.Element} The rendered Toggle component.
 *
 * @example
 * <Toggle
 *   checked={true}
 *   onChange={(newState) => console.log(newState)}
 *   label="Enable notifications"
 *   theme="primary"
 *   size="medium"
 * />
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
  /**
   * Handles the toggle action by inverting the current checked state.
   */
  const handleToggle = () => {
    if (!disabled) onChange(!checked);
  };

  /**
   * Handles keyboard interactions to toggle the switch when
   * "Enter" or "Space" is pressed.
   * @param {KeyboardEvent<HTMLButtonElement>} e - The keyboard event.
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault();
      handleToggle();
    }
  };

  // Combine container class names based on theme, size, and disabled state.
  const containerClass = combineClassNames(
    styles.toggleContainer,
    styles[theme],
    size && styles[size],
    disabled && styles.disabled,
    className
  );

  // Combine toggle button classes based on its checked state.
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
});

Toggle.displayName = "Toggle";
export default Toggle;
