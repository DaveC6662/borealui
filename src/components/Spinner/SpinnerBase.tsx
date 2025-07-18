import React, { useMemo } from "react";
import { SpinnerProps } from "./Spinner.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const SpinnerBase: React.FC<
  SpinnerProps & { classMap: Record<string, string> }
> = ({
  theme = getDefaultTheme(),
  state = "",
  size = 50,
  shadow = getDefaultShadow(),
  className = "",
  "data-testid": testId = "spinner",
  label,
  classMap,
}) => {
  const strokeWidth = `${Math.max(2, Math.floor(size / 12))}px`;
  const spinnerSize = `${size}px`;

  const labelId = `${testId}`;

  const spinnerClasses = useMemo(
    () => combineClassNames(classMap.spinner, classMap[theme], classMap[state]),
    [classMap, theme, state]
  );

  return (
    <div
      className={`${classMap.wrapper} ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label || "Loading"}
    >
      <div
        className={combineClassNames(
          classMap.shadowElement,
          shadow && classMap[`shadow${capitalize(shadow)}`]
        )}
        style={{ width: spinnerSize, height: spinnerSize }}
      />
      <div
        className={spinnerClasses}
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderWidth: strokeWidth,
        }}
        data-testid={testId}
        aria-hidden="true"
      />
      <span
        id={labelId}
        className={"sr_only"}
        data-testid={`${testId}-sr-label`}
      >
        {label}
      </span>
      <span
        id={labelId}
        className={classMap.label}
        data-testid={`${testId}-label`}
      >
        {label}
      </span>
    </div>
  );
};

export default SpinnerBase;
