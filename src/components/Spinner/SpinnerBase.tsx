import React, { useMemo, useId } from "react";
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
  const uid = useId();
  const spinnerSize = `${size}px`;
  const strokeWidth = `${Math.max(2, Math.floor(size / 12))}px`;

  const visibleLabelId = label ? `${testId}-label-${uid}` : undefined;

  const wrapperClass = useMemo(
    () => combineClassNames(classMap.wrapper, className),
    [classMap, className]
  );

  const spinnerClasses = useMemo(
    () => combineClassNames(classMap.spinner, classMap[theme], classMap[state]),
    [classMap, theme, state]
  );

  const shadowClass = useMemo(
    () =>
      combineClassNames(
        classMap.shadowElement,
        shadow && classMap[`shadow${capitalize(shadow)}`]
      ),
    [classMap, shadow]
  );

  return (
    <div
      className={wrapperClass}
      role="status"
      aria-live="polite"
      aria-busy={true}
      {...(visibleLabelId
        ? { "aria-labelledby": visibleLabelId }
        : { "aria-label": "Loading" })}
      data-testid={testId}
    >
      <div
        className={shadowClass}
        style={{ width: spinnerSize, height: spinnerSize }}
        aria-hidden="true"
      />

      <div
        className={spinnerClasses}
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderWidth: strokeWidth,
        }}
        aria-hidden="true"
        data-testid={`${testId}-ring`}
      />

      {label && (
        <span
          id={visibleLabelId}
          className={classMap.label}
          data-testid={`${testId}-label`}
        >
          {label}
        </span>
      )}
    </div>
  );
};

SpinnerBase.displayName = "SpinnerBase";
export default SpinnerBase;
