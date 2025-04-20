import React from "react";
import "./Spinner.scss";
import SpinnerBase from "../SpinnerBase";
import { SpinnerProps } from "../Spinner.types";
import { combineClassNames } from "../../../utils/classNames";

/**
 * Core Spinner component with global styles.
 * This component is not scoped and uses global styles.
 * It is a wrapper around the SpinnerBase component.
 *
 * @param {SpinnerProps} props - Props for the Spinner component.
 * @returns {JSX.Element} - Rendered Spinner component.
 */
// Note: The Spinner component is a wrapper around the SpinnerBase component
const Spinner: React.FC<SpinnerProps> = (props) => {
  const coreStyles = {
    spinner: "spinner",
    primary: "primary",
    secondary: "secondary",
    success: "success",
    warning: "warning",
    error: "error",
  };

  return (
    <SpinnerBase
      {...props}
      className={combineClassNames(props.className)}
      styles={coreStyles}
    />
  );
};

export default Spinner;
