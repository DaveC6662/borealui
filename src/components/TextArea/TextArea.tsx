"use client";

import React, {
  forwardRef,
  TextareaHTMLAttributes,
  ComponentType,
  useId,
} from "react";
import styles from "./TextArea.module.scss";
import { ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the TextArea component.
 */
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Optional icon to display alongside the textarea. Accepts a React component. */
  icon?: ComponentType;
  /** Placeholder text for the textarea. Defaults to "Enter text". */
  placeholder?: string;
  /** Additional custom CSS class name(s) to apply to the container. */
  className?: string;
  /** If true, renders the textarea as read-only. */
  readOnly?: boolean;
  /** Enables or disables autocomplete on the textarea ("on" or "off"). Defaults to "off". */
  autoComplete?: "on" | "off";
  /** Accessible label for the textarea. Defaults to the placeholder text if not provided. */
  ariaLabel?: string;
  /** Accessible description for the textarea, rendered as visually hidden text. */
  ariaDescription?: string;
  /** Theme used for styling (e.g., "primary", "secondary"). Defaults to "primary". */
  theme?: ThemeType;
  /** If true, the textarea is disabled. */
  disabled?: boolean;
  /** Optional height for the textarea. Can be a CSS value or a number (interpreted as pixels). */
  height?: string | number;
  /** Optional test ID for testing frameworks. Defaults to "text-area". */
  "data-testid"?: string;
}

/**
 * TextArea is a customizable and accessible textarea component that can display an optional icon,
 * supports theming, and includes a visually hidden description for accessibility. It also provides
 * a custom resize handle.
 *
 * @param {TextAreaProps} props - The props for configuring the TextArea.
 * @param {React.Ref<HTMLTextAreaElement>} ref - A ref forwarded to the underlying textarea.
 * @returns {JSX.Element} A styled textarea component.
 *
 * @example
 * <TextArea
 *   placeholder="Enter your message"
 *   ariaLabel="Message input"
 *   ariaDescription="This textarea is used for entering messages."
 *   theme="primary"
 *   height="150px"
 * />
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      icon: Icon,
      placeholder = "Enter text",
      className = "",
      readOnly = false,
      autoComplete = "off",
      ariaLabel,
      ariaDescription,
      theme = "primary",
      disabled = false,
      height,
      "data-testid": testId = "text-area",
      ...props
    },
    ref
  ) => {
    // Generate a unique ID for associating the textarea with its description.
    const id = useId();

    return (
      <div
        className={combineClassNames(
          styles.textArea,
          styles[theme],
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
          className={combineClassNames(styles.textInput, styles[theme])}
          id={id}
          placeholder={placeholder}
          aria-label={ariaLabel || placeholder}
          aria-describedby={ariaDescription ? `${id}-description` : undefined}
          autoComplete={autoComplete}
          readOnly={readOnly}
          disabled={disabled}
          style={{ height }}
          data-testid={`${testId}-input`}
          {...props}
        />

        {/* Custom resize handle for additional styling */}
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

TextArea.displayName = "TextArea";

export default TextArea;
