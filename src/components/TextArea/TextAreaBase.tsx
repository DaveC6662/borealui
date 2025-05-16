import {
  ComponentType,
  forwardRef,
  TextareaHTMLAttributes,
  useId,
} from "react";
import { combineClassNames } from "../../utils/classNames";
import { TextAreaProps } from "./TextArea.types";

const TextAreaBase = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & { classMap: Record<string, string> }
>(
  (
    {
      icon: Icon,
      placeholder = "Enter text",
      readOnly = false,
      autoComplete = "off",
      theme = "primary",
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

    return (
      <div
        className={combineClassNames(
          classMap.textArea,
          classMap[theme],
          disabled && classMap.disabled,
          className
        )}
        data-testid={testId}
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
