import {
  forwardRef,
  useState,
  useId,
  InputHTMLAttributes,
  useMemo,
} from "react";
import { EyeIcon, EyeSlashIcon } from "../../Icons";
import { TextInputBaseProps } from "./TextInput.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const TextInputBase = forwardRef<HTMLInputElement, TextInputBaseProps>(
  (
    {
      icon: Icon,
      placeholder = "Enter text",
      password = false,
      readOnly = false,
      ariaLabel,
      ariaDescription,
      theme = getDefaultTheme(),
      rounding = getDefaultRounding(),
      shadow = getDefaultShadow(),
      state = "",
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

    const autoId = useId();
    const {
      id: idProp,
      required,
      autoComplete: autoCompleteProp,
      ...restInput
    } = rest as InputHTMLAttributes<HTMLInputElement>;
    const inputId = idProp || autoId;

    const descId = ariaDescription ? `${inputId}-description` : undefined;
    const isError = state === "error";

    const computedAutoComplete =
      autoCompleteProp ??
      (autocomplete ? (password ? "current-password" : "on") : "off");

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const wrapperClass = useMemo(
      () =>
        combineClassNames(
          classMap.container,
          classMap[theme],
          classMap[state],
          outline && classMap.outline,
          disabled && classMap.disabled,
          shadow && classMap[`shadow${capitalize(shadow)}`],
          rounding && classMap[`round${capitalize(rounding)}`],
          className
        ),
      [classMap, theme, state, outline, disabled, shadow, rounding, className]
    );

    const computedLabel = ariaLabel || placeholder;

    return (
      <div
        className={wrapperClass}
        data-testid={`${testId}-wrapper`}
        aria-disabled={disabled || undefined}
      >
        {Icon && (
          <div
            className={classMap.iconContainer}
            aria-hidden="true"
            data-testid={`${testId}-icon`}
          >
            <Icon aria-hidden="true" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={password && !showPassword ? "password" : "text"}
          className={`${classMap.textInput} ${classMap[theme]}`}
          placeholder={placeholder}
          aria-label={computedLabel}
          aria-describedby={descId}
          aria-invalid={isError || undefined}
          aria-required={required || undefined}
          aria-readonly={readOnly || undefined}
          aria-disabled={disabled || undefined}
          autoComplete={computedAutoComplete}
          readOnly={readOnly}
          disabled={disabled}
          required={required}
          data-testid={testId}
          {...restInput}
        />

        {password && (
          <IconButton
            type="button"
            className={classMap.togglePassword}
            onClick={togglePasswordVisibility}
            theme="clear"
            shadow="none"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            data-testid={`${testId}-password-toggle`}
            icon={showPassword ? EyeIcon : EyeSlashIcon}
          />
        )}

        {ariaDescription && (
          <span
            id={descId}
            className="sr_only"
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
