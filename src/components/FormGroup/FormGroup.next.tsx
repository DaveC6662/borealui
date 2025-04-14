"use client";

import React, { JSX } from "react";
import styles from "./FormGroup.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { FormGroupProps } from "./FormGroup.types";

/**
 * FormGroup is a flexible wrapper for inputs, handling accessibility,
 * layout, labels, descriptions, and validation messaging.
 *
 * @param {FormGroupProps} props - The props used to configure the form group.
 * @returns {JSX.Element} A styled and accessible form group.
 */
const FormGroup: React.FC<FormGroupProps> = ({
  label,
  description,
  error,
  children,
  id,
  required = false,
  className = "",
  layout = "vertical",
  hideLabel = false,
  spacing = "medium",
  controller,
  "data-testid": testId = "form-group",
}: FormGroupProps): JSX.Element => {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div
      className={combineClassNames(
        styles.formGroup,
        styles[layout],
        styles[spacing],
        error && styles.error,
        className
      )}
      role="group"
      aria-labelledby={id ? `${id}-label` : undefined}
      data-testid={testId}
    >
      {label && (
        <label
          id={`${id}-label`}
          htmlFor={id}
          className={combineClassNames(styles.label, hideLabel && styles.srOnly)}
          data-testid={`${testId}-label`}
        >
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.inputWrapper} data-testid={`${testId}-wrapper`}>
        <div className={styles.inputField} data-testid={`${testId}-input-field`}>
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<any>, {
              id,
              "aria-describedby": error ? errorId : description ? descriptionId : undefined,
              "aria-invalid": !!error,
              "data-testid": `${testId}-input`,
            })
            : children}
        </div>

        {controller && (
          <div className={styles.controller} data-testid={`${testId}-controller`}>
            {controller}
          </div>
        )}
      </div>

      {description && !error && (
        <p id={descriptionId} className={styles.description} data-testid={`${testId}-description`}>
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className={styles.errorMessage} role="alert" data-testid={`${testId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormGroup;
