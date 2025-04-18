import React, {
  forwardRef,
  useRef,
  useId,
  useEffect,
  useImperativeHandle,
} from "react";
import "./Checkbox.scss";
import { combineClassNames } from "@/utils/classNames";
import { CheckBoxProps } from "../Checkbox.types";

/**
 * A fully accessible and controlled checkbox component with support for:
 * - indeterminate state
 * - theming
 * - label positioning
 * - disabled state
 * - external ref access
 *
 * @param {CheckboxProps} props - Props for configuring the checkbox.
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to the native checkbox element.
 * @returns {JSX.Element} Rendered checkbox component.
 */
const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    {
      checked,
      onChange,
      indeterminate = false,
      theme = "primary",
      disabled = false,
      label = "",
      labelPosition = "right",
      className = "",
      id,
      "data-testid": testId,
      ...props
    },
    ref
  ) => {
    /** Auto-generate ID if not provided. */
    const internalId = useId();
    const checkboxId = id || internalId;

    /** Ref to the native input element (used to set indeterminate manually). */
    const inputRef = useRef<HTMLInputElement>(null);

    /** Expose inputRef to parent via forwarded ref. */
    useImperativeHandle(ref, () => inputRef.current!, []);

    /** Update the native indeterminate state when prop changes. */
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    /** Emit the updated checked state on change. */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange(e.target.checked);
      }
    };

    /** Compute class names based on props and state. */
    const combinedClassName = combineClassNames(
      "checkboxWrapper",
      theme,
      disabled && "disabled",
      labelPosition,
      className
    );

    return (
      <label
        htmlFor={checkboxId}
        className={combinedClassName}
        aria-checked={indeterminate ? "mixed" : checked}
        aria-disabled={disabled}
        role="checkbox"
      >
        {label && labelPosition === "left" && (
          <span className={"checkboxLabel"} id={`${checkboxId}-label`}>
            {label}
          </span>
        )}

        <input
          id={checkboxId}
          ref={inputRef}
          type="checkbox"
          className={"checkboxInput"}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-labelledby={label ? `${checkboxId}-label` : undefined}
          data-testid={testId}
          {...props}
        />

        <span className={"checkboxBox"} aria-hidden="true" />

        {label && labelPosition === "right" && (
          <span className={"checkboxLabel"} id={`${checkboxId}-label`}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
