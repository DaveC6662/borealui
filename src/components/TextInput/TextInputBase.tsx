import { forwardRef, useState, useId, InputHTMLAttributes } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TextInputProps } from "./TextInput.types";

/**
 * Base component for TextInput. Handles shared logic and structure.
 *
 * @param {TextInputProps} props - Input properties.
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref.
 * @returns {JSX.Element}
 */
const TextInputBase = forwardRef<
  HTMLInputElement,
  TextInputProps & {
    styles: Record<string, string>;
  }
>(
  (
    {
      icon: Icon,
      placeholder = "Enter text",
      password = false,
      readOnly = false,
      ariaLabel,
      ariaDescription,
      theme = "primary",
      disabled = false,
      autocomplete = false,
      "data-testid": testId = "text-input",
      styles,
      className = "",
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = useId();
    const descId = `${inputId}-description`;

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
      <div
        className={`${styles.textBoxContainer} ${styles[theme]} ${disabled ? styles.disabled : ""} ${className}`}
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
          type={password && !showPassword ? "password" : "text"}
          className={`${styles.textInput} ${styles[theme]}`}
          placeholder={placeholder}
          aria-label={ariaLabel || placeholder}
          aria-describedby={ariaDescription ? descId : undefined}
          autoComplete={autocomplete ? "on" : "off"}
          readOnly={readOnly}
          disabled={disabled}
          data-testid={testId}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />

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

TextInputBase.displayName = "TextInputBase";
export default TextInputBase;
