"use client";

import React, {
  useState,
  useId,
  ComponentType,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import styles from "./TextInput.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the TextInput component.
 */
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional icon component to display on the left side of the input. */
  icon?: ComponentType;
  /** If true, the input is for password data and will include a password visibility toggle. */
  password?: boolean;
  /** Additional CSS class names for custom styling. */
  className?: string;
  /** If true, the input is rendered in read-only mode. */
  readOnly?: boolean;
  /** Accessible label for the input (overrides placeholder when provided). */
  ariaLabel?: string;
  /** Description to be read by screen readers, rendered as a visually hidden text. */
  ariaDescription?: string;
  /** Theme used for styling (e.g., "primary", "secondary"). Defaults to "primary". */
  theme?: ThemeType;
  /**
   * Controls whether autocomplete is enabled.
   * Pass `true` to enable ("on") or `false` to disable ("off").
   * Defaults to false (autocomplete is off).
   */
  autocomplete?: boolean;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * TextInput is a customizable input component that supports optional icons, password mode,
 * theming, and accessibility features. It includes a toggle to switch the password field 
 * between masked and unmasked view.
 *
 * @param {TextInputProps} props - The properties for configuring the TextInput.
 * @param {React.Ref<HTMLInputElement>} ref - A forwarded ref to the native input element.
 * @returns {JSX.Element} A styled text input component.
 *
 * @example
 * <TextInput
 *   placeholder="Enter your username"
 *   ariaLabel="Username"
 *   theme="primary"
 * />
 *
 * @example
 * <TextInput
 *   password
 *   placeholder="Enter your password"
 *   ariaLabel="Password"
 *   theme="secondary"
 * />
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      icon: Icon,
      placeholder = "Enter text",
      password = false,
      className = "",
      readOnly = false,
      ariaLabel,
      ariaDescription,
      theme = "primary",
      disabled = false,
      autocomplete = false,
      "data-testid": testId = "text-input",
      ...rest
    },
    ref
  ) => {
    // Manage the visibility of password text if the input is in password mode.
    const [showPassword, setShowPassword] = useState(false);
    // Generate a unique ID for this input for accessibility purposes.
    const inputId = useId();
    const descId = `${inputId}-description`;

    /**
     * Toggles the password visibility state.
     */
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
      <div
        className={combineClassNames(
          styles.iconTextBox,
          styles[theme],
          disabled && styles.disabled,
          className
        )}
        data-testid={`${testId}-wrapper`}
        aria-disabled={disabled}
      >
        {Icon && (
          <div
            className={styles.iconContainer}
            aria-hidden="true"
            data-testid={`${testId}-icon`}
          >
            <Icon />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          // Determine the input type based on password prop and visibility state.
          type={password && !showPassword ? "password" : "text"}
          className={combineClassNames(styles.textInput, styles[theme])}
          placeholder={placeholder}
          aria-label={ariaLabel || placeholder}
          aria-describedby={ariaDescription ? descId : undefined}
          autoComplete={autocomplete ? "on" : "off"}
          readOnly={readOnly}
          disabled={disabled}
          data-testid={testId}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />

        {/* Render a toggle button for password visibility if in password mode */}
        {password && (
          <button
            type="button"
            className={styles.togglePassword}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
            data-testid={`${testId}-password-toggle`}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}

        {/* Render an accessible description if provided */}
        {ariaDescription && (
          <span
            id={descId}
            className={styles.srOnly}
            data-testid={`${testId}-input-description`}
          >
            {ariaDescription}
          </span>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
