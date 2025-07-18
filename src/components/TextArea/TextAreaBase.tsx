import { forwardRef, useId, useMemo } from "react";
import { combineClassNames } from "../../utils/classNames";
import { TextAreaProps } from "./TextArea.types";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const TextAreaBase = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & { classMap: Record<string, string> }
>(
  (
    {
      icon: Icon,
      placeholder = "Enter text",
      readOnly = false,
      outline = false,
      autoComplete = "off",
      theme = getDefaultTheme(),
      rounding = getDefaultRounding(),
      shadow = getDefaultShadow(),
      state = "",
      ariaLabel,
      ariaDescription,
      disabled = false,
      height,
      classMap,
      className = "",
      "data-testid": testId = "text-area",
      ...props
    },
    ref
  ) => {
    const id = useId();
    const descriptionId = ariaDescription ? `${id}-description` : undefined;

    const wrapperClass = useMemo(
      () =>
        combineClassNames(
          classMap.textArea,
          classMap[theme],
          classMap[state],
          outline && classMap.outline,
          disabled && classMap.disabled,
          shadow && classMap[`shadow${capitalize(shadow)}`],
          rounding && classMap[`round${capitalize(rounding)}`],
          className
        ),
      [classMap, outline, disabled, rounding, shadow, className]
    );

    return (
      <div className={wrapperClass} data-testid={testId}>
        {Icon && (
          <div
            className={classMap.iconContainer}
            aria-hidden="true"
            data-testid={`${testId}-icon`}
          >
            <Icon />
          </div>
        )}

        <textarea
          ref={ref}
          id={id}
          placeholder={placeholder}
          aria-label={ariaLabel || placeholder}
          aria-describedby={descriptionId}
          autoComplete={autoComplete}
          readOnly={readOnly}
          disabled={disabled}
          style={{ height }}
          className={classMap.textInput}
          data-testid={`${testId}-input`}
          {...props}
        />

        <div
          className={classMap.customResizeHandle}
          aria-hidden="true"
          data-testid={`${testId}-resize-handle`}
        />

        {ariaDescription && (
          <span
            id={descriptionId}
            className={"sr_only"}
            data-testid={`${testId}-description`}
          >
            {ariaDescription}
          </span>
        )}
      </div>
    );
  }
);

TextAreaBase.displayName = "TextAreaBase";

export default TextAreaBase;
