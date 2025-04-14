import {
    forwardRef,
    useId,
} from "react";
import styles from "./TextArea.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { TextAreaProps } from "./TextArea.types";

/**
 * TextArea is a customizable and accessible textarea component that can display an optional icon,
 * supports theming, and includes a visually hidden description for accessibility. It also provides
 * a custom resize handle.
 *
 * @param {TextAreaProps} props - The props for configuring the TextArea.
 * @param {React.Ref<HTMLTextAreaElement>} ref - A ref forwarded to the underlying textarea.
 * @returns {JSX.Element} A styled textarea component.
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
