import React, { useMemo, useId } from "react";
import { BaseFormGroupProps } from "./FormGroup.types";
import { combineClassNames } from "../../utils/classNames";

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
  const auto = useId();
  const baseId = id ?? `${testId}-${auto}`;
  const labelId = label ? `${baseId}-label` : undefined;
  const descriptionId = description ? `${baseId}-description` : undefined;
  const errorId = error ? `${baseId}-error` : undefined;

  const describedBy =
    [errorId, descriptionId].filter(Boolean).join(" ") || undefined;

  const childrenArray = React.Children.toArray(children);
  const isGroup = childrenArray.length > 1;

  const wrapperClass = useMemo(
    () =>
      combineClassNames(
        classMap.wrapper,
        classMap[layout],
        classMap[spacing],
        error && classMap.error,
        className
      ),
    [classMap, layout, spacing, error, className]
  );

  return (
    <div
      className={wrapperClass}
      {...(isGroup && {
        role: "group",
        "aria-labelledby": labelId,
        "aria-describedby": describedBy,
      })}
      data-testid={testId}
    >
      {label && (
        <label
          id={labelId}
          {...(!isGroup && id ? { htmlFor: id } : {})}
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

BaseFormGroup.displayName = "BaseFormGroup";
export default BaseFormGroup;
