import React from "react";
import "./Spinner.scss";
import SpinnerBase from "../SpinnerBase";
import { SpinnerProps } from "../Spinner.types";
import { combineClassNames } from "../../../utils/classNames";

const classes = {
  wrapper: "spinner_wrapper",
  spinner: "spinner",
  label: "spinner_label",
  primary: "spinner_primary",
  secondary: "spinner_secondary",
  success: "spinner_success",
  warning: "spinner_warning",
  error: "spinner_error",
  clear: "spinner_clear",
};

const Spinner: React.FC<SpinnerProps> = (props) => {
  return (
    <SpinnerBase
      {...props}
      className={combineClassNames(props.className)}
      classMap={classes}
    />
  );
};

export default Spinner;
