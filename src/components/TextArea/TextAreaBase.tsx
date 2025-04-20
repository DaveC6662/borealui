import {
  ComponentType,
  forwardRef,
  TextareaHTMLAttributes,
  useId,
} from "react";
import { combineClassNames } from "../../utils/classNames";

export interface TextAreaBaseProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: ComponentType;
  ariaLabel?: string;
  ariaDescription?: string;
  height?: string | number;
  styles: Record<string, string>;
  "data-testid"?: string;
}

const TextAreaBase = forwardRef<HTMLTextAreaElement, TextAreaBaseProps>(
  (
    {
      icon: Icon,
      placeholder = "Enter text",
      readOnly = false,
      autoComplete = "off",
      ariaLabel,
      ariaDescription,
      disabled = false,
      height,
      styles,
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
          styles.textArea,
          disabled && styles.disabled,
          className
        )}
        data-testid={testId}
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
          className={styles.textInput}
          data-testid={`${testId}-input`}
          {...props}
        />

        <div
          className={styles.customResizeHandle}
          aria-hidden="true"
          data-testid={`${testId}-resize-handle`}
        />

        {ariaDescription && (
          <span
            id={descriptionId}
            className={styles.srOnly}
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
