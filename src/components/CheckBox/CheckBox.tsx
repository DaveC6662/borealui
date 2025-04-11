"use client";

import React, {
  forwardRef,
  useId,
  useRef,
  useEffect,
  useImperativeHandle,
  InputHTMLAttributes,
} from "react";
import styles from "./CheckBox.module.scss";
import { ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the Checkbox component.
 */
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** Label text displayed beside the checkbox. */
  label?: string;
  /** Checked state of the checkbox. */
  checked: boolean;
  /** Callback when the checkbox value changes. */
  onChange: (checked: boolean) => void;
  /** Whether the checkbox is in an indeterminate (mixed) state. */
  indeterminate?: boolean;
  /** Optional theme to style the checkbox (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Whether the checkbox is disabled. */
  disabled?: boolean;
  /** Custom class name for additional styling. */
  className?: string;
  /** Position of the label relative to the checkbox. */
  labelPosition?: "left" | "right";
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * A controlled and accessible checkbox component supporting indeterminate state,
 * themes, disabled state, and label positioning.
 *
 * @param {CheckboxProps} props - Props for configuring the checkbox.
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to the input element.
 * @returns {JSX.Element} Rendered checkbox component.
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
    /** Internal ID used when no ID is provided by the user. */
    const internalId = useId();
    const checkboxId = id || internalId;

    /** Ref to the native input element to support indeterminate behavior. */
    const inputRef = useRef<HTMLInputElement>(null);

    /** Expose inputRef to parent via forwarded ref. */
    useImperativeHandle(ref, () => inputRef.current!);

    /** Update native indeterminate property when the prop changes. */
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    /** Handle checkbox toggle and emit the new checked state. */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) onChange(e.target.checked);
    };

    /** Generate combined class names based on state and props. */
    const combinedClassName = combineClassNames(
      styles.checkboxWrapper,
      styles[theme],
      disabled && styles.disabled,
      styles[labelPosition],
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
          <span className={styles.checkboxLabel} id={`${checkboxId}-label`}>
            {label}
          </span>
        )}

        <input
          id={checkboxId}
          ref={inputRef}
          type="checkbox"
          className={styles.checkboxInput}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-labelledby={label ? `${checkboxId}-label` : undefined}
          data-testid={testId}
          {...props}
        />

        <span className={styles.checkboxBox} aria-hidden="true" />

        {label && labelPosition === "right" && (
          <span className={styles.checkboxLabel} id={`${checkboxId}-label`}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
