import React from "react";
import { FormGroupProps } from "./FormGroup.types";
import { combineClassNames } from "@/utils/classNames";

export interface BaseFormGroupProps extends FormGroupProps {
  classNames: {
    wrapper: string;
    label: string;
    srOnly: string;
    required: string;
    inputWrapper: string;
    inputField: string;
    controller: string;
    description: string;
    errorMessage: string;
    layoutMap: Record<string, string>;
    spacingMap: Record<string, string>;
    error?: string;
  };
}

const BaseFormGroup: React.FC<BaseFormGroupProps> = ({
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
  classNames,
}) => {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div
      className={combineClassNames(
        classNames.wrapper,
        classNames.layoutMap[layout],
        classNames.spacingMap[spacing],
        error && classNames.error,
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
          className={combineClassNames(
            classNames.label,
            hideLabel && classNames.srOnly
          )}
          data-testid={`${testId}-label`}
        >
          {label} {required && <span className={classNames.required}>*</span>}
        </label>
      )}

      <div
        className={classNames.inputWrapper}
        data-testid={`${testId}-wrapper`}
      >
        <div
          className={classNames.inputField}
          data-testid={`${testId}-input-field`}
        >
          {React.isValidElement(children)
            ? React.cloneElement(children, {
                id,
                "aria-describedby": error
                  ? errorId
                  : description
                    ? descriptionId
                    : undefined,
                "aria-invalid": !!error,
                "data-testid": `${testId}-input`,
              })
            : children}
        </div>

        {controller && (
          <div
            className={classNames.controller}
            data-testid={`${testId}-controller`}
          >
            {controller}
          </div>
        )}
      </div>

      {description && !error && (
        <p
          id={descriptionId}
          className={classNames.description}
          data-testid={`${testId}-description`}
        >
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className={classNames.errorMessage}
          role="alert"
          data-testid={`${testId}-error`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default BaseFormGroup;
