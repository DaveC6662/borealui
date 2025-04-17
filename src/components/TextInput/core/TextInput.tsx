import {
    useState,
    useId,
    InputHTMLAttributes,
    forwardRef,
  } from "react";
  import "./TextInput.scss";
  import { FaEye, FaEyeSlash } from "react-icons/fa";
  import { combineClassNames } from "../../../utils/classNames";
import { TextInputProps } from "../TextInput.types";
  
  
  /**
   * TextInput is a customizable input component that supports optional icons, password mode,
   * theming, and accessibility features. It includes a toggle to switch the password field 
   * between masked and unmasked view.
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
      const [showPassword, setShowPassword] = useState(false);
      const inputId = useId();
      const descId = `${inputId}-description`;
  
      const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  
      return (
        <div
          className={combineClassNames(
            "textBoxContainer",
            theme,
            disabled && "disabled",
            className
          )}
          data-testid={`${testId}-wrapper`}
          aria-disabled={disabled}
        >
          {Icon && (
            <div
              className={"iconContainer"}
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
            className={combineClassNames("textInput", theme)}
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
              className={"togglePassword"}
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
              className={"srOnly"}
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
  