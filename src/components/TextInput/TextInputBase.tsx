import { forwardRef, useState, useId, InputHTMLAttributes } from "react";
import { EyeIcon, EyeSlashIcon } from "@/Icons";
import { TextInputProps } from "./TextInput.types";
import { combineClassNames } from "@/utils/classNames";

const TextInputBase = forwardRef<
  HTMLInputElement,
  TextInputProps & {
    classMap: Record<string, string>;
    IconButton: React.FC<any>;
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
      classMap,
      outline = false,
      IconButton,
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
        className={combineClassNames(
          classMap.container,
          classMap[theme],
          outline ? classMap.outline : "",
          disabled ? classMap.disabled : "",
          className
        )}
        data-testid={`${testId}-wrapper`}
        aria-disabled={disabled}
      >
        {Icon && (
          <div
            className={classMap.iconContainer}
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
          className={`${classMap.textInput} ${classMap[theme]}`}
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
          <IconButton
            type="button"
            className={classMap.togglePassword}
            onClick={togglePasswordVisibility}
            theme="clear"
            aria-label={showPassword ? "Hide password" : "Show password"}
            data-testid={`${testId}-password-toggle`}
            icon={showPassword ? EyeIcon : EyeSlashIcon}
          />
        )}

        {ariaDescription && (
          <span
            id={descId}
            className={"sr_only"}
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
