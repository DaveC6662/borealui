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
      title,
      titlePosition = "top",
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
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const autoId = useId();
    const {
      id: idProp,
      required,
      autoComplete: autoCompleteProp,
      type: typeProp,
      ...restInput
    } = rest as InputHTMLAttributes<HTMLInputElement>;
    const inputId = idProp || autoId;

    const inputType = password
      ? showPassword
        ? "text"
        : "password"
      : typeProp || "text";

    const descId = ariaDescription ? `${inputId}-description` : undefined;
    const isError = state === "error";

    const computedAutoComplete =
      autoCompleteProp ??
      (autocomplete ? (password ? "current-password" : "on") : "off");

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const hasTitle = Boolean(title);

    const layoutClasses = useMemo(() => {
      const posClass = hasTitle
        ? classMap[`title${capitalize(titlePosition)}`]
        : undefined;

      return combineClassNames(classMap.layout, posClass);
    }, [classMap, hasTitle, titlePosition]);

    const titleClasses = useMemo(
      () => combineClassNames(classMap.title, classMap.titleOverlay),
      [classMap],
    );

    const titleNode = hasTitle ? (
      <div className={titleClasses} data-testid={`${testId}-title`}>
        {title}
      </div>
    ) : null;

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
          className,
        ),
      [classMap, theme, state, outline, disabled, shadow, rounding, className],
    );

    const inputClasses = useMemo(
      () => combineClassNames(classMap.textInput, outline && classMap.outline),
      [classMap, outline],
    );

    const iconClasses = useMemo(
      () =>
        combineClassNames(
          classMap.iconContainer,
          classMap[theme],
          disabled && classMap.disabled,
        ),
      [classMap, theme, disabled],
    );
    const computedAriaLabel = hasTitle ? undefined : ariaLabel || placeholder;

    const computedPlaceholder =
      hasTitle && titlePosition === "overlay" ? " " : placeholder;

    return (
      <div className={layoutClasses} data-testid={`${testId}-layout`}>
        {(titlePosition === "top" || titlePosition === "left") && titleNode}

        <div className={wrapperClass} data-testid={testId}>
          {Icon && (
            <div
              className={iconClasses}
              aria-hidden="true"
              data-testid={`${testId}-icon`}
            >
              <Icon aria-hidden="true" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={inputClasses}
            placeholder={computedPlaceholder}
            aria-label={computedAriaLabel}
            aria-describedby={descId}
            aria-disabled={disabled || undefined}
            aria-invalid={isError || undefined}
            aria-required={required || undefined}
            aria-readonly={readOnly || undefined}
            autoComplete={computedAutoComplete}
            readOnly={readOnly}
            disabled={disabled}
            required={required}
            data-testid={`${testId}-input`}
            {...restInput}
          />
          {hasTitle && titlePosition === "overlay" && (
            <label
              className={classMap.titleOverlayLabel}
              htmlFor={inputId}
              data-testid={`${testId}-overlay-title`}
            >
              {title}
            </label>
          )}

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
              icon={showPassword ? EyeSlashIcon : EyeIcon}
            />
          )}

          {ariaDescription && (
            <span
              id={descId}
              className="sr_only"
              data-testid={`${testId}-description`}
            >
              {ariaDescription}
            </span>
          )}
        </div>

        {(titlePosition === "bottom" || titlePosition === "right") && titleNode}
      </div>
    );
  },
);

TextInputBase.displayName = "TextInputBase";
export default TextInputBase;
