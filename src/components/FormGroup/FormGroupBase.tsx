import React from "react";
import { FormGroupProps } from "./FormGroup.types";
import { combineClassNames } from "@/utils/classNames";

export interface BaseFormGroupProps extends FormGroupProps {
  classMap: Record<string, string>;
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
  spacing = "xs",
  controller,
  "data-testid": testId = "form-group",
  classMap,
}) => {
  const labelId = id ? `${id}-label` : undefined;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const describedBy =
    [errorId, descriptionId].filter(Boolean).join(" ") || undefined;

  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={combineClassNames(
        classMap.wrapper,
        classMap[layout],
        classMap[spacing],
        error && classMap.error,
        className
      )}
      role="group"
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      data-testid={testId}
    >
      {label && (
        <label
          id={labelId}
          className={combineClassNames(classMap.label, hideLabel && "sr_only")}
          data-testid={`${testId}-label`}
        >
          {label}
          {required && (
            <span
              className={classMap.required}
              aria-hidden="true"
              data-testid={`${testId}-required`}
            >
              *
            </span>
          )}
        </label>
      )}

      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={classMap.inputWrapper}
          data-testid={`${testId}-wrapper-${index}`}
        >
          <div
            className={classMap.inputField}
            data-testid={`${testId}-input-field-${index}`}
          >
            {child}
          </div>

          {controller && index === 0 && (
            <div
              className={classMap.controller}
              data-testid={`${testId}-controller`}
            >
              {controller}
            </div>
          )}
        </div>
      ))}

      {description && !error && (
        <p
          id={descriptionId}
          className={classMap.description}
          data-testid={`${testId}-description`}
        >
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className={classMap.errorMessage}
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
