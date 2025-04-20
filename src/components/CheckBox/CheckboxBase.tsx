import React, {
  forwardRef,
  useId,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import type { CheckboxProps } from "./Checkbox.types";
import { combineClassNames } from "@/utils/classNames";

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

    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange(e.target.checked);
      }
    };

    const combinedClassName = combineClassNames(
      classMap.checkboxWrapper,
      classMap[theme],
      disabled && classMap.disabled,
      classMap[labelPosition],
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
          <span className={classMap.checkboxLabel} id={`${checkboxId}-label`}>
            {label}
          </span>
        )}

        <input
          id={checkboxId}
          ref={inputRef}
          type="checkbox"
          className={classMap.checkboxInput}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-labelledby={label ? `${checkboxId}-label` : undefined}
          data-testid={testId}
          {...props}
        />

        <span className={classMap.checkboxBox} aria-hidden="true" />

        {label && labelPosition === "right" && (
          <span className={classMap.checkboxLabel} id={`${checkboxId}-label`}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

CheckboxBase.displayName = "CheckboxBase";

export default CheckboxBase;
