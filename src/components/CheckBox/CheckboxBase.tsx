import {
  forwardRef,
  useId,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import type { CheckboxProps } from "./Checkbox.types";
import { combineClassNames } from "../../utils/classNames";

export interface CheckboxBaseProps extends CheckboxProps {
  classMap: Record<string, string>;
}

const CheckboxBase = forwardRef<HTMLInputElement, CheckboxBaseProps>(
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
      classMap,
      ...props
    },
    ref
  ) => {
    const internalId = useId();
    const checkboxId = id || internalId;
    const labelId = label ? `${checkboxId}-label` : undefined;

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const combinedClassName = combineClassNames(
      classMap.checkbox,
      classMap[`checkbox_${theme}`],
      classMap[`checkbox_${labelPosition}`],
      disabled && classMap["checkbox_disabled"],
      className
    );

    return (
      <label
        htmlFor={checkboxId}
        className={combinedClassName}
        data-testid={testId ? `${testId}-wrapper` : undefined}
      >
        {label && labelPosition === "left" && (
          <span
            className={classMap["checkbox_label"]}
            id={labelId}
            data-testid={testId ? `${testId}-label` : undefined}
          >
            {label}
          </span>
        )}

        <input
          id={checkboxId}
          ref={inputRef}
          type="checkbox"
          className={classMap["checkbox_input"]}
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          aria-labelledby={labelId}
          aria-checked={indeterminate ? "mixed" : undefined}
          {...props}
        />

        <span
          className={combineClassNames(
            classMap.checkbox_box,
            indeterminate && classMap.checkbox_indeterminate
          )}
          aria-hidden="true"
          data-testid={testId ? `${testId}-box` : undefined}
        />

        {label && labelPosition === "right" && (
          <span
            className={classMap["checkbox_label"]}
            id={labelId}
            data-testid={testId ? `${testId}-label` : undefined}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

CheckboxBase.displayName = "CheckboxBase";
export default CheckboxBase;
