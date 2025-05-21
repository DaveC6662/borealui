import React from "react";
import { SpinnerProps } from "./Spinner.types";

const SpinnerBase: React.FC<
  SpinnerProps & { classMap: Record<string, string> }
> = ({
  theme = "primary",
  size = 50,
  className = "",
  "data-testid": testId = "spinner",
  label,
  classMap,
}) => {
  const strokeWidth = `${Math.max(2, Math.floor(size / 12))}px`;
  const spinnerSize = `${size}px`;

  const labelId = `${testId}`;

  return (
    <div
      className={`${classMap.wrapper} ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label || "Loading"}
    >
      <div
        className={`${classMap.spinner} ${classMap[theme]}`}
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
