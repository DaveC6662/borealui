import {
  ComponentType,
  forwardRef,
  TextareaHTMLAttributes,
  useId,
} from "react";
import { combineClassNames } from "../../utils/classNames";

/**
 * Props for the base TextArea component.
 */
export interface TextAreaBaseProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: ComponentType;
  ariaLabel?: string;
  ariaDescription?: string;
  height?: string | number;
  styles: Record<string, string>;
  "data-testid"?: string;
}

/**
 * TextAreaBase is a reusable core component that renders a customizable and accessible textarea.
 * It expects a `styles` object containing all relevant class mappings.
 */
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
            aria-label="textarea icon"
          >
            <Icon />
          </div>
        )}

        <textarea
          ref={ref}
          id={id}
          placeholder={placeholder}
          aria-label={ariaLabel || placeholder}
          aria-describedby={ariaDescription ? `${id}-description` : undefined}
          autoComplete={autoComplete}
          readOnly={readOnly}
          disabled={disabled}
          style={{ height }}
          className={styles.textInput}
          data-testid={`${testId}-input`}
          {...props}
        />

        <div className={styles.customResizeHandle} aria-hidden="true" />

        {ariaDescription && (
          <span
            id={`${id}-description`}
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
