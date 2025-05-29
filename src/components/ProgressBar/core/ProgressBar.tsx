import React from "react";
import BaseProgressBar from "../ProgressBarBase";
import "./ProgressBar.scss";
import { ProgressBarProps } from "../ProgressBar.types";

const classes = {
  container: "progress_container",
  bar: "progress_bar",
  primary: "progress_primary",
  secondary: "progress_secondary",
  success: "progress_success",
  error: "progress_error",
  warning: "progress_warning",
  clear: "progress_clear",
  xs: "progress_xs",
  xl: "progress_xl",
  small: "progress_small",
  medium: "progress_medium",
  large: "progress_large",
  animated: "progress_animated",
  indeterminate: "progress_indeterminate",
};

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  return <BaseProgressBar {...props} classMap={classes} />;
};

export default ProgressBar;
